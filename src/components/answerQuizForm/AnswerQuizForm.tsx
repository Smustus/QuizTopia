import React, { SetStateAction, useEffect, useState, Dispatch } from 'react'
import './AnswerQuizForm.css'
import { Quiz, QuizAnswer } from '../../types/types';
import correct from '../../assets/correct.svg'
import inCorrect from '../../assets/incorrect.svg'

interface AnswerQuizFormProps {
  question: string;
  activeQuiz: Quiz;
  markerCoords: { lat: number; lng: number } | null;
  setActiveQuiz?: Dispatch<SetStateAction<Quiz | null>>;
}

const AnswerQuizForm = ({question, markerCoords, activeQuiz, setActiveQuiz}: AnswerQuizFormProps) => {

  const { questions } = activeQuiz;

  const [answer, setAnswer] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [result, setResult] = useState<QuizAnswer[]>([]);

  useEffect(() => {
    console.log(answer);
    console.log(questions);
    console.log(result);
  }, [answer, questions, result]);

  useEffect(() => {
    if(result.length === questions.length) calcResult();
  }, [result]);

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

    if(result.length < questions.length){
      const askedQuestion = findQuestion()
      console.log(askedQuestion);
      const extractedQuestion = askedQuestion[0].question;
      console.log(extractedQuestion);
      
      let questionAnswered = false;

      if(result.length > 0){
        result.forEach((quest) => {
          if(quest.markQuestion === extractedQuestion){
            setMessage('You already answered this question');
            questionAnswered = true;
          }
        });
      } 
      if(!questionAnswered){
        if(askedQuestion[0].answer.toLowerCase() === answer.toLowerCase()){
          setMessage('Correct!');
          console.log('You are correct');
          setResult((prevAnswers) => [
            ...prevAnswers, {
              markQuestion: extractedQuestion,
              answer: answer,
              correct: true,
            }
          ]);
        } else {
          setMessage('Try again!');
          setResult((prevAnswers) => [
            ...prevAnswers, {
              markQuestion: extractedQuestion,
              answer: answer,
              correct: false,
            }
          ]);
        }
      }
    
    }
  }

  const calcResult = () => {
    const corrects = result.reduce((acc, obj) => {
      return acc + (obj.correct ? 1 : 0)
    }, 0);
    console.log(corrects);
    
    const offCount = questions.length - corrects;

    if(corrects === questions.length){
      setMessage('Good job, you had all correct answers!');
      setTimeout(() => {
        if(setActiveQuiz) setActiveQuiz(null);
      }, 4000);
      
      
    }
    if(corrects !== questions.length){
      setMessage(`Nice try! You where ${offCount} off`)
      setTimeout(() => {
        if(setActiveQuiz) setActiveQuiz(null);
      }, 4000);
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

      <h3 className='answerQuizMessage'>{ message }</h3>

      <table className='answerQuizTable'>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>{`${result.length}/${questions.length}`}</th>
          </tr>
        </thead>
        <tbody>      
          {result.map((question, index) => (
            <tr key={index}>
              <td>{ question.markQuestion }</td>
              <td>{ question.answer }</td>
              <td>{ question.correct ? <img className='correctImage' src={correct} alt="correct" /> : <img className='inCorrectImage' src={inCorrect} alt="incorrect" /> }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
    
  )
}

export default AnswerQuizForm