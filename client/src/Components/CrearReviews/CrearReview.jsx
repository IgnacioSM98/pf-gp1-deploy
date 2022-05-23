import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postReviews } from "../../Redux/actions";
import Stars from "../Stars/Stars";
import styled from "styled-components";

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  width: 420px;
  height: 340px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Titulo = styled.p`
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0px;
`;

const Coment = styled.textarea`
  margin: 1em 0em;
  padding: 0.8em 0.8em;
  text-align: justify;
  border-radius: 10px;
  border: 2px solid black;
`;
const Boton = styled.button`
  color: ${(props) => (props.color ? props.color : "white")};
  font-weight: bold;
  background-color: ${(props) => (props.backcolor ? props.backcolor : "black")};
  border: none;
  border-radius: 8px;
  margin: 5px;
  height: 40px;
  width: 100px;
  padding: 2%;
  cursor: pointer;
`;

export default function CrearReview({ state, id, setFormReview }) {
  let dispatch = useDispatch();
  let [input, setInput] = useState({
    puntaje: "",
    comentario: "",
  });

  let handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReviews(id, input));
    alert("opinion enviada");
    setFormReview(!state);
  };

  return (
    <>
      {state && (
        <ModalBack>
          <Modal>
            <Titulo>Opina sobre este producto</Titulo>
            <Formulario onSubmit={handleSubmit}>
              <Stars inputs={input} setInputs={setInput}></Stars>

              <Coment
                name="comentario"
                onChange={handleInputChange}
                value={input.comentario}
                cols="30"
                rows="10"
              ></Coment>
              <Boton type="submit">Enviar</Boton>
            </Formulario>
          </Modal>
        </ModalBack>
      )}
    </>
  );
}
