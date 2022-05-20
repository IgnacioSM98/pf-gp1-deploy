import { app } from "../../firebase";

export default function Home({ user }) {
  const logOut = () => {
    app.auth().signOut();
  };

  return (
    <div className="contenedor-bienenido">
      <div className="bienvenido">
        <h1 className="h1-logout">Bienvenido</h1>
        <p className="p-logout">{user.email}</p>
      </div>

      <button className="boton-logout" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}
