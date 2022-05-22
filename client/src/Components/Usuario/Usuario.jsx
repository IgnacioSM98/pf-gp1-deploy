import React from "react";
import { app } from "../../firebase";

export default function Usuario({ user, setUser }) {
  const logOut = () => {
    localStorage.removeItem("user");
    app.auth().signOut();
    app.auth().onAuthStateChanged((user) => setUser(user));
  };

  return (
    <div>
      {user?.displayName}
      <ul>
        <li>
          <button onClick={logOut}>Logout</button>
        </li>
      </ul>
    </div>
  );
}
