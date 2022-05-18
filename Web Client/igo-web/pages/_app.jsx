import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import styled, { css } from "styled-components";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import Header from "../core/components/Header";
import Navbar from "../core/components/Navbar";
const GlobalStyles = createGlobalStyle`
  
  ${reset} 
  
  * ,body{
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
    outline: none;
  }
`;
const theme = {
  color: {
    blue: "#01A6DE",
    orange: "#F6961D",
    green: "#8EC73C",
    gray: "#707070",
    lightgray: "#999999",
    black: "#000000",
    white: "#FFFFFF",
    red: "#F93B3B",
    yellow: "#FFE330",
  },
  fontSize: {
    xl: "40px",
    lg: "26px",
    md: "20px",
    sm: "16px",
    xs: "12px",
  },
};
//
//바디 공통 스타일
const BodyContainer = styled.div`
  position: relative;
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
const MyApp = ({ Component, pageProps }) => {
  const route = useRouter();
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyles />
          <BodyContainer>
            <Header route={route} />
            <Component {...pageProps} />
            <Navbar route={route} />
          </BodyContainer>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
