import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="navBar">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/tienda">Tienda</Link>
        <button>Contacto</button>
        <Link to="/blog">Blog</Link>

        <div className="login">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
          <Link to="/login">Login</Link>
        </div>
      </div>

      <h1>Infusion Store</h1>
      <h4>Empezá tu día con una buena infusión</h4>
    </>
  );
}
