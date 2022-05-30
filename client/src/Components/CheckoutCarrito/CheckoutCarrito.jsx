import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Footer, ScrollToTop, MercadoPagoIntegracion, QR } from "../index";

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
  width: 90%;
  max-width: 1300px;
  height: 80%;
  padding: 10px;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  // box-shadow: 0 2px 2px 0 #222, 2px 2px 2px 2px darkgray;
`;

const Titulo = styled.h2`
  margin: 1rem 0 2rem;
  font-size: 28px;
  font-family: Poppins;
  color: black;
  // filter: drop-shadow(0px 0px 5px #000);
  // text-shadow: -3px 2px 2px black, 1px -1px 0 darkgrey;
`;

const Subtitulo = styled.p`
  font-size: 22px;
  font-family: Poppins;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #222;
  // filter: drop-shadow(0px 0px 5px #000);
  // text-shadow: -3px 2px 2px black, 1px -1px 0 darkgrey;
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

const Input = styled.input`
  width: 12rem;
  height: 25px;
  // border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  color: #222;
  font-family: Poppins;
  &::-webkit-input-placeholder {
    font-family: Poppins;
    font-size: 16px;
    font-weight: lighter;
    color: 1c1c1c;
  }

  border-top: none;
  border-right: none;
  border-left: none;
  outline: none;
  background: none;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

const ContenedorInput = styled.div`
  position: relative;
  border-radius: 8px;
  outline: none;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 0.175rem;
    background: #36886d;
    left: 0;
    bottom: 0;
    // transform: translateY(3px);
    // transition: transform 0.3s ease;

    transform: scale(0, 1);
    transform-origin: 0% 100%;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scale(1, 1);
  }
`;

const Label = styled.label`
  font-size: 16px;
  color: black;
  font-family: Poppins;
  margin: 5px;
`;

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
  justify-content: space-evenly;
  width: 100%;
`;

const Productos = styled.div`
  display: flex;
  flex-direction: column;
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
    // margin-bottom: 2rem;
    // font-family: Poppins;
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

function Checkout({ contacto }) {
  const carrito = useSelector((state) => state.carrito);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let precio = 0;

    carrito?.forEach((item) => {
      precio = precio + Number(item.precio) * item.cantidad;
    });

    setPrecioTotal(precio);
  }, [carrito, setPrecioTotal]);

  const [input, setInput] = useState({
    calle: "Guatemala",
    altura: "5600",
    piso: "5",
    ciudad: "CABA",
    provincia: "Buenos Aires",
    codigoPostal: "1425",
    celular: "1130118875",
    mail: "igna@gmail.com",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFlag(true);
  }

  return (
    <Contenedor>
      <Formulario onSubmit={(e) => handleSubmit(e)}>
        <Titulo>
          Antes de continuar, necesitamos que completes estos datos
        </Titulo>

        <ContenedorVarios>
          <div>
            <Subtitulo>Informacion de entrega</Subtitulo>
            <ContenedorDireccion>
              <ContenedorDiv>
                <Label>Calle</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Calle"
                    name="calle"
                    value={input.calle}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
              <ContenedorDiv>
                <Label>Altura/Numero</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Altura/Numero"
                    type="number"
                    name="altura"
                    value={input.altura}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
              <ContenedorDiv>
                <Label>Piso/Depto/Casa</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Piso/Depto/Casa"
                    name="piso"
                    value={input.piso}
                    onChange={(e) => handleChange(e)}
                  />
                </ContenedorInput>
              </ContenedorDiv>
            </ContenedorDireccion>

            <ContenedorCiudad>
              <ContenedorDiv>
                <Label>Ciudad</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Ciudad"
                    name="ciudad"
                    value={input.ciudad}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
              <ContenedorDiv>
                <Label>Provincia</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Provincia"
                    name="provincia"
                    value={input.provincia}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
              <ContenedorDiv>
                <Label>Codigo Postal</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Codigo postal"
                    type="number"
                    name="codigoPostal"
                    value={input.codigoPostal}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
            </ContenedorCiudad>

            <ContenedorCiudad>
              <ContenedorDiv>
                <Label>Celular de contacto</Label>
                <ContenedorInput>
                  <Input
                    placeholder="Celular"
                    type="number"
                    name="celular"
                    value={input.celular}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
              <ContenedorDiv>
                <Label>E-Mail de contacto</Label>
                <ContenedorInput>
                  <Input
                    placeholder="E-mail"
                    name="mail"
                    id="emailAddress"
                    type="email"
                    value={input.mail}
                    onChange={(e) => handleChange(e)}
                    required
                  />
                </ContenedorInput>
              </ContenedorDiv>
            </ContenedorCiudad>

            <Boton type="submit" value="Continuar" />

            {flag && <MercadoPagoIntegracion carrito={carrito} input={input} />}
            {/* <QR /> */}
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
                    index + 1 === carrito.length ? { marginBottom: "-15px" } : null
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
      </Formulario>
    </Contenedor>
  );
}

export default Checkout;
