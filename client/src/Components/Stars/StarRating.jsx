import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90px;
  height: 25px;
  margin-left: 2px;
  border-radius: 5px 5px 5px 5px;
  position: relative;
`;

// const StarBorder = styled.span`
//   font-size: 17px;
//   font-family: initial;
//   color: #6cca6c;
//   position: absolute;
//   z-index: 1;
// `;

const Star = styled.span`
  font-size: 17px;
  font-family: initial;
  z-index: 2;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StarRating({ inputs, setInputs }) {
  // const [inputs, setInputs] = useState(props);
  const [puntaje, setPuntaje] = useState(0);
  const [hover, setHover] = useState(0);

  // Me queda descrifrar por que está seteando cero cuando el valor llega correctamente, se están pisando los useeffects

  useEffect(() => {
    setPuntaje(3);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setInputs({ ...inputs, puntaje });
    // eslint-disable-next-line
  }, [puntaje]);

  return (
    <Container>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            type="button"
            key={index}
            style={
              index <= (hover || puntaje)
                ? { color: "#6cca6c" }
                : { color: "white" }
            }
            onClick={() => setPuntaje(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(puntaje)}
          >
            {/* <StarBorder>&#9733;</StarBorder> */}
            <Star>&#9733;</Star>
          </Button>
        );
      })}
    </Container>
  );
}
