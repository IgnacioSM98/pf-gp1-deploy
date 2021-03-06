import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  clearDetail,
  getDetail,
  getProductReviews,
  agregarCarrito,
  eliminarDeFavoritos,
  añadirAFavoritos,
} from "../../Redux/actions";
import {
  CrearReview,
  Reviews as ProductReviews,
  Stars,
  Reseñas,
  Footer,
  ScrollToTop,
  UseOnScreen,
} from "../index";
import styled from "styled-components";
import cards from "../../Images/Cards/index";
import { Relacionado } from "../index";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
`;

const Details = styled.div`
  display: flex;
  width: 100%;
  margin: 0px 40px 0px 40px;
  height: 650px;
  justify-content: center;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100vh;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
  }
`;

const Reviews = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  height: 222px;
  padding: 0% 1%;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: auto;

    padding: 0%;

    justify-content: flex-start;
    flex-direction: column;

    align-items: center;
  }
`;

const ContainerReviews = styled.div`
  width: 100%;
  position: relative;
  // overflow-y: scroll;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: row;
    width: 95%;
    justify-content: center;
    align-items: center;
    height: 222px;
  }
`;

const RelacionadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 352px;
  width: 95%;
`;

const Image = styled.img`
  height: 80%;
  max-height: 650px;
  width: 50%;
  max-width: 650px;
  object-fit: contain;
  margin-top: 90px;

  @media screen and (max-width: 960px) {
    height: 35vh;
    width: 45%;
  }
  @media screen and (max-width: 600px) {
    height: 30vh;
    width: 36%;
    margin-top: 6vh;
  }
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
  @media screen and (max-width: 960px) {
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    margin: 20px;
    width: 80%;
  }
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
  @media screen and (max-width: 960px) {
    height: auto;
  }
`;

const Precio = styled.p`
  font-size: 25px;
  font-weight: 900;
`;

const Cuotas = styled.p`
  margin: 10px 10px;
  font-size: 14px;
  color: #000000b5;
  @media screen and (max-width: 500px) {
    margin: 10px 5px;
  }
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
  width: ${(props) => (props.width ? props.width : "100px")};
  cursor: pointer;
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
  @media screen and (max-width: 960px) {
    margin-top: 30px;
    position: relative;
    height: auto;
  }
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
  @media screen and (max-width: 960px) {
    margin: 0px;
    width: 100%;
    align-items: center;
  }
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
const ContenedorFav = styled.div`
  display: flex;
  position: absolute;
  left: 100%;
  top: 2%;
  p {
    color: #5a9d7b;
    font-size: 25px;
    margin-top: 5px;
  }
  label {
    color: #5a9d7b;
    font-weight: bold;
    font-size: 25px;
    margin-top: 5px;
  }
`;

export default function DetalleProducto({ contacto }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  // Recuperamos el tipo de visualización/permiso del usuario
  const user = useSelector((state) => state.userInfo?.visualizacion);
  const favoritos = useSelector((state) => state.favoritos);
  const isVisible = UseOnScreen(contacto);

  // Validamos si hay sesion iniciada
  // const user = localStorage.getItem("user") ? true : false;

  const [cantidad, setCantidad] = useState(0),
    [boton, setBoton] = useState({ suma: false, resta: true }),
    [relacionados, setRelacionados] = useState([]),
    [reseñas, setReseñas] = useState(false);

  const detalle = useSelector((state) => state.detalle);
  const reviews = useSelector((state) => state.reviews);
  const productos = useSelector((state) => state.productos);
  const carritoCantidad = useSelector(
    (state) => state.carrito?.filter((item) => item.id === Number(id))[0]
  );

  useEffect(() => {
    dispatch(getProductReviews(id));
  }, [dispatch, id]);

  useEffect(() => {
    setRelacionados(productos);
  }, [productos]);

  // Creamos la variable a utilizar
  var rating = 0;

  // Sumarizamos la cantidad de estrellas entre todas las reviews
  reviews
    ? reviews.map((reviews) => (rating += reviews?.puntaje))
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
      if (
        cantidad + (carritoCantidad?.cantidad ? carritoCantidad.cantidad : 0) <
        detalle.stock
      ) {
        setCantidad(cantidad + 1);

        setBoton(
          cantidad +
            1 +
            (carritoCantidad?.cantidad ? carritoCantidad.cantidad : 0) ===
            detalle.stock
            ? { resta: false, suma: true }
            : { resta: false }
        );
      } else {
        setBoton({ suma: true });
      }
    } else {
      if (cantidad >= 1) {
        setCantidad(cantidad - 1);
        setBoton({ suma: false });
      } else {
        setBoton({ resta: true });
      }
    }
  };

  const onClick = (e) => {
    setBoton(
      (carritoCantidad?.cantidad ? carritoCantidad.cantidad : 0) + cantidad ===
        detalle.stock
        ? { suma: true }
        : { suma: false }
    );

    if (detalle.stock > 1) {
      dispatch(
        agregarCarrito(
          id,
          cantidad + (carritoCantidad?.cantidad ? carritoCantidad.cantidad : 0)
        )
      );
    }

    setCantidad(0);
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getProductReviews(id));

    window.scrollTo(0, 0);

    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const filterCategorias = (producto) => {
    for (const categoria of detalle.categoria) {
      if (
        producto?.categoria?.find(
          (cate) => cate.nombre.toLowerCase() === categoria.nombre.toLowerCase()
        )
      ) {
        return producto;
      }
    }
  };
  function handleFav(e) {
    e.preventDefault();
    if (favoritos.find((fav) => fav.id === detalle.id)) {
      dispatch(eliminarDeFavoritos(detalle.id));
    } else {
      dispatch(añadirAFavoritos(detalle));
    }
  }

  return detalle && Object.keys(detalle)[0] ? (
    <Container>
      <Details>
        <Image src={detalle.imagen} alt={`Imagen ${detalle.nombre}`} />
        <Body>
          <Nombre>{detalle.nombre}</Nombre>
          {user && (
            <ContenedorFav>
              {favoritos.find((fav) => fav.id === detalle.id) ? (
                <label onClick={(e) => handleFav(e)}>♥</label>
              ) : (
                <label onClick={(e) => handleFav(e)}>♡</label>
              )}
            </ContenedorFav>
          )}
          <Valoracion>
            <Stars rating={rating ? rating : 1} />

            <Span onClick={() => setReseñas(true)}>
              {reviews.length} Reviews
            </Span>
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
              return (
                <Card
                  draggable="false"
                  src={card.image}
                  key={index}
                  title={card.name}
                />
              );
            })}
          </Cards>

          <Bottom>
            <div style={{ display: "flex", alignItems: "center" }}>
              {/* Si no hay stock no debería mostrar el stock disponible*/}
              {detalle?.stock ? (
                <Unidades>
                  {`Unidades (${
                    detalle.stock === 1
                      ? "1 disponible"
                      : `${detalle.stock} disponibles`
                  })`}
                </Unidades>
              ) : null}

              {carritoCantidad?.cantidad ? (
                <Cuotas>{`${carritoCantidad.cantidad} en tu carrito`}</Cuotas>
              ) : null}
            </div>
            <Bar />

            <Botones>
              {detalle.stock ? (
                <div>
                  <Cantidad
                    name="resta"
                    onClick={cambiarCantidad}
                    disabled={cantidad === 0 ? true : false}
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
                <Boton color={"white"} backcolor={"#00000045"} width={"100%"}>
                  Sin stock disponible
                </Boton>
              )}

              {location && location.pathname.slice(0, 6) === "/admin" && (
                <Boton>Editar</Boton>
              )}

              {detalle.stock ? (
                <Boton
                  onClick={onClick}
                  value="Agregar"
                  disabled={cantidad === 0 ? true : false}
                  color={cantidad === 0 ? "black" : "white"}
                  backcolor={cantidad === 0 ? "#00000045" : "black"}
                >
                  Agregar
                </Boton>
              ) : null}
            </Botones>
          </Bottom>
        </Body>
      </Details>

      <Bar style={{ width: "100%" }} />

      <Reviews>
        {/* Acá sólo se valida que esté la sesión iniciada */}
        {user && <CrearReview id={id} />}
        <ContainerReviews>
          <ProductReviews setReseñas={setReseñas} />
          {reseñas && <Reseñas setReseñas={setReseñas} />}
        </ContainerReviews>
      </Reviews>

      <Bar style={{ width: "100%" }} />

      <RelacionadosContainer>
        <Titulo>Quienes vieron este producto también compraron</Titulo>
        <Relacionados style={{ overflowX: "scroll" }}>
          {relacionados &&
            relacionados
              .filter(filterCategorias)
              .slice(0, 10)
              // eslint-disable-next-line
              .map((relacionado) => {
                if (Number(relacionado.id) !== Number(id)) {
                  return (
                    <Relacionado
                      key={relacionado.id}
                      relacionado={relacionado}
                      location={location}
                    />
                  );
                }
              })}
        </Relacionados>
      </RelacionadosContainer>

      <Bar style={{ width: "100%" }} />

      <Footer contacto={contacto} />
      {isVisible && <ScrollToTop />}
    </Container>
  ) : (
    <></>
  );
}
