import styled from "styled-components";
import { useSelector } from "react-redux";
import { useCallback, useRef, useState } from "react";
import "./reseñas.css";
import { Stars } from "../index";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  padding-top: 40px;

  height: 100%;
  width: 100%;
  z-index: 2;

  background-color: #80808085;

  overflow: hidden;
`;

const Popup = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 80%;
  width: 700px;
  background-color: white;

  border-radius: 5px;
`;

const Cerrar = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;

  height: 25px;
  width: 25px;

  border: none;
  background-color: black;
  color: white;
  border-radius: 5px;

  cursor: pointer;
`;

const Titulo = styled.span`
  height: 20px;

  font-weight: 600;
  border-radius: 5px;
  margin-top: 20px;
`;

const TodasLasReseñas = styled.div`
  position: absolute;
  bottom: 0;
  height: 60%;
  width: 100%;

  // background-color: red;

  overflow-y: scroll;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-evenly;

  // align-items: center;
  text-align: start;

  padding: 0px 20px;
  margin: 0px 2% 20px;

  height: 140px;
  width: 96%;
  background-color: #80808038;
  border-radius: 5px;
`;

const TituloReview = styled.span`
  height: 22px;

  font-size: 16px;
  font-weight: 500;

  width: 100%;
`;

const ComentarioReview = styled.span`
  height: 60px;

  font-size: 15px;
  font-weight: 400;

  width: 100%;
`;

const Calificacion = styled.span`
  height: 60px;
  width: 100%;
`;

const Botones = styled.div`
  display: flex;

  position: absolute;
  bottom: 62%;

  width: 100%;
  justify-content: space-evenly;
  // background-color: green;
`;

const Boton = styled.button`
  font-size: 16px;
  font-weight: 700;
  width: 30%;
  height: 45px;

  // border: none;
  padding: 10px 20px;

  cursor: pointer;
  background-color: transparent;

  &: hover {
    color: #37563de0;
    // border-bottom: 2.5px solid #37563de0;
  }

  &: active {
    background-color: #0446041f;
    border-radius: 5px;
  }
`;

export default function Reseñas({ id, setReseñas }) {
  const producto = useSelector((state) => state.detalle);
  const reviews = useSelector((state) => state.reviews);
  const [reviewsFiltradas, setReviews] = useState(reviews);
  const [selected, setSelected] = useState("todas");
  const [cantidad, setCantidad] = useState(2);
  const observer = useRef();

  const ultimaReseña = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCantidad(cantidad + 2);
        }
      });

      if (node) observer.current.observe(node);
    },
    [cantidad]
  );

  const reseñasFiltro = (e) => {
    if (e.target.name) {
      setReviews(
        reviews.filter((review) =>
          e.target.name === "positivas"
            ? review.puntaje >= 3
            : review.puntaje < 3
        )
      );
    } else {
      setReviews(reviews);
    }
  };

  return (
    <Container
      onClick={() => {
        setReseñas(false);
      }}
    >
      <Popup onClick={(e) => e.stopPropagation()}>
        <Cerrar
          onClick={() => {
            setReseñas(false);
          }}
        >
          X
        </Cerrar>
        <Titulo>{`Reseñas sobre ${producto.nombre}`}</Titulo>

        <Botones>
          <Boton
            className={"todas" === selected ? "active" : "inactive"}
            onClick={(e) => {
              setSelected("todas");
              reseñasFiltro(e);
            }}
          >
            Todas
          </Boton>
          <Boton
            className={"positivas" === selected ? "active" : "inactive"}
            name="positivas"
            onClick={(e) => {
              setSelected("positivas");
              reseñasFiltro(e);
            }}
          >
            Positivas
          </Boton>
          <Boton
            className={"negativas" === selected ? "active" : "inactive"}
            name="negativas"
            onClick={(e) => {
              setSelected("negativas");
              reseñasFiltro(e);
            }}
          >
            Negativas
          </Boton>
        </Botones>
        <TodasLasReseñas>
          {reviewsFiltradas.slice(0, cantidad).map((review, index) => {
            return cantidad === index + 1 ? (
              <Review ref={ultimaReseña} key={review.id}>
                <Stars rating={review.puntaje} />

                <TituloReview>{review.titulo}</TituloReview>
                <ComentarioReview>{review.comentario}</ComentarioReview>
              </Review>
            ) : (
              <Review key={review.id}>
                <Stars rating={review.puntaje} />
                <TituloReview>{review.titulo}</TituloReview>
                <ComentarioReview>{review.comentario}</ComentarioReview>
              </Review>
            );
          })}
        </TodasLasReseñas>
      </Popup>
    </Container>
  );
}
