import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import firebase from 'firebase/app';
import fbconfig from './fbconfig';

import NoSigned from './NoSigned';


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
