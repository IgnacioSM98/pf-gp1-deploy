import { useState, useEffect } from "react";
import { app } from "../../firebase";
import LogedIn from "./LogedIn";
import LogInMethods from "./LogInMethods";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Login({ contacto, user, setUser }) {
  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setUser(user));

    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {user ? <LogedIn user={user} /> : <LogInMethods setUser={setUser} />}

      <Footer contacto={contacto} />
      <ScrollToTop />
    </>
  );
}
