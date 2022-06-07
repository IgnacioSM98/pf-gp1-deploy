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
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return <div>{<Button onClick={scrollTop} />}</div>;
}
