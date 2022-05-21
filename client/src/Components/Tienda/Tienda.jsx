import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // getProductos,
  // getCategorias,
  filtrarCategorias,
  ordenarPorNombre,
  ordenarPorPrecio,
} from "../../Redux/actions/index";
import Producto from "../Producto/Producto";
import Paginado from "../Paginado/Paginado";
import { getProductos } from "../../Redux/actions/index";
import "./Tienda.css";
import styled from "styled-components";
import image from "./cuchara-cafe3.jpg";
import Footer from "./../Footer/Footer";
import ScrollToTop from "./../ScrollToTop/ScrollToTop";

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

const Filtros = styled.div`
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
  margin-top: 3rem;
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
  height: 225px;
  border-radius: 8px;
  margin-top: 2rem;
  position: relative;
  margin: auto;
  margin-top: 2rem;
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
`;

const Tienda = styled.h1`
  margin-top: 100px;
  padding: 30px;
  color: #222;
  font-size: 50px;
  font-family: Poppins;
  text-shadow: 0px 1px 1px #222, 1px -1px 0 darkgrey;
`;

function Shop({ contacto }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productos);
  const catego = useSelector((state) => state.categorias);
  const [cambio, setCambio] = useState(true);

  useEffect(() => {
    if (product.length === 0) dispatch(getProductos());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productosPerPage = 12;
  const ultimoProducto = productosPerPage * currentPage;
  const primerProducto = ultimoProducto - productosPerPage;
  // const currentProductos = product.slice(primerProducto, ultimoProducto);

  const [currentProductos, setCurrentProductos] = useState([]);

  useEffect(() => {
    setCurrentProductos(product.slice(primerProducto, ultimoProducto));
  }, [product, primerProducto, ultimoProducto]);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  function handleFilterByCategories(e) {
    dispatch(filtrarCategorias(e.target.value));
  }

  function handleOrderByName(e) {
    dispatch(ordenarPorNombre(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  function handleOrderByPrice(e) {
    dispatch(ordenarPorPrecio(e.target.value));
    cambio ? setCambio(false) : setCambio(true);
  }

  function onChangeHandle(e) {
    const value = e.target.value;

    const arrayAux = product.filter((prod) => {
      const name = prod.nombre.toLowerCase();
      const isVisible = name.includes(value.toLowerCase());

      if (isVisible) {
        return prod;
      }
    });

    setCurrentProductos(arrayAux);
  }

  return (
    <Container>
      {/* <div> */}
      <Tienda>Tienda</Tienda>
      {/* </div> */}

      {/* <div className="search"> */}
      {/* <form> */}
      <Buscador
        type="text"
        placeholder="Buscar productos..."
        onChange={(e) => {
          onChangeHandle(e);
        }}
      />
      {/* </form> */}
      {/* </div> */}

      <Header>
        <Imagen src={image} />
        <Marco />
        <TextoInfusion>INFUSION STORE</TextoInfusion>
      </Header>

      <TextoLinea>
        <Titulo>Nuestros Productos</Titulo>
        <Linea />
      </TextoLinea>

      <ContenedorFiltrosPro>
        <Filtros>
          <CuadradoFiltro>
            <LetraFiltro>Filtros</LetraFiltro>
            <select
              onChange={(e) => handleOrderByName(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                Orden Alfabético
              </option>
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

            <select
              onChange={(e) => handleOrderByPrice(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                Orden Por Precio
              </option>
              <option value="asc">Higher</option>
              <option value="desc">Lower</option>
            </select>

            <select
              onChange={(e) => handleFilterByCategories(e)}
              defaultValue="default"
            >
              <option value="default" disabled>
                Categorías
              </option>
              {catego &&
                catego.map((d) => (
                  <option value={d.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
          </CuadradoFiltro>
        </Filtros>
        <div>
          <ProductosTienda>
            {currentProductos &&
              currentProductos.map((el) => {
                return (
                  <Producto
                    key={el.id}
                    id={el.id}
                    imagen={el.imagen}
                    nombre={el.nombre}
                    precio={el.precio}
                    descripcion={el.descripcion}
                  />
                );
              })}
          </ProductosTienda>
          <Paginado
            ProdPerPage={productosPerPage}
            totalProd={product?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </ContenedorFiltrosPro>
    </Container>

      <Footer contacto={contacto} />

      <ScrollToTop />
  );
}

export default Shop;
