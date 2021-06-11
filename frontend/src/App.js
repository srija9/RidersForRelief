import React from 'react';
import './App.css'
// import { AuthProvider } from './components/context/auth/authProvider';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
// } from "react-router-dom";
// import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
// import About from './components/about/about'
// import Error from './components/error/error'
import Requester from './components/home/Requester/RequesterHomeScreen';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Switch>          
          <Route path="/" >
            
            <AuthProvider>
            <InitialHomeRouting />
            </AuthProvider>
          </Route>
          <Route path="/about" exact>
            <About/>
          </Route>

          <Route path="*" >
            <Error/>
          </Route>
        </Switch>
      </Router> */}
      <Requester/>
      
    </div>
  );
}

export default App;
