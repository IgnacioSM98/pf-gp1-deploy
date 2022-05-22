import { useState, useEffect } from "react";
import { app } from "../../firebase";
import LogedIn from "./LogedIn";
import LogInMethods from "./LogInMethods";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

export default function Login({ contacto }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => setUser(user));

    // console.log("window inner height: ", window.innerHeight);

    // console.log(
    //   "document Element client hieght: ",
    //   document.documentElement.clientHeight
    // );

    // console.log(
    //   "document Element scroll hieght: ",
    //   document.documentElement.scrollHeight
    // );

    // console.log(
    //   "document Element offset height: ",
    //   document.documentElement.offsetHeight
    // );

    // console.log(
    //   "document element scrolltop: ",
    //   document.documentElement.scrollTop
    // );

    // console.log("window page Y Offset: ", window.pageYOffset);

    // console.log(
    //   "window document body offsetheight: ",
    //   window.document.body.offsetHeight
    // );
  }, []);

  return (
    <>
      {user ? <LogedIn user={user} /> : <LogInMethods setUser={setUser} />}

      <Footer contacto={contacto} />
      <ScrollToTop />
    </>
  );
}
