import axios from "axios";

export default async function postUsuario({
  nombre,
  apellido,
  dni,
  direccion,
  contraseña,
  telefono,
  mail,
  isAdmin,
}) {
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    direccion: direccion,
    contraseña: contraseña,
    telefono: telefono,
    mail: mail,
    isAdmin: isAdmin,
  };

  const resp = await axios.post(
    "https://proyecto-final-gp1.herokuapp.com/crear",
    usuario
  );

  console.log(resp);
}
