import React, {Component} from 'react';
import './Form.css';
import axios from 'axios'

export default class Form extends Component {
    state = {
        title: '',
        img_url: 'https://icon-library.net/images/no-image-available-icon/no-image-available-icon-6.jpg',
        content: '',
        user_id: '1',
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    newPost = () => {
        axios 
            .post('/api/posts', this.state)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            this.props.history.push('/dashboard')
            })
    }
    

    render() {
        return (
            <div className="Form">
                <h1>New Post</h1>
                <h3>Title:</h3>
                <input
                    className="title-input"
                    placeholder="title" 
                    type="text"
                    onChange={e => this.handleChange('title', e.target.value)}
                    value={this.state.title}
                />
                <div className="img-holder">
                    <img src={this.state.img_url} alt="" />
                </div>
                <h3>Image Url:</h3>
                <input
                    className="img-url-input"
                    placeholder="Image Url" 
                    type="text"
                    onChange={e => this.handleChange('img_url', e.target.value)}
                    value={this.state.img_url}
                />
                <h3>Content:</h3>
                <textarea 
                    placeholder="type away my friend"
                    onChange={e => this.handleChange('content', e.target.value)}
                />
                <button onClick={this.newPost}>Post</button>
            </div>
        )
    }
}