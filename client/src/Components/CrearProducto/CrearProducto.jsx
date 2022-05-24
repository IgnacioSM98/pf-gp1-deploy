import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategorias,
  postProducto,
  postCategoria,
  getDetail,
  putProducto,
} from "../../Redux/actions";
import "./CrearProducto.css";
import styled from "styled-components";
import validate from "./validaciones.js";
import { useParams } from "react-router-dom";
import { Modal } from "../index";
import AgregarCategorias from "../AgregarCategorias/AgregarCategorias";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.8);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const Input = styled.div`
  position: relative;
  margin: 45px;
  width: 80%;
`;

const Imagen = styled.img`
  height: 300px;
  width: 300px;
  object-fit: contain;
`;

const Button = styled.button`
  position: absolute;
  bottom: 0;
  background: #870000;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to left, #190a05, #870000);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to left, #190a05, #870000);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: block;
  width: 100px;
  height: 40px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin: 10px 0px;
  margin: auto;
  cursor: pointer;
`;

const ParrafoAlerta = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: red;
`;
const ParrafoOk = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
const ParrafoCat = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default function CrearProducto() {
  const dispatch = useDispatch();
  const categorías = useSelector((state) => state.categorias);
  const { id } = useParams();
  const detalle = useSelector((state) => state.detalle);

  const [stateModalProd, setStateModalProd] = useState(false);
  const [stateModalCat, setStateModalCat] = useState(false);

  const [categorias, setCategorias] = useState([]),
    [errors, setErrors] = useState({}),
    [post, setPost] = useState({
      nombre: "",
      descripcion: "",
      precio: 0,
      imagen: "",
      stock: 0,
      categorias: [],
    }),
    [categoria, setCategoria] = useState({ nombre: "" }),
    [cambio, setCambio] = useState(false),
    [imageSelected, setImageSelected] = useState();

  useEffect(() => {
    if (id) dispatch(getDetail(id));
  }, []);

  useEffect(() => {
    setPost({
      ...post,
      nombre: detalle.nombre,
      descripcion: detalle.descripcion,
      precio: detalle.precio,
      imagen: detalle.imagen,
      stock: detalle.stock,
    });

    setImageSelected(detalle.imagen);
  }, [detalle]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  useEffect(() => {
    setCategorias(categorías);
  }, [categorías]);

  function handleOpenCategoria(e) {
    e.preventDefault();
    cambio ? setCambio(false) : setCambio(true);
  }

  function handleInputCambio(e) {
    setCategoria({
      id: categorias.length + 1,
      nombre: e.target.value,
    });
  }

  function handleSub(e) {
    e.preventDefault();
    setCategorias([...categorias, categoria]);
    dispatch(postCategoria(categoria));
    // alert("¡Categoría creada con éxito!");
    setStateModalCat(!stateModalCat);
  }

  function handleInputChange(e) {
    if (e.target.name === "precio" || e.target.name === "stock") {
      setPost({
        ...post,
        [e.target.name]: Number(e.target.value),
      });

      setErrors(
        validate({
          ...post,
          [e.target.name]: Number(e.target.value),
        })
      );
    } else {
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
  }

  function handleImageChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSelected(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  useEffect(() => {
    if (imageSelected) {
      uploadImagen();
    }
  }, [imageSelected]);

  function uploadImagen() {
    const formData = new FormData();

    formData.append("file", imageSelected);
    formData.append("upload_preset", "upvzhism");

    axios
      .post("http://api.cloudinary.com/v1_1/henrypfinal/image/upload", formData)
      .then((res) => setPost({ ...post, imagen: res.data.secure_url }));
  }

  useEffect(() => {
    setErrors({ ...errors, imagen: null });
  }, [post.imagen]);

  function handleSelectCategorias(e) {
    if (!post.categorias.includes(e.target.value))
      setPost({
        ...post,
        categorias: [...post.categorias, e.target.value],
      });

    setErrors(
      validate({
        ...post,
        categorias: [...post.categorias, e.target.value],
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      dispatch(putProducto(id));
      alert("¡Cambios realizados con éxito!");
    } else {
      if (Object.values(errors).length > 0) {
        alert("Por favor rellenar todos los campos");
      } else {
        dispatch(postProducto(post));
        // alert("¡Producto creado con éxito!");
        setStateModalProd(!stateModalProd);
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {id ? (
          <h1 className="titulo-form">Completar los campos a editar</h1>
        ) : (
          <h1 className="titulo-form">Completar todos los campos</h1>
        )}
        <Left>
          <Input>
            <input
              className="input-create"
              type="text"
              value={post.nombre}
              name="nombre"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Nombre</label>
            {errors.nombre && <p>{errors.nombre}</p>}
          </Input>

          <Input>
            <textarea
              className="textarea-create"
              value={post.descripcion}
              name="descripcion"
              rows="3"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Descripción</label>
            {errors.descripción && <p>{errors.descripción}</p>}
          </Input>

          <Input>
            <input
              className="input-create"
              type="number"
              min="0"
              value={post.precio}
              name="precio"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Precio</label>
            {errors.precio && <p>{errors.precio}</p>}
          </Input>

          <Input>
            <input
              className="input-create"
              type="number"
              min="0"
              value={post.stock}
              name="stock"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label className="label">Stock</label>
            {errors.stock && <p>{errors.stock}</p>}
          </Input>
        </Left>

        <Right>
          <Input>
            <input
              className="input-create"
              type="text"
              placeholder=" "
              value={post.imagen}
              name="imagen"
              onChange={(e) => {
                handleInputChange(e);
                setImageSelected(e.target.value);
              }}
            />

            <input
              className="input-create"
              type="file"
              name="imagen"
              placeholder=" "
              onChange={(e) => {
                handleImageChange(e);
              }}
            />

            <Imagen src={imageSelected} />

            <label className="label">Imagen desde URL o archivo local</label>
            {/* <span className="barra"></span> */}

            {errors.imagen && <p>{errors.imagen}</p>}
          </Input>

          <Input>
            {/* <select
              onChange={(e) => handleSelectCategorias(e)}
              className="barra"
              defaultValue="default"
            >
              <option value="default" disabled>
                Elegir categorías
              </option>

              {categorias &&
                categorias
                  .filter((categoria) => categoria.nombre)
                  .map((d) => (
                    <option value={d.nombre} key={d.id}>
                      {d.nombre}
                    </option>
                  ))}
            </select> */}
            <AgregarCategorias post={post} setPost={setPost} />
            {errors.categorías && <p>{errors.categorías}</p>}
          </Input>

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
        </Right>

        {id ? (
          <Button type="submit">Modificar</Button>
        ) : (
          <Button type="submit">¡Crear!</Button>
        )}
      </Form>
      <Modal state={stateModalProd} setStateModal={setStateModalProd}>
        {Object.values(errors).length > 0 ? (
          <ParrafoAlerta>Por favor rellenar todos los campos</ParrafoAlerta>
        ) : (
          <ParrafoOk>¡Producto creado con éxito!</ParrafoOk>
        )}
      </Modal>
      <Modal state={stateModalCat} setStateModal={setStateModalCat}>
        <ParrafoCat>¡Categoría creada con éxito!</ParrafoCat>
      </Modal>
    </Container>
  );
}
