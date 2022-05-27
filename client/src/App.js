import "./App.css";
import { useEffect, useRef, useState } from "react";
import { getCategorias, getProductos } from "./Redux/actions/index";
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
  EliminarCategoria,
} from "./Components/index";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const contacto = useRef(null);
  const [user, setUser] = useState();

  useEffect(() => {
    // Si sacamos el GET PRUDUCTOS de acá se rompe Redux al POST PRODUCTO nuevo
    dispatch(getProductos());
    dispatch(getCategorias());
  }, [dispatch]);

  return (
    <div>
      <NavBar contacto={contacto} user={user} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route exact path={"/"} element={<Home contacto={contacto} />} />
          <Route exact path="/productos/:id" element={<DetalleProducto />} />
          <Route
            exact
            path={"/tienda"}
            element={<Tienda contacto={contacto} />}
          />
          <Route exact path="/productos/:id" element={<DetalleProducto />} />
          <Route exact path="/edit/:id" element={<CrearProducto />} />
          <Route exact path="/carrito" element={<Carrito />} />
          <Route exact path="/blog" element={<Blog contacto={contacto} />} />
          <Route exact path="/cuenta" element={<Cuenta />} />
          {/* <Route exact path="/admin" element={"admin"} /> */}
          <Route
            exact
            path="/admin/eliminar/categorias"
            element={<EliminarCategoria />}
          />
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
