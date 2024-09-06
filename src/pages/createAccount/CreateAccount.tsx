import React, { useState } from "react"
import './CreateAccount.css';
import { createAcc } from "../../utilities/fetch";
import { Link, useNavigate } from "react-router-dom";
import LoginHeader from "../../components/loginHeader/LoginHeader";
import { User } from "../../types/types";

export default function CreateAccount() {
    const [formData, setFormData] = useState<User>({ username: '', password: '' });
    const navigate = useNavigate();

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
            const acc = await createAcc(formData);
            console.log(acc);
        
            if(acc.success === true){
                navigate("/login");
              }
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit(e as React.FormEvent);
        }
    }

  return (
    <>
        <LoginHeader className='white' />
        <main className="createAccPageMain">
            <h2 className="createAccPageMain_title">Create account</h2>
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>        
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
                    
                    <button type="submit">Create</button>
                </form>
        </main>
    </>
  )
}