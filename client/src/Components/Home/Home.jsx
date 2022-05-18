import React from "react";
import { app } from "../../Firebase/firebase";

export default function Home({ user }) {
  const signOut = () => {
    app.auth().signOut();
  };
  return (
    <div>
      <h1>que haces perro malvado </h1>
      <h3>{user.email}</h3>

      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
