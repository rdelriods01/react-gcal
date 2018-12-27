import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

class NavBar extends Component {

    logout = () => {
        firebase.auth().signOut();
    }

    render() {
        console.log();

        return (
            <div className="navbar"  >
                <AppBar position="static">
                    <Toolbar>
                        <IconButton>
                            <Icon> menu </Icon>
                        </IconButton>
                        <Link className="element" to='/db' >myReactapp</Link>
                        <Link className="btn" to='/db' ><Button onClick={this.logout} > Log Out </Button></Link>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default NavBar;