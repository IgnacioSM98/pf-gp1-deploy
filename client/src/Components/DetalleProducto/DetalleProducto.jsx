import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearDetail, getDetail } from "../../Redux/actions";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
`;

const Image = styled.img`
  height: 300px;
  width: 400px;
  object-fit: contain;
  margin-top: 40px;
`;

export default function DetalleProducto() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detalle = useSelector((state) => state.detalle);

  useEffect(() => {
    dispatch(getDetail(id));

    return () => {
      dispatch(clearDetail());
    };
  }, []);

  return (
    <Container>
      {detalle !== undefined ? (
        <>
          <Image src={detalle.imagen} alt={`Imagen ${detalle.nombre}`} />
          <p>{detalle.nombre}</p>
          <p>{detalle.descripcion}</p>
          <p>{detalle.precio}</p>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}
