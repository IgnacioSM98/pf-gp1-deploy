import React from "react";
import { Link } from "react-router-dom";
import Boton from "../Boton/Boton";
import Producto from "../Producto/Producto";
import styled from "styled-components";
import "./Home.css";

const Container = styled.div`
  height: 100vh;
  // margin-top: 50px;
`;

export default function Home() {
  return (
    <Container>
      <div className="Banner">
        <h1>Infusion Store</h1>
        <h4>Empezá tu día con una buena infusión</h4>
      </div>

      <div>
        <Link to="/tienda">
          <Boton texto="Mas productos" />
        </Link>
      </div>

      <div>
        <Link to="/blog">
          <Boton texto="Mas notas" />
        </Link>
      </div>
    </Container>
  );
}
