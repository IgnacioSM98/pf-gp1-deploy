import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias, postCategoria } from "../../../Redux/actions";

export default function CrearCat({ setCategoria }) {
  const [input, setInput] = useState({ nombre: "" });
  const categorias = useSelector((state) => state.categorias);
  const dispatch = useDispatch();

  useEffect(() => {}, [categorias]);

  function handleChange(e) {
    setInput({ id: categorias.length + 1, nombre: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postCategoria(input));
    setCategoria(false);
    dispatch(getCategorias());
  }

  return (
    <div className="form-create">
      <input
        id="crear-categoria"
        name="crear-categoria"
        placeholder=" "
        type="text"
        value={input.nombre}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)}>Agregar</button>
    </div>
  );
}
