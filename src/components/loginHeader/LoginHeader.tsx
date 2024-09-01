import { useEffect } from 'react'
import './LoginHeader.css'
import { setLoginState, setUsername } from '../../reducers/loggedInReducer';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

interface LoginHeaderProps {
  className?: string
}

const LoginHeader = ({className}: LoginHeaderProps) => {
  const loggedIn = useSelector((state: any) => state.loginState.isLoggedIn);
  const dispatch = useDispatch();  
  const navigate = useNavigate();

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
    navigate("/");
  }

  return (
    <header className={`loginHeader ${className}`}>
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
                Create quiz
              </NavLink>

              <a id='logoutLink' href='/' onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}>
                Logout
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
                Login
              </NavLink>

              <NavLink to='/create' className={({ isActive }) => isActive ? 'active' : ''}>
                Create account
              </NavLink>
            </article>
        }
    </header>
  )
}

export default LoginHeader