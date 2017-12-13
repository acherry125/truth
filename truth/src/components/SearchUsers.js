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
        const destinyVersion = event.target["destiny-version"].value;
        this.props.setPlatform(consoleType, destinyVersion);
        this.props.history.push(`/v${destinyVersion}/user/${consoleType}/${username}`);
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
                    <input type="text" name="username" placeholder="Destiny Username"/>
                    <div className="radio-buttons">
                        <input type="radio" name="console-type" value="xb" id="xbox-radio" defaultChecked={this.props.system === "xb"}/>
                        <label htmlFor="xbox-radio">Xbox</label>
                        <input type="radio" name="console-type" value="ps" id="playstation-radio" defaultChecked={this.props.system === "ps"}/>
                        <label htmlFor="playstation-radio">Playstation</label>
                        <input type="radio" name="console-type" value="pc" id="pc-radio" defaultChecked={this.props.system === "pc"}/>
                        <label htmlFor="pc-radio">PC</label>
                    </div>
                    <div className="radio-buttons">
                        <input type="radio" name="destiny-version" value="1" id="dest-1" defaultChecked={this.props.version === "1"}/>
                        <label htmlFor="dest-1">Destiny 1</label>
                        <input type="radio" name="destiny-version" value="2" id="dest-2" defaultChecked={this.props.version === "2"} />
                        <label htmlFor="dest-2">Destiny 2</label>
                    </div>
                    <input className="submit-button" type="submit" />
                </form>
            </section>
        );
    }
}

export default SearchUsers = withRouter(SearchUsers);