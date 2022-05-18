import React from "react";
import styled from "styled-components";

const ReviewContainer = styled.div`
  display: none;
  width: 80%;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const ReviewButton = styled.button`
  border: none;
  border-radius: 30px;
  background: ${(props) => props.theme.color.green};
  color: ${(props) => props.theme.color.white};
  width: 100%;
  height: 50px;
  p {
    font-size: ${(props) => props.theme.fontSize.md};
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    opacity: 0.7;
  }
`;

const Review = () => {
  return (
    <ReviewContainer>
      <ReviewButton>
        <p>평점 등록</p>
      </ReviewButton>
    </ReviewContainer>
  );
};

export default Review;
