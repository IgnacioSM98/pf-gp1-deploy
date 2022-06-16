import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Boton, Producto, UseOnScreen, Footer, ScrollToTop } from "../index";
import styled from "styled-components";
import "./Home.css";
import { getProductos, getFavoritos } from "../../Redux/actions";

const Container = styled.div`
  height: auto;
  width: 100vw;
  align-items: center;
  @media screen and (max-width: 960px) {
    width: 100vw;
    height: auto;
  }
  @media screen and (max-width: 560px) {
    heigth: auto;
  }
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
  width: 100vw;
  height: 500px;
  object-fit: cover;
  opacity: 0.5;

  @media screen and (max-width: 960px) {
    // display: flex;
    height: 30vh;
  }
`;

const Text = styled.div`
  position: absolute;
  bottom: 50%;
  top: 45%;
  left: 30%;
  right: 30%;
  width: 40%;

  @media screen and (max-width: 960px) {
    bottom: 20vh;
    top: 7vh;
    left: 25%;
    right: 25%;
  }

  @media screen and (max-width: 400px) {
    height: 140px;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
  color: white;

  @media screen and (max-width: 400px) {
    font-size: 30px;
  }
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

  @media screen and (max-width: 500px) {
    font-size: 15px;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  z-index: 1;
  background-color: Black;

  @media screen and (max-width: 960px) {
    display: flex;
    height: 30vh;
  }

  @media screen and (max-width: 400px) {
    display: flex;
    height: 30vh;
  }
`;

const filterStock = (producto) => {
  if (producto.stock > 0) return producto;
};

export default function Home({ contacto }) {
  const productos = useSelector((state) => state.productos.filter(filterStock));
  const dispatch = useDispatch();
  const location = useLocation();
  const [destacados, setDestacados] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const isVisible = UseOnScreen(contacto);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    localStorage.removeItem("productos");
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) dispatch(getFavoritos(userInfo?.uid));
  }, [dispatch, userInfo]);

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

      <Footer contacto={contacto} />
      {isVisible && <ScrollToTop />}
    </Container>
  );
}
