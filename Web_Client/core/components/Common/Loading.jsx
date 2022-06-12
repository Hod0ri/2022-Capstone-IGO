import React from 'react';
import styled from 'styled-components';
const LoadingDivContainer = styled.div`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .loading-spinner {
    width: 50px;
    height: 50px;
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #383636; /* Blue */
    border-radius: 50%;
    animation: spinner 1.5s linear infinite;
  }

  .spinner-container {
    display: grid;
    justify-content: center;
    align-items: center;
    height: 350px;
  }
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: ${(props) => props.theme.color.white}; */
`;
const Loading = () => {
  return (
    <LoadingContainer>
      <LoadingDivContainer>
        <div className="loading-wrapper">
          <div className="loading-spinner" />
        </div>
      </LoadingDivContainer>
    </LoadingContainer>
  );
};

export default Loading;
