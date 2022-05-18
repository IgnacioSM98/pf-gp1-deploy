import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 140px;
  margin-left: 2px;
  border-radius: 5px 5px 5px 5px;
  background-color: #80808030;
`;

const Star = styled.span`
  font-size: 22px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

export default function StarRating({ inputs, setInputs }) {
  // const [inputs, setInputs] = useState(props);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    setRating(3);
    // eslint-disable-next-line
  }, []);

  //   useEffect(() => {
  //     setInputs({ ...inputs, rating });
  //     // eslint-disable-next-line
  //   }, [rating]);

  return (
    <Container>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            type="button"
            key={index}
            style={
              index <= (hover || rating)
                ? { color: "yellow" }
                : { color: "lightgrey" }
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <Star>&#9733;</Star>
          </Button>
        );
      })}
    </Container>
  );
}
