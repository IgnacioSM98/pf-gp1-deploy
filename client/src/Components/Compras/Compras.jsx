import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";

export default function Compras() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const pedidos = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  return (
    <>
      <p>HOLAAA</p>
    </>
  );
}
