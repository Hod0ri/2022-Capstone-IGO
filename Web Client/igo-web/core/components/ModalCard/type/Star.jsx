import React, { startTransition, useState } from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
const StarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .star {
    & + .star {
      margin-left: 3px;
    }
  }
  .j-center {
    display: flex;
    justify-content: center;
  }
`;
const CarNumberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  height: 30px;
  p {
    border: 1px solid ${(props) => props.theme.color.blue};
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

const Star = () => {
  const [starCounter, setStarCounter] = useState(0);
  const carNumber = "12가 1234";
  return (
    <StarContainer>
      <CarNumberContainer>
        <p>{carNumber}</p>
      </CarNumberContainer>
      <p className="j-center mt-10">카풀은 어떠셨나요? 평점을 남겨주세요!</p>
      <div className="j-center mt-10">
        {Array(5)
          .fill(0)
          .map((v, i) => (
            <AiFillStar
              fill={`${i < starCounter ? "yellow" : "lightgray"}`}
              className={`star ${v && "active"}`}
              onClick={() => setStarCounter(i + 1)}
              // onMouseOut={() => setStarCounter(i + 1)}
              key={i}
              size={30}
            />
          ))}
      </div>
    </StarContainer>
  );
};

export default Star;
