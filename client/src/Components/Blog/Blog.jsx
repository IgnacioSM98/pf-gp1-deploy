import React from "react";
import Footer from "../Footer/Footer";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function Blog({ contacto }) {
  return (
    <span>
      <Footer contacto={contacto} />
      <ScrollToTop />
    </span>
  );
}

export default Blog;
