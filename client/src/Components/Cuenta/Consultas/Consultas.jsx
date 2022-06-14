import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { enviarConsulta } from "../../../Redux/actions";
import Swal from "sweetalert2";

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

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;
  margin-top: 20px;
  background-color: white;
  position: relative;

  @media screen and (max-width: 560px) {
    display: absolute;
    z-index: 1;
  }
`;

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
  // justify-content: space-between;
  margin-bottom: 40px;
  height: 60vh;
  width: 90%;
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
  font-size: 12px;
  font-weight: 500;
  color: #951414d9;
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

  @media screen and (max-width: 560px) {
    bottom: 15px;
  }
`;

const Boton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
  position: absolute;
  top: 0;
  margin: 5px 5px 5px 5px;
  right: 20px;
  width: 25px;
  height: 25px;
  background: #36885ed1;
  color: white;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  z-index: 2;

  @media screen and (min-width: 560px) {
    display: none;
  }
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
  const user = useSelector((state) => state.userInfo);
  const [errors, setErrors] = useState({});
  const [post, setPost] = useState({
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
      title: "Mensaje enviado",
      text: "Gracias por su aporte",
      icon: "success",
      iconColor: "green",
      color: "#222",
      confirmButtonColor: "green",
      confirmButtonText: "Ok",
    });
  }

  function handleClick(e) {
    e.preventDefault();

    setShow((current) => !current);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (post !== undefined) {
      dispatch(enviarConsulta({ ...post, mail: user.email }));
      sweetAlert();
      setPost({ subject: "", text: "" });
    }
  }

  return (
    <Contenedor style={{ display: show ? "flex" : "none" }}>
      <Boton onClick={handleClick}>X</Boton>
      <Titulo>Consultanos (o Reclamanos)</Titulo>
      <Container>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Input>
            <input
              className="input-create"
              type="mail"
              value={user.email}
              disabled
              name="mail"
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
