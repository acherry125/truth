import React, { Component } from 'react';

import axios from 'axios';

export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        }
        this.handleUserInfo = this.handleUserInfo.bind(this);
        var routeParams = this.props.match.params;
        axios({
            method: 'get',
            url: `/api/user/${routeParams.consoleId}/${routeParams.username}/`
        })
        .then((res) => {
            var userInfo = res.data;
            this.handleUserInfo(userInfo);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    handleUserInfo(userInfo) {
        console.log(userInfo);
        this.setState({
            loaded: true
        })
    }
    
    render() {
        if (this.state.loaded) {
            return (
                <section className="user-view">
                    {this.props.match.params.username}: User found.
                </section>
            );
        } else {
            return (
                <section className="user-view">
                    User View, not loaded
                </section>
            );   
        }
    }
}

