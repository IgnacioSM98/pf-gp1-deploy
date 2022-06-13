import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../Redux/actions";
import styled from "styled-components";

const Select = styled.select`
  height: 10%;
  width: 100%;
  border: none;
  border-radius: 2px;
  margin: 8px 0px;
  text-align: center;
  background: #2b71a378;
  border: solid 1px white;
  border-radius: 5px;
  color: white;
  overflow: hidden;
`;

export default function Filtros({ setSelected }) {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);

  useEffect(() => {
    if (categorias.length > 0) {
      localStorage.setItem("types", JSON.stringify(categorias));
    }
  }, [categorias]);

  const handleOnChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  return (
    <div className="filtros">
      <div>
        <Select
          name="sort"
          id="sort"
          size={3}
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option disabled value="DEFAULT">
            Ordenar por Nombre
          </option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </Select>
        <Select
          name="points"
          id="points"
          size={3}
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option disabled value="DEFAULT">
            Ordenar por Precio
          </option>
          <option value="Highest SpoonScore">Mayor a menor</option>
          <option value="Lowest SpoonScore">Menor a mayor </option>
        </Select>

        <Select
          name="diets"
          id="diets"
          size={categorias.length ? categorias.length + 1 : 1}
          defaultValue="DEFAULT"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option disabled value="DEFAULT">
            Categorias
          </option>

          {categorias.length > 0 ? (
            categorias
              // Filtramos las categorías que tengan nombre
              .filter((categoria) => categoria.nombre)
              // Mostramos todas las filtradas previamente
              .map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))
          ) : (
            <option>Loading....</option>
          )}
        </Select>
      </div>
    </div>
  );
}
