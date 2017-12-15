import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class UserV2View extends Component {
    render() {
        return (
            <section>
                <Link to="/">Back to Search</Link>
                <h1>User found: {this.props.username}.</h1>
            </section>
        );
    }
}