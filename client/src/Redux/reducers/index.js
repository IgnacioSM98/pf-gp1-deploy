const initialState = {
  productos: [],
  categorias: [],
  productosCopiados: [],
  detalle: {},
  filteredProds: [],
  reviews: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
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
      case "CREAR_REVIEW" :
        return[...state]
      
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };

    default:
      return state;
  }
}
