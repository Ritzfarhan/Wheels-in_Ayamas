import React, {useEffect} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home"
import Header from './Header'
import Sidemenu from './Sidemenu'
import Function from './function'
import Header2 from './Header2'
import Login2 from "./Login2";
import {auth} from "./firebase";
import Login4 from './Login4'
import './App.css';


function App() {
  return (
    <Router>
      
    <div className='app'>
      <Switch>
          

        <Route path="/login">

        <Login4/>
        
        </Route> 


        <Route path="/sidemenu">
          <Sidemenu/>
        </Route>

        <Route path="/">
            <Header2/>
            <Home/>
            
          
        </Route>

     
      </Switch>
    </div>
  </Router>
  );
}

export default App;