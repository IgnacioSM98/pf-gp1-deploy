import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getDetalleEnvio, actualizarEstadoEnvio } from "../../Redux/actions";
import styled from "styled-components";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
  height: 40px;
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
  // height: 100px;
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
  // box-shadow: 6px 6px 12px #8080807a;
`;

const OpcionEstado = styled.option`
  color: black;
  font-weight: bold;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 8%;
  right: 300px;
`;

const Boton = styled.button`
  width: 50%;
  height: 30px;
  border-radius: 20px;
  margin: 0.5em;
  background: black;
  color: white;
  cursor: pointer;
`;

const Producto = styled.p`
  margin: 0.5em 0em 0em 1.8em;
  text-align: left;
  color: #424242;
`;

export default function DetalleEnvio() {
  let dispatch = useDispatch();
  let { id } = useParams();
  let detalle = useSelector((state) => state.detalleEnvio);
  const user = useSelector((state) => state.userInfo?.visualizacion);

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
  console.log(input);

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actualizarEstadoEnvio(id, input));
  };

  return (
    <Container>
      {user === "admin" && (
        <h1 style={{ position: "absolute", top: "8%", left: "250px" }}>
          {`Pedido numero: #2022${detalle.id}`}
        </h1>
      )}

      {user === "admin" && (
        <Formulario onSubmit={handleSubmit}>
          <ModificarEstados onChange={handleInputChange}>
            <option name="estados">Modificar estado</option>
            <OpcionEstado
              // onClick={() => {
              //   Swal.fire({
              //     title: "Cambiar Estado",
              //     text: "¿Estas seguro de cambiar el estado de este pedido de (Estado actual) a (Proximo estado)?",
              //     icon: "warning",
              //     iconColor: "grey",
              //     color: "#222",
              //     showCancelButton: true,
              //     cancelButtonText: "No",
              //     confirmButtonColor: "green",
              //     cancelButtonColor: "darkgrey",
              //     confirmButtonText: "Si",
              //   }).then((result) => {
              //     if (result.isConfirmed) {
              //       Swal.fire({
              //         text: "El pedido se actualizó con éxito",
              //         icon: "success",
              //         iconColor: "green",
              //         color: "#222",
              //         showConfirmButton: false,
              //         timer: "1500",
              //         toast: true,
              //       });
              //       // dispatch(quitarItem(props));
              //     }
              //   });
              // }}
              value="En preparación"
            >
              En preparación
            </OpcionEstado>
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
                <Circulo
                  active={detalle?.Estado !== "En preparación" ? false : true}
                ></Circulo>
                <Linea
                  active={detalle?.Estado !== "En preparación" ? false : true}
                ></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/NFLFkKr/Asset-460.png"
                  alt=""
                />
                <ParrafoLi
                  active={detalle?.Estado !== "En preparación" ? false : true}
                >
                  En preparación
                </ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={detalle?.Estado !== "En camino" ? false : true}
                ></Circulo>
                <Linea
                  active={detalle?.Estado !== "En camino" ? false : true}
                ></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/NCmsgvw/Asset-510.png"
                  alt=""
                />
                <ParrafoLi
                  active={detalle?.Estado !== "En camino" ? false : true}
                >
                  En camino
                </ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={
                    detalle?.Estado !== "En punto de entrega/poder del correo"
                      ? false
                      : true
                  }
                ></Circulo>
                <Linea
                  active={
                    detalle?.Estado !== "En punto de entrega/poder del correo"
                      ? false
                      : true
                  }
                ></Linea>
                <ImagenEstados
                  src="https://i.ibb.co/chNcvsM/Asset-190.png"
                  alt=""
                />
                <ParrafoLi
                  active={
                    detalle?.Estado !== "En punto de entrega/poder del correo"
                      ? false
                      : true
                  }
                >
                  En punto de entrega/poder del correo
                </ParrafoLi>
              </EstadosLi>
              <EstadosLi>
                <Circulo
                  active={detalle?.Estado !== "Entregado" ? false : true}
                ></Circulo>
                <ImagenEstados
                  src="https://i.ibb.co/Z2NPGQ0/Asset-210.png"
                  alt=""
                />
                <ParrafoLi
                  active={detalle?.Estado !== "Entregado" ? false : true}
                >
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
          <Parrafo>{`${detalle?.Direccion_de_envio?.calle} ${detalle?.Direccion_de_envio?.altura} ${detalle?.Direccion_de_envio?.piso}`}</Parrafo>
          <Lugar>
            <ParrafoLugar>{`${detalle?.Direccion_de_envio?.ciudad} `}</ParrafoLugar>
            <ParrafoLugar>
              {" "}
              {`(${detalle?.Direccion_de_envio?.CP}), `}
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
            Codigo {" "}
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
            {user === "admin" ? "Detalle de Producto" : "Compraste"}
          </Titulo>
          {detalle?.productos?.map((el) => {
            return <div key={el?.compra?.productoId}>
              <Link to={`/productos/${el?.compra?.productoId}`}>
                <Producto>{el?.nombre}</Producto>
              </Link>
              <Producto>Cantidad: {el?.compra?.cantidad}</Producto>
              <hr style={{ width:"90%" , margin:"auto", marginTop: "2px"}} />
            </div>;
          })}
        </Compra>
      </div>
    </Container>
  );
}
