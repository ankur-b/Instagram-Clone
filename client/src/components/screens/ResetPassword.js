import React, { useState, useContext } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import { Context as AuthContext } from "../../Context/AuthContext";
import M from "materialize-css";
const Reset = () => {
  const { ResetPassword } = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const PostData = () => {
    let isValidEmail = true;
    if (email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        M.toast({ html: "Invalid Email" });
        isValidEmail = false;
      }
    }
    if (isValidEmail) {
      ResetPassword({ email, history });
    }
  };
  return (
    <div className="container">
      <div class="row" style={{ marginTop: 100, width: "60%" }}>
        <h2 class="center-align text-darken-2">Reset Password</h2>
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
          <div class="right-align col s3 offset-s1">
            <button
              class="btn waves-effect black waves-light btn-small"
              onClick={() => PostData()}
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
