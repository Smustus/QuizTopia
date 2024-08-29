import React, { useEffect, useState } from 'react'
import './LoginHeader.css'
import { setLoginState, setUsername } from '../../reducers/loggedInReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const LoginHeader = () => {
  const loggedIn = useSelector((state: any) => state.loginState.isLoggedIn);
  const dispatch = useDispatch();  

  useEffect(() => {
    async function isloggedIn(){
      try {
        const username = sessionStorage.getItem('username') || '';
        const token = sessionStorage.getItem('token') || ''; 
        if(token.length > 0 && username){
          dispatch(setLoginState(true));
          dispatch(setUsername(username));
          return;
        } 
        dispatch(setLoginState(false))
        dispatch(setUsername(''));

      } catch (error) {
        console.error(error);
        dispatch(setLoginState(false));
      }
    }
    isloggedIn();
  }, [dispatch]);

  const handleLogout = () => {
    sessionStorage.setItem('token', '');
    dispatch(setLoginState(false));
    dispatch(setUsername(""));
  }

  return (
    <header className='loginHeader'>
        {
          loggedIn ? 
            <article>
              <NavLink to='/'className={({ isActive }) => isActive ? 'active' : ''}>
                Start
              </NavLink>

              <NavLink to='/quizzes'className={({ isActive }) => isActive ? 'active' : ''}>
                Quizzes
              </NavLink>

              <NavLink to='/createquiz'className={({ isActive }) => isActive ? 'active' : ''}>
                Skapa Quiz
              </NavLink>

              <a href='/' onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}>
                Logga ut
              </a>
            </article> 
            :
            <article>
              <NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>
                Start
              </NavLink>

              <NavLink to='/quizzes'className={({ isActive }) => isActive ? 'active' : ''}>
                Quizzes
              </NavLink>

              <NavLink to='/login' className={({ isActive }) => isActive ? 'active' : ''}>
                Logga in
              </NavLink>

              <NavLink to='/create' className={({ isActive }) => isActive ? 'active' : ''}>
                Skapa konto
              </NavLink>
            </article>
        }
    </header>
  )
}

export default LoginHeader