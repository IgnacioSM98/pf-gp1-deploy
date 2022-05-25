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
import { Modal, Loading } from "../index";
import AgregarCategorias from "../AgregarCategorias/AgregarCategorias";

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
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 100%;
  // justify-content: center;
  align-items: center;
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 8px;
  justify-content: space-evenly;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  // justify-content: center;
  align-items: center;
  margin-top: 50px;
  border: 2px solid black;
  border-radius: 8px;
  position: relative;
`;

const Input = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 30px;
  width: 80%;
`;

const Errors = styled.span`
  position: absolute;
  bottom: -20px;
  width: 100%;

  left: 0;
  // white-space: nowrap;
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
  // background-color: red;
  z-index: 0;
  border-radius: 5px;
`;

const Imagen = styled.img`
  height: 300px;
  width: 90%;
  object-fit: cover;
  background-color: grey;
  z-index: 2;
  border-radius: 5px;
`;

const Button = styled.button`
  position: absolute;
  // top: 660px;
  bottom: 35px;
  width: 80%;
  background: #37563d;
  // /* fallback for old browsers */
  // background: -webkit-linear-gradient(to left, #190a05, #870000);
  // /* Chrome 10-25, Safari 5.1-6 */
  // background: linear-gradient(to left, #190a05, #870000);
  // /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  display: block;
  // width: 300px;
  height: 40px;
  border: none;
  color: white;
  border-radius: 4px;
  font-size: 16px;
  margin: 40px 0px 0px 0px;
  margin: auto;
  cursor: pointer;
`;

const SelectCat = styled.select`
  height: 30px;
  border: 1px solid black;
  border-radius: 6px;
`;

const CrearCat = styled.div`
  position: absolute;
  bottom: 15%;
  width: 80%;
  left: 10%;
  right: 10%;
  // padding-bottom: 3em;
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

  const [categorias, setCategorias] = useState([]),
    [errors, setErrors] = useState({}),
    [post, setPost] = useState({
      nombre: "",
      descripcion: "",
      //precio: 0,
      imagen: "",
      //stock: 0,
      categorias: [],
    }),
    [loading, setLoading] = useState(false),
    [categoria, setCategoria] = useState({ nombre: "" }),
    [cambio, setCambio] = useState(false),
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

    dispatch(postCategoria(categoria));
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
      console.log(errors);
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
      .then((res) => {
        setPost({ ...post, imagen: res.data.secure_url });
        setLoading(false);
      });
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
        loading,
      })
    );
  }

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
                type="text"
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
      </Container>
    </>
  );
}
