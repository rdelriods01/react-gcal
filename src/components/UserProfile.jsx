import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from '@material-ui/core';

const UserProfile = (props) => {
    return (
        <div className="userprofile" >
            <h2>User with id: {props.match.params.id}</h2>
            <Link to='/' > <Button> Go back to Dashboard </Button> </Link>
        </div>
    )
}

export default UserProfile;