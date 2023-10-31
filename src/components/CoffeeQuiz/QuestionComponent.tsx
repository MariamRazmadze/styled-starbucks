import { Question, QuizAction } from "../../App";
import Options from "./Options";
import styled from "styled-components";
import Progress from "./Progress";

export interface QuestionProps {
  question: Question;
  dispatch: React.Dispatch<QuizAction>;
  answer?: number | null;
  index: number;
  numQuestions: number | undefined;
  points: number | null | undefined;
  maxPossiblePoints: number | undefined;
}
const QuestionWrapper = styled.div`
  background-color: #1e3932;
  height: 100vh;
  color: white;
`;
const StyledQuestion = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 5.625rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuestionBlock = styled.div`
  margin-left: calc(8.33333% + 0.46875rem);
  width: calc(41.66667% - 0.9375rem);

  h3 {
    margin-bottom: 2.375rem;
    font-size: 38px;
  }
  p {
    opacity: 0.5;
    font-size: 14px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default function QuestionComponent({
  question,
  dispatch,
  answer,
  index,
  numQuestions,
  points,
  maxPossiblePoints,
}: QuestionProps) {
  return (
    <QuestionWrapper>
      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points}
        maxPossiblePoints={maxPossiblePoints}
      />
      <StyledQuestion>
        <QuestionBlock>
          <h3>
            {question.question}
            <span>_______________.</span>
          </h3>
          <p>Select one to proceed.</p>
        </QuestionBlock>
        <Options
          question={question}
          dispatch={dispatch}
          answer={answer}
          index={index}
          numQuestions={numQuestions}
          points={points}
          maxPossiblePoints={maxPossiblePoints}
        />
      </StyledQuestion>
    </QuestionWrapper>
  );
}
