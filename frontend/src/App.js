import React from 'react';
import './App.css'
import Login from './components/authentication/ui/login/login';
import Register from './components/authentication/ui/register/register'
import About from './components/about/about'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Error from './components/error/error';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>        
          <Route path="/" exact>
          HomePage
          </Route>

          <Route path="/login/:id" exact>
            <Login/>
          </Route>

          <Route path="/register/:id" exact>
            <Register/>
          </Route>

          <Route path="/about" exact>
            <About/>
          </Route>   

          <Route path="*">
            <Error/>
          </Route>       
        </Switch>
      </Router>
    </div>
  );
}

export default App;
