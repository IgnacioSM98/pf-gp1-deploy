import React from "react";
import "./Notificaciones.css";

export default function Notificaciones() {
  return (
    <form className="form-notificaciones">
      <h1>NOFICICACIONES POR MAIL</h1>
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
    </form>
  );
}
