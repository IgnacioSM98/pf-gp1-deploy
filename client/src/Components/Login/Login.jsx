import { useState, useEffect } from "react";
import { app } from "../../firebase";
import LogedIn from "./LogedIn";
import LogInMethods from "./LogInMethods";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setUser(user));
  }, []);

  return (
    <>{user ? <LogedIn user={user} /> : <LogInMethods setUser={setUser} />}</>
  );
}
