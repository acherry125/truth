import React, { Component } from 'react';

import axios from 'axios';

import { Link } from 'react-router-dom';

import UserV1View from 'components/userViews/UserV1View.js';
import UserV2View from 'components/userViews/UserV2View.js';

export default class UserView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            userInfo: {}
        };
        var routeParams = this.props.match.params;
        var consoleId = 0;
        switch(routeParams.consoleName) {
            case 'xb':
                consoleId = 1;
                break;
            case 'ps': 
                consoleId = 2;
                break;
            case 'pc':
                consoleId = 3;
                break;
            default:
                break;
        }
        axios({
            method: 'get',
            url: `/api/${routeParams.version}/user/${consoleId}/${routeParams.username}/`
        })
        .then((res) => {
            var userInfo = res.data;
            this.setState({
                userInfo: userInfo,
                loaded: true
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
    
    render() {
        if (this.state.loaded) {
            var userInfo = this.state.userInfo;
            if (this.props.match.params.version === 'v1') {
                var character = userInfo.summary.characters[0];
                var characterBase = character.characterBase;
                var level = characterBase.powerLevel,
                    timePlayed = `${Math.floor(characterBase.minutesPlayedTotal  / 60)}H ${characterBase.minutesPlayedTotal % 60}M`,
                    subClass = userInfo.subClass,
                    primaryWeapon = userInfo.primaryWeapon,
                    specialWeapon = userInfo.specialWeapon,
                    heavyWeapon = userInfo.heavyWeapon,
                    kdr = userInfo.stats.kdr,
                    kdar = userInfo.stats.kdar
                return (
                    <UserV1View 
                        username={this.props.match.params.username} 
                        level={level} 
                        timePlayed={timePlayed} 
                        subClass={subClass}
                        primaryWeapon={primaryWeapon}
                        specialWeapon={specialWeapon}
                        heavyWeapon={heavyWeapon}
                        kdr={kdr}
                        kdar={kdar}
                    />
                );
            } else {
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
                        <h3>KDR: {this.state.kdr}</h3>
                        <h3>KDAR: {this.state.kdar}</h3>
                    </section>
                );
            }
        
        } else {
            return (
                <section className="user-view">
                    User View, not loaded
                </section>
            );   
        }
    }
}

