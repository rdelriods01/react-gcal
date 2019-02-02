import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// Firebase
import firebase from 'firebase/app';
import fbconfig from './fbconfig';
import 'firebase/auth';
import 'firebase/functions';

// Main React Class Components
import App from './App';
import NoSigned from './NoSigned';

// Styles
import './index.scss';

const fb = firebase.initializeApp(fbconfig);

fb.auth().onAuthStateChanged(user => {
    if (user) {
        ReactDOM.render(<App />, document.getElementById('root'));
        serviceWorker.unregister();
    } else {
        ReactDOM.render(<NoSigned />, document.getElementById('root'));
        serviceWorker.unregister();
    }
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
