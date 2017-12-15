import React, { Component } from 'react';

import { Route, BrowserRouter, Switch } from "react-router-dom";

import Cookies from 'universal-cookie';

import SearchUsers from 'components/SearchUsers.js'
import UserView from 'components/UserView.js'


/*** Top-Level Application ***/
class App extends Component {
    constructor(props) {
        super(props);
        // see if cookie exists to restore user defaults
        const cookies = new Cookies();
        const platformData = cookies.get('platform');
        // default defaults in case user has never searched before
        var defaultVersion = "2",
            defaultSystem = 'xb';
        if (platformData) {
            defaultSystem = platformData.split('v')[0];
            defaultVersion = platformData.split('v')[1];
        }
        this.state = {
            version: defaultVersion,
            system: defaultSystem
        }
        this.setPlatform = this.setPlatform.bind(this);
    }
    setPlatform(system, version) {
        const cookies = new Cookies();
        this.setState({
            version: version,
            system: system
        });
        cookies.set('platform', `${system}v${version}`, { path: '/', maxAge: 432000 });
    }
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/:version/user/:consoleName/:username" render={props => <UserView {...props} />} />
                        <Route path="/" render={props => <SearchUsers version={this.state.version} system={this.state.system} setPlatform={this.setPlatform} {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
