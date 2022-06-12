import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getFavoritos,
  getProductos,
  getProductosFiltrados,
} from "../../Redux/actions/index";
import {
  Producto,
  Paginado,
  Footer,
  Filtros,
  ScrollToTop,
  AgregarProducto,
} from "../index";
import "./Tienda.css";
import styled from "styled-components";
import image from "./cuchara-cafe3.jpg";

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
  @media screen and (max-width: 960px) {
    max-width: none;
    flex-direction: column;
  }
`;

const FiltrosCont = styled.div`
  background-color: #36885e6e;
  width: 300px;
  height: 350px;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 2rem;
  // box-shadow: 0px 2px 2px 0 #222, 0 2px 2px 0 #222;
  @media screen and (max-width: 960px) {
    width: auto;
    height: auto;
  }
`;

const CuadradoFiltro = styled.div`
  background: #36885e99;
  width: 100%;
  height: 300px;
  display: flex;
  float: left;
  flex-direction: column;
  padding: 10px;
  border-radius: 15px;
  @media screen and (max-width: 960px) {
    height: auto;
    float: none;
  }
`;

const LetraFiltro = styled.p`
  font-family: Poppins;
  font-size: 25px;
  color: #222;
  display: flex;
`;

const ProductosTienda = styled.div`
  width: 840px;
  min-height: 600px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px 60px;
  margin: 2rem;
  @media screen and (max-width: 960px) {
    min-height: none;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0;
    margin-top: 20px;
  }
  @media screen and (max-width: 560px) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Linea = styled.hr`
  width: 70%;
  height: 0px;
  background-color: rgba(4, 4, 4, 1);
  // margin-top: 1.5rem;
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
  align-items: center;
  margin-top: 2rem;

  position: relative;
  @media screen and (max-width: 960px) {
    max-width: none;
    min-width: 0;
  }
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
  height: 90%;
  z-index: 3;
  border: 1px solid black;
  position: absolute;
  top: 5%;
  bottom: 5%;
  left: 2.5%;
  right: 2.5%;
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
  font-size: 14px;
  color: #222;
  box-shadow: 0 2px 2px 0 grey, 0 2px 2px 0 grey;
  border: none;
  outline: none;
  padding: 10px;
  &::-webkit-input-placeholder {
    font-size: 18px;
  }
  margin-top: 2em;
  @media screen and (max-width: 960px) {
    width: 85%;
  }
`;

const Tienda = styled.h1`
  margin-top: 29px;
  padding: 30px;
  color: #222;
  font-size: 50px;
  font-family: Poppins;
  text-shadow: 0px 1px 1px #222, 1px -1px 0 darkgrey;
`;

const Crear = styled.button`
  // top: 660px;
  // top: 0;
  // right: 0;
  // position: absolute;
  height: 100%;
  width: 80px;
  background: #36885e;

  display: block;

  // height: 30px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  padding: 9px 20px;
  // margin: 40px 0px 0px 0px;
  // margin: auto;
  cursor: pointer;
  margin: 1px;

  &: hover {
    color: #36885ed1;
    background-color: white;
    border: 0.1px solid black;
    margin: 0px;
  }
`;

function Shop({ contacto }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productos = useSelector((state) => state.productos);
  const productosFiltrados = useSelector((state) => state.productosFiltrados);

  const user = useSelector((state) => state.userInfo?.visualizacion);
  const userInfo = useSelector((state) => state.userInfo);

  const [selected, setSelected] = useState("");
  const [pages, setPages] = useState(4);
  const [pageSelected, setPageSelected] = useState(1);
  const [resVis, setResVis] = useState(0);
  const [flag, setFlag] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // if (productos.length === 0) dispatch(getProductos());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (userInfo) dispatch(getFavoritos(userInfo.uid));
  }, [dispatch, userInfo]);

  useEffect(() => {
    setPages(Math.ceil(resVis / 9));
  }, [resVis]);

  useEffect(() => {
    setPages(Math.ceil(productos.filter(filterStock).length / 9));
  }, [productos]);

  useEffect(() => {
    setPages(Math.ceil(productosFiltrados.filter(filterDropdown).length / 9));
  }, [selected]);

  function onChangeHandle(e) {
    const value = e.target.value;

    setResVis(0);
    setFlag(true);
    setPageSelected(1);

    if (!value) {
      setFlag(false);
    }

    const arrayAux = productos.filter(filterStock).filter((producto) => {
      const name = producto.nombre.toLowerCase();
      const isVisible = name.includes(value.toLowerCase());

      isVisible && setResVis((prev) => prev + 1);

      if (isVisible) {
        return producto;
      }
    });

    dispatch(getProductosFiltrados(arrayAux));
  }

  const filterStock = (producto) => {
    if (producto.stock > 0) return producto;
  };

  const filterPerPages = (producto, i) => {
    if (i >= 9 * (pageSelected - 1) && i <= 9 * pageSelected - 1) {
      return producto;
    }
  };

  const filterDropdown = (producto) => {
    if (
      !selected ||
      producto.categoria.find(
        (cate) => cate.nombre.toLowerCase() === selected.toLowerCase()
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

      <Buscador
        type="text"
        placeholder="Buscar productos..."
        onChange={(e) => {
          onChangeHandle(e);
        }}
      />

      <TextoLinea>
        <Titulo>Nuestros Productos</Titulo>
        <Linea
          style={user === "admin" ? { width: "60%" } : { marginTop: "1.5rem" }}
        />
        {user === "admin" && (
          <Crear
            onClick={(e) => {
              e.preventDefault();
              navigate("/admin/crear");
            }}
          >
            Crear
          </Crear>
        )}
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
            {flag && productosFiltrados.length === 0 && (
              <p>No se encontraron resultados</p>
            )}
            {/* {admin === "admin" && <AgregarProducto />} */}

            {productosFiltrados &&
              productosFiltrados
                .filter(filterStock)
                .filter(filterDropdown)
                .filter(filterPerPages)
                .map((el) => {
                  // if (el.stock > 0) {
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
                      producto={el}
                    />
                  );
                  // }
                })}
          </ProductosTienda>

          {pages > 0 ? (
            <Paginado
              pages={pages}
              setPageSelected={setPageSelected}
              pageSelected={pageSelected}
            />
          ) : null}
        </div>
      </ContenedorFiltrosPro>

      <Footer contacto={contacto} />
      <ScrollToTop />
    </Container>
  );
}

export default Shop;
