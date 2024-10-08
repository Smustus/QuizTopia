import { useEffect, useState } from 'react'
import './Quizzes.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { deleteQuiz, fetchAllQuizes } from '../../utilities/fetch';
import { Quiz } from '../../types/types';
import QuizCard from '../../components/quizCard/QuizCard';
import LeafletMap from '../../components/leafletMap/LeafletMap';
import Loader from '../../components/loader/Loader';
import { useSelector } from 'react-redux';
import { formatStringUpperCase } from '../../utilities/formatter';
import { ConfirmModal } from '../../components/confirmModal/ConfirmModal';
import { useNavigate } from 'react-router-dom';
import plusIcon from '../../assets/plus.svg';

const Quizzes = () => {

  const username = useSelector((state: any) => state.loginState.username || "");

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);

  const navigate = useNavigate();

  //On component load -> fetch quizzes and update the quiz-state with respective values
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

  //Closing active quiz
  const handleCloseQuiz = () => {
    setActiveQuiz(null);
  }

  //Functions to generate filtered/unfiltered quizzes in the DOM
  const renderUserQuizList = () => {
    const userQuizzes = quizzes.filter((quiz: Quiz) => {
      return quiz.username === username;
    });
    
    return (
      userQuizzes.map((quiz: Quiz, index) => (
        <QuizCard key={index} quiz={quiz} setActiveQuiz={setActiveQuiz} />
      ))
    )
  }

  const renderQuizList = () => (
    quizzes.map((quiz: Quiz, index) => (
      <QuizCard key={index} quiz={quiz} setActiveQuiz={setActiveQuiz} />
    ))
  );

  //Button generated whenever the logged in user = creator of the quiz, gives an option to delete a quiz
    const handleDelete = (quizId: string) => {
      setQuizToDelete(quizId);
      setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
      if (quizToDelete) {
        try {
          const deletedQuiz = await deleteQuiz(quizToDelete);
          console.log(deletedQuiz);
          setQuizzes((prevQuizzes) => prevQuizzes.filter(quiz => quiz.quizId !== quizToDelete));
          setActiveQuiz(null);
        } catch (error) {
          console.error("Failed to delete quiz:", error);
        } finally {
          setIsModalOpen(false);
          setQuizToDelete(null);
        }
      }
    };

  return (
    <>
      <LoginHeader />
      {loading && <Loader />}
      {!loading && activeQuiz ? !loading && (
          <main className='quizzesMain'>
            <h2>{formatStringUpperCase(activeQuiz.quizId)}</h2>
            <button className='closeBtn' onClick={handleCloseQuiz}>&#x2715;</button>    
            {
              (sessionStorage.getItem('username') === activeQuiz.username) ?
                <button className='deleteQuizBtn' onClick={() => handleDelete(activeQuiz.quizId)}>Delete quiz</button> : ""
            }
            <LeafletMap activeQuiz={activeQuiz} setActiveQuiz={setActiveQuiz} />
            
             <ConfirmModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onConfirm={handleConfirmDelete} 
              />
          </main>
        ) :
        !loading && (
          <main className='quizzesMain'>
            <h2>Choose a quiz</h2>
            {username && (
              <section>
                <h3 id='quizzesMain_title'>My quizzes</h3>
                <section className='quizList'>
                  {renderUserQuizList()}
                  <article className='createNewQuizCard' onClick={() => navigate("/createquiz")}>
                    <h3>Create Quiz</h3>
                    <div className='createNewQuizCard_addIcon'>
                      <img src={ plusIcon } alt="add"  />
                    </div>
                  </article>
                </section>
              </section>
              )
            }
            <section>
              <h3 id='quizzesMain_title'>All quizzes</h3>
              <section className='quizList'>
                {renderQuizList()}
              </section>
            </section>
          </main>
        )
      }
    </>
  )
}

export default Quizzes