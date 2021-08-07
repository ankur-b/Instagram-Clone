import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import "./profile.css";
const Profile = () => {
  const [UserProfile, setProfile] = useState(null);
  const { state, dispatch } = useContext(AuthContext);
  const { userid } = useParams();
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "dbsjj");
        setProfile(result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {console.log(UserProfile)}
      {!UserProfile ? (
          <h2 className="container">Loading</h2>
      
      ) : (
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
              <h4>{UserProfile.user.name}</h4>
              <h5>{UserProfile.user.email}</h5>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{UserProfile.posts.length}</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {UserProfile.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="item"
                  src={item.photo}
                  alt={item.title}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
