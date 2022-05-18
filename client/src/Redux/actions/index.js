import axios from "axios";

export function getProductos() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `https://henry-game.herokuapp.com/productos`
      );

      if (resp) {
        dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error productos");
    }
  };
}

export function getCategorias() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(
        `https://henry-game.herokuapp.com/categorias`
      );

      if (resp) {
        dispatch({ type: "GET_CATEGORIAS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error categorias");
    }
  };
}
