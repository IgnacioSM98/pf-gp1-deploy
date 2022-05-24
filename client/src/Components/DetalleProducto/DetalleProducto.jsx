import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  clearDetail,
  getDetail,
  getReviews,
  agregarCarrito,
  getProductos,
} from "../../Redux/actions";
import { CrearReview, Reviews as ProductReviews, Stars } from "../index";
import styled from "styled-components";
import cards from "../../Images/Cards/index";
import { Relacionado } from "../index";

const Container = styled.div`
  // height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Details = styled.div`
  display: flex;
  width: 100%;
  margin: 0px 40px 0px 40px;
  height: 650px;
  justify-content: center;
`;

const Reviews = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 194px;
`;

const RelacionadosContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const Image = styled.img`
  height: 80%;
  max-height: 650px;
  width: 50%;
  max-width: 650px;
  // margin: 50px;
  object-fit: contain;
  margin-top: 90px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: start;
  align-items: flex-start;
  height: 600px;
  width: 40%;
  max-width: 666px;
  margin: 90px 10% 0px 20px;
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
  cursor: pointer;
  // padding: 2%;
`;

const Cantidad = styled.button`
  color: black;
  font-weight: bold;
  background-color: ${(props) => (props.disabled ? "#d3d3d370" : "white")};
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

const Botones = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  align-items: center;
  justify-content: space-between;
`;

const Valoracion = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
`;

const Span = styled.span`
  font-size: 13px;
  font-weight: 600;
  text-decoration: underline;
`;

const FormRev = styled.button`
  color: ${(props) => (props.color ? props.color : "white")};
  font-weight: bold;
  background-color: ${(props) => (props.backcolor ? props.backcolor : "black")};
  border: none;
  border-radius: 8px;
  margin: 5px;
  width: 200px;
  padding: 2%;
  cursor: pointer;
`;

const Titulo = styled.span`
  text-align: initial;
  margin: 7px 10px 0px 10px;
  font-size: 20px;
  font-weight: 600;
`;

const Relacionados = styled.div`
  display: flex;

  // text-align: initial;
  // margin-left: 10px;
  // font-size: 20px;
  // font-weight: 600;
`;

export default function DetalleProducto() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

 
  const [carrito, setCarrito] = useState(true),
    [cantidad, setCantidad] = useState(1),
    [boton, setBoton] = useState({ suma: false, resta: true }),
    [relacionados, setRelacionados] = useState([]);

  const detalle = useSelector((state) => state.detalle);
  const reviews = useSelector((state) => state.reviews);
  const productos = useSelector((state) => state.productos);

  useEffect(() => {
    if (productos.length === 0) dispatch(getProductos());

    setRelacionados(productos);
  }, [productos]);

  // Creamos la variable a utilizar
  var rating = 0;

  // Sumarizamos la cantidad de estrellas entre todas las reviews
  reviews[0]
    ? reviews.map((reviews) => (rating += reviews.puntaje))
    : (rating = 1);

  // Dividimos la suma de estrellas por cantidad de review para saber el promedio
  if (reviews.length) {
    rating = rating / reviews.length;
  } else {
    rating = rating / 1;
  }

  // Redondeamos el promedio de estrellas
  rating = Math.round(rating);

  const cambiarCantidad = (e) => {
    if (e.target.name === "suma") {
      if (cantidad < detalle.stock) {
        setCantidad(cantidad + 1);
        setBoton({ resta: false });
      } else {
        setBoton({ suma: true });
      }
    } else {
      if (cantidad > 1) {
        setCantidad(cantidad - 1);
        setBoton({ suma: false });
      } else {
        setBoton({ resta: true });
      }
    }
  };

  const onClick = (e) => {
    setCarrito(!carrito);
    if (detalle.stock > 1) {
      dispatch(agregarCarrito(id));
    }
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getReviews(id));

    window.scrollTo(0, 0);

    return () => {
      dispatch(clearDetail());
    };
  }, []);

  const filterCategorias = (producto) => {
    for (const categoria of detalle.categoria) {
      if (
        producto.categoria.find(
          (cate) => cate.nombre.toLowerCase() === categoria.nombre.toLowerCase()
        )
      ) {
        return producto;
      }
    }
  };

  return detalle && Object.keys(detalle)[0] ? (
    <Container>
      <Details>
        <Image src={detalle.imagen} alt={`Imagen ${detalle.nombre}`} />
        <Body>
          <Nombre>{detalle.nombre}</Nombre>
          <Valoracion>
            <Stars rating={rating ? rating : 1} />

            <Span>{reviews.length} Reviews</Span>
          </Valoracion>

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
              return <Card src={card.image} key={index} title={card.name} />;
            })}
          </Cards>

          <Bottom>
            <Unidades>
              {`Unidades (${
                detalle.stock === 1
                  ? "1 disponible"
                  : `${detalle.stock} disponibles`
              })`}
            </Unidades>
            <Bar />
            <Botones>
              {detalle.stock ? (
                <div>
                  <Cantidad
                    name="resta"
                    onClick={cambiarCantidad}
                    disabled={boton.resta}
                  >
                    -
                  </Cantidad>
                  <Stock>{cantidad}</Stock>
                  <Cantidad
                    name="suma"
                    onClick={cambiarCantidad}
                    disabled={boton.suma}
                  >
                    +
                  </Cantidad>
                </div>
              ) : (
                <Boton>Sin stock</Boton>
              )}

              {location && location.pathname.slice(0, 6) === "/admin" && (
                <Boton>Editar</Boton>
              )}

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
          </Bottom>
        </Body>
      </Details>
      <Bar style={{ width: "100%" }} />
      <Reviews>
        <CrearReview id={id} />
        <ProductReviews />
      </Reviews>
      <Bar style={{ width: "100%" }} />

      <RelacionadosContainer>
        <Titulo>Quienes vieron este producto también compraron</Titulo>
        <Relacionados>
          {relacionados &&
            relacionados
              .filter(filterCategorias)
              .slice(0, 5)
              .map((relacionado) => {
                if (Number(relacionado.id) !== Number(id)) {
                  return (
                    <Relacionado
                      key={relacionado.id}
                      relacionado={relacionado}
                    />
                  );
                }
              })}
        </Relacionados>
      </RelacionadosContainer>

      <Bar style={{ width: "100%" }} />
    </Container>
  ) : (
    <></>
  );
}
