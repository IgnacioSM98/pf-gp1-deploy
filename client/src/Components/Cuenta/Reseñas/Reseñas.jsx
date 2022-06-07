import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews } from "../../../Redux/actions";
import Stars from "../../Stars/Stars";

export default function Reseñas() {
  const user = useSelector((state) => state.userInfo);
  const id = user.uid;
  const reseñas = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviews(id));
  }, [dispatch, id]);

  useEffect(() => {}, [reseñas]);

  return (
    <div>
      {
        // eslint-disable-next-line
        reseñas?.map((review) => {
          <div key={review.id}>
            <Stars rating={review.puntaje} />
            <h3>{review.titulo}</h3>
            <p>{review.comentario}</p>
          </div>;
        })
      }
    </div>
  );
}
