import { CoffeeData } from "../components/Menu/Menu";

export interface CoffeeState {
  coffees?: CoffeeData[];
  status: string;
}

export interface CoffeeAction {
  type: string;
  payload?: CoffeeData[];
}

export interface Question {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export interface CoffeeDataResponse {
  coffeeData: CoffeeData[];
}

export interface QuizDataResponse {
  quizData: QuizData;
}
export type QuizData = Question[];

export interface QuizState {
  questions?: Question[];
  quizStatus: string;
  index: number;
  answer?: number | null;
  points?: number | null;
}

export interface QuizAction {
  type: string;
  questionsPayload?: Question[];
  answerPayload?: number;
}
