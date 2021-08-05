import React, { useState,useContext} from "react";
import "../../App.css";
import {UserContext} from '../../App'
import { Link, useHistory } from "react-router-dom";
import {Context as AuthContext} from '../../Context/AuthContext';
import M from "materialize-css";
const Login = () => {
  const {state,Signin} = useContext(AuthContext)
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const PostData = () => {
    let isValidEmail = true;
    if(email){
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        M.toast({ html: "Invalid Email" });
        isValidEmail = false;
      }
    }
    if (isValidEmail) {
      Signin({email,password,history})
    }
  };
  return (
    <div className="container">
      <div class="row" style={{ marginTop: 100, width: "60%" }}>
          <h2 class="center-align text-darken-2">Login</h2>
          <div class="row">
            <div class="input-field col s10 offset-s1">
              <input
                name="email"
                type="text"
                class="validate"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              <label for="email">E-Mail</label>
              <span class="helper-text" data-error="Enter Email"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s10 offset-s1">
              <input
                name="password"
                type="password"
                class="validate"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <label for="password">Password</label>
              <span class="helper-text " data-error="Enter Password"></span>
            </div>
          </div>
          <div class="row">
            <div class="col s6 offset-s1">
              Not a member?
              <Link
                to="/signup"
                class=" btn-flat"
                style={{ marginLeft: 20, border: "1px solid black" }}
              >
                Sign Up
              </Link>
            </div>
            <div class="right-align col s3 offset-s1">
              <button
                class="btn waves-effect black waves-light btn-small"
                onClick={()=>PostData()}
              >
                Login
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
