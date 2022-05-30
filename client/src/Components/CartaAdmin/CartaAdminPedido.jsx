import React from "react";

export default function CartaAdminPedido() {
  return (
    <div key={el.id}>
      <h3>Numero#</h3>
      <p>{el.numeroPedido}</p>
      <h3>Total</h3>
      <p>{el.precio}</p>
    </div>
  );
}
