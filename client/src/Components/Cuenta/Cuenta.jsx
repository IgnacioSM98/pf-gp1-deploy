import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Compras,
  Favoritos,
  Seguridad,
  Consultas,
  CuentaReseñas,
  Perfil,
} from "../index";

const Container = styled.div`
  display: flex;
  height: 95%;
  width: 100%;
  padding-top: 5%;
  background-color: white;
  justify-content: center;

  @media screen and (max-width: 1400px) {
    padding-top: 8%;
  }

  @media screen and (max-width: 560px) {
    padding-top: 15%;
    height: auto;
    display: flex;
    flex-direction: column;
    position: relative;
  }
`;

const Informacion = styled.div`
  width: 60%;
  height: 95%;

  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 90%;

  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  // margin-right: 3rem;
  position: relative;

  @media screen and (max-width: 960px) {
    width: 60%;
  }

  @media screen and (max-width: 560px) {
    width: 100%;
    position: absolute;
    border: none;
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
  border-bottom: 1px solid black;
  width: 100%;
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
  border: none;
  border-radius: 0px 0px 8px 8px;

  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  background-color: white;
`;

export default function Cuenta() {
  const componentes = {
    perfil: Perfil,
    compras: Compras,
    reseñas: CuentaReseñas,
    favoritos: Favoritos,
    seguridad: Seguridad,
    consultas: Consultas,
  };

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
          <Boton onClick={handleOnClick} value="perfil">
            Ajustes de Perfil
          </Boton>

          <Boton onClick={handleOnClick} value="compras">
            Mis Compras
          </Boton>

          <Boton onClick={handleOnClick} value="reseñas">
            Reseñas
          </Boton>

          <Boton onClick={handleOnClick} value="favoritos">
            Favoritos
          </Boton>

          <Boton onClick={handleOnClick} value="consultas">
            Contactanos
          </Boton>
        </Botones>

        <Sesion>Mi Cuenta</Sesion>
      </Options>

      <Informacion>
        <Categoria>
          {componente && <ComponenteDinamico setComponente={setComponente} />}
        </Categoria>
      </Informacion>
    </Container>
  );
}
