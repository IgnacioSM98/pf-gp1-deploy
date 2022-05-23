import "./App.css";
import { useEffect, useRef, useState } from "react";
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
} from "./Components/index";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos);
  const contacto = useRef(null);
  const [user, setUser] = useState();
  const homeRoutes = ["/", "/admin"];
  const tiendaRoutes = ["/tienda", "/admin/tienda"];

  useEffect(() => {
    localStorage.removeItem("productos");
    dispatch(getProductos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategorias());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <div>
      <NavBar contacto={contacto} user={user} setUser={setUser} />
      <div className="App">
        <Routes>
          {homeRoutes.map((path) => (
            <Route exact path={path} element={<Home contacto={contacto} />} />
          ))}

          {tiendaRoutes.map((path) => (
            <Route exact path={path} element={<Tienda contacto={contacto} />} />
          ))}

          <Route exact path="/productos/:id" element={<DetalleProducto />} />

          <Route
            exact
            path="/admin/productos/:id"
            element={<CrearProducto />}
          />

          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/blog" element={<Blog contacto={contacto} />} />
          <Route exact path="/usuario" element={<Cuenta />} />
          <Route exact path="/admin" element={"admin"} />
          <Route exact path="/admin/crear" element={<CrearProducto />} />
          <Route
            exact
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          {/*<Route exact path="/user/reviews" element={"user reviews"} />
        <Route exact path="/admin/cambiar/:id" element={"change something"} />*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
