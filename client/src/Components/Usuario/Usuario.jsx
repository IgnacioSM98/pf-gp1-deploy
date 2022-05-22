import React from "react";
import { app } from "../../firebase";

export default function Usuario({ user, setUser }) {
  const logOut = () => {
    app.auth().signOut();
    app.auth().onAuthStateChanged((user) => setUser(user));
    localStorage.removeItem("user");
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
