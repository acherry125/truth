import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class UserV2View extends Component {
    render() {
        return (
            <section>
                <Link to="/">Back to Search</Link>
                <h1>User found: {this.props.username}.</h1>
                <h3>Character Level: {this.props.level}</h3>
                <h3>Time played: {this.props.timePlayed}</h3>
            </section>
        );
    }
}