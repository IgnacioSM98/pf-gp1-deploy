import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { MercadoPagoIntegracion, QR } from "../index";

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding-top: 5%;
  background-image: url("https://ichef.bbci.co.uk/news/640/cpsprodpb/76B0/production/_105848303_gettyimages-996540050.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  // background-position: center;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1150px;
  padding: 10px;
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.5);
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
  font-weight: 500;
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
    background: #e69545;
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
  background-color: black;
  cursor: pointer;
`;

const ContenedorVarios = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Productos = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 0 20px;
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
  margin-bottom: 20px;
  font-family: Poppins;
  font-size: 20px;
  color: black;
`;

const ContenedorProductos = styled.div`
  display: flex;
  flex-direction: column;
  height: 280px;
  max-height: 280px;
`;

const ContenedorProducto = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  h3 {
    width: 200px;
    text-align: left;
    font-family: Poppins;
    font-size: 16px;
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
  font-family: Poppins;
`;

function Checkout() {
  const carrito = useSelector((state) => state.carrito);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    let precio = 0;

    carrito.forEach((item) => {
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
    mail: "",
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
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
                <Label>Mail de contacto</Label>
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

            {/* <Boton type="submit" value="Continuar" /> */}

            <MercadoPagoIntegracion precioTotal={precioTotal} />
            <QR />
          </div>
          <Productos>
            <h3>Resumen de compra</h3>

            <ProductosTitulo>
              <p>Producto</p>
              <p>Monto</p>
            </ProductosTitulo>
            <ContenedorProductos>
              {carrito &&
                carrito.map((e) => (
                  <ContenedorProducto key={e}>
                    <h3>{`${e.nombre}(${e.cantidad})`}</h3>
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
