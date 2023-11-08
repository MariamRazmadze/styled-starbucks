import GlobalStyles from "./moreStyles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { CitiesProvider } from "./contexts/CitiesContext";

import { lazy, Suspense } from "react";

const Homepage = lazy(() => import("./components/HomePage/Homepage"));
const MainMenu = lazy(() => import("./components/Menu/MainMenu"));
const MainQuiz = lazy(() => import("./components/CoffeeQuiz/MainQuiz"));
const AuthForm = lazy(
  () => import("./components/AuthenticationContainer/AuthForm")
);
const RewardSteps = lazy(() => import("./components/Rewards/RewardSteps"));
const AppLayout = lazy(() => import("./components/StoreLocator/AppLayout"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
import Navbar from "./components/Header/Navbar";
import { rewardsData } from "../data/rewardsData";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useReducer, useRef } from "react";
import Loader from "./components/Loader";
import ErrorText from "./components/ErrorText";
import FinishScreen from "./components/CoffeeQuiz/FinishScreen";
import NextButton from "./components/CoffeeQuiz/NextButton";
import QuestionComponent from "./components/CoffeeQuiz/QuestionComponent";
import StartScreen from "./components/CoffeeQuiz/StartScreen";
import { quizReducer, quizInitialState } from "./reducers/quizReducer";
import { coffeeReducer, coffeeInitialState } from "./reducers/coffeeReducer";
import { QuestionContainer, Container } from "./moreStyles/appStyles";
import { Navigate } from "react-router-dom";
import CityList from "./components/StoreLocator/CityList";

const defaultTheme = {
  primaryColor: "#006241;",
  greenAccent: "#00754a",
  secondaryBackground: " #d4e9e2;",
};

export default function App() {
  const [{ questions, quizStatus, index, answer, points }, dispatchQuiz] =
    useReducer(quizReducer, quizInitialState);
  const numQuestions = questions?.length;
  const maxPossiblePoints = questions?.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const [{ coffees, status: coffeeStatus }, dispatchCoffee] = useReducer(
    coffeeReducer,
    coffeeInitialState
  );

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      fetch("https://starbucksapi.pythonanywhere.com/coffees")
        .then((res: Response) => res.json())
        .then((data) =>
          dispatchCoffee({ type: "dataReceived", payload: data.coffeeData })
        )
        .catch((err) => dispatchCoffee({ type: "dataFailed" }));

      fetch("https://starbucksapi.pythonanywhere.com/quiz")
        .then((res: Response) => res.json())
        .then((data) =>
          dispatchQuiz({
            type: "dataReceived",
            questionsPayload: data.questions,
          })
        )
        .catch((err) => dispatchQuiz({ type: "dataFailed" }));
    }
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CitiesProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Suspense fallback={<Loader />}>
            <Container>
              <Navbar />
              <Routes>
                <Route index element={<Homepage />} />
                <Route
                  path="menu"
                  element={
                    <MainMenu>
                      {coffeeStatus === "loading" && <Loader />}
                      {coffeeStatus === "error" && <ErrorText />}
                      {coffeeStatus === "ready" && <Menu coffees={coffees} />}
                    </MainMenu>
                  }
                />
                <Route
                  path="quiz"
                  element={
                    <MainQuiz>
                      {quizStatus === "loading" && <Loader />}
                      {quizStatus === "error" && <ErrorText />}
                      {quizStatus === "ready" && (
                        <StartScreen
                          numQuestions={numQuestions}
                          dispatch={dispatchQuiz}
                        />
                      )}
                      {quizStatus === "active" &&
                        questions &&
                        questions[index] && (
                          <QuestionContainer>
                            <QuestionComponent
                              question={questions[index]}
                              dispatch={dispatchQuiz}
                              answer={answer}
                              index={index}
                              numQuestions={numQuestions}
                              points={points}
                              maxPossiblePoints={maxPossiblePoints}
                            />
                            <NextButton
                              dispatch={dispatchQuiz}
                              answer={answer}
                              index={index}
                              numQuestions={numQuestions}
                            />
                          </QuestionContainer>
                        )}
                      {quizStatus === "finished" && (
                        <FinishScreen
                          points={points}
                          maxPossiblePoints={maxPossiblePoints}
                          dispatch={dispatchQuiz}
                        />
                      )}
                    </MainQuiz>
                  }
                />
                <Route
                  path="rewards"
                  element={<RewardSteps content={rewardsData} />}
                />
                <Route path="/store-locator" element={<AppLayout />}>
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                </Route>
                <Route
                  path="/login"
                  element={<AuthForm defaultIsLogin={true} />}
                />
                <Route
                  path="/register"
                  element={<AuthForm defaultIsLogin={false} />}
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <Footer />
            </Container>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </ThemeProvider>
  );
}
