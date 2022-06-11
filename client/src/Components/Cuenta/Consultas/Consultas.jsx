import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enviarConsulta } from "../../../Redux/actions";
import Swal from "sweetalert2";

const Contenedor = styled.div`
  margin-top: 20px;
  background-color: white;
  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
  }
`;

const Titulo = styled.h2`
  color: #4b6650;
  margin-bottom: 10px;
  @media screen and (max-width: 450px) {
    font-size: 20px;
  }
  @media screen and (max-width: 380px) {
    font-size: 15px;
  }
  @media screen and (max-width: 315px) {
    font-size: 12px;
  }
`;

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  margin-bottom: 40px;
  height: 80vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 1px solid;
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

const Input = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 30px;
  width: 80%;
`;
const Select = styled.select`
  border: 1px solid #222;
  border-radius: 2px;
  padding: 10px;
  margin: 2px;
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

const Boton = styled.button`
  display: block;
  position: absolute;
  margin: 5px 5px 5px 5px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background-color: ;
  @media screen and (max-width: 450px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 380px) {
    width: 17px;
    height: 17px;
  }
`;

function validate(post) {
  let errors = {};
  if (!post.mail) {
    errors.mail = "Ingresa tu Email";
  }
  if (!post.nombre) {
    errors.nombre = "Ingresar tu nombre";
  }
  if (!post.text) {
    errors.text = "Escribe tu consulta";
  }

  return errors;
}

export default function Consultas() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState({
    mail: "",
    subject: "",
    text: "",
  });
  const [show, setShow] = useState(true);

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
  function sweetAlert() {
    Swal.fire({
      title: "Mensaje Siendo enviado",
      text: "Gracias por su aporte",
      icon: "success",
      iconColor: "green",
      color: "#222",
      confirmButtonColor: "green",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "Mensaje enviado!",
          icon: "success",
          iconColor: "green",
          color: "#222",
          showConfirmButton: false,
          timer: "1500",
          toast: true,
        });
      }
    });
  }
  function handleClick() {
    setShow((current) => !current);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (post !== undefined) {
      dispatch(enviarConsulta(post));
      sweetAlert();
      setPost({ mail: "", subject: "", text: "" });
    }
  }
  return (
    <Contenedor style={{ display: show ? "block" : "none" }}>
      <Boton onClick={handleClick}>X</Boton>
      <Titulo>Consultanos o Reclamanos!</Titulo>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input>
            <input
              className="input-create"
              type="mail"
              value={post.mail}
              name="mail"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label>Mail</label>
            {errors.mail && <Errors>{errors.mail}</Errors>}
          </Input>
          <Select
            name="subject"
            value={post.subject}
            onChange={(e) => {
              handleInputChange(e);
            }}
            placeholder="tipo"
          >
            <option value="DEFAULT">Consulta/Reclamo</option>
            <option value="Consulta">Consulta</option>
            <option value="Reclamo">Reclamo</option>
          </Select>

          <Input>
            <textarea
              className="textarea-create"
              value={post.text}
              name="text"
              rows="3"
              placeholder=" "
              onChange={(e) => handleInputChange(e)}
            />
            <span className="barra"></span>
            <label>Consulta:</label>
            {errors.text && <Errors>{errors.text}</Errors>}
          </Input>
          <Button type="submit">¡Enviar!</Button>
        </Form>
      </Container>
    </Contenedor>
  );
}
