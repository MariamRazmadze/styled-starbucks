import { Action } from "../../App";
import {
  StarterTexts,
  QuizContainer,
  QuizImage,
  QuizHeader,
  QuizHeaders,
  QuizFooter,
  QuizImageContainer,
  QuizImageContainerMobile,
  BackgroundCoffeeQuiz,
  CoffeeQuiz,
} from "./StyledQuiz";

interface StartScreenProps {
  numQuestions?: number;
  dispatch: React.Dispatch<Action>;
}

export default function StartScreen({
  numQuestions,
  dispatch,
}: StartScreenProps) {
  return (
    <QuizContainer>
      <QuizImageContainer>
        <QuizImage src="starter.webp" alt="quiz" />
      </QuizImageContainer>
      <StarterTexts>
        <QuizHeader>
          <BackgroundCoffeeQuiz>
            <CoffeeQuiz>COFFEE QUIZ</CoffeeQuiz>
            <CoffeeQuiz>COFFEE QUIZ</CoffeeQuiz>
            <CoffeeQuiz>COFFEE QUIZ</CoffeeQuiz>
            <CoffeeQuiz>COFFEE QUIZ</CoffeeQuiz>
            <CoffeeQuiz>COFFEE QUIZ</CoffeeQuiz>
          </BackgroundCoffeeQuiz>
          <QuizHeaders>
            <h3>NEW COFFEE QUIZ</h3>
            <h1>{numQuestions} Questions to Find the Truth</h1>
          </QuizHeaders>
        </QuizHeader>
        <QuizImageContainerMobile>
          <QuizImage src="starter.webp" alt="quiz" />
        </QuizImageContainerMobile>
        <QuizFooter>
          <h2>
            Take our new Coffee Quiz to discover how deep your coffee knowledge
            really goes!
          </h2>
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "start" })}
          >
            Let's start
          </button>
        </QuizFooter>
      </StarterTexts>
    </QuizContainer>
  );
}
