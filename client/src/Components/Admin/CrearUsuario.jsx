import React, { useState } from "react";
import postUsuario from "./postUsuario";
import putUsuario from "./putUsuario";
import styled from "styled-components";

const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  height: 80%;
  width: 100%;
`;

const Creacion = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  border: 1px solid #222;
  border-radius: 2px;
  padding: 10px;
  margin: 2px;
`;

const Select = styled.select`
  border: 1px solid #222;
  border-radius: 2px;
  padding: 10px;
  margin: 2px;
`;

const Button = styled.button`
  border: 1px solid #222;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  background-color: #8080806e;
`;

export default function CrearUsuario({ setCrear, setEditar, editarUsuario }) {
  const [usuario, setUsuario] = useState(editarUsuario ? editarUsuario : {});

  const handleInputs = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
        }}
      >
        {editarUsuario ? "Editar Usuario" : "Crear Usuario"}
      </h1>
      <Container>
        <Creacion>
          <Input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={(e) => handleInputs(e)}
            placeholder="Nombre"
          />

          <Input
            type="text"
            name="apellido"
            value={usuario.apellido}
            onChange={(e) => handleInputs(e)}
            placeholder="Apellido"
          />

          <Input
            type="text"
            name="dni"
            value={usuario.dni}
            onChange={(e) => handleInputs(e)}
            placeholder="D.N.I"
          />

          <Input
            type="text"
            name="direccion"
            value={usuario.direccion}
            onChange={(e) => handleInputs(e)}
            placeholder="Dirección"
          />

          <Input
            type="text"
            name="mail"
            value={usuario.mail}
            onChange={(e) => handleInputs(e)}
            placeholder="Correo"
          />

          <Input
            type="text"
            name="contraseña"
            value={usuario.contraseña}
            onChange={(e) => handleInputs(e)}
            placeholder="Contraseña"
          />

          <Input
            type="text"
            name="telefono"
            value={usuario.telefono}
            onChange={(e) => handleInputs(e)}
            placeholder="Telefono"
          />

          {/* <Input
            type="text"
            name="isAdmin"
            value={usuario.isAdmin}
            onChange={(e) => handleInputs(e)}
            placeholder="Admin"
      />*/}
          <Select
            name="isAdmin"
            value={usuario.isAdmin}
            onChange={(e) => {
              handleInputs(e);
            }}
            placeholder="Admin"
          >
            <option disabled value="DEFAULT">
              Admin
            </option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </Select>

          <div>
            <Button
              onClick={() => {
                editarUsuario ? setEditar() : setCrear(false);
              }}
            >
              Cancelar
            </Button>

            <Button
              onClick={() => {
                editarUsuario ? putUsuario(usuario) : postUsuario(usuario);
                editarUsuario ? setEditar(false) : setCrear(false);
              }}
            >
              {editarUsuario ? "Editar" : "Confirmar"}
            </Button>
          </div>
        </Creacion>
      </Container>
    </>
  );
}
