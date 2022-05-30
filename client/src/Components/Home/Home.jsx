import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Boton, Producto } from "../index";
import styled from "styled-components";
import "./Home.css";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { getProductos } from "../../Redux/actions";

const Container = styled.div`
  height: 100vh;
  // margin-top: 50px;
`;

const Categoria = styled.div`
  height: 600px;
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
  height: 500px;
  object-fit: cover;
  opacity: 0.5;

  // margin-top: 50px;
`;

const Text = styled.div`
  position: absolute;
  bottom: 50%;
  top: 45%;
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
  height: 500px;
  position: relative;
  z-index: 1;
  background-color: Black;
`;

export default function Home({ contacto }) {
  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();
  const location = useLocation();
  const [destacados, setDestacados] = useState();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    localStorage.removeItem("productos");
    dispatch(getProductos());
  }, []);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    setDestacados(Math.floor(width / 250));
  }, [width]);

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
                  stock={producto.stock}
                  descripcion={producto.descripcion}
                  location={location}
                  producto={producto}
                />
              );
            })}
          </Productos>
        </div>

        <Link to="/tienda">
          <Boton texto="Mas productos" />
        </Link>
      </Categoria>

      {/* <Categoria>
        <P>BLOG</P>
        <Link to="/blog">
          <Boton texto="Mas notas" />
        </Link>
      </Categoria> */}

      <Footer contacto={contacto} />
      <ScrollToTop />
    </Container>
  );
}
