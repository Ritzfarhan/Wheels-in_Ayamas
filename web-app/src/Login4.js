import React from 'react'
import $ from 'jquery'
import './Login4.css'

function Login4() {

{/*javascript*/}

document.querySelector(document).ready(function () {
    document.querySelector("ul.switcher li").click(function () {
      var tab_id = document.querySelector(this).attr("data-tab");
  
      document.querySelector("li").removeClass("active");
      document.querySelector("div.tab-pane").removeClass("active");
  
      document.querySelector(this).classList.add("active");
      document.querySelector("#" + tab_id).classList.add("active");
    });
  });
  
    return (

     
        <div className="container">
        <div className="login-container-wrapper clearfix">
          <ul className="switcher clearfix">
            <li className="first logo active" data-tab="login">					
              <a>Login</a>			
            </li>
            <li className="second logo" data-tab="sign_up">
              <a>Sign Up</a>	
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active" id="login">
              <form className="form-horizontal login-form">
                <div className="form-group relative">
                  <input className="form-control input-lg" id="login_username" placeholder="E-mail Address" required type="email" /> <i className="fa fa-user" />
                </div>
                <div className="form-group relative">
                  <input className="form-control input-lg" id="login_password" placeholder="Password" required type="password" /> <i className="fa fa-lock" />
                </div>
                <div className="form-group">
                  <button className="btn btn-success btn-lg btn-block" type="submit">Login</button>
                </div>
                <div className="checkbox checkbox-success">
                  <input id="stay-sign" type="checkbox" />
                  <label htmlFor="stay-sign">Stay signed in</label>
                </div>
                <hr />
                <div className="text-center">
                  <label><a href="#">Forgot your password?</a></label>
                </div>
              </form>
            </div>
            <div className="tab-pane" id="sign_up">
              <form className="form-horizontal login-form">
                <div className="form-group relative">
                  <input className="form-control input-lg" id="login_username" placeholder="E-mail Address" required type="email" /> <i className="fa fa-user" />
                </div>
                <div className="form-group relative">
                  <input className="form-control input-lg" id="login_password" placeholder="Password" required type="password" /> <i className="fa fa-lock" />
                </div>
                <div className="form-group relative">
                  <input className="form-control input-lg" id="login_password" placeholder="Repeat Password" required type="password" /> <i className="fa fa-lock" />
                </div>
                <div className="form-group">
                  <button className="btn btn-success btn-lg btn-block" type="submit">Sign Up</button>
                </div>
                <div className="checkbox checkbox-success">
                  <input id="agree-terms" type="checkbox" />
                  <label htmlFor="agree-terms"> Agree our terms</label>
                </div>
                <hr />
                <div className="text-center">
                  <label><a href="#">Already Member?</a></label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Login4
