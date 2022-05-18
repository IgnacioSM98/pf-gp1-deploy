import "./App.css";
import {
  Landing,
  Home,
  Tienda,
  Blog,
  Cuenta,
  Carrito,
} from "./Components/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        {/*<Route exact path="/" element={<Landing />} />*/}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tienda" element={<Tienda />} />
        <Route exact path="/tienda/:id" element={"Detalles"} />
        <Route exact path="/carrito" element={<Carrito />} />
        <Route exact path="/blog" element={<Blog />} />
        <Route exact path="/usuario" element={<Cuenta />} />
        <Route exact path="/admin" element={"admin"} />
        <Route exact path="/admin/crear" element={"form de crear producto"} />
        {/*<Route exact path="/user/reviews" element={"user reviews"} />
        <Route exact path="/admin/cambiar/:id" element={"change something"} />*/}
      </Routes>
    </div>
  );
}

export default App;
