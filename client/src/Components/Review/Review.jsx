import React from "react";
import "./Review.css";
import StarRating from "../Stars/Stars";

export default function Review({ puntaje, comentario }) {
  return (
    <div className="container-review">
      <StarRating />
      <div className="puntaje-review">
        <h3>{puntaje}</h3>
      </div>

      <div className="comentario-review">
        <p>{comentario}</p>
      </div>
    </div>
  );
}
