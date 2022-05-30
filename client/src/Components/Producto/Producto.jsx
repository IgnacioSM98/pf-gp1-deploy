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
} from "../../Redux/actions";

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
  color: #222;
  border-radius: 10px 10px 10px 10px;
  height: 35px;
  width: 100px;
  background-color: white;
  font-family: Poppins;
  font-size: 13px;
  box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  border: none;
  outline: none;
  padding: 5px 10px 5px 10px;
  margin-top: 15px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  &:hover {
    background-color: #37563de0;
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
  left: 87%;
  top: 2%;

  p {
    color: #5a9d7b;
    font-size: 30px;
    margin-top: 0;
  }

  label {
    color: #5a9d7b;
    font-weight: bold;
    font-size: 22px;

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

  const favoritos = useSelector((state) => state.favoritos);

  const [showOptions, setOptions] = useState({ button: false, popup: false });
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [cantidad, setCantidad] = useState(1);

  const cantidadCarrito = useSelector(
    (state) => state.carrito?.filter((item) => item.id === id)[0]
  );

  useEffect(() => {
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
    console.log(favoritos);
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
        <ContenedorFav>
          {favoritos.find((fav) => fav.id == id) ? (
            <p onClick={(e) => handleFav(e)}>♥</p>
          ) : (
            <label onClick={(e) => handleFav(e)}>♡</label>
          )}
        </ContenedorFav>

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
              AGREGAR
            </Boton>
          )}
        </div>
      </div>
    </LinkProduct>
  );
}
