import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  getCategorias,
  getPedidosUsuario,
  getProductos,
  setUserInfo,
} from "./Redux/actions/index";
import {
  Home,
  Tienda,
  Cuenta,
  Carrito,
  CrearProducto,
  NavBar,
  Login,
  Admin,
  DetalleProducto,
  EliminarCategoria,
  DetalleEnvio,
  Checkout,
  NotFound,
} from "./Components/index";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const DivApp = styled.div`
  width: 100vw;
  min-height: 100vh;
`;

function App() {
  const dispatch = useDispatch();
  const contacto = useRef(null);
  const [user, setUser] = useState();
  const usuario = useSelector((state) => state.userInfo);

  useEffect(() => {
    dispatch(getPedidosUsuario(usuario?.uid));
  }, [dispatch, usuario]);

  useEffect(() => {
    // Si sacamos el GET PRUDUCTOS de acá se rompe Redux al POST PRODUCTO nuevo
    dispatch(getProductos());
    dispatch(getCategorias());
    dispatch(setUserInfo(JSON.parse(localStorage.getItem("user"))));
  }, [dispatch]);

  return (
    <DivApp>
      <NavBar contacto={contacto} user={user} setUser={setUser} />
      <div className="App">
        <Routes>
          <Route exact path={"/"} element={<Home contacto={contacto} />} />

          <Route
            exact
            path="/productos/:id"
            element={<DetalleProducto contacto={contacto} />}
          />

          <Route
            exact
            path={"/tienda"}
            element={<Tienda contacto={contacto} />}
          />

          <Route
            exact
            path="/edit/:id"
            element={<CrearProducto contacto={contacto} />}
          />

          <Route
            exact
            path="/carrito"
            element={<Carrito contacto={contacto} />}
          />

          <Route exact path="/cuenta" element={<Cuenta />} />

          <Route
            exact
            path="/checkout"
            element={<Checkout contacto={contacto} />}
          />

          <Route exact path="/admin" element={<Admin />} />

          <Route
            exact
            path="/pedido/:id"
            element={<DetalleEnvio contacto={contacto} />}
          />
          <Route
            exact
            path="/admin/eliminar/categorias"
            element={<EliminarCategoria />}
          />
          <Route
            exact
            path="/admin/crear"
            element={<CrearProducto contacto={contacto} />}
          />
          <Route
            exact
            path="/login"
            element={
              <Login user={user} setUser={setUser} contacto={contacto} />
            }
          />
          <Route path="*" element={<NotFound />} />
          {/*<Route exact path="/user/reviews" element={"user reviews"} />
        <Route exact path="/admin/cambiar/:id" element={"change something"} />*/}
        </Routes>
      </div>
    </DivApp>
  );
}

export default App;
