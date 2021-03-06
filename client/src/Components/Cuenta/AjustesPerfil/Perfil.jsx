import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios, putPerfil } from "../../../Redux/actions";
import "./Perfil.css";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  background-color: white;
  position: relative;

  @media screen and (max-width: 560px) {
    // display: absolute;
    height: 93vh;
    display: flex;
    justify-content: space-around;
    z-index: 1;
  }
`;

const Cerrar = styled.button`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;

  @media screen and (min-width: 560px) {
    display: none;
  }
`;

const Button = styled.button`
  // position: absolute;
  // bottom: 0;
  margin: 5px;
  width: 100px;
  height: 35px;
  font-size: 10px;
  font-family: Poppins;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const H1 = styled.h1`
  width: 100%;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
  margin-left: 10%;

  @media screen and (max-width: 560px) {
    margin-left: 2%;
  }
`;

export default function Perfil({ setComponente }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userInfo);
  const mail = user?.email;

  const usuarios = useSelector((state) => state.usuarios);
  const [usuario, setUsuario] = useState({});
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(true);

  const usuarioInputs = (usuario) => {
    usuario?.id &&
      setInputs({
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        dni: usuario.dni,
        direccion: usuario.direccion,
        mail: usuario.mail,
        contraseña: usuario.contraseña,
        telefono: usuario.telefono,
      });
  };

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  useEffect(() => {
    setUsuario(usuarios.find((u) => u.mail === mail));
  }, [usuarios, mail]);

  useEffect(() => {
    usuarioInputs(usuario);
  }, [usuario]);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Perfil Actualizado",
      text: "Todos los datos se guardaron correctamente",
      icon: "success",
      iconColor: "green",
      color: "#222",
      confirmButtonColor: "grey",
      confirmButtonText: "Aceptar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putPerfil(usuario.id, inputs));
      }
    });
  };

  function handleCancel() {
    Swal.fire({
      title: "Cambios descartados",
      text: "Los cambios no se guardarán",
      icon: "warning",
      iconColor: "grey",
      color: "#222",
      confirmButtonColor: "grey",
      confirmButtonText: "Aceptar",
    });

    usuarioInputs(usuario);
  }

  function handleClick() {
    setShow((current) => !current);
    setComponente("");
  }

  return (
    <>
      <Container
        className="contenedor-perfil"
        style={{ display: show ? "absolute" : "none" }}
      >
        <H1>Editar</H1>
        <Cerrar onClick={handleClick}>X</Cerrar>

        {/* <div> */}
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
        </div>
        <div>
          <Button onClick={() => handleCancel()}>Cancelar</Button>

          <Button onClick={(e) => handleSubmit(e)}>Confirmar</Button>
        </div>
        {/* </div> */}
      </Container>
    </>
  );
}
