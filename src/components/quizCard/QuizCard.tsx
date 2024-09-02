import { Dispatch, SetStateAction } from 'react'
import './QuizCard.css'
import { Quiz } from '../../types/types'
import { formatStringUpperCase } from '../../utilities/formatter';

type QuizCardProps = {
  quiz: Quiz;
  setActiveQuiz: Dispatch<SetStateAction<Quiz | null>>
}

const QuizCard = ({quiz, setActiveQuiz}: QuizCardProps) => {
  console.log(quiz);
  

  return (
    <article className='quizCard' onClick={() => setActiveQuiz(quiz)}>
      <div className='quizCardHeader'>
        <h3>{quiz.quizId}</h3>
        <span className='questionBadge'>{quiz.questions.length} Qs</span>
      </div>
      <div className='quizCardBody'>
        <p>{`Created by: ${formatStringUpperCase(String(quiz.username))}`}</p>
        {/* <p>{`Created by: ${quiz.username}`}</p> */}
      </div>
  </article>
  )
}

export default QuizCard