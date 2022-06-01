import axios from "axios";

export default async function putPerfil({
  id,
  nombre,
  apellido,
  dni,
  direccion,
  contraseña,
  telefono,
  mail,
}) {
  const usuario = {
    nombre: nombre,
    apellido: apellido,
    dni: dni,
    direccion: direccion,
    contraseña: contraseña,
    telefono: telefono,
    mail: mail,
  };

  const resp = await axios.put(
    `https://proyecto-final-gp1.herokuapp.com/admin/usuario/${id}`,
    usuario
  );
}
