import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Import Components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

// Import SCSS files
import variables from './index.scss';
import './css/signs.scss';


class NoSigned extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route path="*" render={() => <Redirect to="/signin" />} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

// Theme config
const theme = createMuiTheme({
  palette: {
    primary: { main: variables.primary },
    secondary: { main: variables.secondary }
  },
  typography: { useNextVariants: true }
});

export default NoSigned;