import React, {Component} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Post from '../Post/Post';

export default class Dashboard extends Component {
    state = {
        posts: [],
        myPostsToggle: true,
        search: '',
    }

    handleChange = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    componentDidMount() {
        axios.get('/api/posts').then(res => {
            this.setState({
                posts: res.data
            })
        })
    }

    toggleMine = () => {
        this.setState({
            myPostsToggle: !this.state.myPostsToggle
        })
    }

    resetSearchInput = () => {
        this.setState({
            search: '',
        })
    }


    render() {
        let key = 1
        return (
            <div className="Dashboard">
                <div className="top-nav-bar">
                    <div className="search-three">
                        <input
                            className="search-input"
                            placeholder="Search By Title" 
                            type="text"
                            onChange={e => this.handleChange('search', e.target.value)}
                            value={this.state.search}
                        />
                        <button>Search</button>
                        <button onClick={this.resetSearchInput}>Reset</button>
                    </div>
                    <div className="two-checkbox">
                    <h3>My Posts:</h3>
                    <input
                        onClick={this.toggleMine}
                        className="checkmark-box"
                        value={this.state.myPostsToggle}
                        type="checkbox"
                    />
                    </div>
                </div>
                <div className="posts-container">
                    <div className="post">
                        {this.state.posts.map(el => (
                            <Post
                                postObj={el} key={key++}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}