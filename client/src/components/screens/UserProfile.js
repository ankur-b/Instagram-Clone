import React, { useState, useEffect, useContext } from "react";
import { Context as AuthContext } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import "./profile.css";
const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();
  const { state, Follow, unFollow } = useContext(AuthContext);
  const [showFollow, setShowFollow] = useState(state.user?!state.user.following.includes(userid):true);
  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const followUser = async () => {
    try {
      await Follow({ userid });
      setShowFollow(false)
      setProfile((prevState) => {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: [...prevState.user.followers, state.user._id],
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  const unfollowUser = async () => {
    try {
      await unFollow({ userid });
      setShowFollow(true)
      setProfile((prevState) => {
        const newFollower = prevState.user.followers.filter(item=>item!==state.user._id)
        return {
          ...prevState,
          user: {
            ...prevState.user,
            followers: newFollower
          },
        };
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {console.log(userProfile)}
      {!userProfile ? (
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
              <h4>{userProfile.user.name}</h4>
              <h6>{userProfile.user.email}</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "108%",
                }}
              >
                <h6>{userProfile.posts.length} posts</h6>
                <h6>
                  {userProfile.user.followers
                    ? userProfile.user.followers.length
                    : 0}{" "}
                  followers
                </h6>
                <h6>
                  {userProfile.user.following
                    ? userProfile.user.following.length
                    : 0}{" "}
                  following
                </h6>
              </div>
              {showFollow ? (
                <button
                  class="btn waves-effect black waves-light btn-small"
                  style={{margin:10}}
                  onClick={() => {
                    followUser();
                  }}
                >
                  Follow
                </button>
              ) : (
                <button
                  class="btn waves-effect black waves-light btn-small"
                  style={{margin:10}}
                  onClick={() => {
                    unfollowUser();
                  }}
                >
                  UnFollow
                </button>
              )}
            </div>
          </div>
          <div className="gallery">
            {userProfile.posts.map((item) => {
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
