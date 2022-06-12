import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import StarRatings from "react-star-ratings";

const Comments = ({handleComment, comment, setComment, message, commentsList, stars, setStars}) => {
  return (
    <div className="single__product-comments">
    <h1>Comments</h1>
    <form method="get" onSubmit={handleComment}>
      <div className="single__product-new-comment">
        <textarea
          placeholder={commentsList.length === 0 ? "Be the first to comment..." : "Enter your comment..."}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <ReactStars
          count={5}
          value={stars}
          onChange={(e) => setStars(e)}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <button>Send</button>
      <div>
    {message && message} {message === "You have to login to comment." && <Link to="/login">Login</Link>}
      </div>
    </form>
    {commentsList &&
      commentsList.length > 0 &&
      commentsList.map((comment) => (
        <div
          key={comment.user}
          className="single__product-comments-list"
        >
          <div className="single__product-comment">
            <span>{comment.comment}</span>
            <StarRatings
              rating={comment.commentStars}
              starDimension="18px"
              starSpacing="3px"
              starRatedColor="yellow"
              starEmptyColor="#fff"
            />
          </div>
          <div className="single__product-comment-footer">
            <div>{comment.name}</div>
            <div>{comment.createdAt}</div>
          </div>
        </div>
      ))}
  </div>
)
}

export default Comments