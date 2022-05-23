import React, { useState } from "react";
import "./producto.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const LinkProduct = styled(Link)`
  text-decoration: none;
  width: 240px;
`;

const Button = styled.button`
  height: 30px;
`;

function Producto({ id, imagen, nombre, precio, descripcion, location }) {
  const [showOptions, setOptions] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/productos/${id}`);
  };

  return (
    <LinkProduct to={`/productos/${id}`}>
      <div className="container-producto">
        <div className="container-foto">
          <img src={imagen} className="foto" alt="foto" />
        </div>
        {location && location.pathname.slice(0, 6) === "/admin" && (
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
        )}

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
            <Button style={{ marginTop: "35px" }} onClick={handleEdit}>
              Editar producto
            </Button>
            <Button>Eliminar producto</Button>
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

          <button className="boton-agregar" onClick={(e) => e.preventDefault()}>
            AGREGAR
          </button>
        </div>
      </div>
    </LinkProduct>
  );
}

export default Producto;
