import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoItem from "./CarritoItem";
import styled from "styled-components";
import { quitarItem } from "../../Redux/actions";
import Swal from "sweetalert2";

const Container = styled.div`
  // border: 3px solid black;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const Productos = styled.div`
  position: relative;
  margin-top: 30px;
  margin-bottom: 30px;
  width: 90%;
  height: 153px;
  padding: 5px;
  border: 1px solid darkgrey;
  border-radius: 8px;
`;

const Borrar = styled.button`
  position: absolute;
  top: 5px;
  right: 10px;
  border: none;
  border-radius: 8px;
  width: 20px;
  height: 20px;
  color: white;
  background-color: rgba(98, 148, 107, 1);
  box-shadow: 0 1px 1px 0 black, 1px 1px 1px 1px darkgray;
  cursor: pointer;
`;

const Titulo = styled.h2`
  margin-top: 5rem;
  font-size: 40px;
  font-family: Poppins;
  font-weight: 400;
`;

const Linea = styled.hr`
  margin-top: 7.5rem;
  width: 40%;
  height: 0px;
  background-color: rgba(4, 4, 4, 1);
  border: 2px solid #222;
`;

const ContenedorLinea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

const ContenedorOpciones = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 4rem;
  // margin-right: 30rem;
  width: 100%;
`;

const Opciones = styled.p`
  font-size: 20px;
  font-family: Poppins;
`;

const LineaOpciones = styled.hr`
  margin-top: 10px;
  width: 90%;
  height: 0px;
  background-color: rgba(4, 4, 4, 1);
`;

const ContenedorCompra = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-left: auto;
  padding: 10px;
  border: 1px solid darkgrey;
  border-radius: 8px;
  margin-right: 5.4rem;
  margin-bottom: 2rem;
  width: 33%;
`;

const ContenedorMonto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Label = styled.label`
  font-family: Poppins;
  font-size: 25px;
  font-weight: 600;
  color: black;
  margin: 1rem;
  font-weight: 550;
`;

const Boton = styled.button`
  font-family: Poppins;
  font-size: 22px;
  color: white;
  background-color: rgba(98, 148, 107, 1);
  padding: 10px;
  border-radius: 10px;
  margin-top: 1rem;
  width: 60%;
  box-shadow: 0 2px 2px 0 black, 1px 1px 1px 1px darkgray;
`;

function Carrito() {
  const dispatch = useDispatch();

  const [precioTotal, setPrecioTotal] = useState(0);
  const carrito = useSelector((state) => state.carrito);

  function handleQuit(props) {
    Swal.fire({
      title: "Eliminar producto",
      text: "¿Estas seguro de eliminar este producto de tu carrito?",
      icon: "warning",
      iconColor: "red",
      color: "#222",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "red",
      cancelButtonColor: "darkgrey",
      confirmButtonText: "Si",
      // toast: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "El producto se eliminó con éxito",
          icon: "success",
          iconColor: "green",
          color: "#222",
          showConfirmButton: false,
          timer: "1500",
          toast: true,
        });
        dispatch(quitarItem(props));
      }
    });
  }

  useEffect(() => {
    let precio = 0;

    carrito.forEach((item) => {
      precio = precio + Number(item.precio) * item.cantidad;
    });

    setPrecioTotal(precio);
  }, [carrito, setPrecioTotal]);

  return (
    <Container>
      <ContenedorLinea>
        <Linea />
        <Titulo>Mi Carrito</Titulo>
        <Linea />
      </ContenedorLinea>

      <ContenedorOpciones>
        <Opciones>Producto</Opciones>
        <Opciones>Cantidad</Opciones>
        <Opciones>Monto</Opciones>
      </ContenedorOpciones>
      <LineaOpciones />

      {carrito.map((el) => {
        return (
          <Productos>
            <CarritoItem
              key={el.id}
              producto={el}
              setPrecioTotal={setPrecioTotal}
            />
            <Borrar onClick={() => handleQuit(el)}>X</Borrar>
          </Productos>
        );
      })}

      <ContenedorCompra>
        <ContenedorMonto>
          <Label>Monto Total:</Label>
          <Label>${precioTotal}</Label>
        </ContenedorMonto>
        <Boton>Continuar compra</Boton>
      </ContenedorCompra>
    </Container>
  );
}

export default Carrito;
