export type Quiz = {
  questions: MapQuestion[];
  quizId: string;
  userId: string;
  username: string;
}

export type MapQuestion = {
  answer: string;  
  location: { longitude: number, latitude: number};
  question: string;
}

export type QuizQuestion = MapQuestion & {
  name: string,
}

export type QuizAnswer = {
  markQuestion: string;
  answer: string;
  correct: boolean;
}

export type User = {
  username: string;
  password: string;
}