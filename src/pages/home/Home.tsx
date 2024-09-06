import './Home.css';
import LoginHeader from '../../components/loginHeader/LoginHeader';
import { useSelector } from 'react-redux';
import { formatStringUpperCase } from '../../utilities/formatter';

const Home = () => {

  const username = useSelector((state: any) => state.loginState.username || ""); 

  return (
    <>
      <LoginHeader />
      <main className='homeMain'>
        <h1>Welcome to QuizTopia{`${username ? ` ${formatStringUpperCase(username)}` : ""}!`}</h1>
        
        <section>
          
        </section>
      </main>
    </>
  )
}

export default Home