import React, { useState, useEffect } from "react";
import "./home.css";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);
  return (
    <div className="home container">
      {data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5>{item.postedBy.name}</h5>
            <div className="card-image">
              <img
                src={item.photo}
                alt="Wallpaper"
              />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type="text" placeholder="add a comment" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
