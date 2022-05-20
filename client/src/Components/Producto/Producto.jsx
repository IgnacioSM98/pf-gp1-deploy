import React from "react";
import "./producto.css";

function Producto({ imagen, nombre, precio, descripcion }) {
  return (
    <div className="container-producto">
      <div>
        <img className="img-producto" src={imagen} />
      </div>

      <div>
        <p>{nombre}</p>
      </div>

      <div>
        <p>{descripcion}</p>
      </div>

      <div>
        <p>{precio}</p>

        <button className="boton-agregar">AGREGAR</button>
      </div>
    </div>
  );
}

export default Producto;
