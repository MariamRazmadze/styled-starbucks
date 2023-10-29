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
import MainMenu from "./components/Menu/MainMenu";
import { useEffect, useReducer } from "react";
import { CoffeeData } from "./components/Menu/Menu";
import Loader from "./components/Loader";
import ErrorText from "./components/ErrorText";

const defaultTheme = {
  primaryColor: "#006241;",
};

interface State {
  coffees?: CoffeeData[];
  status: string;
}

export interface Action {
  type: string;
  payload?: CoffeeData[];
}

const initialState: State = { coffees: [], status: "loading" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        coffees: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ coffees, status }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch("http://localhost:5000/db")
      .then((res: Response) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.coffeeData })
      )
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Container>
          <Navbar />
          <Routes>
            <Route index element={<Homepage />} />
            <Route
              path="menu"
              element={
                <MainMenu>
                  {status === "loading" && <Loader />}
                  {status === "error" && <ErrorText />}
                  {status === "ready" && <Menu coffees={coffees} />}
                </MainMenu>
              }
            />
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
