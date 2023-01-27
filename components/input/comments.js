import { useEffect, useState, useContext } from "react";
import NotificationContext from "@/store/notification-context";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const notifCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/events/${eventId}/comments`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notifCtx.showNotification({
      title: "Adding...",
      message: "Adding new comment.",
      status: "pending",
    });
    fetch(`/api/events/${eventId}/comments`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notifCtx.showNotification({
          title: "Success!",
          message: "Successfully added comment!",
          status: "success",
        });
      })
      .catch((error) => {
        notifCtx.showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}

      {showComments && (comments.length === 0 ? (
        <p className="center">loading comments...</p>
      ) : (
        <CommentList items={comments} />
      ))}
    </section>
  );
}

export default Comments;
