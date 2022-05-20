import React from "react";
import "./producto.css";

function Producto({ imagen, nombre, precio, descripcion }) {
  return (
    <div className="container-producto">
      <div className="container-foto">
        <img src={imagen} className="foto" />
      </div>

      <div className="nombre">
        <p>{nombre}</p>
      </div>

      <div className="descripcion">
        <p>{descripcion}</p>
      </div>

      <div className="precio-boton">
        <p className="precio">${precio}</p>

        <button className="boton-agregar">AGREGAR</button>
      </div>
    </div>
  );
}

export default Producto;
