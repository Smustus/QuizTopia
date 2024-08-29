import React, { useEffect, useState } from 'react'
import './Home.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { useSelector } from 'react-redux';

const Home = () => {

  const username = useSelector((state: any) => state.loginState.username || ""); 
  
  const formatName = (username: string) => {
    return username.slice(0, 1).toUpperCase() + username.slice(1)
  }

  return (
    <>
      <LoginHeader />
      <main>
        <h2>{`Welcome to QuizTopia${username ? ` ${formatName(username)}` : ""}!`}</h2>
        <section>
          
        </section>
      </main>
    </>
  )
}

export default Home