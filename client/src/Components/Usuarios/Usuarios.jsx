import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteUsuario, getUsuarios } from "../../Redux/actions";
import CrearUsuario from "../Admin/CrearUsuario";
import Swal from "sweetalert2";
import { app } from "../../firebase";

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
`;

const Crear = styled.button`
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
  const [crearUsuario, setCrear] = useState(false);
  const [editarUsuario, setEditar] = useState("");
  const usuarios = useSelector((state) =>
    state.usuarios.sort((a, b) => a.createdAt > b.createdAt)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  const handleDeleteUsuario = (id) => {
    Swal.fire({
      title: "Eliminar usuario",
      text: "¿Estas seguro de eliminar este usuario?",
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
        dispatch(deleteUsuario(id));

        app.auth().currentUser.delete();
      }
    });
  };

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
          {usuario.telefono ? (
            <Telefono>+549{usuario.telefono}</Telefono>
          ) : (
            <Telefono>Sin telefono</Telefono>
          )}
          <Button
            onClick={() => {
              setEditar(usuario);
            }}
          >
            ✏️
          </Button>
          <Button
            onClick={() => {
              handleDeleteUsuario(usuario.id);
            }}
          >
            🗑
          </Button>
        </Usuario>
      ))}
    </Container>
  );
}
