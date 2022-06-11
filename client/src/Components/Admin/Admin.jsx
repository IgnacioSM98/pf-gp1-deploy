import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getPedidos } from "../../Redux/actions";
import {
  Pedidos,
  AdminProductos,
  EliminarCategoria,
  Pedido,
  AdminReseñas,
  Usuarios,
} from "../index";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  padding-top: 8%;
  background-color: white;
  justify-content: center;
  @media screen and (max-width: 560px) {
    height: auto;
    display: flex;
    flex-direction: column;
  }
`;

const Informacion = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 80vh;
  background-color: white;
  border-radius: 10px;
  border: 2px solid black;
  margin-right: 3rem;
  position: relative;
  @media screen and (max-width: 560px) {
    width: 100%;
  }
`;

const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 60px;
  border: 1px solid #222;
  margin: 15px;
  margin-top: 30px;
  border-radius: 3px;
  margin-bottom: 40px;
`;

const Titulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 550;
  padding: 10px;
`;

const Botones = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  width: 100%;
`;

const Boton = styled.button`
  width: 100%;
  height: 60px;
  text-align: start;
  padding-left: 15px;
  font-size: 18px;
  font-family: Poppins;
  background-color: white;
  color: black;
  border: none;
  border-top: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
  }
  cursor: pointer;
`;

const Sesion = styled.button`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 65px;
  font-size: 20px;
  font-family: Poppins;
  background-color: #222;
  color: white;
  border: none;
  border-radius: 0px 0px 8px 8px;
`;

const Categorias = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 70vh;
  max-height: fit-content;
  width: 100%;
`;

const Categoria = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
`;

const Secciones = styled.p`
  display: flex;
  padding-bottom: 20px;
  font-size: 20px;
  font-family: Poppins;
  font-weight: 600;
`;

const ContainerPedidos = styled.div`
  height: 75vh;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px 12px;
  width: 100%;
  padding: 5px;
  border-radius: 8px;
  overflow-x: scroll;

  //ESTO ESTABA EN DEVELOP
  // height: 75vh;
  // padding-top: 20px;
  // display: flex;
  // flex-wrap: wrap;
  // width: 100%;
  // padding: 5px;
  // border-radius: 8px;
  // overflow-y: scroll;
`;

function Cuenta() {
  const pedidos = useSelector((state) => state.pedidos);
  const [detalle, setDetalle] = useState("principal");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPedidos());
  }, [dispatch]);

  return (
    <Container>
      <Options>
        <ContenedorTitulo>
          <Titulo>Infusion Store</Titulo>
        </ContenedorTitulo>

        <Botones>
          <Boton
            style={
              detalle === "usuarios"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("usuarios");
            }}
          >
            Usuarios
          </Boton>

          <Boton
            style={
              detalle === "categorias"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("categorias");
            }}
          >
            Categorias
          </Boton>

          <Boton
            style={
              detalle === "productos"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("productos");
            }}
          >
            Productos
          </Boton>

          <Boton
            style={
              detalle === "pedidos"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("pedidos");
            }}
          >
            Pedidos
          </Boton>

          <Boton
            style={
              detalle === "reseñas"
                ? { backgroundColor: "#222", color: "white" }
                : null
            }
            onClick={() => {
              setDetalle("reseñas");
            }}
          >
            Reseñas
          </Boton>
        </Botones>

        <Sesion>Panel de Administrador</Sesion>
      </Options>

      <Informacion>
        {detalle === "usuarios" && <Usuarios />}

        {detalle === "categorias" && <EliminarCategoria />}

        {detalle === "pedidos" && <Pedidos />}

        {detalle === "productos" && <AdminProductos />}

        {detalle === "reseñas" && <AdminReseñas />}

        {detalle === "principal" && (
          <Categorias>
            <Categoria>
              <Secciones>{`Pedidos a Despachar (totales: ${
                pedidos.filter(
                  (pedido) =>
                    pedido.Estado === "Creado" ||
                    pedido.Estado === "En preparación"
                ).length
              })`}</Secciones>

              <ContainerPedidos>
                {pedidos &&
                  pedidos
                    .filter(
                      (pedido) =>
                        pedido.Estado === "Creado" ||
                        pedido.Estado === "En preparación"
                    )
                    ?.map((e) => <Pedido key={e.id} producto={e} />)}
              </ContainerPedidos>
            </Categoria>
          </Categorias>
        )}
      </Informacion>
    </Container>
  );
}

export default Cuenta;
