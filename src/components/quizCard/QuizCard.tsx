import React, { Dispatch, SetStateAction } from 'react'
import './QuizCard.css'
import { Quiz } from '../../types/types'

type QuizCardProps = {
  quiz: Quiz;
  setActiveQuiz: Dispatch<SetStateAction<Quiz | null>>
}

const QuizCard = ({quiz, setActiveQuiz}: QuizCardProps) => {

  return (
    <article className='quizCard' onClick={() => setActiveQuiz(quiz)}>
      <h3>{quiz.quizId}</h3>
      <h3>Av: {quiz.username}</h3>
    </article>
  )
}

export default QuizCard