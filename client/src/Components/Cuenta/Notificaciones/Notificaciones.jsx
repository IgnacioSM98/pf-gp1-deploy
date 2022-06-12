import React, { useState } from "react";
import "./Notificaciones.css";
import styled from "styled-components";

const Boton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  @media screen and (min-width: 560px) {
    display: none;
  }
  @media screen and (max-width: 450px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 380px) {
    width: 17px;
    height: 17px;
  }
`;

const Form = styled.form`
  margin-top: 20px;
  min-height: 100vh;
  display: flex;
  position: relative;
  flex-direction: column;
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
    }
    p {
      font-weight: 300;
      font-size: 20px;
    }
  }
  @media screen and (max-width: 300px) {
      width: 100vw;
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

export default function Notificaciones() {
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow((current) => !current);
  }

  return (
    <Form style={{ display: show ? "absolute" : "none" }}>
      <Boton onClick={handleClick}>X</Boton>

      <div>
        <P>NOFICICACIONES POR MAIL</P>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">Compras confirmadas</label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">
          Cambio de Estado del Pedido
        </label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">Productos nuevos</label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>

      <div className="grupo-notificaciones">
        <label className="label-notificaciones">Te Extrañamos</label>
        <input className="input-notificaciones" type="checkbox"></input>
      </div>
    </Form>
  );
}
