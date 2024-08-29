import React, { useEffect, useState } from 'react'
import './Quizzes.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { fetchAllQuizes } from '../../utilities/fetch';
import { Quiz } from '../../types/types';
import QuizCard from '../../components/quizCard/QuizCard';
import cross from '../../assets/close.svg';
import LeafletMap from '../../components/leafletMap/LeafletMap';

const Quizzes = () => {

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);

  useEffect(() => {
    async function loadQuizes() {
      const data = await fetchAllQuizes();
      console.log(data);
      setQuizzes(data.quizzes);
    }
    loadQuizes();
  }, []);

  useEffect(() => {
    if (activeQuiz) {
      console.log(activeQuiz);
    }
  }, [activeQuiz]);

  const handleCloseQuiz = () => {
    setActiveQuiz(null);
  }

  const renderQuizList = () => (
    <section>
      {quizzes.map((quiz: Quiz, index) => (
        <QuizCard key={index} quiz={quiz} setActiveQuiz={setActiveQuiz} />
      ))}
    </section>
  );

  return (
    <>
      <LoginHeader />
      {activeQuiz ? (
          <main>
            <h2>{activeQuiz.quizId}</h2>
            <button className='closeBtn' onClick={handleCloseQuiz}><img src={cross} alt="X" /></button>     
            <LeafletMap activeQuiz={activeQuiz} />
          </main>
        ) :
        (
          <main>
            <h2>Quizzes</h2>     
            {renderQuizList()}
          </main>
        )
      }
    </>
  )
}

export default Quizzes