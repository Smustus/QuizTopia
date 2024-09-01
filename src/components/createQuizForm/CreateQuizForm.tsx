import React, { useEffect, useState } from 'react'
import './CreateQuizForm.css';
import { MapQuestion, QuizQuestion } from '../../types/types';
import { createQuizQuestion } from '../../utilities/fetch';

type CreateQuizFormProps = {
  name: string;
  markerCoords: {
    lat: number;
    lng: number;
  };
}

const CreateQuizForm = ({name, markerCoords}: CreateQuizFormProps) => {

  const {lng, lat} = markerCoords;
  
  
  useEffect(() => {
    console.log(markerCoords);
  },  [markerCoords]);

  const [formData, setFormData] = useState<QuizQuestion>({
    name,
    question: '',
    answer: '',
    location: {longitude: 0, latitude: 0}
  });

  const [questions, setQuestions] = useState<MapQuestion[]>([]);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      location: { longitude: lng, latitude: lat }
    }));
  }, [lng, lat]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({ 
        ...formData, 
        [name]: value 
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    if(formData.question.length > 0 && formData.answer.length > 0){
      try {
        const createdQuestion = {
          question: formData.question,
          answer: formData.answer,
          location: {
            latitude: lat,
            longitude: lng,
          }
        }
        setQuestions((prevData) => [...prevData, createdQuestion]);

        const addQuestion = await createQuizQuestion(formData);
        console.log(addQuestion);

        const userId = sessionStorage.setItem('userId', addQuestion.quiz.Attributes.userId);
        console.log(userId);
        
        setFormData({
          name,
          question: '',
          answer: '',
          location: { longitude: 0, latitude: 0 }
      });
      } catch (error) {
          console.error(error);
      }
    }
  }

  return (
    <section className='createQuizFormContainer'>
      <form className='createQuizForm' onSubmit={handleSubmit}>        
        <fieldset className="inputField">
            <legend>Question</legend>
            <input
                type="textarea"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                required
            />
        </fieldset>
        <fieldset className="inputField">
            <legend>Answer</legend>
            <input
                type="text"
                name="answer"
                value={formData.answer}
                onChange={handleInputChange}
                required
            />
        </fieldset>
      
        <button className='createQuizFormBtn' type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Latitude</th>
            <th>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td>{question.question}</td>
              <td>{question.answer}</td>
              <td>{question.location.latitude}</td>
              <td>{question.location.longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

    </section>
  )
}

export default CreateQuizForm