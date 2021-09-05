import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import './function.js'

function Login() {

   
   

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
      <div class="materialContainer">

   <div class="box">

      <div class="title">LOGIN</div>

      <div class="input">
         <label for="name">E-mail</label>
         <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="name" id="name"/>
         <span class="spin"></span>
      </div>

      <div class="input">
         <label for="pass">Password</label>
         <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="pass" id="pass"/>
         <span class="spin"></span>
      </div>

      <div class="button login">
         <button onClick={signIn} ><span>LOGIN</span> <i class="fa fa-check"></i></button>
      </div>

      <a href="" class="pass-forgot">Forgot your password?</a>

   </div>

   <div class="overbox">
      <div class="material-button alt-2"><span class="shape"></span></div>

      <div class="title">REGISTER</div>

      <div class="input">
         <label for="regname">Username</label>
         <input type="text" value={email} onChange={e => setEmail(e.target.value)} name="regname" id="regname"/>
         <span class="spin"></span>
      </div>

      <div class="input">
         <label for="regpass">Password</label>
         <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="regpass" id="regpass"/>
         <span class="spin"></span>
      </div>

      

      <div class="button">
         <button onClick={register}><span>Sign Up</span></button>
      </div>

   </div>

</div>
    )
}

export default Login

