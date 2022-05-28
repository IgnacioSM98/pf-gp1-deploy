import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { agregarCarrito, restarCarrito } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: start;
  align-items: center;
  // margin-top: 30px;
`;

const Imagen = styled.img`
  height: 80px;
  width: 80px;
  object-fit: contain;
  background-color: white;
  border-radius: 10px;
  margin: 25px 10px;
`;

const ContenedorInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 100%;
  position: relative;
`;

const Nombre = styled.p`
  font-family: Poppins;
  font-size: 18px;
  // margin-top: 1.5rem;
  font-weight: 800;
  width: 260px;

  text-align: start;
`;

const PrecioSubtotal = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 800;
  position: absolute;
  right: 4%;
  top: 30%;
`;

const PrecioUnitario = styled.p`
  font-family: Poppins;
  font-size: 22px;
  font-weight: 800;
  position: absolute;
  right: 27.5%;
  top: 30%;
`;

const ContenedorCantidad = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 35px;
  width: 100px;
  border: 1px solid #e1d7d7;
  border-radius: 8px;
  // margin: 20px;
  font-family: Poppins;
  // margin-right: 8rem;
  position: absolute;
  right: 49%;
  top: 25%;
`;
const Boton = styled.button`
  font-size: 16px;
  padding: px;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  background-color: #95a999;
  border: none
  outline: none;
  color: white;
  cursor: pointer
`;

const Cantidad = styled.p`
  font-size: 13px;
  padding: 0px;
  width: 30px;
`;

const ProductLink = styled(Link)`
  height: auto;
  width: auto;

  color: black;
  font-size: 18px;
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
      {/* <ProductLink to={`/productos/${producto.id}`}> */}
      <Imagen src={producto.imagen} alt={producto.nombre} />
      {/* </ProductLink> */}

      <ContenedorInfo>
        <ProductLink to={`/productos/${producto.id}`}>
          <Nombre>{producto.nombre}</Nombre>
        </ProductLink>
        <ContenedorCantidad>
          <Boton
            onClick={(e) => {
              e.preventDefault();
              handleResta(e);
            }}
          >
            -
          </Boton>
          <Cantidad>{cantidad}</Cantidad>
          <Boton
            onClick={(e) => {
              e.preventDefault();
              handleSuma(e);
            }}
          >
            +
          </Boton>
        </ContenedorCantidad>
        <PrecioUnitario>${producto.precio}</PrecioUnitario>
        <PrecioSubtotal>${semiTotal}</PrecioSubtotal>
      </ContenedorInfo>
    </Container>
  );
}
