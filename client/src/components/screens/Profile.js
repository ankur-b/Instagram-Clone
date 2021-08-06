import React, { useState, useEffect,useContext } from "react";
import {Context as AuthContext} from '../../Context/AuthContext'
import "./profile.css";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const {state,dispatch} = useContext(AuthContext)
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);
  return (
    <div className="container" style={{ maxWidth: 600 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "18px 0",
          borderBottom: "1px solid black",
        }}
      >
        <div>
          <img
            src="https://github.com/ankur-b.png"
            style={{
              width: 160,
              height: 160,
              border: "1px solid black",
              borderRadius: 80,
            }}
            alt="Profile pic"
          />
        </div>
        <div>
          {console.log(state)}
          <h4>{state.user?state.user.name:""}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>40 posts</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics===[]?<div>hh</div>:mypics.map((item) => {
          return <img key={item._id} className="item" src={item.photo} alt={item.title} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
