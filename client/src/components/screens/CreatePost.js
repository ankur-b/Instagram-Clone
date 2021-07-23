import React from "react";
const CreatePost = () => {
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
        <input type="text" placeholder="title" />
        <input type="text" placeholder="body" />
        <div className="file-field input-field">
          <div class="btn waves-effect black waves-light btn-small">
            <span >Upload Image</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input class="file-path validate" type="text" />
          </div>
        </div>
        <button
            class="btn waves-effect black waves-light btn-small"
            type="submit"
            name="signup"
            id="submit"
          >
            Submit Post
          </button>
      </div>
    </div>
  );
};
export default CreatePost;
