import React from "react";
import styled from "styled-components";

const Pages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin-right: 4em;
  @media screen and (max-width: 960px) {
    max-width: none;
    min-width: none;
    margin-top: 10px;
    margin-right: auto;
  }
`;

const Page = styled.button`
  list-style: none;
  text-decoration: none;
  border: 1px solid black;
  text-align: center;
  margin-left: 1em;
  padding: 0em 0.3em;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  font-weight: bolder;
  cursor: pointer;

  &: hover {
    background-color: rgb(195, 195, 195);
  }
`;

export default function Paginado({ pages, setPageSelected, pageSelected }) {
  const handleOnClick = (e) => {
    e.preventDefault();
    setPageSelected(e.target.value);

    // window.scrollTo(0, 0);
  };

  const getArray = (pages) => {
    let i = 0;
    let arrayAux = [];

    do {
      i = i + 1;
      arrayAux.push(i);
    } while (i < pages);

    return arrayAux;
  };

  return (
    <Pages>
      {getArray(pages).map((page, index) => (
        <Page
          style={
            index + 1 === Number(pageSelected)
              ? { backgroundColor: "#36885ed1" }
              : null
          }
          key={page}
          onClick={(e) => handleOnClick(e)}
          value={page}
        >
          {page}
        </Page>
      ))}
    </Pages>
  );
}
