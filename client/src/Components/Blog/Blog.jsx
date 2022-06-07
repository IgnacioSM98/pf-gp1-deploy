import React from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import { UseOnScreen } from "../index";

function Blog({ contacto }) {
  const isVisible = UseOnScreen(contacto);

  return (
    <span>
      <Footer contacto={contacto} />
      {isVisible && <ScrollToTop />}
    </span>
  );
}

export default Blog;
