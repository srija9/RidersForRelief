import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
import PlacedRequest from './components/requester/my_requests/placed_request';
import Upload from './components/requester/new_request/upload_images'
function App() {
  //todo

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>

          
          <Route exact path="/" component={InitialHomeRouting}></Route>
          <Route exact path="/about" component={PlacedRequest}></Route>
          <Route exact path="/uploadthis" component={Upload}></Route>

          {/* <Route path="/about">             
          

            <Route path="/about">

              <PlacedRequest />
            </Route> */}
            {/* <Route path="/">
               <Upload /> 
              <InitialHomeRouting />
              
            </Route> */}
            
            

          </Switch>
        </Router>

      </AuthProvider>  
      {/* <Upload />  */}
    
    </div>
  );
}

export default App;
