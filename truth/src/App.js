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
                        <Route path="/user/:accountid" render={props => <UserView {...props} />} />
                        <Route path="/" render={props => <SearchUsers {...props} />} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
/*
<Router>
    <div className="App">
        <Switch>
            <Route path="/the-city/menu" render={props => <MenuController user={this.state.user} {...props} />} />
            <Route exact path="/the-city/" render={props => <StartScreen user={this.state.user} handleNameChange={this.handleNameChange} resetName={this.resetName} {...props} />} />
            <Route path="/the-city/play" render={props => <GameController user={this.state.user} {...props} />} />
        </Switch>
    </div>
</Router>
*/

export default App;
