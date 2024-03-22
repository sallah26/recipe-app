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

  return (
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
