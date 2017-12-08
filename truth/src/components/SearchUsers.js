import React, { Component } from 'react';

import axios from 'axios';

export default class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.checkUsername = this.checkUsername.bind(this);
    }
    checkUsername(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const consoleType = event.target["console-type"].value;
        axios({
            method: 'get',
            url: `/user/${consoleType}/${username}`
        })

    }
    render() {
        return (
            <section className="search-users">
                <form onSubmit={this.checkUsername}>
                    <input type="text" name="username" />
                    <div>
                        <input type="radio" name="console-type" value="xbox" id="xbox-radio" defaultChecked="true"/>
                        <label htmlFor="xbox-radio">Xbox</label>
                        <input type="radio" name="console-type" value="playstation" id="playstation-radio"/>
                        <label htmlFor="playstation-radio">Playstation</label>
                        <input type="radio" name="console-type" value="pc" id="pc-radio"/>
                        <label htmlFor="pc-radio">PC</label>
                    </div>
                    <input type="submit" />
                </form>
            </section>
        );
    }
}

