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
  const [selected, setSelected] = useState("");
  const pedidos = useSelector((state) => state.pedidos);

  const [pedido, setPedido] = useState();

  useEffect(() => {
    dispatch(getPedidos());
  }, []);

  const sortPedidos = (a, b) => {
    if (selected === "ASC") {
      if (a.Estado > b.Estado) return 1;
      if (b.Estado > a.Estado) return -1;
    } else {
      if (a.Estado > b.Estado) return -1;
      if (b.Estado > a.Estado) return 1;
    }

    if (selected === "DEFAULT") {
      return a;
    }
  };

  return (
    <>
      <H1>Administrador de Pedidos</H1>

      <Select onChange={(e) => setSelected(e.target.value)}>
        <Option value="Ordenar por estado">Ordenar por estado</Option>
        <Option value="ASC">Menor a Mayor</Option>
        <Option value="DES">Mayor a Menor</Option>
      </Select>

      <BuscarPedido pedidos={pedidos} pedido={pedido} setPedido={setPedido} />
      <Container pedido={pedido}>
        {pedidos &&
          pedidos
            ?.sort(sortPedidos)
            .map((e) => <Pedido key={e.id} producto={e} />)}
      </Container>
    </>
  );
}

export default Pedidos;
