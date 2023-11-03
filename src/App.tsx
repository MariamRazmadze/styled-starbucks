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
import MainQuiz from "./components/CoffeeQuiz/MainQuiz";
import FinishScreen from "./components/CoffeeQuiz/FinishScreen";
import NextButton from "./components/CoffeeQuiz/NextButton";
import QuestionComponent from "./components/CoffeeQuiz/QuestionComponent";
import StartScreen from "./components/CoffeeQuiz/StartScreen";
import AuthForm from "./components/AuthenticationContainer/AuthForm";

const defaultTheme = {
  primaryColor: "#006241;",
  greenAccent: "#00754a",
  secondaryBackground: " #d4e9e2;",
};

interface CoffeeState {
  coffees?: CoffeeData[];
  status: string;
}

export interface CoffeeAction {
  type: string;
  payload?: CoffeeData[];
}

const coffeeInitialState: CoffeeState = { coffees: [], status: "loading" };

function coffeeReducer(state: CoffeeState, action: CoffeeAction): CoffeeState {
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

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

interface QuizState {
  questions?: Question[];
  quizStatus: string;
  index: number;
  answer?: number | null;
  points?: number | null;
}

export interface QuizAction {
  type: string;
  questionsPayload?: Question[];
  answerPayload?: number;
}

const quizInitialState: QuizState = {
  questions: [],
  quizStatus: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.questionsPayload,
        quizStatus: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        quizStatus: "error",
      };
    case "start":
      return { ...state, quizStatus: "active" };
    case "newAnswer": {
      const question = state.questions?.[state.index];
      if (question) {
        return {
          ...state,
          answer: action.answerPayload,
          points:
            action.answerPayload === question.correctOption
              ? state.points
                ? state.points + question.points
                : question.points
              : state.points,
        };
      }
      return state;
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, quizStatus: "finished" };
    case "restart":
      return {
        ...quizInitialState,
        questions: state.questions,
        quizStatus: "ready",
      };
    default:
      throw new Error("Action unknown");
  }
}

const QuestionContainer = styled.div`
  position: relative;
  height: 100vh;
`;
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

  useEffect(() => {
    fetch("http://localhost:5000/db")
      .then((res: Response) => res.json())
      .then((data) =>
        dispatchCoffee({ type: "dataReceived", payload: data.coffeeData })
      )
      .catch((err) => dispatchCoffee({ type: "dataFailed" }));

    fetch("http://localhost:5000/db")
      .then((res: Response) => res.json())
      .then((data) =>
        dispatchQuiz({ type: "dataReceived", questionsPayload: data.questions })
      )
      .catch((err) => dispatchQuiz({ type: "dataFailed" }));
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
                  {quizStatus === "active" && questions && questions[index] && (
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
            <Route path="login" element={<AuthForm defaultIsLogin={true} />} />
            <Route
              path="register"
              element={<AuthForm defaultIsLogin={false} />}
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
