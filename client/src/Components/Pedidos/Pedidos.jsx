import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";
import styled from "styled-components";
import { Pedido, BuscarPedido } from "../index";

const Container = styled.div`
  height: ${(props) => (props.pedido ? "53vh" : "75vh")};
  width: 100%;

  display: flex;
  flex-wrap: wrap;

  padding-top: 20px;

  padding: 5px;

  overflow-y: scroll;
  @media screen and (max-width: 1530px) {
    margin-top: 30px;
  }
`;

const Select = styled.select`
  top: 0;
  right: 0;
  position: absolute;

  // margin-bottom: 3em;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-weight: bold;
  text-align: center;
`;
const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  padding-bottom: 20px;
  text-align: start;
  float: left;

  // @media screen and (max-width: 1530px) {
  //   display: none;
  // }
  // @media screen and (max-width: 560px) {
  //   display: none;
  // }
`;

const Option = styled.option`
  border-radius: 8px;
  background-color: white;
`;

function Pedidos() {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidos);
  const [renderizar, setRenderizar] = useState(pedidos);

  const [pedido, setPedido] = useState();

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
