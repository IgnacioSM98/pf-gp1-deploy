import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  margin-top: 30px;
`;

const Cont = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px;
`;

export default function CarritoItem(props) {
  return (
    <div>
      <Container>
        <div>{props.id}</div>
        <Cont>
          <p>{props.nombre}</p>
          <p>Precio por unidad:${props.precio}</p>
        </Cont>
      </Container>
    </div>
  );
}
