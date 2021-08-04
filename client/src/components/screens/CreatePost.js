import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url,setUrl] = useState("");
  useEffect(()=>{
    if(url){
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          body,
          pic:url
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            M.toast({ html: data.error });
          } else {
            M.toast({ html: 'Post Created Successfully'});
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  },[url])
  const postDetails = () => {
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
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>console.log(err))
  };
  return (
    <div
      className="container"
      style={{
        margin: "100px auto",
        maxWidth: 550,
        textAlign: "center",
      }}
    >
      <div className="card input-filed" style={{ padding: "20px" }}>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="file-field input-field">
          <div class="btn waves-effect black waves-light btn-small">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button class="btn waves-effect black waves-light btn-small" onClick={()=>postDetails()}>
          Submit Post
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
