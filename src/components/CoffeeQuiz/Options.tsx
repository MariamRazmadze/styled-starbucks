import { QuestionProps } from "./QuestionComponent";

import styled, { css } from "styled-components";

const StyledOptions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  width: calc(41.66667% - 0.9375rem);
  @media (max-width: 768px) {
    width: 100%;
    margin-left: calc(8.33333% + 0.46875rem);
    margin-top: 2rem;
  }
`;

type ButtonProps = {
  $isAnswer?: boolean;
  $isCorrect?: boolean;
  $isWrong?: boolean;
};

const ButtonOption = styled.button<ButtonProps>`
  display: inline-flex;
  background-color: transparent;
  color: white;
  margin: 0 1.25rem 1.25rem 0;
  min-height: 2.625rem;
  border: 0.0625rem solid hsla(0, 0%, 100%, 0.3);
  border-radius: 0.4375rem;
  align-items: center;
  padding: 10px 30px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 2px;
  &:not([disabled]):hover {
    background-color: #38514b;
  }

  &[disabled]:hover {
    cursor: not-allowed;
  }

  ${(props) =>
    props.$isAnswer &&
    css`
      transform: translateX(0.5rem);
    `}

  ${(props) =>
    props.$isCorrect &&
    css`
      background-color: #d4e9e2;
      color: #1e3932;
    `}

   ${(props) =>
    props.$isWrong &&
    css`
      background-color: #b04a5a;
    `}
`;

export default function Options({ question, dispatch, answer }: QuestionProps) {
  return (
    <StyledOptions>
      {question.options.map((option, index) => (
        <ButtonOption
          key={option}
          onClick={() => dispatch({ type: "newAnswer", answerPayload: index })}
          $isAnswer={index === answer}
          $isCorrect={index === question.correctOption && index === answer}
          $isWrong={index !== question.correctOption && index === answer}
          // $isCorrect={index === question.correctOption && answer != null}
          // $isWrong={index !== question.correctOption && answer != null}
          disabled={answer !== null}
        >
          {option}
        </ButtonOption>
      ))}
    </StyledOptions>
  );
}

<ul className="progress-bar">
  <li className="subheader2  active ">01</li>
  <li className="subheader2 ">02</li>
  <li className="subheader2 ">03</li>
  <li className="subheader2 ">04</li>
  <li className="subheader2 ">05</li>
</ul>;
