import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  Compras,
  Favoritos,
  Notificaciones,
  Seguridad,
  Consultas,
} from "../index";
import Perfil from "./AjustesPerfil/Perfil";
import Reseñas from "./Reseñas/Reseñas";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding-top: 8%;
  background-color: white;
  justify-content: center;
  @media screen and (max-width: 560px) {
    height: auto;
    display: flex;
    flex-direction: column;
    postition: relative;
  }
`;

const Informacion = styled.div`
  width: 60%;
  height: 100vh;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
  @media screen and (max-width: 560px) {
    postition: absolute;
    background-color: #ffffff;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  width: 25%;
  height: 100vh;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  // box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;
  margin-right: 3rem;

  position: relative;
  @media screen and (max-width: 960px) {
    width: 60%;
  }
  @media screen and (max-width: 560px) {
    width: 100%;
    position: absolute;
  }
`;

const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 60px;
  border: 1px solid #222;
  margin: 15px;
  margin-top: 30px;
  border-radius: 3px;
  // box-shadow: 0 2px 2px 0 #222, 0 2px 2px 0 #222;

  margin-bottom: 40px;
`;

const Titulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 550;
  padding: 10px;
`;

const Botones = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: start;
  // height: 60%;
  border-bottom: 1px solid black;
  width: 100%;
  // margin-top: 5rem;
`;

const Boton = styled.button`
  width: 100%;
  height: 60px;

  text-align: start;
  padding-left: 15px;

  font-size: 18px;
  font-family: Poppins;

  background-color: white;
  color: black;

  border: none;
  border-top: 1px solid black;
  // border-bottom: 2px solid black;

  &:hover {
    background-color: black;
    color: white;
  }

  cursor: pointer;
`;

const Sesion = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 65px;
  font-size: 20px;
  font-family: Poppins;
  background-color: #222;
  color: white;
  // border: 2px solid black;
  border: none;
  // cursor: pointer;

  border-radius: 0px 0px 8px 8px;

  // &:hover {
  //   background-color: black;
  // }
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  background-color: white;
`;

const Secciones = styled.p`
  display: flex;
  margin-left: 2rem;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
`;

const Items = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-flow: dense;
  grid-gap: 20px 12px;

  // justify-content: center;
  // align-items: center;

  width: 100%;
  height: auto;

  margin: 15px;
  padding: 5px;
  // border: 1px solid darkgrey;
  border-radius: 8px;
  // box-shadow: 0 2px 2px 0 darkgrey, 0 2px 2px 0 #222;
`;

function Cuenta() {
  const componentes = {
    perfil: Perfil,
    compras: Compras,
    reseñas: Reseñas,
    favoritos: Favoritos,
    notificaciones: Notificaciones,
    seguridad: Seguridad,
    consultas: Consultas,
  };

  const carrito = useSelector((state) => state.carrito);
  const [componente, setComponente] = useState();
  var ComponenteDinamico = componentes[componente];

  const handleOnClick = (e) => {
    setComponente(e.target.value);
  };

  useEffect(() => {
    setComponente("");
  }, []);

  return (
    <Container>
      <Options>
        <ContenedorTitulo>
          <Titulo>Infusion Store</Titulo>
        </ContenedorTitulo>
        <Botones>
          <Boton onClick={(e) => handleOnClick(e)} value="perfil">
            Ajustes de Perfil
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="compras">
            Mis Compras
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="reseñas">
            Reseñas
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="favoritos">
            Favoritos
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="notificaciones">
            Notificaciones
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="seguridad">
            Seguridad
          </Boton>
          <Boton onClick={(e) => handleOnClick(e)} value="consultas">
            Consultanos!
          </Boton>
        </Botones>

        <Sesion>Mi Cuenta</Sesion>
      </Options>
      <Informacion>
        <Categoria>{componente && <ComponenteDinamico />}</Categoria>
      </Informacion>
    </Container>
  );
}

export default Cuenta;
