import React from "react";

export default function CartaAdminProducto() {
  return (
    <div key={el.id}>
      <h3>{el.nombre}</h3>
      <h3>{el.id}</h3>
      <img src={el.image} />
      <p>{el.precio}</p>
      <p>{el.stock}</p>
    </div>
  );
}
