import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort, getCategorias } from "../../Redux/actions";

export default function Filtros({ setSelected }) {
  const [typesOfDiets, setDiets] = useState([]);
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const categorias = useSelector((state) => state.categorias);

  // useEffect(() => {
  //   if (productos.length > 0) {
  //     const typesAux = productos?.map((food) => {
  //       return food.diets?.map((diet) => {
  //         return diet.charAt(0).toUpperCase() + diet.slice(1);
  //       });
  //     });

  //     setDiets([...new Set(typesAux.flat())]);
  //   }
  // }, [productos]);

  //   useEffect(() => {
  //     if (typesOfDiets.length > 0) {
  //         dispatch(getCategorias(typesOfDiets));
  //     }
  //   }, [typesOfDiets]);

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
        <select
          name="sort"
          id="sort"
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option value="DEFAULT">Ordenar por Nombre</option>
          <option value="A-Z">A - Z</option>
          <option value="Z-A">Z - A</option>
        </select>
        <select
          name="points"
          id="points"
          defaultValue="DEFAULT"
          onChange={(e) => {
            handleOnChange(e);
          }}
        >
          <option value="DEFAULT">Ordenar por Precio</option>
          <option value="Highest SpoonScore">Mayor a menor</option>
          <option value="Lowest SpoonScore">Menor a mayor </option>
        </select>

        <select
          name="diets"
          id="diets"
          defaultValue="DEFAULT"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="DEFAULT">Categorias</option>
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
        </select>
      </div>
    </div>
  );
}
