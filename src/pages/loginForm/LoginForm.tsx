import { useState } from "react";
import './LoginForm.css';
import React from "react";
import { loginAcc } from "../../utilities/fetch";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, setUsername } from "../../reducers/loggedInReducer";
import LoginHeader from "../../components/loginHeader/LoginHeader";

type User = {
    username: string;
    password: string;
}

export default function LoginForm() {
    const [formData, setFormData] = useState<User>({ username: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

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
            const loginToken = await loginAcc(formData);
            if(!loginToken.success) return
            dispatch(setLoginState(true))
            dispatch(setUsername(formData.username))
            navigate("/");
        
        } catch (error) {
            console.error(error);
        }
    }
       
    return (
        <>
            <LoginHeader />
            <main>
            <h2>Logga in</h2>
                <form onSubmit={handleSubmit}>        
                    <fieldset className="inputField">
                        <legend>Username</legend>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </fieldset>
                    <fieldset className="inputField">
                        <legend>Password</legend>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </fieldset>
                  
                    <button type="submit">Login</button>
                </form>
            </main>
        </>
    )
}