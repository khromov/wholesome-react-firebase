/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import * as FirestoreService from './lib/firebase';
import useQueryString from './hooks/useQueryString'

import login from './pages/login';
import loginFunctional from './pages/loginFunctional';
import test from './pages/test';


function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [error, setError] = useState();
  const [currentMessageId, setCurrentMessageId] = useQueryString('messageId');
  const [message, setMessage] = useState();

  console.log(currentMessageId);

   // Use a custom hook to subscribe to the grocery list ID provided as a URL query parameter
   const [groceryListId, setGroceryListId] = useQueryString('messageId');

   // Use an effect to authenticate and load the grocery list from the database
   useEffect(() => {
     FirestoreService.authenticateAnonymously().then(userCredential => {
       setUserId(userCredential.user.uid);
       if (groceryListId) {
         FirestoreService.getMessage(currentMessageId)
           .then(message => {
             if (message.exists) {
               setError(null);
               setMessage(message.data());
               console.log(message.data());
             } else {
               setError('message-not-found');
               setCurrentMessageId();
             }
           })
           .catch((error) => setError(error));
       }
       else {
         console.log('No message id');
       }
     })
     .catch(() => setError('anonymous-auth-failed'));
   }, [currentMessageId, setCurrentMessageId]);

  return (
  <Router>
      <Global styles={css`
        * {
          box-sizing: border-box;
        }
        
        body {
          color: white;
          background-color: black;
        }
      `} />
      <div>
        <h2 css={css`
          color: hotpink;
        `}>Wholesome React + Firebase!</h2>
        <nav className="">
        <ul className="">
          <li><Link to={'/'} className="nav-link">Home</Link></li>
          <li><Link to={'/login'} className="nav-link">Login</Link></li>
          <li><Link to={'/loginFunctional'} className="nav-link">Login functional</Link></li>
        </ul>
        </nav>
        <div>
          <h1>Message data</h1>
          <h3>{message?.original}</h3>
          {console.log(error)}
          {console.log('Logging: ' . error?.message)}
          Status: {error?.message}
          <pre>{JSON.stringify(error)}</pre>
        </div>
        <Switch>
            <Route exact path="/login" component={login}/>
            <Route exact path="/loginFunctional" component={loginFunctional}/>
            <Route exact path="/" component={test}/>
        </Switch>
      </div>
  </Router>
  );
}

export default App;