import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from 'firebase/app';
import { Card, FormControl, InputLabel, Input, Button, CardHeader } from '@material-ui/core';

export class SignIn extends Component {

    state = {
        email: '',
        password: '',
        authError: null
    }

    handleChange = (ev) => {
        this.setState({
            [ev.target.id]: ev.target.value
        })
    }
    handleSubmit = (ev) => {
        ev.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({
                    authError: null
                })
            })
            .catch((err) => {
                this.setState({
                    authError: err.message
                })
            })
    }

    render() {
        return (
            <div className="signin">
                <Card className="card">
                    <CardHeader title="Sign In" className="cardheader" />
                    <form onSubmit={this.handleSubmit} >
                        <FormControl className="emailinput" margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange} />
                        </FormControl>
                        {this.state.authError ? <p className="errormsg" >{this.state.authError}</p> : null}
                        <Button type="submit" fullWidth variant="contained" color="primary" >Sign in</Button>
                        <Link className="linkto" to='/signup' >Sign up</Link>
                    </form>
                </Card>
            </div>
        )
    }
}

export default SignIn
