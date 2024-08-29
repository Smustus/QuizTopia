import React, { useState } from "react"
import './CreateAccount.css';
import { createAcc } from "../../utilities/fetch";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../../components/loginHeader/LoginHeader";

export type User = {
    username: string;
    password: string;
};

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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
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

  return (
    <>
        <LoginHeader />
        <main>
            <h2>Skapa konto</h2>
            <form onSubmit={handleSubmit}>        
                    <fieldset className="inputField">
                        <legend>Användarnamn</legend>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </fieldset>
                    <fieldset className="inputField">
                        <legend>Lösenord</legend>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </fieldset>
                  
                    <button type="submit">Skapa konto</button>
                </form>
        </main>
    </>
  )
}