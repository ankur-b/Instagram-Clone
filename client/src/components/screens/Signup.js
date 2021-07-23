import React from "react";
import '../../App.css'
import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <div className="container">
      <div class="row" style={{ marginTop: 100, width: "60%" }}>
        <form class="col s12" method="POST">
          <h2 class="center-align text-darken-2">Sign Up</h2>
          <div class="row">
            <div class="input-field col s10 offset-s1">
              <input
                name="name"
                type="text"
                class="validate"
                id="name"
                required
              />
              <label for="name">Name</label>
              <span class="helper-text" data-error="Enter name"></span>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s10 offset-s1">
              <input
                name="email"
                type="text"
                class="validate"
                id="email"
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
                required
              />
              <label for="password">Password</label>
              <span class="helper-text " data-error="Enter Password"></span>
            </div>
          </div>
          <div class="row">
            <div class="col s6 offset-s1">
              Already a member?
              <Link
                to="/login"
                class=" btn-flat"
                style={{ marginLeft: 20, border: "1px solid black" }}
              >
                Login
              </Link>
            </div>
            <div class="right-align col s3 offset-s1">
              <button
                class="btn waves-effect black waves-light btn-small"
                type="submit"
                name="signup"
                id="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
