import React from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const NavBar = () => {
    return (
        <div className="navbar"  >
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Icon> menu </Icon>
                    </IconButton>
                    <a className="element" href='/'  >myReactapp</a>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;