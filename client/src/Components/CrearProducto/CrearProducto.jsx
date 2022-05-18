import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar";

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
  {
    /*const dispatch = useDispatch();*/
  }
  const [errors, setErrors] = useState({});
  {
    /*useEffect(() => {
      dispatch de una action que traeria las categorias para hacer un drop down abajo ?
    dispatch();
  }, []);*/
  }
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
    <div>
      <NavBar />
      <div>
        <h1>Completar todos los campos</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre</label>
            <input
              type="text"
              value={post.nombre}
              name="nombre"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div>
            <label>Descripción</label>
            <textarea
              value={post.descripción}
              name="descripción"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.descripción && <p>{errors.descripción}</p>}
          </div>
          <div>
            <label>Precio</label>
            <input
              type="number"
              min="0"
              value={post.precio}
              name="precio"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.precio && <p>{errors.precio}</p>}
          </div>
          <div>
            <label>Imagen</label>
            <input
              type="text"
              value={post.imagen}
              name="imagen"
              onChange={(e) => handleInputChange(e)}
            />
            {errors.imagen && <p>{errors.imagen}</p>}
          </div>
          <div>
            <select defaultValue="default">
              <option value="default" disabled>
                Elegir categoría
              </option>
              {/*Codigo de categorias // un map ? dunno */}
            </select>
            {errors.categoría && <p>{errors.categoría}</p>}
          </div>
          <button type="submit">¡Crear!</button>
        </form>
      </div>
    </div>
  );
}

export default CrearProducto;
