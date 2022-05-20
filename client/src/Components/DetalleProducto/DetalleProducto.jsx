import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";

export default function DetalleProducto() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detalle = useSelector((state) => state.detalle);

  useEffect(() => {
    dispatch(getDetail(id));
  }, []);

  return (
    <div className="detail">
      {console.log(detalle)}
      {detalle !== undefined ? <p>{detalle.nombre}</p> : <></>}
    </div>
  );
}
