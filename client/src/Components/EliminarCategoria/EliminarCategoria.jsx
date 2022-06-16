import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoria, getCategorias } from "../../Redux/actions";
import styled from "styled-components";
import CrearCat from "../Admin/CrearCat/CrearCat";

const Categoria = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 30px;
  padding: 7px;
  border: none;
  background-color: transparent;
  cursor: pointer;
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

export default function EliminarCategoria() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const [categoria, setCategoria] = useState(false);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  function handleClick() {
    setCategoria(true);
  }

  return (
    <div style={{ height: "100%" }}>
      <h1
        style={{
          fontSize: "20px",
          fontFamily: "Poppins",
          fontWeight: 600,
          paddingBottom: "20px",
          textAlign: "start",
        }}
      >
        Administrador de Categorias
      </h1>

      <Crear onClick={handleClick}>Crear</Crear>
      {categoria ? (
        <CrearCat setCategoria={setCategoria} />
      ) : (
        categorias &&
        categorias.map((d) => (
          <Categoria key={d.id}>
            <span>{d.nombre}</span>
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch(deleteCategoria(d.id));
                // dispatch(getCategorias());
              }}
            >
              🗑
            </Button>
          </Categoria>
        ))
      )}
    </div>
  );
}
