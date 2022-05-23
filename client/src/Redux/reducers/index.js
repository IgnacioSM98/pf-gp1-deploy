const initialState = {
  productos: [],
  productosFiltrados: [],
  categorias: [],
  productosCopiados: [],
  detalle: {},
  reviews: [],
  carrito: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
        productosFiltrados: action.payload,
      };

    case "GET_PRODUCTOS_FILTRADOS":
      return {
        ...state,
        productosFiltrados: action.payload,
      };

    case "SET_SORT":
      if (action.payload !== "DEFAULT") {
        const filteredAux = [...state.productosFiltrados];

        filteredAux.sort((a, b) => {
          if (action.payload === "A-Z")
            return a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0;
          if (action.payload === "Z-A")
            return a.nombre < b.nombre ? 1 : b.nombre < a.nombre ? -1 : 0;
          if (action.payload === "Highest SpoonScore") {
            return Number(a.precio) < Number(b.precio)
              ? 1
              : Number(b.precio) < Number(a.precio)
              ? -1
              : 0;
          }
          if (action.payload === "Lowest SpoonScore")
            return Number(a.precio) > Number(b.precio)
              ? 1
              : Number(b.precio) > Number(a.precio)
              ? -1
              : 0;
        });

        return {
          ...state,
          productosFiltrados: filteredAux,
        };
      }

      return {
        ...state,
        productosFiltrados: [...state.productos],
      };

    case "GET_CATEGORIAS":
      return {
        ...state,
        categorias: action.payload,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detalle: action.payload,
      };

    case "CLEAR_DETAIL":
      return {
        ...state,
        detalle: {},
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        productos: action.payload,
      };

    case "FILTRAR_CATEGORIAS":
      const productos = state.productosCopiados;
      const productosConCategoria =
        action.payload === "all"
          ? productos
          : productos.filter((e) => {
              let names = e.categorias.map((c) => c.name);
              if (names.includes(action.payload)) return e;
            });
      return {
        ...state,
        productos: productosConCategoria,
      };

    case "ORDENAR_POR_NOMBRE":
      const productosSorted =
        action.payload === "asc"
          ? state.productos.sort((a, b) => {
              if (a.nombre > b.nombre) return 1;
              if (b.nombre > a.nombre) return -1;
              return 0;
            })
          : state.productos.sort((a, b) => {
              if (a.nombre > b.nombre) return -1;
              if (b.nombre > a.nombre) return 1;
              return 0;
            });
      return {
        ...state,
        productos: productosSorted,
      };

    case "ORDENAR_POR_PRECIO":
      const productosPrecio =
        action.payload === "desc"
          ? state.productos.sort((a, b) => {
              if (a.precio > b.precio) return 1;
              if (b.precio > a.precio) return -1;
              return 0;
            })
          : state.productos.sort((a, b) => {
              if (a.precio > b.precio) return -1;
              if (b.precio > a.precio) return 1;
              return 0;
            });

      return {
        ...state,
        productos: productosPrecio,
      };
    case "CREAR_REVIEW":
      return [...state];

    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };
    case "AGREGAR_CARRITO":
      const productoSeleccionado = state.productos.find(
        (producto) => producto.id == action.payload
      );
      return {
        ...state,
        carrito: [...state.carrito, productoSeleccionado],
      };

    // case "PUT_PRODUCTO":
    //devolver productos, pero con el producto modificado en base al id
    // return{
    //   ...state,
    //   productos: state.productos
    // }
    default:
      return state;
  }
}
