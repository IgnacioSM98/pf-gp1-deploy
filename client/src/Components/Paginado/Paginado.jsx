import React from "react";
import styled from "styled-components";

const Pages = styled.div`
  margin-top: 30px;
`;

export default function Paginado({ pages, setPageSelected }) {
  const handleOnClick = (e) => {
    e.preventDefault();

    setPageSelected(e.target.value);

    window.scrollTo(0, 0);
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
      {getArray(pages).map((page) => (
        <button key={page} onClick={(e) => handleOnClick(e)} value={page}>
          {page}
        </button>
      ))}
    </Pages>
  );
}
