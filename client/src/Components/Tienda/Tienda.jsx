import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getProductos, getProductosFiltrados } from "../../Redux/actions/index";
import { Producto, Paginado, Footer } from "../index";
import "./Tienda.css";
import styled from "styled-components";
import image from "./cuchara-cafe3.jpg";
import ScrollToTop from "./../ScrollToTop/ScrollToTop";
import Filtros from "../Filtros/Filtros";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const ContenedorFiltrosPro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
  max-width: 1300px;
`;

const FiltrosCont = styled.div`
  background-color: rgba(55, 86, 61, 0.6);
  width: 300px;
  height: 600px;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 2rem;
  box-shadow: 0px 2px 2px 0 #222, 0 2px 2px 0 #222;
`;

const CuadradoFiltro = styled.div`
  background: rgba(55, 86, 61, 0.4);
  width: 100%;
  height: 550px;
  display: flex;
  float: left;
  flex-direction: column;
  padding: 10px;
  border-radius: 15px;
`;

const LetraFiltro = styled.p`
  font-family: Poppins;
  font-size: 25px;
  color: #222;
  display: flex;
`;

const ProductosTienda = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 60px;
  margin: 2rem;
`;

const Linea = styled.hr`
  width: 70%;
  height: 0px;
  background-color: rgba(4, 4, 4, 1);
  margin-top: 1.5rem;
`;

const Titulo = styled.p`
  font-size: 25px;
  font-family: Poppins;
`;

const TextoLinea = styled.div`
  display: flex;
  width: 80%;
  max-width: 1433px;
  min-width: 1200px;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 2rem;
`;

const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const Header = styled.div`
  width: 70%;
  max-width: 1255px;
  height: 208px;
  border-radius: 8px;
  margin-top: 2rem;
  position: relative;
  margin: auto;
  margin-top: 4rem;
`;

const Marco = styled.div`
  width: 95%;
  height: 20vh;
  z-index: 3;
  border: 1px solid black;
  position: absolute;
  top: 10px;
  left: 20px;
  right: 20px;
  margin: auto;
  border-color: white;
  border-radius: 8px;
`;

const TextoInfusion = styled.div`
  position: absolute;
  top: 15px;
  left: 35px;
  font-family: Poppins;
  font-size: 25px;
`;

const Buscador = styled.input`
  background: rgba(55, 86, 61, 0.29);
  border: 1px solid #060606;
  border-radius: 8px;
  width: 500px;
  height: 40px;
  font-size: 15px;
  color: #222;
  box-shadow: 0 2px 2px 0 grey, 0 2px 2px 0 grey;
  border: none;
  outline: none;
  padding: 10px;
  &::-webkit-input-placeholder {
    font-size: 18px;
  }
  margin-top: 2em;
`;

const Tienda = styled.h1`
  margin-top: 29px;
  padding: 30px;
  color: #222;
  font-size: 50px;
  font-family: Poppins;
  text-shadow: 0px 1px 1px #222, 1px -1px 0 darkgrey;
`;

function Shop({ contacto }) {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const productosFiltrados = useSelector((state) => state.productosFiltrados);
  const [selected, setSelected] = useState("");
  const [pages, setPages] = useState(4);
  const [pageSelected, setPageSelected] = useState(1);
  const [resVis, setResVis] = useState(0);
  const [flag, setFlag] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (productos.length === 0) dispatch(getProductos());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setPages(Math.ceil(resVis / 9));
  }, [resVis]);

  useEffect(() => {
    setPages(Math.ceil(productos.length / 9));
  }, [productos]);

  useEffect(() => {
    setPages(Math.ceil(productosFiltrados.filter(filterDropdown).length / 9));
  }, [selected]);

  const filterPerPages = (food, i) => {
    if (i >= 9 * (pageSelected - 1) && i <= 9 * pageSelected - 1) {
      return food;
    }
  };

  function onChangeHandle(e) {
    const value = e.target.value;

    setResVis(0);
    setFlag(true);

    if (!value) {
      setFlag(false);
    }

    const arrayAux = productos.filter((producto) => {
      const name = producto.nombre.toLowerCase();
      const isVisible = name.includes(value.toLowerCase());

      isVisible && setResVis((prev) => prev + 1);

      if (isVisible) {
        return producto;
      }
    });
    dispatch(getProductosFiltrados(arrayAux));
  }

  const filterDropdown = (producto) => {
    if (
      !selected ||
      producto.categoria.find(
        (cate) => cate.nombre.toLowerCase() === selected.toLocaleLowerCase()
      )
    ) {
      return producto;
    }

    if (selected === "DEFAULT") {
      return producto;
    }
  };

  return (
    <Container>
      <Header>
        <Imagen src={image} />
        <Marco />
        <TextoInfusion>INFUSION STORE</TextoInfusion>
      </Header>

      {/* <Tienda>Tienda</Tienda> */}

      <Buscador
        type="text"
        placeholder="Buscar productos..."
        onChange={(e) => {
          onChangeHandle(e);
        }}
      />

      <TextoLinea>
        <Titulo>Nuestros Productos</Titulo>
        <Linea />
      </TextoLinea>

      <ContenedorFiltrosPro>
        <FiltrosCont>
          <CuadradoFiltro>
            <LetraFiltro>Filtros</LetraFiltro>
            <Filtros setSelected={setSelected} />
          </CuadradoFiltro>
        </FiltrosCont>
        <div>
          <ProductosTienda>
            {flag && productosFiltrados.length === 0 ? (
              //poner foto 404
              <p>tuki</p>
            ) : (
              <></>
            )}

            {productosFiltrados &&
              productosFiltrados
                .filter(filterDropdown)
                .filter(filterPerPages)
                .map((el) => {
                  return (
                    <Producto
                      key={el.id}
                      id={el.id}
                      imagen={el.imagen}
                      nombre={el.nombre}
                      precio={el.precio}
                      stock={el.stock}
                      descripcion={el.descripcion}
                      location={location}
                      categorias={el.categoria}
                    />
                  );
                })}
          </ProductosTienda>
          {pages > 0 ? (
            <Paginado pages={pages} setPageSelected={setPageSelected} />
          ) : (
            <></>
          )}
        </div>
      </ContenedorFiltrosPro>

      <Footer contacto={contacto} />
      <ScrollToTop />
    </Container>
  );
}

export default Shop;
