import React from "react";
import "./producto.css";

function Producto({ imagen, nombre, precio }) {
  return (
    <div className="container-producto">
      <div>
        <img src={imagen} />
      </div>

      <div>
        <p>{nombre}</p>
      </div>

      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo non
          obcaecati porro sint quis quas id quisquam, consequatur animi dolores
          repudiandae ipsa nam, maiores vitae nulla ad consequuntur iusto
          officiis!
        </p>
      </div>

      <div>
        <p>{precio}</p>

        <button className="boton-agregar">AGREGAR</button>
      </div>
    </div>
  );
}

export default Producto;
