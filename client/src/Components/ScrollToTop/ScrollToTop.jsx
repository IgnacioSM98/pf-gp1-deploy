import { useState, useEffect } from "react";
import { FaAngleDoubleUp } from "react-icons/fa";
import styled from "styled-components";

const Button = styled(FaAngleDoubleUp)`
  position: fixed;
  bottom: 15px;
  right: 20px;

  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #333;
  background-color: #fff;
  color: #333;
  cursor: pointer;
`;
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
      const scroll =
        document.documentElement.scrollHeight - window.innerHeight - 40;

      if (window.scrollY > scroll) {
        setSrollTopBtn(true);
      } else {
        setSrollTopBtn(false);
      }
    });
  }, []);

  return <div>{scrollTopBtn && <Button onClick={scrollTop} />}</div>;
}
