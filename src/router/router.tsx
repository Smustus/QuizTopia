import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/Home';
import CreateAccount from '../pages/createAccount/CreateAccount';
import LoginForm from '../pages/loginForm/LoginForm';
import Quizzes from '../pages/quizzes/Quizzes';
import CreateQuiz from '../pages/createQuiz/CreateQuiz';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/quizzes',
        element: <Quizzes />
    },
    {
        path: '/createquiz',
        element: <CreateQuiz />
    },
    {
        path: '/create',
        element: <CreateAccount />
    },
    {
        path: '/login',
        element: <LoginForm />
    }
]);

export default router;