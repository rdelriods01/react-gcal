import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Import Components
import Layout from './components/Layout';

// Import SCSS files
import variables from './index.scss';
import './css/dashboard.scss';
import './css/navbar.scss';
import './css/signs.scss';
import './css/eventModal.scss';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    )
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

export default App;