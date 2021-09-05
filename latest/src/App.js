import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Home from "./Home"
import Header from './Header'
import Sidemenu from './Sidemenu'

import {auth} from "./firebase";
import './App.css';


function App() {
  return (
    <Router>
      
    <div className='app'>
      <Switch>
      <Route path="/">
        <Header/>
        <Home/>
       
     </Route>

     <Route path="login">
     <Login/>
      
       
     </Route>

     
      </Switch>
    </div>
  </Router>
  );
}

export default App;