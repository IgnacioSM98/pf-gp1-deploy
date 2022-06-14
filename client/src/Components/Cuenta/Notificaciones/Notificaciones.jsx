import React, { useState } from "react";
import "./Notificaciones.css";
import styled from "styled-components";

const Boton = styled.button`
  position: absolute;
  top: 0;

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 15px;
  width: 25px;
  height: 25px;
  background: #599b79;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  @media screen and (min-width: 560px) {
    display: none;
  }
`;

const Form = styled.form`
  margin-left: 20px;
  height: 85vh;
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.8);

  @media screen and (max-width: 1100px) {
      width: 50%;
  }
    p {
      font-weight: 600;
      font-size: 30px;
    }
  }
  
  @media screen and (max-width: 600px) {
      width: 60%;
    }
    p {
      font-weight: 400;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 560px) {
      width: 100vw;
      margin-left: 0px;
    }
    p {
      font-weight: 300;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 300px) {
      width: 100vh;
  }
    p {
      font-weight: 300;
      font-size: 15px;
    }
  }
`;

const P = styled.p`
  margin: 15px 10px 10px 10px;
  @media screen and (max-width: 1100px) {
    font-weight: 600;
    font-size: 30px;
  }

  @media screen and (max-width: 600px) {
    font-weight: 400;
    font-size: 20px;
  }
  @media screen and (max-width: 560px) {
    font-weight: 300;
    font-size: 20px;
  }
  @media screen and (max-width: 300px) {
    font-weight: 300;
    font-size: 15px;
  }
`;

const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
`;

export default function Notificaciones({ setComponente }) {
  const [show, setShow] = useState(true);

  function handleClick(e) {
    e.preventDefault();
    setShow((current) => !current);

    setComponente("");
  }

  return (
    <Form style={{ display: show ? "absolute" : "none" }}>
      <H1>Configuracion de Notificaciones</H1>
      <Boton onClick={(e) => handleClick(e)}>X</Boton>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">Compras confirmadas</label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">
          Cambio de estado de los pedidos
        </label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">Productos nuevos</label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">
          Mensajes de cuando extrañamos
        </label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>
    </Form>
  );
}
