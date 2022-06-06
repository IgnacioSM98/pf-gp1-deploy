import React from "react";
import styled from "styled-components";
import not from "../../Images/404.png";

const Image = styled.img`
  height: 100%;
  max-height: 1000px;
  width: 100%;
  max-width: 1000px;
  // margin: 50px;
  object-fit: contain;
  margin-top: 90px;
`;

export default function NotFound() {
  return <Image src={not} alt="not Found maquinola" />;
}
