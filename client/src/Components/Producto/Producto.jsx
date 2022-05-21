import React from "react";
import "./producto.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkProduct = styled(Link)`
  text-decoration: none;
  width: 240px;
`;

function Producto({ id, imagen, nombre, precio, descripcion }) {
  return (
    <LinkProduct to={`/productos/${id}`}>
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
    </LinkProduct>
  );
}

export default Producto;
