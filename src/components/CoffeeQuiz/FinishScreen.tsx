import styled from "styled-components";
import { QuizAction } from "../../App";

interface FinishedScreenProps {
  points: number | null | undefined;
  maxPossiblePoints: number | undefined;
  dispatch: React.Dispatch<QuizAction>;
}

const RestartButton = styled.button`
  border: 1px solid white;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 30px;
  margin-top: 4rem;
  cursor: pointer;
  &:hover {
    background-color: #38514b;
    color: white;
  }
`;
const StyledFinishScreen = styled.div`
  background-color: #1e3932;
  height: 100vh;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  width: 50%;
  height: 100%;
  background-image: url("https://athome.starbucks.com/sites/default/files/2022-05/profiler-final-illustration.png");
  background-size: 85%;
  background-repeat: no-repeat;
  background-position: bottom right 10%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  img {
    width: 80%;
    margin: 4rem;
  }
  @media (max-width: 768px) {
    width: 100%;
    img {
      width: 100%;
      margin: 0;
    }
  }
`;

const ResultWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5%;
  h1 {
    font-size: 38px;
  }
  @media (max-width: 768px) {
    align-items: center;
    padding: 3rem 1rem;
    text-align: center;
    h1 {
      font-size: 28px;
    }
  }
`;
export default function FinishScreen({
  points,
  maxPossiblePoints,
  dispatch,
}: FinishedScreenProps) {
  const safePoints = points || 0;
  const safeMaxPossiblePoints = maxPossiblePoints || 1;
  const percentage = (safePoints / safeMaxPossiblePoints) * 100;

  return (
    <StyledFinishScreen>
      <ResultWrapper>
        <h3>Your Result:</h3>
        <h1>
          You scored {points} out of {maxPossiblePoints} (
          {Math.ceil(percentage)}
          %)
        </h1>
        <RestartButton onClick={() => dispatch({ type: "restart" })}>
          Restart
        </RestartButton>
      </ResultWrapper>

      <ImageWrapper>
        <img src="finish.webp" alt="coffee" />
      </ImageWrapper>
    </StyledFinishScreen>
  );
}
