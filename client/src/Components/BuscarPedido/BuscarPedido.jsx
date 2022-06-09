import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pedido } from "../index.js";

const Container = styled.div``;
const Formulario = styled.form`
  margin: 5px;
`;
const Input = styled.input``;
const ContainerPedido = styled.div``;
const Boton = styled.button`
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
export default function BuscarPedido(pedidos) {
  let [buscar, setBuscar] = useState("");
  let [pedido, setPedido] = useState();

  function handleFlag() {
    setPedido(false);
  }

  function handleChange(e) {
    setBuscar(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("botonazo");
    const result = pedidos.pedidos.find((p) => p.id === parseInt(buscar));
    setPedido(result);
    setBuscar("");
  }
  return (
    <Container>
      <Formulario onSubmit={handleSubmit}>
        <Input
          required
          value={buscar}
          type="search"
          placeholder="Nro de pedido"
          onChange={handleChange}
        ></Input>
        <Boton type="submit">Buscar</Boton>
      </Formulario>
      {pedido && (
        <ContainerPedido>
          <Pedido key={pedido.id} producto={pedido} />
          <Boton onClick={() => handleFlag()}>Cerrar</Boton>
        </ContainerPedido>
      )}
    </Container>
  );
}
