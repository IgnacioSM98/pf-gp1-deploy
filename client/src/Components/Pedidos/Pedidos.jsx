import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";

function Pedidos() {
  const dispatch = useDispatch();

  const pedidos = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, []);

  return (
    pedidos &&
    pedidos.map((e) => (
      <div>
        <p>{e.id}</p>
        <p>{e.fecha}</p>
        <p>{e.pago_total}</p>
        <p>{e.Tipo_de_pago}</p>
        <p>{e.Tipo_de_envio}</p>
        <p>{e.Direccion_de_envio}</p>
        <p>{e.Estado}</p>
      </div>
    ))
  );
}

export default Pedidos;
