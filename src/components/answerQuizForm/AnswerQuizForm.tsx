import React, { useEffect, useState } from 'react'
import './AnswerQuizForm.css'
import { MapQuestion, Quiz } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface AnswerQuizFormProps {
  question: string;
  activeQuiz: Quiz;
  markerCoords: { lat: number; lng: number } | null;
}

const AnswerQuizForm = ({question, markerCoords, activeQuiz}: AnswerQuizFormProps) => {

  const { questions } = activeQuiz;

  const [answer, setAnswer] = useState<String>('');

  useEffect(() => {
    console.log(answer);
    console.log(questions);
  }, [answer, questions]);

  const findQuestion = () => {
    const question = questions.filter((question)  => {
      return question.location.latitude === markerCoords?.lat && question.location.longitude === markerCoords?.lng
    });    
    return question;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAnswer(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const askedQuestion = findQuestion()
      if(askedQuestion[0].answer.toLowerCase() === answer.toLowerCase()){
        console.log('You are correct');
      }
  }

  return (
    <section>
      <form className='answerQuizForm' onSubmit={handleSubmit}>
      
      <fieldset className="inputField">
        <legend>Question</legend>
        <p className='questionField'>{question}</p>
      </fieldset>

      <fieldset className="inputField">
        <legend>Answer</legend>
        <input
            type="text"
            name="answer"
            onChange={handleInputChange}
            required
        />
      </fieldset>
    
      <button className='answerQuizFormBtn' type="submit">Submit</button>
      </form>
    </section>
    
  )
}

export default AnswerQuizForm