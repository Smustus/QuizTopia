import React, { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css';
import './leafletMap.css'
import L, { LeafletMouseEvent, Map } from 'leaflet';
import { MapQuestion, Quiz } from '../../types/types';
import { getPosition } from '../../utilities/fetch';
import CreateQuizForm from '../createQuizForm/CreateQuizForm';

interface LeafletMapProps {
  coordinates?: GeolocationCoordinates | undefined;
  activeQuiz?: Quiz
}

const LeafletMap = ({coordinates, activeQuiz}: LeafletMapProps) => {

  const {questions = []} = activeQuiz || {};

  const [map, setMap] = useState<Map>();
  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [markerCoords, setMarkerCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    console.log(markerCoords);
    
  }, [markerCoords]);

  useEffect(() => {
    if(!coordinates || !position?.latitude){
      getPosition(setPosition);
    }
  }, []);

  useEffect(() => {
    if (!map && position?.latitude) {
      const createMap = L.map('map').setView([position?.latitude, position?.longitude], 13);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(createMap);
      
      const userLoc = L.marker([position?.latitude, position?.longitude]).addTo(createMap);
      userLoc.bindPopup('Här är du!').openPopup();
    
      setMap(createMap);
    }   
  }, [position]);

  useEffect(() => {
    if(map){
      questions.map((question: MapQuestion) => {
        const marker = L.marker([question.location.latitude, question.location.longitude]).addTo(map);
        marker.bindPopup(question.question).openPopup();
      });
    }
  }, );

  
if(questions.length <= 0){
  function onMapClick(e: LeafletMouseEvent) {
   if(map){
    const marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    marker.bindPopup('Hej').openPopup();
    setMarkerCoords(e.latlng);
   }
    
    
  }
  map?.on('click', onMapClick);
  
  
}
  
  return (
    <>
      <div id="map"></div>
      {markerCoords &&
      <CreateQuizForm name={''} markerCoords={markerCoords} />
     }
    </>
  )
}

export default LeafletMap