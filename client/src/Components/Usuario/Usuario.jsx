import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 2px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const P = styled.p`
  font-weight: bold;
  color: white;
  margin: 0;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  margin: 6px;
  border: 1px solid white;
  color: black;
  background-color: beige;
  font-weight: 600;
  // padding: 5px;
  object-fit: cover;
  line-height: 22px;
  text-align: center;
`;

const Letter = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 50px;
  margin: 6px;
  background-color: white;
  border: none;
  font-weight: 600;
`;

export default function Usuario({ user }) {
  return (
    <Container>
      {user.displayName && <P>{user.displayName.split(" ")[0]}</P>}

      {user.photoURL ? (
        <Image src={user.photoURL} alt={user.displayName.slice(0, 1)} />
      ) : (
        <Letter>{user.displayName.slice(0, 1)}</Letter>
      )}
    </Container>
  );
}
