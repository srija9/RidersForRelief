import React from 'react';
import './App.css'
import { AuthProvider } from './components/context/auth/authProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import InitialHomeRouting from './components/home/initial_home/initialHomeRouting';
//import UploadImages from './components/global_ui/Imginput/imageuploadglobal';
function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/temp">
              TestYourScreensHere
              {/* <UploadImages 
              ImgHeader="Upload Images: "
              ImgText="Tap to add"
              Name="Bills"
              Callback={callback}
                /> */}
            </Route>
            <Route path="/">
              <InitialHomeRouting />
            </Route>
          </Switch>
        </Router>

      </AuthProvider>
    </div>
  );
}

export default App;