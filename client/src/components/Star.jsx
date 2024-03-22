import React, { useState, useEffect } from 'react';

const Star = ({ onRate, val }) => {
  const [rating, setRating] = useState(val); // Use val as the initial rating
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  // Update rating when val changes
  useEffect(() => {
    setRating(val);
  }, [val]);

  // Function to handle rating change
  const handleRatingChange = (currentRating) => {
    setRating(currentRating);
    // Call the prop function to send rating data to the parent component
    onRate(currentRating);
  };
  console.log("val : " + val);
  console.log("rating : " + rating);
  return (
  rating ?  (

    <div className="">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleRatingChange(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#FFAF45" : "#C7A8CC",
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>

    )  : (
    <div className="">
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <span
            key={index}
            className="rate-star"
            style={{ color: currentRating <= val ? "#FFAF45" : "#C7A8CC" }}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  ))
};

export default Star;
