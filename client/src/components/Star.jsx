import React, { useState } from 'react';

const Star = ({ onRate }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5;

  // Function to handle rating change
  const handleRatingChange = (currentRating) => {
    setRating(currentRating);
    // Call the prop function to send rating data to the parent component
    onRate(currentRating);
  };

  return (
    <div className="">
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleRatingChange(currentRating)}
            />
            <span
              className="star"
              style={{
                color:
                  currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
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
  );
};

export default Star;
