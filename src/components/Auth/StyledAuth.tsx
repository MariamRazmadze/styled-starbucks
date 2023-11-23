import styled, { keyframes } from "styled-components";
import { Button } from "../UI/Button";

export const StyledAuth = styled.section`
  margin: 0 auto;
  width: 500px;
  z-index: 0;
  transition-delay: 100ms;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 5px rgba(0, 0, 0, 0.06),
    0 1px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  @media (max-width: 768px) {
    box-shadow: none;
    max-width: none;
    width: 100%;
  }
`;

const wave = keyframes`
  0% {
    background-position: 100% 0;
  }
  50% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
`;

export const WaveButton = styled.button`
  background: ${({ theme }) => theme.greenAccent};
  border: none;
  outline: none;
  border-radius: 500px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.24) 0 8px 12px rgba(0, 0, 0, 0.14);
  color: white;
  display: inline-block;
  font-size: 19px;
  font-weight: 600;
  line-height: 1.2;
  overflow: hidden;
  padding: 18px 2.4rem;
  position: relative;
  text-align: center;
  text-decoration: none;

  &:active {
    background: linear-gradient(
      90deg,
      #00754a 0%,
      rgba(255, 255, 255, 0.5) 100%
    );
    background-size: 200% 100%;
    animation: ${wave} 0.5s ease-out forwards;
  }
`;

export const AuthFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 350px;
`;

export const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AuthP = styled.p`
  margin-bottom: 16px;
  font-size: 16px;
  line-height: 24px;
`;

export const Star = styled.span`
  color: ${({ theme }) => theme.greenAccent};
`;

export const AuthPAccent = styled(AuthP)`
  color: ${({ theme }) => theme.greenAccent};
  font-weight: 700;
`;
export const AuthHeader = styled.h1`
  text-align: center;
  font-weight: 900;
  font-size: 28px;
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const AuthFooterButton = styled(Button)`
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.greenAccent};
  }
  background-color: white;
  color: ${({ theme }) => theme.greenAccent};
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  &:hover {
    background-color: ${({ theme }) => theme.secondaryBackground};
  }
`;
