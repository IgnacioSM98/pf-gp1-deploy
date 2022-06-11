import React, { useState } from "react";
import "./Notificaciones.css";
import styled from "styled-components";

const Boton = styled.button`
  position: absolute;
  margin-top: 15px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  @media screen and (max-width: 450px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 380px) {
    width: 17px;
    height: 17px;
  }
`;

export default function Notificaciones() {
  const [show, setShow] = useState(true);

  function handleClick() {
    setShow((current) => !current);
  }

  return (
    <form
      className="form-notificaciones"
      style={{ display: show ? "absolute" : "none" }}
    >
      <Boton onClick={handleClick}>X</Boton>
      <div>
        <p>NOFICICACIONES POR MAIL</p>
      </div>
      <div className="contenedor-divs">
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
      </div>
    </form>
  );
}
