import styled from "styled-components";
import Header from "../core/components/header";
import Navbar from "../core/components/Navbar";

const BodyContainer = styled.div`
  box-sizing: border-box;
  padding: 5px;
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  border: 1px solid red;

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
