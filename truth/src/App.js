import React, { Component } from 'react';

import { Route, BrowserRouter, Switch } from "react-router-dom";

import SearchUsers from 'components/SearchUsers.js'
import UserView from 'components/UserView.js'


/*** Top-Level Application ***/
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Switch>
                        <Route path="/:version/user/:consoleName/:username" render={props => <UserView {...props} />} />
                        <Route path="/" render={props => <SearchUsers {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
