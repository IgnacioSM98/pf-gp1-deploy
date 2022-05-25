import React from "react";
import CarritoItem from "../Carrito/CarritoItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  // flex-direction: column;
  height: 100vh;
  width: 100%;
  padding-top: 5%;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

const Informacion = styled.div`
  width: 50%;
  height: 100%;
  padding-top: 40px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  margin-right: 3rem;
`;

const ContenedorTitulo = styled.div`
  width: 90%;
  height: 60px;
  border: 2px solid #222;
  margin: 15px;
  margin-top: 30px;
  box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
`;

const Titulo = styled.p`
  font-size: 25px;
  font-family: Poppins;
  padding: 10px;
`;

const Botones = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 60%;
  width: 100%;
  margin-top: 5rem;
`;

const Boton = styled.button`
  width: 100%;
  height: 60px;
  font-size: 20px;
  font-family: Poppins;
  background-color: white;
  color: black;
  border: 2px solid black;
  &:hover {
    background-color: black;
    color: white;
  }
  cursor: pointer;
`;

const Sesion = styled.button`
  width: 100%;
  height: 65px;
  font-size: 20px;
  font-family: Poppins;
  background-color: #222;
  color: white;
  border: 2px solid black;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

const Categorias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 70vh;
  max-height: fit-content;
  width: 100%;
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  height: 40%;
  width: 100%;
`;

const Secciones = styled.p`
  display: flex;
  margin-left: 2rem;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
`;

const Items = styled.div`
  display: flex;
  margin: 15px;
  width: 90%;
  height: 153px;
  padding: 5px;
  border: 1px solid darkgrey;
  border-radius: 8px;
  box-shadow: 0 2px 2px 0 darkgrey, 0 2px 2px 0 #222;
`;

function Cuenta() {
  const carrito = useSelector((state) => state.carrito);

  return (
    <Container>
      <Options>
        <ContenedorTitulo>
          <Titulo>Mi Cuenta</Titulo>
        </ContenedorTitulo>
        <Botones>
          <Boton>Historial de compras</Boton>
          <Boton>Guardados</Boton>
          <Boton>Actualizar Perfil</Boton>
          <Boton>Contacto</Boton>
        </Botones>

        <Sesion>Cerrar Sesion</Sesion>
      </Options>
      <Informacion>
        <Categorias>
          <Categoria>
            <Secciones>Carrito</Secciones>

            {carrito.map((el) => {
              return (
                <Items>
                  <CarritoItem key={el.id} producto={el} />
                </Items>
              );
            })}
          </Categoria>

          <Categoria>
            <Secciones>Productos recomendados</Secciones>
          </Categoria>
        </Categorias>
      </Informacion>
    </Container>
  );
}

export default Cuenta;
