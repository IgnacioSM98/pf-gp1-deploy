import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;

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

export default function AdminProductos() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
          textAlign: "start",
        }}
      >
        Administrador de Productos
      </h1>

      <Crear
        onClick={(e) => {
          e.preventDefault();
          navigate("/admin/crear");
        }}
      >
        Crear
      </Crear>
    </Container>
  );
}
