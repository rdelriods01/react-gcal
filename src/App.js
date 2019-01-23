import React, { Component } from 'react';

// Import Material theme provider
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// Import Components
import Main from './components/Main.jsx';

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
        <Main />
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