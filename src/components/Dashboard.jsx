import React, { Component } from 'react';

import Calendar from './Calendar';

class Dashboard extends Component {

    render() {
        return (
            <div className="dashboard">
                <div className="calendar" >
                    <Calendar />
                </div>
            </div>
        )
    }
}

export default Dashboard;