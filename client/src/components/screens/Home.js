import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../Context/AuthContext";
import {Link} from 'react-router-dom'
import "./home.css";
const Home = () => {
  const { state } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/posts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      });
  }, []);
  console.log(localStorage.getItem("token"))
  console.log(localStorage.getItem("user"))
  const likepost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };
  const unlikepost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };
  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };
  const deletepost = (postId) => {
    fetch(`/deletepost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };
  const deletecomment = (commentId, postId) => {
    fetch(`/deletecomment/${postId}/${commentId}`, {
      method: "put",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newdata = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newdata);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="home container">
      {data?data.map((item) => {
        return (
          <div className="card home-card" key={item._id}>
            <h5 style={{padding: 10}}>
              <Link to={(item.postedBy._id !== state.user._id)?"/profile/"+item.postedBy._id:"/profile"}>{item.postedBy.name}</Link>
              {item.postedBy._id === state.user._id ? (
                <i
                  className="material-icons"
                  style={{ float: "right" }}
                  onClick={() => {
                    deletepost(item._id);
                  }}
                >
                  delete
                </i>
              ) : (
                ""
              )}
            </h5>
            <div className="card-image">
              <img src={item.photo} alt="Wallpaper" />
            </div>
            <div className="card-content">
              <i className="material-icons" style={{ color: "red" }}>
                favorite
              </i>
              {item.likes.includes(state.user._id) ? (
                <i
                  className="material-icons"
                  onClick={() => {
                    unlikepost(item._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  onClick={() => {
                    likepost(item._id);
                  }}
                >
                  thumb_up
                </i>
              )}
              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map((record) => {
                return (
                  <h6 key={record._id}>
                    <span style={{ fontWeight: "500" }}>
                      {record.postedBy.name}
                    </span>{" "}
                    {record.text}
                    {record.postedBy._id === state.user._id ||
                    state.user._id === item.postedBy._id ? (
                      <i
                        className="material-icons"
                        style={{ float: "right" }}
                        onClick={() => {
                          deletecomment(record._id, item._id);
                        }}
                      >
                        delete
                      </i>
                    ) : (
                      ""
                    )}
                  </h6>
                );
              })}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  makeComment(e.target[0].value, item._id);
                }}
              >
                <input type="text" placeholder="add a comment" />
              </form>
            </div>
          </div>
        );
      }):""}
    </div>
  );
};

export default Home;
