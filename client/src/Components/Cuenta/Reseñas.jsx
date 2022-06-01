import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviews, getUsuarios } from "../../Redux/actions";
//import "./Reseñas.css";
import Stars from "../Stars/Stars";

export default function Reseñas() {
  const user = useSelector((state) => state.userInfo);
  const mail = user.email;
  const [usuario, setUsuario] = useState();
  const usuarios = useSelector((state) => state.usuarios);
  const reseñas = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, []);

  useEffect(() => {
    setUsuario(usuarios?.find((u) => u.mail === mail));
  }, [usuarios]);

  useEffect(() => {
    if (usuario) {
      dispatch(getReviews(usuario.id));
    }
  }, [usuario]);

  return (
    <div>
      {console.log(reseñas)}
      {/* {reseñas?.map((review) => {
        <div key={review.id}>
          <Stars rating={review.puntaje} />
          <h3>{review.titulo}</h3>
          <p>{review.comentario}</p>
        </div>;
      })} */}
    </div>
  );
}
