import React, { useState } from "react";

export default function Star({ readOnly = false }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const totalStars = 5; // Assuming a total of 5 stars

  const handleRatingChange = (currentRating) => {
    if (!readOnly) {
      setRating(currentRating);
    }
  };

  return (
    <div className="Star">
      <h1>Star rating</h1>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={currentRating}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleRatingChange(currentRating)}
              disabled={readOnly}
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
      {rating !== null && (
        <p>
          Your rating is: 
          {[...Array(rating)].map((_, index) => (
            <span key={index} className="star" style={{ color: "#ffc107" }}>
              &#9733;
            </span>
          ))}
        </p>
      )}
    </div>
  );
}
