import styled, { css } from "styled-components";
import Header from "../core/components/Header";
import Navbar from "../core/components/Navbar";

const BodyContainer = styled.div`
  padding: 5px;
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.color.red};

  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: none;
    height: 100vh;
  }
`;

const Home = () => {
  return (
    <>
      <BodyContainer>
        <Header />
        <div>body</div>
        <Navbar />
      </BodyContainer>
    </>
  );
};

export default Home;
