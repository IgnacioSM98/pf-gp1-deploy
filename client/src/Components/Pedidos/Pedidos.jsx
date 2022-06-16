import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";
import styled from "styled-components";
import { Pedido } from "../index";

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
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-weight: bold;
  text-align: center;
`;

export default function Pedidos() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("default");
  const pedidos = useSelector((state) => state.pedidos);

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  const filtrarPedidos = (pedido) => {
    if (selected) {
      const estado = pedido.Estado.toLowerCase();

      if (estado.includes(selected.toLowerCase())) {
        return pedido;
      }
    }

    if (selected === "default") {
      return pedido;
    }
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

      <Select onChange={(e) => setSelected(e.target.value)}>
        <option value="default">Filtrar por estado</option>
        <option value="default">Todos</option>
        <option value="creado">Creado</option>
        <option value="preparación">En preparacion</option>
        <option value="camino">En camino</option>
        <option value="correo">En punto de Entrega/Correo</option>
        <option value="entregado">Entregado</option>
      </Select>

      <Container>
        {pedidos &&
          pedidos
            ?.filter(filtrarPedidos)
            .sort((a, b) => {
              return Number(a.id) > Number(b.id)
                ? 1
                : Number(b.id) > Number(a.id)
                ? -1
                : 0;
            })
            .map((e) => <Pedido key={e.id} producto={e} />)}
      </Container>
    </>
  );
}
