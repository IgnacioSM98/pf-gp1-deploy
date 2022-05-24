import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoItem from "./CarritoItem";
import styled from "styled-components";
import { quitarItem } from "../../Redux/actions";

const Container = styled.div`
  // border: 3px solid black;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  align-items: flex-start;
`;

const Label = styled.label`
  margin-top: auto;
  margin-left: auto;
  padding: 40px;
  font-size: 20px;
  font-weight: 600;
`;

const Productos = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  background-color: lightgrey;
  padding: 5px;
`;

const Borrar = styled.button`
  position: absolute;
  top: 5px;
  right: 20px;
  border: none;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  background-color: red;
`;

function Carrito() {
  const dispatch = useDispatch();

  const [precioTotal, setPrecioTotal] = useState(0);
  const carrito = useSelector((state) => state.carrito);

  function handleQuit(props) {
    dispatch(quitarItem(props));
  }

  useEffect(() => {
    let precio = 0;

    carrito.forEach((item) => {
      precio = precio + Number(item.precio);
    });

    setPrecioTotal(precio);
  }, [carrito, precioTotal, setPrecioTotal]);

  return (
    <Container>
      {carrito.map((el) => {
        return (
          <Productos>
            <CarritoItem key={el.id} producto={el} />
            <Borrar onClick={() => handleQuit(el)}>X</Borrar>
          </Productos>
        );
      })}

      <Label>Monto Total: ${precioTotal}</Label>
    </Container>
  );
}

export default Carrito;
