import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

const initialState = {
    loaded: false,
    level: 0,
    minutesPlayed: 0,
    subClass: '',
    primaryWeapon: '',
    specialWeapon: '',
    heavyWeapon: ''
}

export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleUserInfo = this.handleUserInfo.bind(this);
        var routeParams = this.props.match.params;
        axios({
            method: 'get',
            url: `/api/d1/user/${routeParams.consoleId}/${routeParams.username}/`
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
        var character = userInfo.summary.characters[0];
        var characterBase = character.characterBase;
        var level = characterBase.powerLevel,
            timePlayed = `${Math.floor(characterBase.minutesPlayedTotal  / 60)}H ${characterBase.minutesPlayedTotal % 60}M`,
            subClass = userInfo.subClass,
            primaryWeapon = userInfo.primaryWeapon,
            specialWeapon = userInfo.specialWeapon,
            heavyWeapon = userInfo.heavyWeapon
        this.setState({
            loaded: true,
            level: level,
            minutesPlayed: timePlayed,
            subClass: subClass,
            primaryWeapon: primaryWeapon,
            specialWeapon: specialWeapon,
            heavyWeapon: heavyWeapon
        })
    }
    
    render() {
        if (this.state.loaded) {
            return (
                <section className="user-view standard-main">
                    <Link to="/">Back to Search</Link>
                    <h1>{this.props.match.params.username}: User found.</h1>
                    <h3>Power Level: {this.state.level}</h3>
                    <h3>Time played: {this.state.minutesPlayed} minutes.</h3>
                    <h3>Subclass: {this.state.subClass}</h3>
                    <h3>Primary Weapon: {this.state.primaryWeapon}</h3>
                    <h3>Special Weapon: {this.state.specialWeapon}</h3>
                    <h3>Heavy Weapon: {this.state.heavyWeapon}</h3>

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

