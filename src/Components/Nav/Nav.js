import React from 'react';
import './Nav.css';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import { updateUserInfo } from '../../ducks/reducer'
import axios from 'axios';

const Nav = props => {
    
    const logout = () => {
        axios.delete('/auth/logout').then(res => {
            alert(res.data.message)
            props.updateUserInfo({
                username: '',
                user_id: '',
                profile_img: '',
            })
        })
    }


    return (
        <header className="nav">
            <div className="profile">
                <div className="white-circle">
                    <img className="profile-pic" src={props.profile_img} alt="" />
                </div>
                <h2>{props.username}</h2>
            </div>
            <Link to="/dashboard"> 
                <i className="fas fa-home fa-3x"></i>
            </Link>
            <Link to="/new">
                <i className="fas fa-sticky-note fa-3x"></i>
            </Link>
            <Link to="/">
                <i className="fas fa-power-off fa-3x" onClick={logout}></i>
            </Link>
        </header>
    )
}

function mapStateToProps(reduxState) {
    return reduxState
}

export default connect(mapStateToProps, {updateUserInfo})(Nav)