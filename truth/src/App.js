import React, { Component } from 'react';

import { Route, BrowserRouter, Switch } from "react-router-dom";

import SearchUsers from 'components/SearchUsers.js'
import UserView from 'components/UserView.js'


/*** Top-Level Application ***/
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            version: "2",
            system: 'xb'
        }
        this.setPlatform = this.setPlatform.bind(this);
    }
    setPlatform(system, version) {
        this.setState({
            version: version,
            system: system
        })
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
