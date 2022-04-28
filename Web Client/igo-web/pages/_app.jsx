import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  * {
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
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <GlobalStyles />
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
