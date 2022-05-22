import React, { useState } from "react";
import "./producto.css";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { agregarCarrito } from "../../Redux/actions";

const LinkProduct = styled(Link)`
  text-decoration: none;
  width: 240px;
`;
 
const Button = styled.button`
  height: 30px;
`;

export default function Producto({ id, imagen, nombre, precio, descripcion, producto, stock }) {
  const dispatch = useDispatch();
  const [showOptions, setOptions] = useState(false);
  
  function agregarAlCarrito(e) {
   e.preventDefault();
   if (stock > 1) {
     dispatch(agregarCarrito(id));
   }
  }
  
  return (
    <LinkProduct to={`/productos/${id}`}>
      <div className="container-producto">
        <div className="container-foto">
          <img src={imagen} className="foto" />
        </div>

        <button
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            width: "30px",
            height: "30px",
            borderRadius: "50px",
            border: "none",
            zIndex: "2",
          }}
          onClick={(e) => {
            e.preventDefault();
            setOptions(!showOptions);
          }}
        >
          ...
        </button>

        {showOptions ? (
          <div
            style={{
              position: "absolute",
              top: "3px",
              left: "1%",
              right: "1%",
              width: "98%",
              height: "130px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "grey",
              zIndex: "1",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.preventDefault()}
          >
            <Button style={{ marginTop: "35px" }}>Boton 1</Button>
            <Button>Boton 2</Button>
            <Button>Boton 3</Button>
          </div>
        ) : null}

        <div className="nombre">
          <p>{nombre}</p>
        </div>

        <div className="descripcion">
          <p>{descripcion}</p>
        </div>

        <div className="precio-boton">
          <p className="precio">${precio}</p>

          <button
            className="boton-agregar"
            onClick={(e) => agregarAlCarrito(e)}
          >
            AGREGAR
          </button>
        </div>
      </div>
    </LinkProduct>
  );
}
