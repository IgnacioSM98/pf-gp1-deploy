import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import Producto from "../Producto/Producto";
import { getProductos, orderByStock } from "../../Redux/actions";
import "./AdminProductos.css";

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

let Select = styled.select`
margin-bottom: 3em;
width: 150px;
height: 30px;
border-radius: 8px;
background-color: rgb(182, 182, 182);
font-weight: bold;
text-align: center;
`

let ProdAdmin = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  width: 350px;
  height: 160px;
  border: 1px solid black;
  position: relative;
  margin-bottom: 10px;
  border-radius: 8px;
`;
let ContenedorImagen = styled.div`
  margin: 10px;
  width: 120px;
  height: 120px;
`;
let Imagen = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

let ContenedorDatos = styled.div`
  margin: 2px;
  width: 300px;
  height: 100px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-top: 0.5em;
`;
let Titulo = styled.h3``;
let Stock = styled.p`
  font-size: 18px;
  font-weight: semi-bold;
  color: ${(props) => (props.alerta ? "red" : "black")};
`;
let Boton = styled.button`
  position: absolute;
  top: 80px;
  left: 230px;
  width: 80px;
  height: 30px;
  background: white;
  border: 1px solid black;
  color: black;
  border-radius: 4px;
  font-size: 16px;
  margin: 40px 0px 0px 0px;
  cursor: pointer;
`;

export default function AdminProductos() {
  const navigate = useNavigate();
  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getProductos());
  }, []);


const [order , setOrder] = useState("")

let handleByStock = (e) => {
  dispatch(orderByStock(e.target.value))
  setOrder(e.target.value)
}

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
      <Select onChange={handleByStock}>
        <option value="Ordenar por stock">Ordenar por stock</option>
        <option value="Menor a Mayor">Menor a Mayor</option>
        <option value="Mayor a Menor">Mayor a Menor</option>
      </Select>
      <Crear
        onClick={(e) => {
          e.preventDefault();
          navigate("/admin/crear");
        }}
      >
        Crear
      </Crear>
      <div className="grupo-productos">
        {productos?.map((el) => (
          <ProdAdmin key={el.id}>
            <Link to={`/productos/${el.id}`}>
              <ContenedorImagen>
                <Imagen src={el.imagen} alt="" />
              </ContenedorImagen>
            </Link>
            <ContenedorDatos>
              <Titulo>{el.nombre}</Titulo>
              <Stock alerta={el?.stock > 4 ? false : true}>
                Stock:
                {el.stock}
              </Stock>
            </ContenedorDatos>
            <Boton onClick={() => navigate(`/edit/${el.id}`)}>Editar</Boton>
            {/* imagen={el.imagen}
          nombre={el.nombre}
          precio={el.precio}
          stock={el.stock}
          descripcion=
          categorias={el.categoria} */}
          </ProdAdmin>
        ))}
      </div>
    </Container>
  );
}
