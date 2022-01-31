import React, { useState, useContext, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { DataContext } from "../../Context/DataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiURL from "../../Api";

function OrderItemCard({ ele }) {
  let navigate = useNavigate();
  const [
    homeData,
    user,
    setUser,
    userData,
    setUserData,
    cartData,
    setCartData,
    renderAgain,
    setRenderAgain,
  ] = useContext(DataContext);

  const [writeReview, setWriteReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);

  useEffect(async () => {
    await axios
      .get(`${apiURL}/catalog/${ele.catalog}/${ele.id}`)
      .then((res) => {
        let comments = res.data[0].comments;
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].mail === user) {
            setRatingValue(comments[i].rating);
            setAlreadyReviewed(true);
          } else {
            setAlreadyReviewed(false);
          }
        }
      });
  }, []);

  const navigateToItem = () => {
    navigate(`/catalog/${ele.catalog}/${ele.id}`);
  };

  let comment;
  const handleRating = (rate) => {
    let value;
    switch (rate) {
      case 10:
        value = 0.5;
        break;
      case 20:
        value = 1;
        break;
      case 30:
        value = 1.5;
        break;
      case 40:
        value = 2;
        break;
      case 50:
        value = 2.5;
        break;
      case 60:
        value = 3;
        break;
      case 70:
        value = 3.5;
        break;
      case 80:
        value = 4;
        break;
      case 90:
        value = 4.5;
        break;
      case 100:
        value = 5;
        break;
    }
    setRatingValue(value);
  };

  const updateComment = (e) => {
    comment = e.target.value;
  };
  const handleReview = () => {
    setWriteReview(!writeReview);
  };

  const submitReview = async () => {
    if (ratingValue === 0 || comment === undefined || comment === "") {
      alert("Rating or comment can't be empty");
    } else {
      let obj = {
        name: userData[0].username,
        mail: user,
        rating: ratingValue,
        Comment: comment,
      };
      await axios.put(`${apiURL}/catalog/${ele.catalog}/${ele.id}`, obj);
      setAlreadyReviewed(true);
      setWriteReview(false);
    }
  };
  return (
    <div>
      <div className="items__Card">
        <div>{ele.count}X</div>
        <div
          onClick={navigateToItem}
          style={{
            backgroundImage: `url(${ele.img})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "15rem",
            height: "15rem",
            cursor: "pointer",
          }}
        ></div>
        <div onClick={navigateToItem} style={{ cursor: "pointer" }}>
          <p>{ele.name}</p>
        </div>
        <div>
          <p>₹{ele.reducedPrice}</p>
        </div>
      </div>

      <div className="order__Review">
        {alreadyReviewed ? (
          <div className="your__Rating">
            <h1>
              You Rated : <span className="rated">{ratingValue}</span>
            </h1>
          </div>
        ) : (
          <>
            <p onClick={handleReview}>{writeReview ? "" : "Write Review"}</p>
            <div className={writeReview ? "write__Review" : "hide"}>
              <div>
                <h1>Review</h1>
              </div>
              <div className="stars">
                <Rating onClick={handleRating} allowHalfIcon size="35" />
              </div>
              <div className="comment">
                <input
                  type="text"
                  onChange={updateComment}
                  placeholder="write comment"
                />
              </div>
              <div className="buttons">
                <button onClick={submitReview}>Submit</button>
                <button onClick={handleReview}>Cancel</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderItemCard;
