import { useEffect } from "react";
import { UseOnScreen, Footer, ScrollToTop } from "../index";
import LogInMethods from "./LogInMethods";

export default function Login({ contacto, setUser }) {
  const isVisible = UseOnScreen(contacto);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <LogInMethods setUser={setUser} />

      <Footer contacto={contacto} />
      {isVisible && <ScrollToTop />}
    </>
  );
}
