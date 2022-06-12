import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../../../Redux/actions";
import "./Perfil.css";
import putPerfil from "./putPerfil";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
  }
`;

const Boton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  @media screen and (min-width: 560px) {
    display: none;
  }
`;

export default function Perfil() {
  const user = useSelector((state) => state.userInfo);
  const mail = user.email;
  const usuarios = useSelector((state) => state.usuarios);
  const [usuario, setUsuario] = useState({});
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(true);

  useEffect(() => {
    dispatch(getUsuarios());
  }, []);

  useEffect(() => {
    setUsuario(usuarios.find((u) => u.mail === mail));
  }, [usuarios]);

  useEffect(() => {
    if (usuario) {
      setInputs({
        ...inputs,
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        direccion: usuario.direccion,
        mail: usuario.mail,
        contraseña: usuario.contraseña,
        telefono: usuario.telefono,
      });
    }
  }, [usuario]);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putPerfil(inputs));
  }
  function handleClick() {
    setShow((current) => !current);
  }

  return (
    <Container
      className="contenedor-perfil"
      style={{ display: show ? "absolute" : "none" }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
          marginTop: "15px",
        }}
      >
        Editar
      </h1>
      <Boton onClick={handleClick}>X</Boton>
      <div>
        <div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="nombre"
              value={inputs.nombre}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Nombre</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="apellido"
              value={inputs.apellido}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Apellido</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="dni"
              value={inputs.dni}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">D.N.I.</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="direccion"
              value={inputs.direccion}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Direccion</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="mail"
              value={inputs.mail}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Correo</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="contraseña"
              value={inputs.contraseña}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Contraseña</label>
          </div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="telefono"
              value={inputs.telefono}
              onChange={(e) => handleInputs(e)}
              placeholder=" "
              className="input-perfil"
            />
            <span className="barra-perfil"></span>
            <label className="label-perfil">Telefono</label>
          </div>

          <div>
            <button onClick={(e) => handleSubmit(e)}>Cancelar</button>

            <button onClick={(e) => handleSubmit(e)}>Confirmar</button>
          </div>
        </div>
      </div>
    </Container>
  );
}
