import { useState, useEffect } from "react";
import { app } from "../../Firebase/firebase";
import { Home, Login } from "../index";

export default function Landing() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setUser(user));
  }, []);

  return <>{user ? <Home user={user} /> : <Login setUser={setUser} />}</>;
}
