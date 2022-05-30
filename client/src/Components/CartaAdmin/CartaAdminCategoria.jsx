import React from "react";

export default function CartaAdminCategoria({ id, nombre }) {
  return <button key={id}>{nombre}</button>;
}
