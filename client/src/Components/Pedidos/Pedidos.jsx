import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";
import styled from "styled-components";
import { Pedido } from "../index";

const Container = styled.div`
  height: 80vh;

  padding-top: 20px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // grid-auto-flow: dense;
  grid-gap: 20px 12px;

  // justify-content: center;
  // align-items: center;

  width: 100%;
  height: 75vh;

  // margin: 15px;
  padding: 5px;
  // border: 1px solid darkgrey;
  // border-radius: 8px;
  // box-shadow: 0 2px 2px 0 darkgrey, 0 2px 2px 0 #222;

  overflow-x: scroll;
`;

const Crear = styled.button`
  // top: 660px;
  top: 0;
  right: 0;
  position: absolute;
  width: 80px;
  background: #37563d;

  display: block;

  height: 30px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin: 40px 0px 0px 0px;
  margin: auto;
  cursor: pointer;
`;

let Select = styled.select`
  margin-bottom: 3em;
  width: 150px;
  height: 30px;
  border-radius: 8px;
  background-color: rgb(182, 182, 182);
  font-weight: bold;
  text-align: center;

  position: absolute;
  top: 0;
`;

function Pedidos() {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidos);
  const [renderizar, setRenderizar] = useState(pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, []);

  useEffect(() => {}, [renderizar]);

  const sortPedidos = (e) => {
    if (e.target.value === "preparacion") {
      let lista = pedidos.filter(
        (pedido) => pedido.Estado === "En preparación"
      );
      setRenderizar(lista);
    }
    if (e.target.value === "camino") {
      let lista = pedidos.filter((pedido) => pedido.Estado === "En camino");
      setRenderizar(lista);
    }
    if (e.target.value === "correo") {
      let lista = pedidos.filter(
        (pedido) => pedido.Estado === "En punto de entrega/poder del cartero"
      );
      setRenderizar(lista);
    }
    if (e.target.value === "entregado") {
      let lista = pedidos.filter((pedido) => pedido.Estado === "Entregado");
      setRenderizar(lista);
    }
    if (e.target.value === "default" || e.target.value === "todos") {
      setRenderizar(pedidos);
    }
    if (e.target.value === "creado") {
      let lista = pedidos.filter((pedido) => pedido.Estado === "Creado");
      setRenderizar(lista);
    }
    return renderizar;
  };

  return (
    <>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
          textAlign: "start",
        }}
      >
        Administrador de Pedidos
      </h1>

      <Select onChange={(e) => sortPedidos(e)}>
        <option value="default">Ordenar por estado</option>
        <option value="todos">Todos</option>
        <option value="creado">Creado</option>
        <option value="preparacion">En preparacion</option>
        <option value="camino">En camino</option>
        <option value="correo">En punto de Entrega/Correo</option>
        <option value="entregado">Entregado</option>
      </Select>
      <Container>
        {renderizar &&
          renderizar.map((e) => <Pedido key={e.id} producto={e} />)}
      </Container>
    </>
  );
}

export default Pedidos;
