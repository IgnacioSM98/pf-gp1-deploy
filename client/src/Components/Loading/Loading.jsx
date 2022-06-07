import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 0;
  right: 5%;
  left: 5%;

  height: 300px;
  width: 90%;
  background-color: #d3d3d391;
  border-radius: 5px;
`;

export default function Loading() {
  return (
    <Container>
      <BeatLoader color="#37563d" />
    </Container>
  );
}
