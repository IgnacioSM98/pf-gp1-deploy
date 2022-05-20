import { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import "./index.css";

export default function ScrollToTop() {
  const [scrollTopBtn, setSrollTopBtn] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scroll = window.innerHeight - 80;

      if (window.scrollY > scroll) {
        setSrollTopBtn(true);
      } else {
        setSrollTopBtn(false);
      }
    });
  }, []);

  return (
    <div>
      {scrollTopBtn && (
        <FaAngleDoubleUp onClick={scrollTop} className="top-btn" />
      )}
    </div>
  );
}
