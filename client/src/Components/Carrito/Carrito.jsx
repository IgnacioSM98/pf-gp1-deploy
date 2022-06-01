import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CarritoItem from "./CarritoItem";
import styled from "styled-components";
import { quitarItem } from "../../Redux/actions";
import Swal from "sweetalert2";
import { MercadoPagoIntegracion, Footer, ScrollToTop } from "../index";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  // justify-content: center;
  // padding-top: 120px;

  width: 100%;
  min-height: 90vh;
`;

const Productos = styled.div`
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 90%;
  height: 153px;
  padding: 5px;
  border: 1px solid darkgrey;
  border-radius: 8px;
`;

const Borrar = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  border-radius: 0px 8px 0px 8px;
  width: 26px;
  height: 26px;
  color: white;
  font-weight: 900;
  background-color: rgba(98, 148, 107, 1);
  // box-shadow: 0 1px 1px 0 black, 1px 1px 1px 1px darkgray;
  cursor: pointer;

  &: hover {
    background-color: red;
  }
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
  height: 130px;
  // padding-top: 120px;
  flex-direction: row;
  justify-content: space-around;
`;

const ContenedorOpciones = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-around;
  margin-top: 4rem;
  // margin-right: 30rem;
  width: 100%;
  position: relative;
`;

const Opciones = styled.p`
  font-size: 18px;
  font-family: Poppins;
  position: absolute;
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  top: -23px;
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
  // margin-top: auto;
  // margin-left: auto;
  height: 130px;
  padding: 10px;
  border: 1px solid darkgrey;
  border-radius: 8px;
  // margin-right: 5.4rem;
  // margin-bottom: 2rem;
  width: 33%;

  position: relative;
  // bottom: 10px;
  // right: 10px;
  margin: 20px;
`;

const ContenedorMonto = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  position: relative;
`;

const ContenedorBotones = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const Label = styled.label`
  font-family: Poppins;
  font-size: 25px;
  font-weight: 600;
  color: black;
  margin: 1rem;
  font-weight: 550;
  position: absolute;
  left: ${(props) => props.left};
  right: ${(props) => props.right};
`;

const Boton = styled.button`
  font-family: Poppins;
  font-size: 13px;
  color: white;
  background-color: rgba(98, 148, 107, 1);
  padding: 9px;
  border-radius: 6px;
  border: none;
  // margin-top: 1rem;
  width: 50%;

  cursor: pointer;
  // box-shadow: 0 2px 2px 0 black, 1px 1px 1px 1px darkgray;
`;

function Carrito({ contacto }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [precioTotal, setPrecioTotal] = useState(0);
  const carrito = useSelector((state) => state.carrito);
  const userInfo = useSelector((state) => state.userInfo);

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

    carrito?.forEach((item) => {
      precio = precio + Number(item.precio) * item.cantidad;
    });

    setPrecioTotal(precio);
  }, [carrito, setPrecioTotal]);

  const handleOnClick = () => {
    if (userInfo) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Container>
        <ContenedorLinea>
          <Linea />
          <Titulo>Mi Carrito</Titulo>
          <Linea />
        </ContenedorLinea>

        <ContenedorOpciones>
          <Opciones left={"10%"}>Producto</Opciones>
          <Opciones right={"45.5%"}>Cantidad</Opciones>
          <Opciones right={"25%"}>Precio Unitario</Opciones>
          <Opciones right={"9%"}>Subtotal</Opciones>
        </ContenedorOpciones>
        <LineaOpciones />

        {carrito?.map((el) => {
          return (
            <Productos key={el.id}>
              <CarritoItem producto={el} setPrecioTotal={setPrecioTotal} />
              <Borrar onClick={() => handleQuit(el)}>X</Borrar>
            </Productos>
          );
        })}

        {carrito[0] ? (
          <ContenedorCompra>
            <ContenedorMonto>
              <Label left={0}>Monto Total:</Label>
              <Label right={0}>${precioTotal}</Label>
            </ContenedorMonto>
            <ContenedorBotones>
              {/* <Link to="/checkout"> */}
              <Boton onClick={handleOnClick}>Checkout</Boton>
              {/* </Link> */}
            </ContenedorBotones>
          </ContenedorCompra>
        ) : (
          <p
            style={{
              fontSize: "20px",
              fontWeight: 600,
              position: "absolute",
              top: "50%",
            }}
          >
            ¡Arrancá añadiendo productos a tu carrito!
          </p>
        )}
      </Container>

      <Footer contacto={contacto} />
      <ScrollToTop />
    </>
  );
}

export default Carrito;
