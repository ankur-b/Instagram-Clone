import React, { useState, useContext,useEffect } from "react";
import "../../App.css";
import { Link, useHistory } from "react-router-dom";
import M from "materialize-css";
import { Context as AuthContext } from "../../Context/AuthContext";
//import Api from '../../Api/Api'
const Signup = () => {
  const history = useHistory();
  const { state, Signup } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  useEffect(()=>{
    if(url){
      uploadFields()
    }
  },[url])
  const uploadProfilePicture = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "instaaclone");
    fetch(
      "https://api.cloudinary.com/v1_1/instaaclone/image/upload",
      {
        method: "post",
        body: data,
      },
      {}
    )
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  };
  const uploadFields = ()=>{
    let isValidEmail = true;
    if (email) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        M.toast({ html: "Invalid Email" });
        isValidEmail = false;
      }
    }
    if (isValidEmail) {
      Signup({ name, email, password, history,url });
    }
  }
  const PostData = async () => {
    if(image){
      uploadProfilePicture()
    }else{
      uploadFields()
    }
  };
  return (
    <div className="container">
      <div class="row" style={{ marginTop: 100, width: "60%" }}>
        <h2 class="center-align text-darken-2">Sign Up</h2>
        <div class="row">
          <div class="input-field col s10 offset-s1">
            <input
              name="name"
              type="text"
              class="validate"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label for="password">Password</label>
            <span class="helper-text " data-error="Enter Password"></span>
          </div>
        </div>
        <div class="row" style={{ width: "80%" }}>
          <div className="file-field input-field">
            <div class="btn waves-effect black waves-light btn-small">
              <span>Upload Profile Picture</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
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
              onClick={() => PostData()}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
