import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../Context/AuthContext";
import "./profile.css";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const { state, dispatch ,UpdatePic} = useContext(AuthContext);
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
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
        console.log(data)
        UpdatePic({url})
      })
      .catch((err) => console.log(err));
  }, [image,url]);
  const updatePhoto = (file) => {
    setImage(file);
  };
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src={state.user ? state.user.pic : ""}
            style={{
              width: 160,
              height: 160,
              border: "1px solid black",
              borderRadius: 80,
            }}
            alt="Profile pic"
          />
          <div class="row">
            <div
              className="file-field input-field"
              style={{ marginTop: 20, width: "80%", height: 0 }}
            >
              <div class="btn waves-effect black waves-light btn-small">
                <span>Upload Profile Picture</span>
                <input
                  type="file"
                  onChange={(e) => updatePhoto(e.target.files[0])}
                />
              </div>
              <div className="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>{state.user ? state.user.name : ""}</h4>
          <h6>{state.user ? state.user.email : ""}</h6>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "108%",
            }}
          >
            <h6>{mypics ? mypics.length : 0} posts</h6>
            <h6>{state.user ? state.user.followers.length : 0} followers</h6>
            <h6>{state.user ? state.user.following.length : 0} following</h6>
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics === [] ? (
          <div>hh</div>
        ) : (
          mypics.map((item) => {
            return (
              <img
                key={item._id}
                className="item"
                src={item.photo}
                alt={item.title}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Profile;
