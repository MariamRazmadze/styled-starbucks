import styled from "styled-components";
import { Button } from "../UI/Button";

interface BoxContainerProps {
  $isReversed?: boolean;
}

export const BoxContainer = styled.div<BoxContainerProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 30px;
  margin: 0 4rem;

  & :first-child {
    order: ${(props) => (props.$isReversed ? "0" : "2")};
  }

  img {
    max-width: 100%;
  }

  @media (max-width: 960px) {
    margin: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    & :first-child {
      order: 0;
    }
  }
`;

export const BoxTexts = styled.div`
  text-align: center;
  max-width: 500px;
  justify-self: center;
  padding: 20px 0;
  @media (max-width: 960px) {
    padding: 2rem;
    padding-bottom: 4rem;
  }
`;

export const BoxTitle = styled.h2`
  font-size: 50px;
  letter-spacing: 2px;
  font-weight: 700;
  margin-bottom: 20px;
  @media (max-width: 960px) {
    font-size: 28px;
    letter-spacing: 1px;
    margin-bottom: 20px;
  }
`;

export const BoxPromo = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  @media (max-width: 960px) {
    font-size: 22px;
    font-weight: 400;
  }
`;

interface HomeButtonProps {
  $buttonColor?: string;
  $buttonHoverColor?: string;
}

export const HomeButton = styled(Button)<HomeButtonProps>`
  font-size: 16px;
  min-width: 35px;
  min-height: 35px;
  background-color: transparent;

  color: ${(props) => props.$buttonColor};

  &:hover {
    background-color: ${(props) => props.$buttonHoverColor};
  }

  @media (max-width: 960px) {
    font-size: 14px;
  }
`;
