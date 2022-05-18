import React, { useState } from "react";
import {useDispatch} from "react-redux"
import { searchProduct } from "../../Redux/actions";
import s from "./Buscador.module.css"


function Buscador() {
  let  [buscar , setBuscar] = useState('')
  const dispatch = useDispatch()

  function handleChange(e){
    setBuscar(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(searchProduct(buscar))
    setBuscar("")
  }


  return (
    <div>
      <form id={s.search} onSubmit={handleSubmit}>
        <input
          required
          value={buscar}
          type="search"
          onChange={handleChange}
          placeholder="Busca tus productos"
        />

        <button type="submit">Buscar</button>
      </form>
      <div></div>
    </div>
  )
}

export default Buscador;
