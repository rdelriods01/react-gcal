import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Import Components
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import UserProfile from './UserProfile';
import SignUp from './SignUp';

export class Layout extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <BrowserRouter >
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/db" />} />
                        <Route path="/db" component={Dashboard} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/user/:id" component={UserProfile} />
                        <Route path="*" render={() => <Redirect to="/db" />} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Layout;