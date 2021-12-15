import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RestaurantDataService from "../services/restaurant.js";

function AddReview(props) {
  const location = useLocation()
  const [reviewText, setReview] = useState([]);
  const [userName, setUserName] = useState("");
  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };
  const onChangeName = (e) => {
    const name = e.target.value;
    setUserName(name);
  }

  const name = location.state?.restaurant;
  const id = location.state?.id;

  const submitReview = () => {
    console.log("submitting review");
    const data = {
      "restaurant_id": id,
      "text": reviewText,
      "user_id": "5eb3d669b31de5d588f45e8f",
      "name": userName
    };
    RestaurantDataService.createReview(data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log("Review has been submitted : " + JSON.stringify(data))
    setUserName("")
    setReview("")
  }

  return (
    <div className="AddReview">
      <h1>This is Add Review section for {name}</h1>
      <input
        type={"text"}
        className="form-control"
        value={userName}
        placeholder="Name of Reviewer"
        onChange={onChangeName}
      />
      <div className="input-group">
        <textarea
          className="review-field"
          value={reviewText}
          placeholder="Enter your review for this restaurant"
          onChange={onChangeReview}
        />
        <div className="input-group-append">
          <button className="btn" type="button" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </div>
      <Link 
        to={"/restaurants/" + id} 
        className="btn">
        Back to Restaurant Information
      </Link>
    </div>
  );
}

export default AddReview;
