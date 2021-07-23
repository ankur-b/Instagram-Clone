import React from "react";
import './profile.css'
const Profile = () => {
  return (
    <div className="container" style={{maxWidth:600}}>
        <div style={{ display: "flex", justifyContent: "space-around",margin:"18px 0",borderBottom:'1px solid black'}}>
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
            <h4>Ankur Barve</h4>
            <div style={{display:'flex',justifyContent:'space-between',width:'108%'}}>
                <h6>40 posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
            </div>
          </div>
        </div>
        <div className="gallery">
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        <img className="item" src="https://github.com/ankur-b.png" alt="post"/>
        </div>
    </div>
  );
};

export default Profile;
