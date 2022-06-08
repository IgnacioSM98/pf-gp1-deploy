import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import deleteUsuario from "../Admin/deleteUsuario";
import CrearUsuario from "../Admin/CrearUsuario";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 80vh;
  width: 100%;

  text-align: start;
  @media screen and (max-width: 560px) {
    justify-content: space-evenly;
  }
`;

const Usuario = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
`;

const Nombre = styled.span`
  width: 20%;
  // background-color: red;
`;

const Apellido = styled.span`
  width: 20%;
`;

const Correo = styled.span`
  width: 42%;
  @media screen and (max-width: 840px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const Telefono = styled.span`
  width: 15%;
  @media screen and (max-width: 960px) {
    display: none;
  }
  @media screen and (max-width: 560px) {
    display: none;
  }
`;

const Button = styled.button`
  height: 30px;
  padding: 7px;
  border: none;
  background-color: transparent;

  cursor: pointer;

  &: hover {
    // background-color: red;
  }
`;

const Crear = styled.button`
  // top: 660px;
  top: 0;
  right: 0;
  position: absolute;
  width: 80px;
  background: #37563d;

  display: block;

  height: 30px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin: 40px 0px 0px 0px;
  margin: auto;
  cursor: pointer;
  @media screen and (max-width: 560px) {
    margin-top: 25px;
  }
`;

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [crearUsuario, setCrear] = useState(false);
  const [editarUsuario, setEditar] = useState("");

  const getUsuarios = async () => {
    setUsuarios(
      await axios
        .get("https://proyecto-final-gp1.herokuapp.com/usuarios")
        .then((resp) => resp.data)
    );
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  return crearUsuario ? (
    <CrearUsuario setCrear={setCrear} />
  ) : editarUsuario ? (
    <CrearUsuario setEditar={setEditar} editarUsuario={editarUsuario} />
  ) : (
    <Container>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
        }}
      >
        Administrador de Usuarios
      </h1>

      <Crear
        onClick={() => {
          setCrear(true);
        }}
      >
        Crear
      </Crear>

      {usuarios.map((usuario) => (
        <Usuario key={usuario.id}>
          <Nombre>{usuario.nombre}</Nombre>
          <Apellido>{usuario.apellido}</Apellido>
          <Correo>{usuario.mail}</Correo>
          <Telefono>{usuario.telefono}</Telefono>
          <Button
            onClick={() => {
              setEditar(usuario);
            }}
          >
            ✏️
          </Button>
          <Button
            onClick={() => {
              deleteUsuario(usuario.id);
              // getUsuarios(usuarios.filter((user) => user.id !== usuario.id));
            }}
          >
            🗑
          </Button>
        </Usuario>
      ))}
    </Container>
  );
}
