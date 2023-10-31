import { QuizAction } from "../../App";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";

interface NextButtonProps {
  dispatch: React.Dispatch<QuizAction>;
  answer: number | null | undefined;
  index: number;
  numQuestions: number | undefined;
}

const StyledNextButton = styled.button`
  position: absolute;
  top: 8%;
  right: 10%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  color: white;
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  &:hover {
    color: #d4e9e2;
  }
`;

export const StyledFinishButton = styled(StyledNextButton)`
  border: 1px solid white;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 30px;
  cursor: pointer;
  &:hover {
    background-color: #38514b;
  }
`;

export default function NextButton({
  dispatch,
  answer,
  index,
  numQuestions,
}: NextButtonProps) {
  if (answer === null) return;
  const safeNumQuestions = numQuestions || 0;

  if (index < safeNumQuestions - 1)
    return (
      <StyledNextButton onClick={() => dispatch({ type: "nextQuestion" })}>
        <AiOutlineArrowRight />
      </StyledNextButton>
    );
  if (index === safeNumQuestions - 1)
    return (
      <StyledFinishButton onClick={() => dispatch({ type: "finish" })}>
        finish
      </StyledFinishButton>
    );
}
