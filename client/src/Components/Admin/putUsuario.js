import axios from "axios";

export default async function putUsuario({
  id,
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

  const resp = await axios.put(
    `https://proyecto-final-gp1.herokuapp.com/admin/usuario/${id}`,
    usuario
  );

  console.log(resp);
}
