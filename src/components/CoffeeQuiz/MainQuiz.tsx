import { ReactNode } from "react";
import styled from "styled-components";

interface MainQuizProps {
  children: ReactNode;
}

const StyledMainQuiz = styled.main`
  width: 100vw;
  height: 100vh;
`;
export default function MainQuiz({ children }: MainQuizProps) {
  return <StyledMainQuiz>{children}</StyledMainQuiz>;
}
