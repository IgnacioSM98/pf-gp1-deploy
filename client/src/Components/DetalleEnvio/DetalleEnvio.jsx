import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetalleEnvio, actualizarEstadoEnvio } from "../../Redux/actions";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 4em;
  margin: auto;
  gap: 4em;
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
  box-shadow: 6px 6px 12px grey;
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
  width: 9%;
  margin-left: 1em;
  margin-bottom: 6px;
`;

const Circulo = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "green" : "#bbb9b9")};
  margin-top: 15px;
`;

const Linea = styled.div`
  width: 1.5px;
  height: 45px;
  background-color: ${(props) => (props.active ? "green" : "#bbb9b9")};

  position: absolute;
  top: 30px;
  left: 5.5px;
`;
const ParrafoLi = styled.p`
  margin: 0.4em 0em 0em 1em;
  text-align: left;
  color: ${(props) => (props.active ? "green" : "#bbb9b9")};
`;

const Domicilio = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 150px;
  border: 1px solid black;
  border-radius: 16px;
  margin-top: 2em;
  box-shadow: 6px 6px 12px grey;
  position: relative;
`;
const Lugar = styled.div`
  display: flex;
  margin: 0.2em 0em 0em 1.8em;
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
  box-shadow: 6px 6px 12px grey;
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
  height: 100px;
  border: 1px solid black;
  border-radius: 16px;
  box-shadow: 6px 6px 12px grey;
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
  border-radius: 16px;
  box-shadow: 6px 6px 12px grey;
`;

const OpcionEstado = styled.option`
  color: black;
  font-weight: bold;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Boton = styled.button`
  width: 50%;
  height: 30px;
  border-radius: 20px;
  margin: 1em;
  background: black;
  color: white;
`;

export default function DetalleEnvio() {
  let dispatch = useDispatch();
  let { id } = useParams();
  let detalle = useSelector((state) => state.detalleEnvio);
  const admin = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDetalleEnvio(id));
  }, []);
  console.log(detalle);
  let [input, setInput] = useState({
    estado: "",
  });

  let handleInputChange = (e) => {
    setInput({
      estado: e.target.value,
    });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actualizarEstadoEnvio(id, input));
  };

  return (
    <Container>
      {admin && (
        <Formulario onSubmit={handleSubmit} action="">
          <ModificarEstados onChange={handleInputChange}>
            <option name="estados">Modificar estado</option>
            <OpcionEstado value="En Preparación">En Preparación</OpcionEstado>
            <OpcionEstado value="En camino">En camino</OpcionEstado>
            <OpcionEstado value="En punto de entrega/poder del correo">
              En punto de entrega/poder del correo
            </OpcionEstado>
            <OpcionEstado value="Entregado">Entregado</OpcionEstado>
          </ModificarEstados>
          <Boton type="submit">Actualizar Estado</Boton>
        </Formulario>
      )}
      <Envio className="envio">
        <Estado className="Estado">
          <Titulo>Estado de envio</Titulo>
          <Opciones>
            <ul>
              <EstadosLi>
                <Circulo active={true}></Circulo>
                <Linea active={true}></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/NFLFkKr/Asset-460.png"
                  alt=""
                />
                <ParrafoLi active={true}>En Preparación</ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={
                    detalle.Estado === "En camino" ||
                    "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                ></Circulo>
                <Linea
                  active={
                    detalle.Estado === "En camino" ||
                    "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                ></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/NCmsgvw/Asset-510.png"
                  alt=""
                />
                <ParrafoLi
                  active={
                    detalle.Estado === "En camino" ||
                    "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                >
                  En camino
                </ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={
                    detalle.Estado === "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                ></Circulo>
                <Linea
                  active={
                    detalle.Estado === "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                ></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/chNcvsM/Asset-190.png"
                  alt=""
                />
                <ParrafoLi
                  active={
                    detalle.Estado === "En punto de entrega/poder del correo" ||
                    "Entregado"
                      ? true
                      : false
                  }
                >
                  En punto de entrega/poder del correo
                </ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={detalle.Estado === "Entregado" ? true : false}
                ></Circulo>
                <ImagenEstados
                  src="https://i.ibb.co/Z2NPGQ0/Asset-210.png"
                  alt=""
                />
                <ParrafoLi
                  active={detalle.Estado === "Entregado" ? true : false}
                >
                  Entregado
                </ParrafoLi>
              </EstadosLi>
            </ul>
          </Opciones>
        </Estado>
        <Domicilio className="domicilio">
          <Titulo>Punto de retiro/entrega</Titulo>
          <LogoGPS src="https://i.ibb.co/PC2BbmZ/Asset-960.png" alt="" />
          {/* <Parrafo>{detalle.Direccion_de_envio}</Parrafo> */}
          {/* el domicilio tendria que ser un objeto en el modelo para poder recibir, ciudad, CP y provincia? */}
          <Parrafo>Av. PRES BARTOLOME MITRE 2769</Parrafo>
          <Lugar>
            <ParrafoLugar>Buenos Aires</ParrafoLugar>
            <ParrafoLugar>(1872),</ParrafoLugar>
            <ParrafoLugar> Buenos Aires</ParrafoLugar>
          </Lugar>
        </Domicilio>
        <Codigo className="codigo">
          <Titulo>Retiro en sucursal/domicilio</Titulo>
          <Parrafo>Codigo de Retiro: #2022{detalle.id}</Parrafo>
          <LogoCodigo src="https://i.ibb.co/vkjfvPY/Asset-930.png" alt="" />
        </Codigo>
      </Envio>
      <Compra className="compra">
        <Titulo>Compraste</Titulo>
      </Compra>
    </Container>
  );
}
