import "./App.css";
import { useEffect, useRef } from "react";
import { getProductos, getCategorias } from "./Redux/actions/index";
import {
  Home,
  Tienda,
  Blog,
  Cuenta,
  Carrito,
  CrearProducto,
  NavBar,
  Login,
  DetalleProducto,
  Footer,
} from "./Components/index";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const contacto = useRef(null);

  useEffect(() => {
    localStorage.removeItem("productos");
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  useEffect(() => {
    // console.log(productos);
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  return (
    <div>
      <NavBar contacto={contacto} />
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home contacto={contacto} />} />
          <Route exact path="/tienda" element={<Tienda />} />
          <Route exact path="/productos/:id" element={<DetalleProducto />} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/blog" element={<Blog />} />
          <Route exact path="/usuario" element={<Cuenta />} />
          <Route exact path="/admin" element={"admin"} />
          <Route exact path="/admin/crear" element={<CrearProducto />} />
          <Route exact path="/login" element={<Login />} />
          {/*<Route exact path="/user/reviews" element={"user reviews"} />
        <Route exact path="/admin/cambiar/:id" element={"change something"} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
