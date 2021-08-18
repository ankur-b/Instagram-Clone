import React, { useState,useContext} from "react";
import "../../App.css";
import { Link, useHistory,useParams } from "react-router-dom";
import M from "materialize-css";
const Newpassword = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const {token} = useParams()
  console.log(token)
  const PostData = () => {
    fetch("/new-password", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          token:token
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: data.message });
            history.push("/login");
          }
        })
        .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <div class="row" style={{ marginTop: 100, width: "60%" }}>
          <h2 class="center-align text-darken-2">Update Password</h2>
          <div class="row">
            <div class="input-field col s10 offset-s1">
              <input
                name="password"
                type="password"
                placeholder="Enter a new password"
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
            <div class="right-align col s3 offset-s1">
              <button
                class="btn waves-effect black waves-light btn-small"
                style={{width:180}}
                onClick={()=>PostData()}
              >
                  Update Password
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Newpassword;
