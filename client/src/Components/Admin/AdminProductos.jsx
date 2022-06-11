import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getProductos, orderByStock } from "../../Redux/actions";
import "./AdminProductos.css";

const Container = styled.div`
  width: 100%;
`;

const Crear = styled.button`
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

const Grupo = styled.div`
  width: 100%;
  height: 75vh;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 12px;
  grid-auto-flow: dense;
  padding: 5px;
  overflow-y: scroll;
  @media screen and (max-width: 1530px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 1240px) {
    margin-top: 30px;
  }
  @media screen and (max-width: 860px) {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
  @media screen and (max-width: 560px) {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }
`;

const H1 = styled.h1`
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
  text-align: start;
`;

const Select = styled.select`
  top: 0;
  right: 100px;
  position: absolute;
  margin-bottom: 3em;
  width: 150px;
  height: 30px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-weight: bold;
  text-align: center;
`;

const Option = styled.option`
  border-radius: 8px;
  background-color: white;
`;

const ProdAdmin = styled.div`
  display: flex;
  flex-direction: row;
  width: 98%;
  height: 150px;
  position: relative;
  border-radius: 8px;
  -webkit-box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.26);
  box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.26);
  &: hover {
    border: 1px solid black;
    box-shadow: none;
  }
`;

const ContenedorImagen = styled.div`
  margin: 10px;
  width: 120px;
  height: 120px;
`;

const Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ContenedorDatos = styled.div`
  margin: 2px;
  width: 80%;
  height: 100px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 0.5em;
`;

const Titulo = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const Stock = styled.p`
  position: absolute;
  bottom: 15px;
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.alerta ? "red" : "black")};
`;

const Boton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 80px;
  height: 30px;
  background: white;
  border: 1px solid black;
  color: black;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &: hover {
    color: white;
    background-color: #37563d;
    border: none;
  }
`;

export default function AdminProductos() {
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductos());
  }, [dispatch]);

  const handleByStock = (e) => {
    dispatch(orderByStock(e.target.value));
  };

  return (
    <Container>
      <H1>Administrador de Productos</H1>

      <Select onChange={handleByStock}>
        <Option value="Ordenar por stock">Ordenar por stock</Option>
        <Option value="Menor a Mayor">Menor a Mayor</Option>
        <Option value="Mayor a Menor">Mayor a Menor</Option>
      </Select>

      <Crear
        onClick={(e) => {
          e.preventDefault();
          navigate("/admin/crear");
        }}
      >
        Crear
      </Crear>

      <Grupo>
        {productos?.map((el) => (
          <Link
            key={el.id}
            style={{ color: "black", textDecoration: "none" }}
            to={`/productos/${el.id}`}
          >
            <ProdAdmin>
              <ContenedorImagen>
                <Imagen src={el.imagen} alt="" />
              </ContenedorImagen>

              <ContenedorDatos>
                <Titulo>{el.nombre}</Titulo>
                <Stock alerta={el?.stock > 4 ? false : true}>
                  {`Stock: ${el.stock}`}
                </Stock>
              </ContenedorDatos>

              <Boton onClick={() => navigate(`/edit/${el.id}`)}>Editar</Boton>
            </ProdAdmin>
          </Link>
        ))}
      </Grupo>
    </Container>
  );
}
