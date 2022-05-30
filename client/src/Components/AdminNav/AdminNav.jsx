import React, { useEffect } from "react";
import "./AdminNav.css";
import { useSelector, useDispatch } from "react-redux";
import { getCategorias, getProductos, getUsuarios } from "../../Redux/actions";

export default function AdminNav({ setCartas }) {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias);
  const productos = useSelector((state) => state.productos);
  const usuarios = useSelector((state) => state.usuarios);
  const pedidos = useSelector((state) => state.pedidos);

  function handleClick(e) {
    if (e.target.name === "usuarios") dispatch(getUsuarios);
    if (e.target.name === "categorias") dispatch(getCategorias);
    if (e.target.name === "productos") dispatch(getProductos);
    if (e.target.name === "pedidos") dispatch(pedidos);
  }

  useEffect(() => {
    setCartas(productos);
  }, [productos]);

  useEffect(() => {
    setCartas(categorias);
  }, [categorias]);

  useEffect(() => {
    setCartas(usuarios);
  }, [usuarios]);

  return (
    <div className="side-bar">
      <ul className="menu">
        <li className="item" name="usuarios" onClick={handleClick}>
          USUARIOS
        </li>
        <li className="item" name="categorias" onClick={handleClick}>
          CATEGORIAS
        </li>
        <li className="item" name="productos" onClick={handleClick}>
          PRODUCTOS
        </li>
        <li className="item" name="pedidos" onClick={handleClick}>
          PEDIDOS
        </li>
        <li className="item" name="perfil" onClick={handleClick}>
          MI PERFIL
        </li>
        <li className="item" name="natificaciones" onClick={handleClick}>
          NOTIFICACIONES
        </li>
      </ul>
    </div>
  );
}
