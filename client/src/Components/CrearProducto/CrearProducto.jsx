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
import { Modal, Loading, AgregarCategorias } from "../index";

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  // margin-bottom: 2em;
  height: 80vh;
`;
const Encabezado = styled.div`
  padding-top: 5em;
`;
const Titulo = styled.h2`
  color: #4b6650;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  position: relative;
  justify-content: center;
  gap: 2em;
  align-items: center;
  background-color: white;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
  box-shadow: 0 0 6px 0 rgba(255, 255, 255, 0.8);
  height: 100%;
  @media screen and (max-width: 560px) {
    width: 100%;
    border: none;
    display: flex;
    flex-direction: column;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
  align-items: center;
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 8px;
  justify-content: space-evenly;
  @media screen and (max-width: 960px) {
    width: 40%;
    border: none;
  }
  @media screen and (max-width: 560px) {
    margin-top: 80vh;
    width: 70%;
    border: none;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  align-items: center;
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 8px;
  position: relative;
  @media screen and (max-width: 960px) {
    width: 40%;
    border: none;
  }
  @media screen and (max-width: 560px) {
    margin-top: 0;
    width: 70%;
    border: none;
  }
`;

const Input = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px;
  width: 80%;
  @media screen and (max-width: 960px) {
    margin: 15px;
    width: 100%;
  }
`;

const Errors = styled.span`
  position: absolute;
  bottom: -20px;
  width: 100%;
  left: 0;
  font-size: 12px;
  font-weight: 500;
  color: #951414d9;
`;

const SelectorImagen = styled.input`
  width: 90%;
  height: 300px;
  left: 5%;
  right: 5%;
  margin: auto;
  position: absolute;
  color: transparent;
  z-index: 0;
  border-radius: 5px;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

const Imagen = styled.img`
  height: 300px;
  width: 90%;
  object-fit: contain;
  background-color: white;
  border: 1px solid black;
  z-index: 2;
  border-radius: 5px;
`;

const Button = styled.button`
  position: absolute;
  bottom: 35px;
  width: 80%;
  background: #37563d;
  display: block;
  height: 40px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin: 40px 0px 0px 0px;
  margin: auto;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    height: 30px;
  }
  @media screen and (max-width: 560px) {
    margin-top: 15px;
    position: revert;
  }
`;

const CrearCat = styled.div`
  position: absolute;
  bottom: 15%;
  width: 80%;
  left: 10%;
  right: 10%;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
  @media screen and (max-width: 560px) {
    position: revert;
  }
`;

const TitCat = styled.h3`
  text-align: center;
  padding: 0px 5px;
`;

const InCat = styled.input`
  padding: 4px 0px;
  border: none;
  border-bottom: 1px solid black;
`;

const ButtonCat = styled.button`
  background: #37563d;
  width: 80px;
  height: 30px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin-left: 10px;
  margin-top: 10px;
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
  const [stateModalPut, setStateModalPut] = useState(false);
  const [stateModalImg, setStateModalImg] = useState(false);
  const [creado, setCreado] = useState(false);

  const [categorias, setCategorias] = useState([]),
    [errors, setErrors] = useState({}),
    [post, setPost] = useState({
      nombre: "",
      descripcion: "",
      imagen: "",
      categorias: [],
    }),
    [loading, setLoading] = useState(false),
    [categoria, setCategoria] = useState({ nombre: "" }),
    [imageSelected, setImageSelected] = useState();

  useEffect(() => {
    if (id) {
      dispatch(getDetail(id));
    } else {
      setPost({
        nombre: "",
        descripcion: "",
        precio: 0,
        imagen: "",
        stock: 0,
        categorias: [],
      });
    }
  }, [dispatch, id]);

  useEffect(() => {
    setPost({
      nombre: detalle.nombre,
      descripcion: detalle.descripcion,
      precio: detalle.precio,
      imagen: detalle.imagen,
      stock: detalle.stock,
      categorias: detalle.categoria,
    });

    setImageSelected(detalle.imagen);
  }, [detalle]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  useEffect(() => {
    setCategorias(categorías);
  }, [categorías]);

  function handleInputCambio(e) {
    // Cada vez que escribo se actualiza el state de categoria
    setCategoria({
      id: categorias.length + 1,
      nombre: e.target.value,
    });

    // Pero si damos enter se guarda
    if (e.key === "Enter") {
      handleSub(e);

      setCategorias([
        ...categorias,
        {
          id: categorias.length + 1,
          nombre: e.target.value,
        },
      ]);
    }
  }

  function handleSub(e) {
    e.preventDefault();

    const inputNewCat = document.getElementById("crear-categoria");

    if (inputNewCat.value) {
      dispatch(postCategoria(categoria));
      setStateModalCat(!stateModalCat);
    } else {
      errors.crearCategoria = "Debe crear una categoria";
    }
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
          loading,
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
          loading,
        })
      );
    }
  }

  function handleImageChange(changeEvent) {
    setLoading(true);
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSelected(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  function uploadImagen() {
    const formData = new FormData();

    formData.append("file", imageSelected);
    formData.append("upload_preset", "upvzhism");

    axios
      .post("http://api.cloudinary.com/v1_1/henrypfinal/image/upload", formData)
      .then((res) => {
        setPost({ ...post, imagen: res.data.secure_url });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setStateModalImg(true);
        setImageSelected();
      });
  }

  useEffect(() => {
    if (imageSelected) {
      uploadImagen();
    }
    // eslint-disable-next-line
  }, [imageSelected]);

  useEffect(() => {
    // Eliminamos el error del state de errores
    setErrors(() => {
      const state = { ...errors };

      delete state.imagen;
      return state;
    });
    // eslint-disable-next-line
  }, [post.imagen]);

  function handleSubmit(e) {
    e.preventDefault();

    if (id) {
      dispatch(putProducto(id, post));

      setStateModalPut(!stateModalPut);
    } else {
      if (Object.values(errors).length > 0) {
        setStateModalProd(!stateModalProd);
      } else {
        dispatch(postProducto(post));
        setStateModalProd(!stateModalProd);

        setPost({
          nombre: "",
          descripcion: "",
          precio: 0,
          imagen: "",
          stock: 0,
          categorias: [],
        });

        setCreado(true);
        setImageSelected();
      }
    }
  }

  return (
    <>
      <Encabezado>
        {id ? (
          <Titulo>Editar Producto</Titulo>
        ) : (
          <Titulo>¡Agrega tus productos!</Titulo>
        )}

        {id ? (
          <p>
            Recorda que no podés dejar campos incompletos antes de guardar tu
            producto.
          </p>
        ) : (
          <p>
            Recorda completar todo los campos y la imagen para guardar tu nuevo
            producto.
          </p>
        )}
      </Encabezado>

      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
              {errors.nombre && <Errors>{errors.nombre}</Errors>}
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
              {errors.descripcion && <Errors>{errors.descripcion}</Errors>}
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
              {errors.precio && <Errors>{errors.precio}</Errors>}
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
              {errors.stock && <Errors>{errors.stock}</Errors>}
            </Input>

            <Input>
              <AgregarCategorias
                post={post}
                setPost={setPost}
                setErrors={setErrors}
                detalle={detalle}
                creado={creado}
              />

              {errors.categorias && <Errors>{errors.categorias}</Errors>}
            </Input>
          </Left>

          <Right>
            <Input style={{ cursor: loading ? "wait" : "auto" }}>
              <input
                className="input-create"
                type="text"
                placeholder="Imagen desde URL o archivo local"
                value={post.imagen}
                name="imagen"
                disabled={loading ? true : false}
                style={{ cursor: loading ? "wait" : "auto" }}
                onChange={(e) => {
                  handleInputChange(e);
                  setImageSelected(e.target.value);
                }}
              />

              <div style={{ margin: "20px 0px", position: "relative" }}>
                <SelectorImagen
                  className="input-create"
                  type="file"
                  name="imagen"
                  placeholder=" "
                  onChange={(e) => {
                    handleImageChange(e);

                    setImageSelected(post.imagen);
                  }}
                />

                <Imagen src={imageSelected} />
                {loading && <Loading />}
              </div>

              {errors.imagen && <Errors>{errors.imagen}</Errors>}
            </Input>

            <CrearCat>
              <TitCat>Crear Categoría</TitCat>
              <div className="form-create">
                <InCat
                  id="crear-categoria"
                  name="crear-categoria"
                  placeholder="Escribir nueva categoria"
                  type="text"
                  onKeyDown={(e) => handleInputCambio(e)}
                  onChange={(e) => handleInputCambio(e)}
                />
                <ButtonCat onClick={(e) => handleSub(e)}>Agregar</ButtonCat>
              </div>
            </CrearCat>

            {id ? (
              <Button type="submit">Editar producto</Button>
            ) : (
              <Button type="submit">¡Crear producto!</Button>
            )}
          </Right>
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

        <Modal state={stateModalPut} setStateModal={setStateModalPut}>
          <ParrafoOk>¡Cambios realizados con éxito!</ParrafoOk>
        </Modal>

        <Modal state={stateModalImg} setStateModal={setStateModalImg}>
          <ParrafoOk>
            Ocurrió un error al añadir la imagen, por favor intente nuevamente
          </ParrafoOk>
        </Modal>
      </Container>
    </>
  );
}
