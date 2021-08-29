import React from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route}
from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";

function App() {
  return (
    // Sol
    <Router>
    <div className="App">
     <h1>HI ASSALAMUALAIKUM</h1>

       <Switch>
       <Route path="/login">
         <Login />
       </Route>
       <Route path="/checkout">
         <Header />
       <Checkout />
       </Route>
       <Route path="/">
         <Header />
       <Home /> 
       </Route>
       </Switch> 
    </div>
    </Router>
  );
}

export default App;
