import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategorias } from "../../Redux/actions";
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
    categoría: [],
  });
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
  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0)
      alert("Por favor rellenar todos los campos");
    else {
      // agregar la action que tendria el dispatch
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
            <select className="barra" defaultValue="default">
              <option value="default" disabled>
                Elegir categoría
              </option>
              {categorías &&
                categorías.map((d) => (
                  <option value={d.name} key={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
            {errors.categoría && <p>{errors.categoría}</p>}
          </div>
          <button className="button-create" type="submit">
            ¡Crear!
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearProducto;
