import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const Span = styled.span`
  margin: 0px 40px;
  font-weight: bold;
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
`;

const Button = styled.button`
  border-width: 1px;
  border-radius: 5px 5px 5px 5px;
  border-color: white;
  font-weight: bold;
  background-color: transparent;
  margin: 0px 10px;
  padding: 8px 20px;
`;

export default function NavBar() {
  return (
    <Container>
      <NavLink to="/">
        <Span>Home</Span>
      </NavLink>

      <NavLink to="/">
        <Span>About</Span>
      </NavLink>

      <NavLink to="/tienda">
        <Span>Tienda</Span>
      </NavLink>

      <Span>Contacto</Span>

      <NavLink to="/blog">
        <Span>Blog</Span>
      </NavLink>

      <Login>
        <NavLink to="/carrito">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
          </svg>
        </NavLink>

        <NavLink to="/login">
          <Button>Login</Button>
        </NavLink>
      </Login>
    </Container>
  );
}
