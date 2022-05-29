import React from "react";
import { Link } from "";

export default function AdminNav() {
  return (
    <div className="side-bar">
      <div className="menu">
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>USUARIOS
          </a>
        </div>
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>CATEGORIAS
          </a>
          <div className="sub-menu">
            <a className="sub-item">CAFE</a>
            <a className="sub-item">TE</a>
            <a className="sub-item">YERBA MATE</a>
            <a className="sub-item">UTENSILLOS</a>
            <a className="sub-item"></a>
          </div>
        </div>
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>PRODUCTOS
          </a>
        </div>
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>PEDIDOS
          </a>
        </div>
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>MI PERFIL
          </a>
        </div>
        <div className="item">
          <a className="sub-btn">
            <i className=""></i>NOTIFICACIONES
          </a>
        </div>
      </div>
    </div>
  );
}
