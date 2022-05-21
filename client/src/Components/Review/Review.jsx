import React from "react";
import "./Review.css";

export default function Review({ puntaje, comentario }) {
  return (
    <div className="container-review">
      <div className="puntaje-review">
        <h3>{puntaje}</h3>
      </div>

      <div className="comentario-review">
        <p>{comentario}</p>
      </div>
    </div>
  );
}
