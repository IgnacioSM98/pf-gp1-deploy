import axios from "axios";

export default async function deleteUsuario(id) {
  await axios.delete(`https://proyecto-final-gp1.herokuapp.com/usuario/${id}`);
}
