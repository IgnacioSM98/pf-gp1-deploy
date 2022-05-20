import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorias,
  postProducto,
  postCategoria,
} from "../../Redux/actions";
import NavBar from "../NavBar/NavBar";
import "./CrearProducto.css";

function validate(post) {
  let errors = {};
  if (!post.nombre) {
    errors.nombre = "Ingresar nombre del producto";
  }
  if (!post.descripción) {
    errors.descripción = "Escribe una breve descripción";
  }
  if (!post.precio || typeof post.precio !== "number") {
    errors.precio = "Ingresa un precio, que sea un numero";
  }
  if (!post.imagen) {
    errors.imagen = "Ingresar URL de alguna imagen representativa";
  }
  if (!post.stock || typeof post.stock !== "number") {
    errors.stock = "Ingresa un stock, que sea un numero";
  }
  if (!post.categoría) {
    errors.categoría = "Ingresar al menos 1 categoría";
  }
  return errors;
}

function CrearProducto() {
  const dispatch = useDispatch();
  const categorías = useSelector((state) => state.categorias);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  const [post, setPost] = useState({
    nombre: "",
    descripción: "",
    precio: 0,
    imagen: "",
    stock: 0,
    categorías: [],
  });
  const [cate, setCate] = useState({ categoría: "" });
  const [cambio, setCambio] = useState(false);
  function handleOpenCategoria() {
    cambio ? setCambio(false) : setCambio(true);
  }
  function handleInputCambio(e) {
    setCate({
      ...cate,
      [e.target.name]: e.target.value,
    });
  }
  function handleSub(e) {
    e.preventDefault();
    dispatch(postCategoria(cate));
    alert("¡Categoría creado con éxito!");
  }

  function handleInputChange(e) {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...post,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSelectCategorias(e) {
    if (!post.categorías.includes(e.target.value))
      setPost({
        ...post,
        categorías: [...post.categorías, e.target.value],
      });
    setErrors(
      validate({
        ...post,
        categorías: [...post.categorías, e.target.value],
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0)
      alert("Por favor rellenar todos los campos");
    else {
      dispatch(postProducto(post));
      alert("¡Producto creado con éxito!");
    }
  }

  return (
    <div className="form-backgr">
      <NavBar />
      <div className="contenedor-form">
        <form onSubmit={(e) => handleSubmit(e)} className="form-create">
          <h1 className="titulo-form">Completar todos los campos</h1>
          <div className="grupo">
            <input
              className="input-create"
              type="text"
              value={post.nombre}
              name="nombre"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Nombre</label>
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div className="grupo">
            <textarea
              className="textarea-create"
              value={post.descripción}
              name="descripción"
              rows="3"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Descripción</label>
            {errors.descripción && <p>{errors.descripción}</p>}
          </div>
          <div className="grupo">
            <input
              className="input-create"
              type="number"
              min="0"
              value={post.precio}
              name="precio"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Precio</label>
            {errors.precio && <p>{errors.precio}</p>}
          </div>
          <div className="grupo">
            <input
              className="input-create"
              type="text"
              value={post.imagen}
              name="imagen"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Imagen</label>
            {errors.imagen && <p>{errors.imagen}</p>}
          </div>
          <div className="grupo">
            <input
              className="input-create"
              type="number"
              min="0"
              value={post.stock}
              name="stock"
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Stock</label>
            {errors.stock && <p>{errors.stock}</p>}
          </div>
          <div className="grupo">
            <select
              onChange={(e) => handleSelectCategorias(e)}
              className="barra"
              defaultValue="default"
            >
              <option value="default" disabled>
                Elegir categorías
              </option>
              {categorías &&
                categorías.map((d) => (
                  <option value={d.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
            {errors.categorías && <p>{errors.categorías}</p>}
          </div>
          <button className="button-create" type="submit">
            ¡Crear!
          </button>
        </form>
        <div>
          <button onClick={handleOpenCategoria}>Crear Categoría</button>
          {cambio && (
            <form onSubmit={(e) => handleSub(e)} className="form-create">
              <label>Nueva Categoría</label>
              <input type="text" onChange={(e) => handleInputCambio(e)} />
              <button type="submit">Crear</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default CrearProducto;
