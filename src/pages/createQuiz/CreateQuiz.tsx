import React, { useState } from 'react'
import './CreateQuiz.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import LeafletMap from '../../components/leafletMap/LeafletMap';

const CreateQuiz = () => {
   
  return (
    <>
      <LoginHeader />

      <main className='createQuizMain'>
        <article className='infoText'>
          <h3>Create a quiz!</h3>
          <ol>
            <li><p>Start with giving your quiz a name</p></li>
            <li><p>Click on the map at the location you would like to place a question</p></li>
            <li><p>Enter your question, respective answer, and press "Add".</p></li>
          </ol> 
        </article>

        <LeafletMap />
      </main>
    </>
    
  )
}

export default CreateQuiz