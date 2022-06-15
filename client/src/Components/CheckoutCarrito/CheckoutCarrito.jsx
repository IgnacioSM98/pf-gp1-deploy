import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Footer, ScrollToTop, MercadoPagoIntegracion } from "../index";
import { getUsuarios, postPedido } from "../../Redux/actions/index";
import "./CheckoutCarrito.css";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  height: 90vh;
  padding-top: 5%;
  background-image: url("https://media.diepresse.com/images/uploads/8/7/c/5486716/QATAR-COFFEE-CULTURE_1535388239909509.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
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
`;

const Titulo = styled.h2`
  margin: 1rem 0 2rem;
  font-size: 28px;
  font-family: Poppins;
  color: black;
`;

const Subtitulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
`;

const ContenedorDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px 30px 10px;
  align-items: flex-start;
  position: relative;
`;

const ContenedorDireccion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
`;

const ContenedorCiudad = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
`;

const Input = styled.input``;

const Label = styled.label``;

const Boton = styled.input`
  width: 200px;
  padding: 10px;
  margin: 1rem;
  font-size: 18px;
  font-family: Poppins;
  border-radius: 8px;
  color: white;
  background-color: #36885ed1;
  cursor: pointer;
`;

const ContenedorVarios = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const Productos = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  width: 400px;
  height: 460px;
  padding: 20px 0px;
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
  // background-color: red;
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
`;

export default function Checkout({ contacto }) {
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
  }, [dispatch]);

  useEffect(() => {
    if (usuarios.length > 0 && userInfo) {
      const usuario = usuarios.find(
        (usuario) => usuario.mail === userInfo.email
      );

      setUserId(usuario?.id);
      // } else {
      //   // Definimos si vienen desde la pagina o si pegaron el Link
      //   location.key === "default" ? navigate("/") : navigate(-1);
    }
  }, [usuarios, userInfo, navigate]);

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

          <ContenedorVarios>
            <div style={{ width: "70%" }}>
              <Subtitulo>Informacion de entrega</Subtitulo>

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
                  <Label className="label-checkout">Altura/Numero</Label>
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
                  <Label className="label-checkout">Piso/Depto/Casa</Label>
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
                  <Label className="label-checkout">Codigo Postal</Label>
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
                  <Label className="label-checkout">Celular de contacto</Label>
                </ContenedorDiv>

                <ContenedorDiv className="grupo-checkout">
                  <Input
                    className="input-checkout"
                    placeholder=" "
                    name="mail"
                    id="emailAddress"
                    type="email"
                    disabled
                    value={input.mail}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                  <span className="barra-checkout"></span>
                  <Label className="label-checkout">E-Mail de contacto</Label>
                </ContenedorDiv>
              </ContenedorCiudad>
            </div>

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
          </ContenedorVarios>

          <div style={{ position: "absolute", bottom: "20%" }}>
            {!flag && <Boton type="submit" value="Continuar" />}

            {flag && <MercadoPagoIntegracion carrito={carrito} input={input} />}
          </div>
        </Formulario>
      </Contenedor>

      <Footer contacto={contacto} />
      <ScrollToTop />
    </>
  );
}
