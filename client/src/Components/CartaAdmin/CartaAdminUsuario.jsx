import React from "react";

export default function CartaAdminUsuario() {
  return (
    <div key={el.id}>
      <h3>Nombre</h3>
      <p>{el.nombre}</p>
      <h3>ID</h3>
      <p>{el.id}</p>
      <img src={el.image} />
      <h3>Administrador</h3>
      <p>{el.admin}</p>
    </div>
  );
}
