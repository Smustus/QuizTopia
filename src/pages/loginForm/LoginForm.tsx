import { useState } from "react";
import './LoginForm.css';
import React from "react";
import { loginAcc } from "../../utilities/fetch";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoginState, setUsername } from "../../reducers/loggedInReducer";
import LoginHeader from "../../components/loginHeader/LoginHeader";
import { User } from "../../types/types";

export default function LoginForm() {
    const [formData, setFormData] = useState<User>({ username: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Too obvious
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value 
        });
    }

    //Submission of form, updates redux state and navigate to homepage
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
            <LoginHeader className="white" />
            <main className="loginPageMain">
            <h2 className="loginPageMain_title">Login</h2>
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
                    <p className="loginPage_createAccLink">Missing&nbsp;an&nbsp;account?&nbsp;<Link to="/create">Create&nbsp;one&nbsp;here!</Link></p>
                    <button type="submit">Login</button>
                </form>
            </main>
        </>
    )
}