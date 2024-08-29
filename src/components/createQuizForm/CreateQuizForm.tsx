import React, { useState } from 'react'
import './CreateQuizForm.css';
import { QuizQuestion } from '../../types/types';

type CreateQuizFormProps = {
  name: string;
  markerCoords: {
    lat: number;
    lng: number;
  };
}

const CreateQuizForm = ({name, markerCoords}: CreateQuizFormProps) => {

  const {lng, lat} = markerCoords;

  const [formData, setFormData] = useState<QuizQuestion>({
    name,
    question: '',
    answer: '',
    location: {longitude: String(lng), latitude: String(lat)}
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ 
        ...formData, 
        [name]: value 
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(formData);
        
        setFormData({
          name,
          question: '',
          answer: '',
          location: { longitude: String(lng), latitude: String(lat) }
      });
      
    } catch (error) {
        console.error(error);
    }
    
  }

  return (
    <form className='createQuizForm' onSubmit={handleSubmit}>        
      <fieldset className="inputField">
          <legend>Fråga</legend>
          <input
              type="textarea"
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              required
          />
      </fieldset>
      <fieldset className="inputField">
          <legend>Svar</legend>
          <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleInputChange}
              required
          />
      </fieldset>
    
      <button type="submit">Spara</button>
    </form>
  )
}

export default CreateQuizForm