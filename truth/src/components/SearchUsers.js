import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.checkUsername = this.checkUsername.bind(this);
    }
    checkUsername(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const consoleType = event.target["console-type"].value;
        this.props.history.push(`/user/${consoleType}/${username}`);
    }
    render() {
        return (
            <section className="search-users standard-main">
                <div className="site-titles">
                    <h1>Truth</h1>
                    <h3>Destiny Companion</h3>
                </div>
                <form onSubmit={this.checkUsername}>
                    <h2>What is your name Guardian?</h2>
                    <input type="text" name="username" placeholder="Destiny Username"  />
                    <div className="radio-buttons">
                        <input type="radio" name="console-type" value="1" id="xbox-radio" defaultChecked="true"/>
                        <label htmlFor="xbox-radio">Xbox</label>
                        <input type="radio" name="console-type" value="2" id="playstation-radio"/>
                        <label htmlFor="playstation-radio">Playstation</label>
                        <input type="radio" name="console-type" value="3" id="pc-radio"/>
                        <label htmlFor="pc-radio">PC</label>
                    </div>
                    <input className="submit-button" type="submit" />
                </form>
            </section>
        );
    }
}

export default SearchUsers = withRouter(SearchUsers);