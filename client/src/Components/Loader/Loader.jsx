import React from "react";
// import "./Loader.css";
import { css } from "@emotion/react";
import SyncLoader from "react-spinners/SyncLoader";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: #36885ed1;
`;

function Loader() {
  return (
    <Container>
      <SyncLoader color={"#36885ed1"} loading={true} css={override} size={18} />
    </Container>
  );
}

export default Loader;
