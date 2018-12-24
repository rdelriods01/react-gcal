import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

class Dashboard extends Component {
    render() {
        return (
            <div className="dashboard">
                <h1>Hello World from Dashboard</h1>
                <Link to='/user/7' > <Button> Go to User Profile Component </Button> </Link>
            </div>
        )
    }
}

export default Dashboard;