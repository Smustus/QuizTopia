import './CreateQuiz.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import LeafletMap from '../../components/leafletMap/LeafletMap';

const CreateQuiz = () => {
   
  return (
    <>
      <LoginHeader className='white' />

      <main className='createQuizMain'>
        <article className='infoText'>
          <h3>Create a quiz!</h3>
          <ol>
            <li><p>Start with giving your quiz a name and press "Create".</p></li>
            <li><p>Next, click on the map at the location you would like to place a question.</p></li>
            <li><p>Enter your question, respective answer, and press "Add".</p></li>
            <li><p>The question has now been added to the quiz and you can now find your quiz in the quiz list. Happy quizzing!</p></li>
          </ol> 
        </article>

        <LeafletMap />
      </main>
    </>
    
  )
}

export default CreateQuiz