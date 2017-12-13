import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class UserV1View extends Component {
    render() {
        return (
            <section className="user-view standard-main">
                <Link to="/">Back to Search</Link>
                <h1>{this.props.username}: User found.</h1>
                <h3>Power Level: {this.props.level}</h3>
                <h3>Time played: {this.props.minutesPlayed} minutes.</h3>
                <h3>Subclass: {this.props.subClass}</h3>
                <h3>Primary Weapon: {this.props.primaryWeapon}</h3>
                <h3>Special Weapon: {this.props.specialWeapon}</h3>
                <h3>Heavy Weapon: {this.props.heavyWeapon}</h3>
                <h3>KDR: {this.props.kdr}</h3>
                <h3>KDAR: {this.props.kdar}</h3>
            </section>
        );
    }
}