import axios from "axios";

const urlBase = "https://proyecto-final-gp1.herokuapp.com/";
const productos = "productos";
const categorias = "categorias";
const crear = "crear";
const admin = "admin/";
const ratings = "ratings/";

export function getProductos() {
  return async function (dispatch) {
    const data = JSON.parse(localStorage.getItem("productos"));

    if (data) {
      dispatch({ type: "GET_PRODUCTOS", payload: data });
    } else {
      try {
        const resp = await axios.get(`${urlBase}${productos}`);

        if (resp) {
          dispatch({ type: "GET_PRODUCTOS", payload: resp.data });
        }
      } catch (err) {
        console.log(err, "error productos");
      }
    }
  };
}

export function getProductosFiltrados(productosFiltrados) {
  return function (dispatch) {
    dispatch({ type: "GET_PRODUCTOS_FILTRADOS", payload: productosFiltrados });
  };
}

export function getDetail(id) {
  return function (dispatch) {
    // console.log(urlBase + "producto" + "/" + id);

    axios(`${urlBase}producto/${id}`).then((res) =>
      dispatch({ type: "GET_DETAIL", payload: res.data })
    );
  };
}

export function clearDetail() {
  return function (dispatch) {
    dispatch({ type: "CLEAR_DETAIL" });
  };
}

export function getCategorias() {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}${categorias}`);

      if (resp) {
        dispatch({ type: "GET_CATEGORIAS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error categorias");
    }
  };
}

export function searchProduct(name) {
  return async function (dispatch) {
    let json = await axios.get(`${urlBase}${productos}?name=${name}`);
    return dispatch({
      type: "SEARCH_PRODUCTS",
      payload: json.data,
    });
  };
}

export function filtrarCategorias(payload) {
  return {
    type: "FILTRAR_CATEGORIAS",
    payload,
  };
}

export function getReviews(id) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${urlBase}ratings/${id}`);

      if (resp) {
        dispatch({ type: "GET_REVIEWS", payload: resp.data });
      }
    } catch (err) {
      console.log(err, "error reviews");
    }
  };
}

export function postProducto(payload) {
  return async function () {
    let json = await axios.post(`${urlBase}${admin}${crear}`, payload);
    return json;
  };
}

export function putProducto(id) {
  return function (dispatch) {
    axios.put(`${urlBase}${admin}${id}`).then((res) => {
      dispatch({ type: "PUT_PRODUCTO", payload: res.data });
    });
  };
}

export function postCategoria(payload) {
  return async function () {
    let json = await axios.post(`${urlBase}${categorias}/${crear}`, payload);
    return json;
  };
}
export function deleteCategoria(id) {
  return async function () {
    await axios.delete(`${urlBase}${categorias}/${id}`);
    return function (dispatch) {
      dispatch({ type: "DELETE_CATEGORIA" });
    };
  };
}

export function postReviews(id, payload) {
  return async function (dispatch) {
    await axios.post(`${urlBase}${ratings}${crear}/${id}`, payload);
    return dispatch({
      type: "CREAR_REVIEW",
    });
  };
}

export const setSort = (value) => (dispatch) => {
  dispatch({ type: "SET_SORT", payload: value });
};

export function agregarCarrito(idProducto) {
  return function (dispatch) {
    dispatch({ type: "AGREGAR_CARRITO", payload: idProducto });
  };
}
