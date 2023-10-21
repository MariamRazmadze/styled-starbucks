import GlobalStyles from "./components/GlobalStyles";
import { ThemeProvider } from "styled-components";
// import { Helmet } from "react-helmet";
import Navbar from "./components/Header/Navbar";
import RewardSteps from "./components/Rewards/RewardSteps";
import { rewardsData } from "./data/rewardsData";

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
      <Navbar />
      <RewardSteps content={rewardsData} />
    </ThemeProvider>
  );
}
