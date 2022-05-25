import React, { useState } from "react";
import "./producto.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { agregarCarrito, deleteProducto } from "../../Redux/actions";

const LinkProduct = styled(Link)`
  text-decoration: none;
  width: 240px;
`;

const Button = styled.button`
  height: 30px;
`;

const Botones = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const Cantidad = styled.button`
  color: black;
  font-weight: bold;
  background-color: "white")};
  border-radius: 8px;
  border-width: 1.5px;
  border-color: black;

  margin: 5px;
  height: 40px;
  width: 40px;
  padding: 2%;
`;

const Stock = styled.button`
  margin: 10px 0px;
  background-color: black;
  color: white;
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;

export default function Producto({
  id,
  imagen,
  nombre,
  precio,
  descripcion,
  location,
  producto,
  stock,
  categorias,
}) {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.user);
  const [showOptions, setOptions] = useState({ button: false, popup: false });
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(deleteProducto(id));
  };

  function agregarAlCarrito(e) {
    e.preventDefault();

    if (stock > 0) {
      dispatch(agregarCarrito(id, 1));
    }
  }

  const cambiarCantidad = (e) => {
    e.preventDefault();
    if (e.target.name === "suma") {
      if (cantidad < stock) {
        setCantidad(cantidad + 1);
        dispatch(agregarCarrito(id, cantidad + 1));
      }
    } else {
      if (cantidad > 1) {
        setCantidad(cantidad - 1);
      } else {
        setFlag(false);
      }
    }
  };

  return (
    <LinkProduct to={`/productos/${id}`}>
      <div
        className="container-producto"
        onMouseEnter={() => {
          if (admin) setOptions({ ...showOptions, button: true });
        }}
        onMouseLeave={() => {
          if (admin) setOptions({ popup: false, button: false });
        }}
      >
        <div className="container-foto">
          <img src={imagen} className="foto" alt="foto" />
        </div>

        {showOptions.button && (
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
              setOptions({ ...showOptions, popup: !showOptions.popup });
            }}
          >
            ...
          </button>
        )}

        {showOptions.popup && (
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
            <Button onClick={handleDelete}>Eliminar producto</Button>
          </div>
        )}

        <div className="nombre">
          <p>{nombre}</p>
        </div>

        <div className="descripcion">
          <p>
            {descripcion.length > 210
              ? descripcion.slice(0, 210) + " (Ver más)"
              : descripcion}
          </p>
        </div>

        {/* <div>
          {categorias?.map((categoria) => (
            <p>{categoria.nombre}</p>
          ))}
        </div> */}

        <div className="precio-boton">
          <p className="precio">${precio}</p>

          {flag === true ? (
            <div>
              <Cantidad
                name="resta"
                onClick={cambiarCantidad}
                // disabled={boton.resta}
              >
                -
              </Cantidad>
              <Stock>{cantidad}</Stock>
              <Cantidad
                name="suma"
                onClick={cambiarCantidad}
                // disabled={boton.suma}
              >
                +
              </Cantidad>
            </div>
          ) : (
            <button
              className="boton-agregar"
              onClick={(e) => {
                setFlag(true);
                agregarAlCarrito(e);
              }}
            >
              AGREGAR
            </button>
          )}
        </div>
      </div>
    </LinkProduct>
  );
}
