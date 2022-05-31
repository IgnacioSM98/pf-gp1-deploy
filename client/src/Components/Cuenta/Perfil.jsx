import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Perfil.css";
import putPerfil from "./putPerfil";

export default function Perfil() {
  const user = useSelector((state) => state.userInfo);
  const [usuario, setUsuario] = useState(user);
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(putPerfil(usuario));
  }

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
        Editar
      </h1>
      <div>
        <div>
          <div className="grupo-perfil">
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
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
              value={usuario.apellido}
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
              value={usuario.dni}
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
              value={usuario.direccion}
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
              value={usuario.mail}
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
              value={usuario.contraseña}
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
              value={usuario.telefono}
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
