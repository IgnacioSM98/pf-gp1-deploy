import React, { useState } from "react";

export function Paginado(props) {

    let [currentNum, setCurrentNum] = useState(1)
    let pageNum = []
    for(let i=1; i<=Math.ceil(props.totalProd/ props.ProdPerPage); i++){
        pageNum.push(i)
    }

    let handleActualNum = (number) => {
        props.paginate(number)
        setCurrentNum(number)
    }

    return(
        <nav>
        <ul id={s.pageNum}>
          {pageNumbers.map((num) => (
              <li
                id={s.pageLi}
                className={currentNum === num ? s.active : ""}
                key={num}
                >
                <a value={num} onClick={() => handleActualNum(num)}>
                  {num}
                </a>
              </li>
            ))}
        </ul>
      </nav>
    )
}