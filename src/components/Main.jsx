import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Firebase
import firebase from 'firebase/app';
import fbconfig from '../fbconfig';
import 'firebase/auth';

import Layout from './Layout';
import SignIn from './SignIn';
import SignUp from './SignUp';

const fb = firebase.initializeApp(fbconfig);

export class Main extends Component {

    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        fb.auth().onAuthStateChanged(user => {
            this.setState({ user })
        })
    }

    render() {
        const { user } = this.state;
        return (
            <div className="main">
                <BrowserRouter>
                    {user ?
                        <Switch>
                            <Route exact path="/" component={Layout} />
                            <Route path="*" render={() => <Redirect to="/" />} />
                        </Switch>
                        :
                        <Switch>
                            <Route exact path="/signin" component={SignIn} />
                            <Route exact path="/signup" component={SignUp} />
                            <Route path="*" render={() => <Redirect to="/signin" />} />
                        </Switch>
                    }
                </BrowserRouter>
            </div>
        )
    }
}

export default Main