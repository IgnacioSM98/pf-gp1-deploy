import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import Reviews from "../Reviews/Reviews";
import { clearDetail, getDetail } from "../../Redux/actions";
import styled from "styled-components";
import cards from "../../Images/Cards/index";

const Container = styled.div`
  height: 100vh;
`;

const Details = styled.div`
  // height: 100vh;
  display: flex;
  margin: 40px;
  height: 100%;
`;

const Image = styled.img`
  height: 65%;
  width: 50%;
  margin: 50px;
  object-fit: contain;
  margin-top: 40px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: start;
  align-items: flex-start;
  height: 600px;
  width: 50%;
  margin: 50px 20px 0px 20px;
`;

const Nombre = styled.p`
  font-size: 30px;
  font-weight: 800;
  margin: 10px 0px;
`;

const DescripcionText = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0px;
`;

const Descripcion = styled.p`
  font-size: 14px;
  margin: 10px 0px 0px 0px;
  width: 80%;
  height: 200px;
  color: #000000b5;
`;

const Precio = styled.p`
  font-size: 25px;
  font-weight: 900;
`;

const Cuotas = styled.p`
  margin: 10px 0px;
  font-size: 14px;
  color: #000000b5;
`;

const Unidades = styled.p`
  margin: 10px 5px;
  font-weight: 600;
`;

const Stock = styled.button`
  margin: 10px 0px;
  background-color: black;
  color: white;
  height: 40px;
  width: 40px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
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
`;

const Cantidad = styled.button`
  color: black;
  font-weight: bold;
  background-color: white;
  border-radius: 8px;
  border-width: 1.5px;
  border-color: black;

  margin: 5px;
  height: 40px;
  width: 40px;
  padding: 2%;
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 40px;
  width: 100%;
`;

const Bar = styled.div`
  background-color: #80808038;
  width: 100%;
  height: 1px;
  margin: 5px;
  border-radius: 2px 2px 2px 2px;
`;

const Pagos = styled.div`
  display: flex;
  align-items: unset;
  margin: 10px 0px;
`;

const Cards = styled.div`
  display: flex;
  align-items: center;
`;

const Card = styled.img`
  margin: 5px 5px;
  height: 25px;
  width: 35px;
  object-fit: contain;
`;

const Stars = styled.div`
  display: flex;
  color: white;
  font-size: 17px;
`;

const Botones = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

export default function DetalleProducto() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detalle = useSelector((state) => state.detalle);

  const [carrito, setCarrito] = useState(true);

  const onClick = (e) => {
    setCarrito(!carrito);
  };

  useEffect(() => {
    dispatch(getDetail(id));

    return () => {
      dispatch(clearDetail());
    };
  }, []);

  console.log(cards);

  return (
    <div className="detail">
      {console.log(detalle)}
      {detalle !== undefined ? <p>{detalle.nombre}</p> : <></>}
      <Reviews />
    </div>
    <Container>
      {detalle && Object.keys(detalle)[0] ? (
        <Details>
          <Image src={detalle.imagen} alt={`Imagen ${detalle.nombre}`} />
          <Body>
            <Nombre>{detalle.nombre}</Nombre>

            <Stars>
              {[...Array(5)].map((star, index) => (
                <span style={{ textShadow: "1px 1px black" }} key={index}>
                  &#9733;
                </span>
              ))}
            </Stars>

            <DescripcionText>Descripción</DescripcionText>
            <Descripcion>{detalle.descripcion}</Descripcion>

            <Pagos>
              <p style={{ marginTop: "3px" }}>$</p>
              <Precio>{detalle.precio}</Precio>
              <Cuotas>
                en 12x sin interes con tarjetas de crédito seleccionadas
              </Cuotas>
            </Pagos>

            <Cards>
              {cards.map((card, index) => {
                return <Card src={card} key={index} />;
              })}
            </Cards>

            <Bottom>
              <Unidades>Unidades</Unidades>
              <Bar />
              <Botones>
                {detalle.stock ? (
                  <div>
                    <Cantidad>-</Cantidad>
                    <Stock>{detalle.stock}</Stock>
                    <Cantidad>+</Cantidad>
                  </div>
                ) : (
                  <Boton>Sin stock</Boton>
                )}
                <Boton>Editar</Boton>

                {detalle.stock ? (
                  <Boton
                    onClick={onClick}
                    color={carrito ? "white" : "black"}
                    backcolor={carrito ? "black" : "#00000045"}
                    // borders={carrito ? "none" : null}
                  >
                    {carrito ? "Agregar" : "Eliminar"}
                  </Boton>
                ) : null}
              </Botones>
              <Bar />
            </Bottom>
          </Body>
        </Details>
      ) : (
        <></>
      )}
    </Container>
  );
}
