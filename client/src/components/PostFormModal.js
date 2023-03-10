import OutsideClickHandler from "react-outside-click-handler";
import { useState, useContext } from "react";
import AuthModalContext from "../context/AuthModalContext";
import Input from "./Input";
import TextArea from "./TextArea";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import axios from "axios";
import { Navigate } from "react-router-dom";


const PostFormModal = () => {
  const { postFormModalVisibility, setPostFormModalVisibility } =
    useContext(AuthModalContext);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newPostId, setNewPostId] = useState(null)
  const data = { title, body };


  const createPost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/comments/",
        // "https://redditt-api.onrender.com/comments/",
        data,
        { withCredentials: true }
      );
      setNewPostId(response.data._id)
      console.log(newPostId)
    } catch (error) {
      console.error(error.message)
    }
  };

  if (newPostId) {
    return (<Navigate to={'/comments/' + newPostId} />)
  }

  return (
    <div
      className={
        postFormModalVisibility ? "post-modal-page" : "hide-post-modal-page"
      }
    >
      {/* <OutsideClickHandler */}
      {/* onOutsideClick={() => setPostFormModalVisibility(false)} */}
      {/* > */}
      <div className="post-modal-sub">
        <h3>Create a Post</h3>
        <Input
          required
          placeholder={"Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder={"Text (required)"}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div>
          <ReactMarkdown remarkPlugins={[gfm]} children={""} />
        </div>
        <div className="post-btns">
          <button
            onClick={() => setPostFormModalVisibility(false)}
            className="post-form-btn-close "
          >
            Cancel
          </button>
          <button className="post-form-btn btn" onClick={createPost}>
            POST
          </button>
        </div>
      </div>
      {/* </OutsideClickHandler> */}
    </div>
  );
};

export default PostFormModal;
