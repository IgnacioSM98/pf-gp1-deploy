import React, { useState } from "react";
import AdminNav from "../AdminNav/AdminNav.jsx";
import CartasAdmin from "../CartasAdmin/CartasAdmin";

export default function AdministradorUsuarios() {
  const [cartas, setCartas] = useState();
  return (
    <div>
      <AdminNav setCartas={setCartas} />
      <CartasAdmin className="admin-container" cartas={cartas} />
    </div>
  );
}
