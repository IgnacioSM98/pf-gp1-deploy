import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/tienda">Tienda</Link>
      <Link to="/blog">Blog</Link>
      <Link to="/carrito">Carrito</Link>
      <Link to="/usuario">Cuenta</Link>
    </div>
  );
}

export default NavBar;
