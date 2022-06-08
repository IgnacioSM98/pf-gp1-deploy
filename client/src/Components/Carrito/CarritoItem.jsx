import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { agregarCarrito, restarCarrito } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 5%;
  // margin-top: 30px;
`;

const DivUno = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Imagen = styled.img`
  height: 80px;
  width: 80px;
  object-fit: contain;
  background-color: white;
  border-radius: 10px;
  @media screen and (max-width: 1200px) {
    size: 100%;
  }
  @media screen and (max-width: 800px) {
    size: 75%;
  }
  @media screen and (max-width: 600px) {
    size: 50%;
  }
  @media screen and (max-width: 450px) {
    size: 40%;
  }
  @media screen and (max-width: 300px) {
    size: 25%;
  }
`;

const Nombre = styled.p`
  font-family: Poppins;
  // margin-top: 1.5rem;
  font-weight: 800;
  width: auto;
  text-align: start;
  @media screen and (max-width: 1200px) {
    heigth: auto;
    font-size: 22px;
  }
  @media screen and (max-width: 1000px) {
    heigth: auto;
    font-size: 18px;
  }
  @media screen and (max-width: 800px) {
    heigth: auto;
    font-size: 14px;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
  @media screen and (max-width: 500px) {
    display: none;
  }
  @media screen and (max-width: 300px) {
    display: none;
  }
`;

const PrecioSubtotal = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 800;
  position: relative;
  top: 30%;
  @media screen and (max-width: 1200px) {
    font-size: 22px;
  }
  @media screen and (max-width: 800px) {
    font-size: 17px;
  }
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
  @media screen and (max-width: 450px) {
    font-size: 17px;
  }
  @media screen and (max-width: 300px) {
    font-size: 15px;
  }
`;

const PrecioUnitario = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 800;
  position: relative;
  top: 30%;
  @media screen and (max-width: 1200px) {
    font-size: 22px;
  }
  @media screen and (max-width: 800px) {
    font-size: 17px;
  }
  @media screen and (max-width: 600px) {
    font-size: 17px;
  }
  @media screen and (max-width: 450px) {
    font-size: 17px;
  }
  @media screen and (max-width: 300px) {
    font-size: 15px;
  }
`;

const ContenedorCantidad = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 35px;
  width: 100px;
  position: relative;
  border: 1px solid #e1d7d7;
  border-radius: 8px;
  font-family: Poppins;
  top: 25%;
  @media screen and (max-width: 1200px) {
    width: 100px;
  }
  @media screen and (max-width: 800px) {
    width: 90px;
  }
  @media screen and (max-width: 600px) {
    width: 80px;
  }
  @media screen and (max-width: 450px) {
    width: 60px;
  }
  @media screen and (max-width: 300px) {
    width: 40px;
  }
`;

const BotonCantidad = styled.button`
  padding: px;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  background-color: #95a999;
  border: none
  outline: none;
  color: white;
  cursor: pointer;
  
`;

const Cantidad = styled.p`
  padding: 0px;
  width: 30px;
  @media screen and (max-width: 1200px) {
    font-size: 20px;
    size: 100%;
  }
  @media screen and (max-width: 800px) {
    size: 75%;
    font-size: 20px;
  }
  @media screen and (max-width: 600px) {
    size: 50%;
    font-size: 15px;
  }
  @media screen and (max-width: 450px) {
    size: 40%;
    font-size: 15;
  }
  @media screen and (max-width: 300px) {
    size: 25%;
    font-size: 15px;
  }
`;

export default function CarritoItem({ producto, setPrecioTotal }) {
  const dispatch = useDispatch();
  const [cantidad, setCantidad] = useState(0);
  const [semiTotal, setSemiTotal] = useState();

  useEffect(() => {
    setCantidad(producto.cantidad);
    setSemiTotal(producto.precio * producto.cantidad);
  }, []);

  function handleSuma(e) {
    if (cantidad >= 1) {
      setCantidad(cantidad + 1);
      setSemiTotal(producto.precio * (cantidad + 1));
      setPrecioTotal((prev) => prev + producto.precio);

      dispatch(agregarCarrito(producto.id, cantidad + 1));
    }
  }

  function handleResta(e) {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      setSemiTotal(producto.precio * (cantidad - 1));
      setPrecioTotal((prev) => prev - producto.precio);

      dispatch(restarCarrito(producto.id, cantidad - 1));
    }
  }

  return (
    <Container>
      <DivUno>
        <Link to={`/productos/${producto.id}`}>
          <Imagen
            className="item-img"
            src={producto.imagen}
            alt={producto.nombre}
          />
        </Link>
        <Nombre>{producto.nombre}</Nombre>
      </DivUno>

      {/* <ContenedorInfo> */}
      <ContenedorCantidad>
        <BotonCantidad
          onClick={(e) => {
            e.preventDefault();
            handleResta(e);
          }}
        >
          -
        </BotonCantidad>
        <Cantidad>{cantidad}</Cantidad>
        <BotonCantidad
          onClick={(e) => {
            e.preventDefault();
            handleSuma(e);
          }}
        >
          +
        </BotonCantidad>
      </ContenedorCantidad>
      <PrecioUnitario>${producto.precio}</PrecioUnitario>
      <PrecioSubtotal>${semiTotal}</PrecioSubtotal>
      {/* </ContenedorInfo> */}
    </Container>
  );
}
