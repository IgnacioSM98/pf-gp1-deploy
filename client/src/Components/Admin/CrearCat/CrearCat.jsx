import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getCategorias, postCategoria } from "../../../Redux/actions";

export default function CrearCat({ setCategoria }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setInput(e.target.value);
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
        placeholder="Escribir nueva categoria"
        type="text"
        value={input}
        onChange={(e) => handleChange(e)}
      />
      <button onClick={(e) => handleSubmit(e)}>Agregar</button>
    </div>
  );
}
