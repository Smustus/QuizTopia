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

export type QuizQuestion = {
  name: string,
  question: string,
  answer: string,
  location: { longitude: string, latitude: string }
}