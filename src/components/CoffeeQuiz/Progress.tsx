import styled, { css } from "styled-components";

interface ProgressProps {
  index: number;
  numQuestions: number | undefined;
  points: number | null | undefined;
  maxPossiblePoints: number | undefined;
  answer?: number | null;
}

const StyledProgress = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 20%;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 4rem;
  gap: 5rem;
`;

const StyledListItem = styled.li<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  height: 3rem;
  width: 3rem;
  font-size: 14px;
  font-weight: 700;
  ${(props) =>
    props.isActive &&
    css`
      border-radius: 50%;
      border: 0.03125rem solid #d4e9e2;
      background-color: #d4e9e2;
      color: #1e3932;
      opacity: 1;
      -webkit-transition: background-color 1.5s ease-in-out;
      transition: background-color 1.5s ease-in-out;
      opacity: 0.5;
    `}

  &::before {
    content: "";
    display: block;
    position: absolute;
    right: 100%;
    width: 1.875rem;
    opacity: 0.5;
    top: 50%;
    width: 4.875rem;
    border: 0.03125rem dashed #d4e9e2;
    opacity: 1;
  }

  &:first-child::before {
    content: none;
  }
`;

export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  answer,
}: ProgressProps) {
  const renderListItems = () => {
    const items = [];
    for (let i = 0; i < numQuestions; i++) {
      items.push(
        <StyledListItem key={i} isActive={i === index}>
          {String(i + 1).padStart(2, "0")}
        </StyledListItem>
      );
    }
    return items;
  };
  return (
    <StyledProgress>
      <ProgressBar>{renderListItems()}</ProgressBar>
      {/* <progress max={numQuestions} value={index + Number(answer !== null)} /> */}

      {/* <p>
        Question {index + 1}/ {numQuestions}
      </p>
      <p>
        {points}/ {maxPossiblePoints}
      </p> */}
    </StyledProgress>
  );
}
