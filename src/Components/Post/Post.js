import React, {Component} from 'react';
import './Post.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Post extends Component {
        state = {
            data: '',
        }

    componentDidMount() {
        if (this.props.postObj) {
            axios
                .get(`/api/posts/${this.props.postObj.post_id}`)
                .then(res => {
                    this.setState({
                        data: res.data[0]
                    })
                })
        } else {
            axios
                .get(`/api/posts/${this.props.match.params.post_id}`)
                .then(res => {
                    this.setState({
                        data: res.data[0]
                    })
                })
        }
    }
    

    render() {
        return (
            <div>
                {this.props.postObj ? (
                    <Link to={`/post/${this.props.postObj.post_id}`}>
                        <div className="single-post">
                            <h1>{this.props.postObj.title}</h1>
                            <h1>by user:
                                <img className="profile-img" src={`https://robohash.org/${this.state.data.user_id}`} alt="" />
                            </h1>
                        </div>
                    </Link>
                ) : 
                    <div className="single-page">
                        <div className="title-user">
                            <h1>{this.state.data.title}</h1>
                            <img className="profile-img" src={`https://robohash.org/${this.state.data.user_id}`} alt="" />
                        </div>
                        <div className="img-content">
                            <img src={this.state.data.img_url} alt="" />
                            <h3>{this.state.data.content}</h3>
                        </div>
                    </div>
                }

                
            </div>
        )
    }
}