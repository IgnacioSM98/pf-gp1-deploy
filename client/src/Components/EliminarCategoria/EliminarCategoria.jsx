import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoria, getCategorias } from "../../Redux/actions";
import styled from "styled-components";

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

  &: hover {
    // background-color: red;
  }
`;

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

export default function EliminarCategoria() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const [categoria, setCategoria] = useState();

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  function handleSelectCategorias(e) {
    const seleccionada = e.target.value;
    setCategoria(seleccionada);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch(deleteCategoria(categoria));
  }

  return (
    <div style={{ height: "100vh" }}>
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

      <Crear>Crear</Crear>

      <form onSubmit={handleSubmit}>
        {categorias &&
          categorias.map((d) => (
            <Categoria key={d.id}>
              <span>{d.nombre}</span>

              <Button
                onClick={() => {
                  dispatch(deleteCategoria(d.id));
                  dispatch(getCategorias());
                }}
              >
                🗑
              </Button>
            </Categoria>
          ))}
      </form>
    </div>
  );
}
