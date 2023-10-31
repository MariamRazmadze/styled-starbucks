import { ReactNode } from "react";

interface MainQuizProps {
  children: ReactNode;
}
export default function MainQuiz({ children }: MainQuizProps) {
  return <main className="main">{children}</main>;
}
