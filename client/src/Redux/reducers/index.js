const initialState = {
  productos: [],
  categorias: [],
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
     case "SEARCH_PRODUCTS" :
       return{
         ...state,
         productos: action.payload
       }
    default:
      return state;
  }
}
