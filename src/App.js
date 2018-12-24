import React, { Component } from 'react';

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Import Components
import Layout from './components/Layout.jsx';

// Import SCSS files
import variables from './index.scss';
import './css/dashboard.scss';
import './css/navbar.scss';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Layout />
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

export default App;