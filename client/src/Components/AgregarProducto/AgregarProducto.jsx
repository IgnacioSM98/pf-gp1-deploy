import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Button = styled(BsPlusLg)`
  cursor: pointer;
  text-decoration: none;
  color: white;
  margin-top: 150px;
`;

export default function AgregarProducto() {
  return (
    <div className="container-producto">
      <NavLink to="/admin/crear">
        <Button size="5rem" />
      </NavLink>
    </div>
  );
}
