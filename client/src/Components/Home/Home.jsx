import { app } from "../../Firebase/firebase";

export default function Home({ user }) {
  const logOut = () => {
    app.auth().signOut();
  };

  return (
    <div>
      <h1>que haces perro malvado </h1>
      <p>{user.email}</p>

      <button onClick={logOut}>Sign Out</button>
    </div>
  );
}
