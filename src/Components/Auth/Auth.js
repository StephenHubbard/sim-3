import React, {Component} from 'react';
import './Auth.css';
import axios from 'axios';
import {updateUserInfo} from '../../ducks/reducer'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

class Auth extends Component {
    state={
        username: '',
        password: '',
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    register = () => {
        const {username, password} = this.state
        axios
            .post('/auth/register', {username, password})
            .then(res => {
                this.props.updateUserInfo(res.data.user)
            })
            .catch(err => {
                console.log(err.response.data.message)
            })
    }

    login = () => {
        const {username, password} = this.state
        axios 
            .post('/auth/login', {username, password})
            .then(res => {
                this.props.updateUserInfo(res.data.user)
                alert(res.data.message)
            })
            .catch(err => {
                alert(err.response.data.message)
            })
    }
    
    render() {
        return (
            <div className="Auth">
                <div className="auth-container">
                    <i class="fas fa-smile-wink fa-3x"></i>
                    <h1>Helo</h1>
                    <div className="two-input">
                        <input 
                            placeholder="Username" 
                            type="text"
                            onChange={e => this.handleChange('username', e.target.value)}
                            value={this.state.username}
                        />
                        <input 
                            placeholder="Password" 
                            type="text"
                            onChange={e => this.handleChange('password', e.target.value)}
                            value={this.state.password}
                        />                    
                </div>
                    <Link to="/dashboard">
                    <button onClick={this.login}>Login</button>
                    </Link>
                    <Link to="/dashboard">
                        <button onClick={this.register}>Register</button>
                    </Link>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState
}
const mapDispatchToProps = {
    updateUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)