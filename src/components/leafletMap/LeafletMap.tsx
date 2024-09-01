import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import './leafletMap.css'
import L, { LeafletMouseEvent, Map } from 'leaflet';
import { MapQuestion, Quiz } from '../../types/types';
import { createQuiz, getPosition } from '../../utilities/fetch';
import CreateQuizForm from '../createQuizForm/CreateQuizForm';
import Loader from '../loader/Loader';
import { formatStringUpperCase } from '../../utilities/formatter';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoginState, setUsername } from '../../reducers/loggedInReducer';
import AnswerQuizForm from '../answerQuizForm/AnswerQuizForm';

interface LeafletMapProps {
  coordinates?: GeolocationCoordinates | undefined;
  activeQuiz?: Quiz
}

const LeafletMap = ({coordinates, activeQuiz}: LeafletMapProps) => {

  const {questions = []} = activeQuiz || {};

  const [map, setMap] = useState<Map>();
  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [markerCoords, setMarkerCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quizName, setQuizname] = useState<{name: string}>({name: ''});
  const [quizCreated, setQuizCreated] = useState<boolean>(false);
  const [question, setQuestion] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(markerCoords); 
    console.log(question);
           
  }, [markerCoords, question]);

  useEffect(() => {
    if(!coordinates || !position?.latitude){
      getPosition(setPosition);
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (map && position) {
      setLoading(false);
    }
  }, [map, position]);

  //Generates a map whenever the position state is updated, if theres currently not one generated.
  useEffect(() => {
    if (position?.latitude) {
      const mapContainer = document.getElementById('map');
      if (!map && mapContainer) {
        const createMap = L.map('map').setView([position?.latitude, position?.longitude], 13);

        const tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(createMap);
        
        L.marker([position?.latitude, position?.longitude]).addTo(createMap).bindPopup('You are here!').openPopup();
        
        setMap(createMap);

        
        tileLayer.on('load', () => {
          setLoading(false);
        });  
      }
    }
  }, [position]);

  //When user wants to create a quiz. On map, quiz creation and question state update, give the user the option to generate markers and add questions to their quiz (questions are only available whenever the user want to do a quiz, not create one)
  useEffect(() => {
    if (map && quizCreated && questions.length === 0) {
      function onMapClick(e: LeafletMouseEvent) {
        if (map) {
          const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
          newMarker.bindPopup('Enter your question for the position').openPopup();
          setMarkerCoords(e.latlng);
        }
      }
  
      map.on('click', onMapClick);
  
      return () => {
        map.off('click', onMapClick);
      };
    }
  }, [map, quizCreated, questions.length]);

  //When user want to do a quiz. On map and question state update, generate markers with respective questions (questions are only available whenever the user want to do a quiz, not create one)
  useEffect(() => {
    if(map && questions.length > 0){
      questions.map((question: MapQuestion) => {
        const marker = L.marker([question.location.latitude, question.location.longitude]).addTo(map);
        marker.bindPopup(question.question).openPopup();

        marker.on('click', (e) => {
          console.log(e.target._latlng);
          setQuestion(e.target._popup._content);
          setMarkerCoords(e.target._latlng);
        })
      });
    }
  }, [map, questions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizname({ name: e.target.value });
  }

  //Handle submission of form when user trying to create a quiz, if the user token is invalid the quiz will return false and the user is directed to login again.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if(quizName.name.length > 0){
        const quiz = await createQuiz(quizName);
        console.log(quiz);
        if(!quiz){
          sessionStorage.setItem('token', '');
          sessionStorage.setItem('username', '');
          sessionStorage.setItem('userId', '');
          dispatch(setLoginState(false));
          dispatch(setUsername(""));
          navigate("/login");
        }
        if(quiz.length > 0){
          setQuizCreated(true);
        }
      }
        
    } catch (error) {
        console.error(error);
    }
  }
  
  return (
    <>
      {
        activeQuiz ? '' : (
        !activeQuiz && !quizCreated ? (
          <form className='leafletmap_quizNameForm' onSubmit={handleSubmit}>
            <fieldset className="inputField">
            <legend>Name</legend>
            <input
                type="text"
                name="quizName"
                value={quizName.name}
                onChange={handleInputChange}
                required
            />
            </fieldset>
            <button className='createQuizBtn' type="submit">Create</button>
          </form>
          )
          : 
          <h4>{`Quiz: ${formatStringUpperCase(quizName.name)}`}</h4>
        )
      }

      {
        activeQuiz ? (loading ? <div id="map"><Loader /></div> : <div id="map"></div>) 
        : 
        (loading ? <div id="map"><Loader /></div> : <div id="map"></div>)
      }
      {
        activeQuiz && question && <AnswerQuizForm question={question} markerCoords={markerCoords} activeQuiz={activeQuiz} />
      }
      
      {markerCoords && quizCreated && quizName.name.length > 0 &&      
          <CreateQuizForm name={quizName.name} markerCoords={markerCoords} />
      }
    </>
  )
}

export default LeafletMap