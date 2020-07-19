import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import login from './pages/login';
import loginFunctional from './pages/loginFunctional';
import test from './pages/test';

import React from 'react';

function App() {
  return (
  <Router>
      <div>
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