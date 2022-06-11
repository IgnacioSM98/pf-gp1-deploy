import React, { useState } from "react";
import styled from "styled-components";
import { Pedido } from "../index.js";

const Input = styled.input`
  height: 30px;
  position: absolute;
  top: 0;
  right: 160px;
  padding: 2px;
`;

const ContainerPedido = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Boton = styled.button`
  height: 30px;
  width: 100px;
  background-color: white;
  font-family: Poppins;
  font-size: 10px;
  color: black;
  border-radius: 20px;
  padding: 1px;
  border: 2px solid black;
  font-weight: 800;
  box-shadow: 0 1px 1px 0 #222, 0 1px 1px 0 darkgray;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  &: hover {
    background-color: #222;
    color: white;
  }
  &:active {
    background-color: #222;
    box-shadow: 0 2px darkgray;
    transform: translateY(2px);
  }
`;

export default function BuscarPedido({ pedido, pedidos, setPedido }) {
  const [buscar, setBuscar] = useState("");

  function handleFlag() {
    setPedido(false);
  }

  function handleChange(e) {
    setBuscar(e.target.value);

    const result = pedidos.find((p) => p.id === parseInt(e.target.value));

    setPedido(result);
  }

  return (
    <>
      <Input
        required
        value={buscar}
        type="search"
        placeholder="Filtrar por pedido"
        onChange={handleChange}
      ></Input>

      {pedido && (
        <ContainerPedido>
          <Pedido
            key={pedido.id}
            producto={pedido}
            height={"150px"}
            width={"100%"}
          />
          <Boton onClick={() => handleFlag()}>Cerrar</Boton>
        </ContainerPedido>
      )}
    </>
  );
}
