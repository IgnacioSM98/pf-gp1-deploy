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
`;

const Image = styled.img`
  width: 25px;
  border-radius: 50px;
  margin: 6px;
`;

export default function Usuario({ user, setUser }) {
  return (
    <Container>
      <P>{user.displayName.split(" ")[0]}</P>

      <Image src={user.photoURL} alt="Profile Picture" />
    </Container>
  );
}
