import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPedidos } from "../../Redux/actions";
import styled from "styled-components";
import { Pedido } from "../index";

const Container = styled.div`
  height: 80vh;

  padding-top: 20px;

  display: flex;
  flex-wrap: wrap;

  width: 100%;
  height: 75vh;

  padding: 5px;

  overflow-x: scroll;
`;

// const Crear = styled.button`
//   // top: 660px;
//   top: 0;
//   right: 0;
//   position: absolute;
//   width: 80px;
//   background: #37563d;

//   display: block;

//   height: 30px;
//   border: none;
//   color: white;
//   border-radius: 4px;
//   font-size: 16px;
//   margin: 40px 0px 0px 0px;
//   margin: auto;
//   cursor: pointer;
// `;

const Select = styled.select`
  top: 0;
  right: 0;
  position: absolute;

  margin-bottom: 3em;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-weight: bold;
  text-align: center;
`;

const Option = styled.option`
  border-radius: 8px;
  background-color: white;
`;

function Pedidos() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const pedidos = useSelector((state) => state.pedidos);

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

      {/* <Crear>Crear</Crear> */}
      <Select onChange={(e) => setSelected(e.target.value)}>
        <Option value="Ordenar por estado">Ordenar por estado</Option>
        <Option value="ASC">Menor a Mayor</Option>
        <Option value="DES">Mayor a Menor</Option>
      </Select>
      <Container>
        {pedidos &&
          pedidos
            ?.sort(sortPedidos)
            .map((e) => <Pedido key={e.id} producto={e} />)}
      </Container>
    </>
  );
}

export default Pedidos;
