import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetalleEnvio,
  actualizarEstadoEnvio,
  quitarItem,
  mailAdmin,
} from "../../Redux/actions";
import { Footer, ScrollToTop, UseOnScreen, Loader } from "../index";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-top: 10%;
  margin: auto;
  gap: 4em;
  position: relative;
`;

const Envio = styled.div`
  display: flex;
  flex-direction: column;
`;

const Estado = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 350px;
  border: 1px solid black;
  border-radius: 16px;
  box-shadow: 3px 3px 12px #8080807a;
`;
const Opciones = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  margin: 2em 0 0 1.5em;
  text-align: left;
`;
const EstadosLi = styled.li`
  display: flex;
  flex-direction: row;
  margin: 0 0 1.5em 1.5em;
  position: relative;
`;
const ImagenEstados = styled.img`
  width: 8%;
  margin-left: 1em;
  margin-bottom: 6px;
`;

const Circulo = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#36885e" : "#bbb9b9")};
  margin-top: 15px;
`;

const Linea = styled.div`
  width: 1.5px;
  height: 35px;
  background-color: ${(props) => (props.active ? "green" : "#bbb9b9")};
  position: absolute;
  top: 31px;
  left: 5.5px;
`;

const ParrafoLi = styled.p`
  margin: 0.4em 0em 0em 1em;
  text-align: left;
  color: ${(props) => (props.active ? "#36885e" : "#bbb9b9")};
`;

const Domicilio = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 150px;
  border: 1px solid black;
  border-radius: 16px;
  margin-top: 2em;
  box-shadow: 3px 3px 12px #8080807a;
  position: relative;
`;

const Lugar = styled.div`
  display: flex;
  margin: 0.2em 0em 0em 1.8em;
  gap: 3px;
`;

const ParrafoLugar = styled.p`
  text-align: left;
  color: #424242;
`;

const LogoGPS = styled.img`
  width: 6%;
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Codigo = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 80px;
  border: 1px solid black;
  border-radius: 16px;
  margin: 2em 0em;
  box-shadow: 3px 3px 12px #8080807a;
  position: relative;
`;

const LogoCodigo = styled.img`
  width: 8%;
  position: absolute;
  top: 10px;
  right: 20px;
`;

const Compra = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  padding-bottom: 1em;
  border: 1px solid black;
  border-radius: 16px;
  box-shadow: 3px 3px 12px #8080807a;
`;

const Titulo = styled.h3`
  margin: 0.5em 0em 0em 1.5em;
  text-align: left;
  color: #424242;
`;

const Parrafo = styled.p`
  margin: 0.5em 0em 0em 1.8em;
  text-align: left;
  color: #424242;
`;

const ModificarEstados = styled.select`
  width: 270px;
  height: 40px;
  border: 1px solid black;
  border-radius: 8px;
  position: absolute;
  top: 8%;
  right: 150px;
`;

const OpcionEstado = styled.option`
  color: black;
  font-weight: bold;
`;

const Producto = styled.p`
  margin: 0.5em 0em 0em 1.8em;
  text-align: left;
  color: #424242;
`;

export default function DetalleEnvio({ contacto }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const detalle = useSelector((state) => state.detalleEnvio);
  const user = useSelector((state) => state.userInfo?.visualizacion);
  const isVisible = UseOnScreen(contacto);
  const [estado, setEstado] = useState({
    Creado: {
      estado: true,
      active: true,
      texto: true,
    },
    "En preparación": {
      estado: false,
      active: false,
      texto: false,
    },
    "En camino": {
      estado: false,
      active: false,
      texto: false,
    },
    "En punto de entrega/poder del correo": {
      estado: false,
      active: false,
      texto: false,
    },
    Entregado: {
      estado: false,
      active: false,
      texto: false,
    },
    Cancelado: {
      estado: false,
      active: false,
      texto: false,
    },
  });
  const prevEstado = {
    "En preparación": "Creado",
    "En camino": "En preparación",
    "En punto de entrega/poder del correo": "En camino",
    Entregado: "En punto de entrega/poder del correo",
    Cancelado: "Entregado",
  };

  useEffect(() => {
    dispatch(getDetalleEnvio(id));
  }, [dispatch, id]);

  function changeEstado(newEstado) {
    Swal.fire({
      title: "Cambiar Estado",
      text: `¿Estas seguro de cambiar el estado de este pedido de ${detalle.Estado} a ${newEstado}?`,
      icon: "warning",
      iconColor: "grey",
      color: "#222",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonColor: "green",
      cancelButtonColor: "darkgrey",
      confirmButtonText: "Si",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: "El pedido se actualizó con éxito",
          icon: "success",
          iconColor: "green",
          color: "#222",
          showConfirmButton: false,
          timer: "1500",
          toast: true,
        });

        dispatch(actualizarEstadoEnvio(id, { newEstado }, detalle.productos));

        if (detalle.usuarioId !== undefined) {
          dispatch(mailAdmin(detalle.usuarioId, { newEstado }));
        }

        setEstado((prevState) => {
          const newState = { ...prevState };

          newState[newEstado].estado = true;
          newState[newEstado].active = true;
          newState[newEstado].texto = true;

          newState[prevEstado[newEstado]].estado = false;
          newState[prevEstado[newEstado]].texto = false;

          return newState;
        });
      }
    });
  }

  useEffect(() => {
    if (Object.keys(detalle).length > 0) {
      // eslint-disable-next-line
      detalle.productos.map((producto) => {
        dispatch(quitarItem({ id: producto.compra.productoId }));
      });
      console.log("uwu");
      setEstado((prevState) => {
        const newState = { ...prevState };

        for (const key in newState) {
          if (key === detalle.Estado) {
            newState[key].estado = true;
            newState[key].active = true;
            newState[key].texto = true;

            break;
          }

          newState[key].estado = true;
          newState[key].active = true;
          newState[key].texto = false;
        }

        return newState;
      });
    }
    //eslint-disable-next-line
  }, [dispatch, detalle]);

  const handleInputChange = (e) => {
    changeEstado(e.target.value);
  };

  return detalle.id ? (
    <>
      <Container>
        {user === "admin" && (
          <h1 style={{ position: "absolute", top: "8%", left: "160px" }}>
            {`Pedido numero: #2022${detalle.id}`}
          </h1>
        )}

        {user === "admin" && (
          <ModificarEstados onChange={handleInputChange}>
            <option name="estados">Modificar estado</option>
            <OpcionEstado
              disabled={estado["En preparación"].estado}
              value="En preparación"
            >
              En preparación
            </OpcionEstado>

            <OpcionEstado
              disabled={estado["En camino"].estado}
              value="En camino"
            >
              En camino
            </OpcionEstado>

            <OpcionEstado
              disabled={estado["En punto de entrega/poder del correo"].estado}
              value="En punto de entrega/poder del correo"
            >
              En punto de entrega/poder del correo
            </OpcionEstado>

            <OpcionEstado disabled={estado.Entregado.estado} value="Entregado">
              Entregado
            </OpcionEstado>

            <OpcionEstado disabled={estado.Cancelado.estado} value="Cancelado">
              Cancelado
            </OpcionEstado>
          </ModificarEstados>
        )}

        <Envio className="envio">
          <Estado className="Estado">
            <Titulo>Estado de envio</Titulo>
            <Opciones>
              <ul>
                <EstadosLi>
                  <Circulo active={estado.Creado.active}></Circulo>
                  <Linea active={estado.Creado.active}></Linea>
                  <ImagenEstados
                    src="https://i.ibb.co/NFLFkKr/Asset-460.png"
                    alt=""
                  />
                  <ParrafoLi active={estado.Creado.texto}>Creado</ParrafoLi>
                </EstadosLi>

                <EstadosLi>
                  <Circulo active={estado["En preparación"].active}></Circulo>
                  <Linea active={estado["En preparación"].active}></Linea>
                  <ImagenEstados
                    src="https://i.ibb.co/NFLFkKr/Asset-460.png"
                    alt=""
                  />
                  <ParrafoLi active={estado["En preparación"].texto}>
                    En preparación
                  </ParrafoLi>
                </EstadosLi>

                <EstadosLi>
                  <Circulo active={estado["En camino"].active}></Circulo>
                  <Linea active={estado["En camino"].active}></Linea>
                  <ImagenEstados
                    src="https://i.ibb.co/NCmsgvw/Asset-510.png"
                    alt=""
                  />
                  <ParrafoLi active={estado["En camino"].texto}>
                    En camino
                  </ParrafoLi>
                </EstadosLi>

                <EstadosLi>
                  <Circulo
                    active={
                      estado["En punto de entrega/poder del correo"].active
                    }
                  ></Circulo>
                  <Linea
                    active={
                      estado["En punto de entrega/poder del correo"].active
                    }
                  ></Linea>
                  <ImagenEstados
                    src="https://i.ibb.co/chNcvsM/Asset-190.png"
                    alt=""
                  />
                  <ParrafoLi
                    active={
                      estado["En punto de entrega/poder del correo"].texto
                    }
                  >
                    En punto de entrega/poder del correo
                  </ParrafoLi>
                </EstadosLi>

                <EstadosLi>
                  <Circulo active={estado.Entregado.active}></Circulo>
                  <ImagenEstados
                    src="https://i.ibb.co/Z2NPGQ0/Asset-210.png"
                    alt=""
                  />
                  <ParrafoLi active={estado.Entregado.texto}>
                    Entregado
                  </ParrafoLi>
                </EstadosLi>
              </ul>
            </Opciones>
          </Estado>
          <Domicilio className="domicilio">
            <Titulo>
              Domicilio de{" "}
              {detalle.Tipo_de_envio === "domicilio"
                ? "entrega"
                : "punto de retiro"}
            </Titulo>
            <LogoGPS
              src="https://i.ibb.co/PC2BbmZ/Asset-960.png"
              alt="Imagen logo GPS"
            />
            {detalle && (
              <Parrafo>{`${detalle?.Direccion_de_envio?.calle} ${detalle?.Direccion_de_envio?.altura} ${detalle?.Direccion_de_envio?.piso}`}</Parrafo>
            )}
            <Lugar>
              <ParrafoLugar>{`${detalle?.Direccion_de_envio?.ciudad} `}</ParrafoLugar>
              <ParrafoLugar>
                {" "}
                {`(${detalle?.Direccion_de_envio?.cp}), `}
              </ParrafoLugar>
              <ParrafoLugar>{` ${detalle?.Direccion_de_envio?.provincia}`}</ParrafoLugar>
            </Lugar>
          </Domicilio>
          <Codigo className="codigo">
            <Titulo>
              {detalle.Tipo_de_envio === "domicilio"
                ? " Entrega en domicilio"
                : "Retiro en sucursal"}
            </Titulo>

            <Parrafo>
              Codigo{" "}
              {detalle.Tipo_de_envio === "domicilio"
                ? "para entrega:"
                : "para retiro:"}{" "}
              #2022{detalle?.id}
            </Parrafo>

            <LogoCodigo
              src="https://i.ibb.co/vkjfvPY/Asset-930.png"
              alt="Imagen de una pizarra"
            />
          </Codigo>
        </Envio>
        <div>
          <Compra className="compra">
            <Titulo>
              {user === "admin" ? "Detalle de Pedido" : "Compraste"}
            </Titulo>

            {detalle?.productos?.map((el) => {
              return (
                <div key={el?.compra?.productoId}>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/productos/${el?.compra?.productoId}`}
                  >
                    <Producto>{el?.nombre}</Producto>
                    <Producto>Cantidad: {el?.compra?.cantidad}</Producto>{" "}
                  </Link>
                  <div
                    style={{
                      height: "0.5px",
                      width: "85%",
                      margin: "auto",
                      marginTop: "2px",
                      backgroundColor: "grey",
                    }}
                  />
                </div>
              );
            })}
          </Compra>
        </div>
      </Container>

      <Footer contacto={contacto} />
      {isVisible && <ScrollToTop />}
    </>
  ) : (
    <Loader />
  );
}
