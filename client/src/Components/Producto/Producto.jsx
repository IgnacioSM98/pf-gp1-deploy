import React, { Children, useEffect, useState } from "react";
import "./producto.css";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  agregarCarrito,
  deleteProducto,
  quitarItem,
  restarCarrito,
  añadirAFavoritos,
  eliminarDeFavoritos,
  getUsuarios,
  getUser,
} from "../../Redux/actions";
import axios from "axios";

const LinkProduct = styled(Link)`
  margin: 0px 2px;
  text-decoration: none;
  width: 240px;
`;

const Button = styled.button`
  height: 25px;
  width: 90%;
  margin: 2px 5%;
  background-color: white;
  border: none;

  cursor: pointer;
`;

const Popup = styled.div`
  position: absolute;
  top: 3%;
  right: 7%;
  width: 22px;
  height: 22px;
  border-radius: 50px;
  border: none;
  z-index: 11;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 700;
  background-color: #36885ed1;
  color: white;
  cursor: auto;
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
  background-color: white;
  border-radius: 8px;
  border-width: 1.5px;
  border-color: black;
  border: none;

  margin: 0px;
  height: 28px;
  width: 28px;
  padding: 2%;
  cursor: pointer;
`;

const Stock = styled.button`
  margin: 0px 0px;
  background-color: white;
  color: black;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
`;

const Boton = styled.button`
  color: #36885ed1;
  border-radius: 10px 10px 10px 10px;
  height: 35px;
  width: 100px;
  background-color: white;
  font-family: Poppins;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  border: none;
  outline: none;
  padding: 5px 10px 5px 10px;
  margin-top: 15px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    background-color: #36885ed1;
    color: white;
    cursor: pointer;
  }
`;

const ManejoStock = styled.div`
  color: #222;
  border-radius: 10px 10px 10px 10px;
  height: 35px;
  width: 100px;
  background-color: #90aa95e0;
  font-family: Poppins;
  font-size: 13px;
  box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  border: none;
  outline: none;
  // padding: 5px 10px 5px 10px;
  margin-top: 15px;
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: auto;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ContenedorFav = styled.div`
  display: flex;
  position: absolute;
  z-index: 3;
  left: 7%;
  top: 2%;

  p {
    color: #5a9d7b;
    font-size: 25px;
    margin-top: 5px;
  }

  label {
    color: #5a9d7b;
    font-weight: bold;
    font-size: 25px;

    margin-top: 5px;
  }
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

  const admin = useSelector((state) => state.userInfo?.visualizacion);
  const user = useSelector((state) => state.userInfo);
  const favoritos = useSelector((state) => state.favoritos);

  const [showOptions, setOptions] = useState({ button: false, popup: false });
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const cantidadCarrito = useSelector(
    (state) => state.carrito?.filter((item) => item.id === id)[0]
  );

  useEffect(() => {
    dispatch(getUsuarios());
    setFlag(cantidadCarrito?.cantidad ? true : false);
    setCantidad(cantidadCarrito?.cantidad ? cantidadCarrito.cantidad : 1);
  }, [cantidadCarrito]);

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
        dispatch(restarCarrito(id, cantidad - 1));
      } else {
        setFlag(false);
        dispatch(quitarItem({ id }));
      }
    }
  };

  function handleFav(e) {
    e.preventDefault();

    if (favoritos.find((fav) => fav.id == id)) {
      dispatch(eliminarDeFavoritos(id));
    } else {
      dispatch(añadirAFavoritos(producto));
    }
  }

  return (
    <LinkProduct to={`/productos/${id}`}>
      <div
        className="container-producto"
        onMouseEnter={() => {
          if (admin === "admin") setOptions({ ...showOptions, button: true });
        }}
        onMouseLeave={() => {
          if (admin === "admin") setOptions({ popup: false, button: false });
        }}
      >
        {user && (
          <ContenedorFav>
            {favoritos.find((fav) => fav.id == id) ? (
              <p onClick={(e) => handleFav(e)}>♥</p>
            ) : (
              <label onClick={(e) => handleFav(e)}>♡</label>
            )}
          </ContenedorFav>
        )}
        <div className="container-foto">
          <img src={imagen} className="foto" alt="foto" />
        </div>

        {showOptions.button && (
          <Popup
            style={
              showOptions.popup
                ? { backgroundColor: "white", color: "#36885ed1" }
                : null
            }
            onClick={(e) => {
              e.preventDefault();
              setOptions({ ...showOptions, popup: !showOptions.popup });
            }}
          >
            ...
          </Popup>
        )}

        {showOptions.popup && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "1%",
              right: "1%",
              width: "98%",
              height: "100px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#36885ed1",
              zIndex: "10",
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
            {descripcion?.length > 210
              ? descripcion.slice(0, 210) + " (Ver más)"
              : descripcion}
          </p>
        </div>

        <div className="precio-boton">
          <p className="precio">${precio}</p>

          {flag === true ? (
            <ManejoStock onClick={(e) => e.preventDefault()}>
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
            </ManejoStock>
          ) : (
            <Boton
              // className="boton-agregar"
              onClick={(e) => {
                setFlag(true);
                agregarAlCarrito(e);
              }}
            >
              Agregar
            </Boton>
          )}
        </div>
      </div>
    </LinkProduct>
  );
}
