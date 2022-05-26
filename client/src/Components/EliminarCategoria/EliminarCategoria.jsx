import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoria, getCategorias } from "../../Redux/actions";

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
    dispatch(deleteCategoria(categoria));
  }

  return (
    <div style={{ height: "100vh" }}>
      <form style={{ paddingTop: "100px" }} onSubmit={handleSubmit}>
        <div>Eliminar Categoría</div>
        <select
          onChange={(e) => handleSelectCategorias(e)}
          defaultValue="default"
        >
          <option value="default" disabled>
            Elegir categorías
          </option>

          {categorias &&
            categorias.map((d) => (
              <option value={d.id} key={d.id}>
                {d.nombre}
              </option>
            ))}
        </select>
        <button type="submit">Borrar</button>
      </form>
    </div>
  );
}
