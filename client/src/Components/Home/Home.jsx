import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Boton, Producto } from "../index";
import styled from "styled-components";
import "./Home.css";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const Container = styled.div`
  height: 100vh;
  // margin-top: 50px;
`;

const Categoria = styled.div`
  height: 560px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  padding: 30px;
`;

const Productos = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  opacity: 0.5;

  // margin-top: 50px;
`;

const Text = styled.div`
  position: absolute;
  bottom: 50%;
  top: 50%;
  left: 30%;
  right: 30%;
  width: 40%;
`;

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: white;
`;

const SubTitle = styled.p`
  font-size: 15px;
  color: white;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: 700;
  padding: 0px 0px 20px 0px;
  color: black;
`;

const Header = styled.div`
  width: 100%;
  height: 600px;
  position: relative;
  z-index: 1;
  background-color: Black;
`;

export default function Home({ contacto }) {
  const productos = useSelector((state) => state.productos);

  const [destacados, setDestacados] = useState();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    setDestacados(Math.floor(width / 250));

    console.log("window inner height: ", window.innerHeight);

    console.log(
      "document Element client hieght: ",
      document.documentElement.clientHeight
    );

    console.log(
      "document Element scroll hieght: ",
      document.documentElement.scrollHeight
    );

    console.log(
      "document Element offset height: ",
      document.documentElement.offsetHeight
    );

    console.log(
      "document element scrolltop: ",
      document.documentElement.scrollTop
    );

    console.log("window page Y Offset: ", window.pageYOffset);

    console.log(
      "window document body offsetheight: ",
      window.document.body.offsetHeight
    );
  });

  return (
    <Container>
      <Header>
        <Image
          src="https://img.freepik.com/foto-gratis/tazones-cucharas-infusiones_23-2148555468.jpg"
          alt=""
        />
        <Text>
          <Title>Infusion Store</Title>
          <SubTitle>Empezá tu día con una buena infusión</SubTitle>
        </Text>
      </Header>

      <Categoria>
        <P>NUESTROS PRODUCTOS</P>

        <div className="div-productos">
          <Productos className="contenedor-productos">
            {productos.slice(0, destacados)?.map((producto) => {
              return (
                <Producto
                  className="box-producto"
                  key={producto.id}
                  id={producto.id}
                  imagen={producto.imagen}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  descripcion={producto.descripcion}
                />
              );
            })}
          </Productos>
        </div>

        <Link to="/tienda">
          <Boton texto="Mas productos" />
        </Link>
      </Categoria>

      <Categoria>
        <P>BLOG</P>
        <Link to="/blog">
          <Boton texto="Mas notas" />
        </Link>
      </Categoria>

      <Footer contacto={contacto} />
      <ScrollToTop />
    </Container>
  );
}
