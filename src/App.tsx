import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "styled-components";
// import { Helmet } from "react-helmet";
import Navbar from "./components/Header/Navbar";
import RewardSteps from "./components/Rewards/RewardSteps";
import { rewardsData } from "./data/rewardsData";
import Menu from "./components/Menu/Menu";
import styled from "styled-components";
import Footer from "./components/Footer/Footer";

const defaultTheme = {
  primaryColor: "#006241;",
};

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      {/* <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet> */}
      <Container>
        <Navbar />
        <Menu />
        <RewardSteps content={rewardsData} />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;
`;
