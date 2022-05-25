import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 90px;
  height: 25px;
  margin-left: -3px;
  border-radius: 5px 5px 5px 5px;
  position: relative;
`;

const StarBorder = styled.span`
  font-size: 17px;
  font-family: initial;
  color: black;
  position: absolute;
  z-index: 1;
`;

const Star = styled.span`
  font-size: 10px;
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

export default function StarRating({ rating }) {
  return (
    <Container>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Button
            type="button"
            key={index}
            style={
              index <= rating
                ? { color: "black", cursor: "auto" }
                : { color: "white", cursor: "auto" }
            }
          >
            <StarBorder>&#9733;</StarBorder>
            <Star>&#9733;</Star>
          </Button>
        );
      })}
    </Container>
  );
}
