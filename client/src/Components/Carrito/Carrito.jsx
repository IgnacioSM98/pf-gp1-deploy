import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoItem from "./CarritoItem";
import styled from "styled-components";
import { quitarItem } from "../../Redux/actions";

const Container = styled.div`
  background-color: white;
  border: 3px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  flex-direction: column;
  align-items: flex-start;
`;
const Cont = styled.div`
  background-color: #1533e333;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Label = styled.label`
  margin-top: auto;
  margin-left: auto;
`;

function Carrito() {
  const [precioTotal, setPrecioTotal] = useState(0);
  const carrito = useSelector((state) => state.carrito);
  const dispatch = useDispatch();

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
    <Cont>
      <Container>
        {carrito.map((el) => {
          return (
            <div>
              <CarritoItem key={el.id} nombre={el.nombre} precio={el.precio} />
              <button onClick={() => handleQuit(el)}>X</button>
            </div>
          );
        })}

        <Label>Precio Total: {precioTotal}</Label>
      </Container>
    </Cont>
  );
}

export default Carrito;
