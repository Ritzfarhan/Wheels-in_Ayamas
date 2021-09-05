import React, { useState }from 'react';
import  './Login2.css';
import { auth } from "./firebase";
import { Link, useHistory } from "react-router-dom";
import $ from 'jquery'



function Login2() {
    
    // Show/hide password onClick of button using Javascript only

// https://stackoverflow.com/questions/31224651/show-hide-password-onclick-of-button-using-javascript-only

function show() {
    var p = document.getElementById("pwd");
    p.setAttribute("type", "text");
  }
  
  function hide() {
    var p = document.getElementById("pwd");
    p.setAttribute("type", "password");
  }
  
  var pwShown = 0;
  
  const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => 
    {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))
    }

    const register = e => 
    {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    history.push('/')
                }
            })
            .catch(error => alert(error.message))
    }
  

    return (
        
            <div class="overlay">
  
                <form>
   
                    <div class="con">
                    
                        <header class="head-form">
                            <h2>Log In</h2>
                            
                            <p>login here using your username and password</p>
                        </header>
                        
                        <br/>
                        <div class="field-set">

                            
                            <span class="input-item">
                            <i class="fa fa-user-circle"></i>
                            </span>
                        
                            <input class="form-input" 
                            value={email} onChange={e => setEmail(e.target.value)} id="txt-input" type="text" placeholder="@UserName" required/>

                            <br/>

                            

                            <span class="input-item">
                            <i class="fa fa-key"></i>
                            </span>
                            
                            <input class="form-input" 
                            value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" id="pwd" name="password" required/>

                            
                            <span>
                            <i class="fa fa-eye" aria-hidden="true" type="button" id="eye"></i>
                            </span>

                            <br/>
                        
                            <button onClick={signIn} class="log-in"> Log In </button>
                        </div>
                        
                        
                        <div class="other">
                            
                            <button class="btn submits frgt-pass">Forgot Password</button>
                            
                            <button onClick={register} class="btn submits sign-up">Sign Up
                            
                            <i class="fa fa-user-plus" aria-hidden="true"></i>
                            </button>
                        
                        </div>

                        
                    </div>

                
                </form>
            </div>
        
    )
}

export default Login2
