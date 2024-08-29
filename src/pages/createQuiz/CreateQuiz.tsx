import React, { useState } from 'react'
import './CreateQuiz.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import LeafletMap from '../../components/leafletMap/LeafletMap';

const CreateQuiz = () => {

  const [activeMarker, setActiveMarker] = useState();
   
  return (
    <>
      <LoginHeader />
      <main>
        <LeafletMap />
      </main>
    </>
    
  )
}

export default CreateQuiz