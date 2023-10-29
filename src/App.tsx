import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/Header/Navbar";
import RewardSteps from "./components/Rewards/RewardSteps";
import { rewardsData } from "../data/rewardsData";
import Menu from "./components/Menu/Menu";
import styled from "styled-components";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage/Homepage";
import PageNotFound from "./components/PageNotFound";

const defaultTheme = {
  primaryColor: "#006241;",
};

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Container>
          <Navbar />
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="menu" element={<Menu />} />
            <Route
              path="rewards"
              element={<RewardSteps content={rewardsData} />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.8rem;
`;
