import React, {useEffect} from "react";
import "./App.css";
import Header from './Header';
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import {auth} from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";

function App() {

  const [{basket} , dispatch]= useStateValue();
  useEffect(() => {
    //only runs once when a component loads

    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>>' , authUser);

      if (authUser){
        //the use is logged in/was logged in

        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      }else{
        dispatch({
          type: 'SET_USER',
          user: null,
        });

        //the user is logged out
      }
    });
  },[]);
  return (
    //BEM

    <Router>
    <div className="app">

//Soleahahahahahahahahaahahahahaha

//apakahhhhhhhh
    
      <Switch>

        <Route path="/login">
          <Login/>
          
        </Route>

        <Route path="/checkout" >
          <Header />
          <Checkout/>
        </Route>

        <Route path="/payment" >
          <Header />
          <Payment />
          
        </Route>

        <Route path="/">
          <Header />
          {/*Home Page*/}
          <Home/>
        </Route>
        
      </Switch>
     
     
     
    </div>
    </Router>
  );
}

export default App;
