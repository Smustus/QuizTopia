import React, { useEffect, useState } from 'react'
import './Quizzes.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { deleteQuiz, fetchAllQuizes } from '../../utilities/fetch';
import { Quiz } from '../../types/types';
import QuizCard from '../../components/quizCard/QuizCard';
import cross from '../../assets/close.svg';
import LeafletMap from '../../components/leafletMap/LeafletMap';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { formatStringUpperCase } from '../../utilities/formatter';

const Quizzes = () => {

  const username = useSelector((state: any) => state.loginState.username || "");

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQuizes() {
      const data = await fetchAllQuizes();
      console.log(data);
      setQuizzes(data.quizzes);
      setLoading(false);
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

  const renderUserQuizList = () => {
    const userQuizzes = quizzes.filter((quiz: Quiz) => {
      return quiz.username === username;
    });
    
    return (
      <section className='quizList'>
        {userQuizzes.map((quiz: Quiz, index) => (
          <QuizCard key={index} quiz={quiz} setActiveQuiz={setActiveQuiz} />
        ))}
      </section>
    )
  }

  const renderQuizList = () => (
    <section className='quizList'>
      {quizzes.map((quiz: Quiz, index) => (
        <QuizCard key={index} quiz={quiz} setActiveQuiz={setActiveQuiz} />
      ))}
    </section>
  );


  const handleDelete = async (quizId: string) => {
    try {
      const deletedQuiz = await deleteQuiz(quizId);
      console.log(deletedQuiz);
      setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz.quizId !== quizId));
      setActiveQuiz(null);

    } catch (error) {
      console.error("Failed to delete quiz:", error);
    }
  }

  return (
    <>
      <LoginHeader />
      {loading && <Loader />}
      {!loading && activeQuiz ? (
          <main>
            <h2>{formatStringUpperCase(activeQuiz.quizId)}</h2>
            <button className='closeBtn' onClick={handleCloseQuiz}>&#x2715;</button>    
            <LeafletMap activeQuiz={activeQuiz} />
            {
              (localStorage.getItem('userId') === activeQuiz.userId) ?
                <button className='deleteQuizBtn' onClick={() => handleDelete(activeQuiz.quizId)}>Delete quiz</button> : ""
            }
          </main>
        ) :
        (
          <main className='quizzesMain'>
            {<h2>Choose a quiz</h2>}
            {username && (
              <section>
                <h3>Your quizzes</h3>
                {renderUserQuizList()}
              </section>
              )
            }
            <section>
              <h3>All quizzes</h3>     
              {renderQuizList()}
            </section>
          </main>
        )
      }
    </>
  )
}

export default Quizzes