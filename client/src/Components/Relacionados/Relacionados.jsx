import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 200px;
  height: 200px;
`;

export default function Relacionados({ relacionado }) {
  return (
    <div>
      <Img src={relacionado.imagen} alt="" />
      <p>{relacionado.precio}</p>
      <p>{relacionado.nombre}</p>
    </div>
  );
}
