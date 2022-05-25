import React from "react";
import styled from "styled-components";

const ModalBack = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:999;
`;
const Modal = styled.div`
  width: 380px;
  height: 260px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 7px 29px 0px rgba(100, 100, 111, 0.2);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ContainerTitulo = styled.div`
  display:flex;
  gap:0.3em;
  width: 95%;
  position:absolute;
  top: 10px;
  left: 10px;
  border-bottom: 1px solid black;

`;

const Titulo = styled.p`
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0px;
`;


const TituloLight = styled.p`
  font-size: 20px;
  font-weight: 200;
  margin: 10px 0px;
`;
const Saludo = styled.p`

  font-size: 20px;
  font-weight: 700;
  margin-top: 40px;
  margin-bottom: 10px;
`;

const Boton = styled.button`
  color: ${(props) => (props.color ? props.color : "white")};
  font-weight: bold;
  background-color: ${(props) => (props.backcolor ? props.backcolor : "black")};
  border: none;
  border-radius: 8px;
  margin: 5px;
  height: 40px;
  width: 100px;
  padding: 2%;
  cursor: pointer;
  position:absolute;
  bottom: 10px;
`;

export default function ModalComp({children,  state , setStateModal}) {


  return (
    <>
      {state && (
        <ModalBack>
          <Modal>
            <ContainerTitulo>
            <Titulo>Infusion</Titulo><TituloLight>Store</TituloLight>
            </ContainerTitulo>
            <Saludo>Hola!</Saludo>
            {children}
            <Boton onClick={() => setStateModal(!state)}>Aceptar</Boton>
          </Modal>
        </ModalBack>
      )}
    </>
  );
}
