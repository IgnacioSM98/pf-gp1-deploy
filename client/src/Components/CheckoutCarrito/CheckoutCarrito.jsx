import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer, ScrollToTop, MercadoPagoIntegracion, QR } from "../index";
import { getUsuarios, postPedido } from "../../Redux/actions/index";
import "./CheckoutCarrito.css";
import { Navigate } from "react-router-dom";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 90vh;
  height: auto;
  padding-top: 5%;
  background-image: url("https://media.diepresse.com/images/uploads/8/7/c/5486716/QATAR-COFFEE-CULTURE_1535388239909509.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  @media screen and (max-width: 560px) {
    height: 90vh;
    padding-top: 0;
  }
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-width: 1500px;
  height: 90%;
  padding: 10px;
  margin-bottom: 2rem;
  background-color: rgba(219, 219, 219, 0.75);
  border-radius: 8px;
  backdrop-filter: blur(10px);

  @media screen and (max-width: 560px) {
    margin-top: 50px;
    margin-bottom: 0;
  }
`;

const Titulo = styled.h2`
  margin: 1rem 0 2rem;
  font-size: 28px;
  font-family: Poppins;
  color: black;
  @media screen and (max-width: 1300px) {
    font-size: 20px;
  }
`;

const Subtitulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
  display: block;
  @media screen and (max-width: 1300px) {
    font-size: 18px;
    margin-bottom: 0.3rem;
  }
`;

const ContenedorDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 30px 10px;
  align-items: flex-start;
  position: relative;

  @media screen and (max-width: 1300px) {
    margin: 0px;
  }
  @media screen and (max-width: 560px) {
    margin: 0 5px 5px 5px;
    border-bottom: 0.1px solid black;
  }
`;

const ContenedorDireccion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;

  @media screen and (max-width: 1400px) {
    margin: 5px;
    position: relative;
    width: 200px;
  }
  @media screen and (max-width: 560px) {
    flex-direction: column;
    height: 100%;
    width: 33%;
    margin: 0;
  }
`;

const ContenedorCiudad = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;

  @media screen and (max-width: 1400px) {
    margin: 5px;
    position: relative;
  }

  @media screen and (max-width: 560px) {
    position: relative;
    flex-direction: column;
    height: 100%;
    width: 33%;
    margin: 0;
  }
`;

const Input = styled.input`
  @media screen and (max-width: 1400px) {
    width: 250px;
    font-size: 15px;
  }
  @media screen and (max-width: 1300px) {
    font-size: 15px;
  }
  @media screen and (max-width: 560px) {
    width: 100%;
    font-size: 8px;
    margin-bottom: 9px;
    border-bottom: none;
  }
`;

const Label = styled.label``;

const Boton = styled.input`
  width: 200px;
  padding: 10px;
  font-size: 18px;
  font-family: Poppins;
  border-radius: 8px;
  color: white;
  background-color: #36885ed1;
  cursor: pointer;

  @media screen and (max-width: 1300px) {
    height: 30px;
    padding: 0px;
    width: 150px;
  }
`;

const ContenedorVarios = styled.div`
  display: flex;
  position: relative;
  height: 60vh;

  @media screen and (max-width: 1400px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 64vh;
  }
`;

const ContenedorSubUno = styled.div`
  display: flex;
  position: relative;
  flex-wrap: wrap;
  @media screen and (max-width: 1400px) {
    flex-direction: row;
    width: 50%;
    height: 30vh;
  }
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 30vh;
  }
  @media screen and (max-width: 950px) {
    height: 20vh;
  }
  @media screen and (max-width: 560px) {
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 20vh;
  }
`;

const Productos = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 400px;
  height: 390px;
  padding-top: 10px;
  background: rgb(255 255 255 / 46%);
  border-radius: 10px;
  border-radius: 10px;

  h3 {
    font-size: 22px;
    font-family: Poppins;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #222;
  }
  @media screen and (max-width: 1300px) {
    width: auto;
    height: 30vh;
    position: relative;
    margin-top: 7px;
  }
  @media screen and (max-width: 1000px) {
    width: auto;
    height: 30vh;
    position: relative;
    margin-top: 7px;
  }
  @media screen and (max-width: 950px) {
    width: auto;
    height: 30vh;
    position: relative;
    margin-top: 7px;
  }
  @media screen and (max-width: 560px) {
    width: auto;
    height: 30vh;
    position: relative;
    margin-top: 0;
  }
`;

const DivBoton = styled.div`
  position: absolute;
  left: 45%;
  bottom: 0px;
  @media screen and (max-width: 1300px) {
    left: 40%;
    bottom: -11.5%;
  }
  @media screen and (max-width: 560px) {
    left: 30%;
    bottom: -1%;
  }
`;

const ProductosTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 15px;
  font-family: Poppins;
  font-size: 20px;
  color: black;
`;

const ContenedorProductos = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  max-height: 280px;
  overflow-y: scroll;
  width: 100%;
  padding: 0px 20px;
  margin-top: 15px;
`;

const ContenedorProducto = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  h3 {
    width: 200px;
    text-align: left;
    font-family: Poppins;
    font-size: 14px;
    margin: 0;
  }
  @media screen and (max-width: 1300px) {
    margin-bottom: 5px;
  }
`;

const ContenedorMonto = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
`;

const Monto = styled.label`
  display: flex;
  font-size: 22px;
  font-weight: 600;
  font-family: Poppins;
  @media screen and (max-width: 1300px) {
    font-size: 18px;
  }
`;

function Checkout({ contacto }) {
  const carrito = useSelector((state) => state.carrito);
  const usuarios = useSelector((state) => state.usuarios);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const [precioTotal, setPrecioTotal] = useState(0);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsuarios());

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (usuarios.length > 0 && userInfo) {
      const usuario = usuarios.find(
        (usuario) => usuario.mail === userInfo.email
      );

      setUserId(usuario?.id);
    } else {
      navigate(-1);
    }
  }, [usuarios]);

  useEffect(() => {
    let precio = 0;

    carrito?.forEach((item) => {
      precio = precio + Number(item.precio) * item.cantidad;
    });

    setPrecioTotal(precio);
  }, [carrito, setPrecioTotal]);

  const [input, setInput] = useState({
    calle: "",
    altura: "",
    piso: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
    celular: "",
    mail: userInfo?.email ? userInfo.email : "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    const datos = {
      idUser: userId,
      fecha: Date.now(),
      pago_total: precioTotal,
      tipo_de_pago: "tarjeta",
      tipo_de_envio: "domicilio",
      direccion_de_envio: {
        calle: input.calle,
        altura: input.altura,
        piso: input.piso,
        ciudad: input.ciudad,
        cp: input.codigoPostal,
        provincia: input.provincia,
      },
      estado: "Creado",
      idProductos: carrito.map((item) => {
        return { id: item.id, cantidad: item.cantidad };
      }),
    };

    e.preventDefault();
    setFlag(true);
    dispatch(postPedido(datos));
  }

  return (
    <>
      <Contenedor>
        <Formulario onSubmit={(e) => handleSubmit(e)}>
          <Titulo>
            Antes de continuar, necesitamos que completes estos datos
          </Titulo>

          <Subtitulo>Informacion de entrega</Subtitulo>
          <ContenedorVarios>
            <ContenedorSubUno>
              <ContenedorDireccion>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="calle"
                    value={input.calle}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Calle</Label>
                </ContenedorDiv>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    type="number"
                    name="altura"
                    value={input.altura}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Numero</Label>
                </ContenedorDiv>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="piso"
                    value={input.piso}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Piso/Dpto</Label>
                </ContenedorDiv>
              </ContenedorDireccion>

              <ContenedorCiudad>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="ciudad"
                    value={input.ciudad}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Ciudad</Label>
                </ContenedorDiv>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="provincia"
                    value={input.provincia}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Provincia</Label>
                </ContenedorDiv>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    type="number"
                    name="codigoPostal"
                    value={input.codigoPostal}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">C.P.</Label>
                </ContenedorDiv>
              </ContenedorCiudad>

              <ContenedorCiudad>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    type="number"
                    name="celular"
                    value={input.celular}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">Celular</Label>
                </ContenedorDiv>
                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="mail"
                    id="emailAddress"
                    type="email"
                    disabled
                    style={{ cursor: "not-allowed" }}
                    value={input.mail}
                    onChange={(e) => handleChange(e)}
                    // required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">E-Mail</Label>
                </ContenedorDiv>
              </ContenedorCiudad>
            </ContenedorSubUno>

            <Productos>
              <h3 style={{ fontWeight: 600 }}>Resumen de compra</h3>

              <ProductosTitulo>
                <p>Producto</p>
                <p>Monto</p>
              </ProductosTitulo>
              <ContenedorProductos>
                {carrito &&
                  carrito.map((e, index) => (
                    <ContenedorProducto
                      style={
                        index + 1 === carrito.length
                          ? { marginBottom: "-15px" }
                          : null
                      }
                      key={e.id}
                    >
                      <h3>{`${e.cantidad} x ${e.nombre}`}</h3>
                      <p>${e.precio * e.cantidad}</p>
                    </ContenedorProducto>
                  ))}
              </ContenedorProductos>
              <ContenedorMonto>
                <Monto left={0}>Monto Total:</Monto>
                <Monto right={0}>${precioTotal}</Monto>
              </ContenedorMonto>
            </Productos>
            <DivBoton>
              {!flag && <Boton type="submit" value="Continuar" />}

              {flag && (
                <MercadoPagoIntegracion carrito={carrito} input={input} />
              )}
            </DivBoton>
          </ContenedorVarios>
        </Formulario>
      </Contenedor>
      <Footer contacto={contacto} />
      <ScrollToTop />
    </>
  );
}

export default Checkout;
