import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsuarios } from "../../../Redux/actions";
import "./Perfil.css";
import putPerfil from "./putPerfil";

export default function Perfil() {
  const user = useSelector((state) => state.userInfo);
  const mail = user.email;
  const usuarios = useSelector((state) => state.usuarios);
  const [usuario, setUsuario] = useState({});
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    dispatch(getUsuarios());
  }, [dispatch]);

  useEffect(() => {
    setUsuario(usuarios.find((u) => u.mail === mail));
  }, [usuarios, mail]);

  useEffect(() => {
    if (usuario) {
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
    }
  }, [usuario]);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(putPerfil(inputs));
  }

  return (
    <>
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
    </>
  );
}
