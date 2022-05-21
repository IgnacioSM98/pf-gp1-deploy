import React from "react";
import { useSelector } from "react-redux";
import Review from "../Review/Review.jsx";
import "./Reviews.css";

export default function Producto() {
  const reviews = useSelector((state) => state.reviews);
  return (
    <div className="div-reviews">
      {reviews?.map((review) => {
        return (
          <Review
            className="box-review"
            key={review.id}
            id={review.id}
            puntaje={review.puntaje}
            comentario={review.comentario}
          />
        );
      })}
    </div>
  );
}
