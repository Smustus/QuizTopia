import { QuizQuestion } from "../types/types";

const BASE_URL = 'https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com';

export function getPosition(callback: (coords: GeolocationCoordinates) => void) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          callback(position.coords);
        },
        (error) => {
          console.error('Error fetching position: ', error);
        }
      );
    } else {
      console.error('Geolocation didnt work');
    }
  }

export async function createAcc(userData: any) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    console.log(response);
    if (!response.ok) {
        throw new Error('Could not create account');
    }
    const data = await response.json();
    console.log(data);
    return data;

    } catch (error: any) {
        console.error(error);
    }
}

export async function loginAcc(userData: any){
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Could not login')
        }
        const data = await response.json();
        console.log(data);
        if(data.success){
            sessionStorage.setItem('username', userData.username);
            sessionStorage.setItem('token', data.token);
        }
        return data;
        
    } catch (error: any) {
        console.error(error);
    }
}

export async function createQuiz(quizName: {name: string}){
    try {
        const response = await fetch(`${BASE_URL}/quiz`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(quizName)
        });
        if (!response.ok) {
            throw new Error('Could not create quiz')
        }
        const data = await response.json();
        console.log(data);
        return data.quizId;
        
    } catch (error: any) {
        console.error(error);
    }
}

export async function createQuizQuestion(quizQuestion: QuizQuestion){
    try {
        const response = await fetch(`${BASE_URL}/quiz/question`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(quizQuestion)
        });
        if (!response.ok) {
            throw new Error('Could not create quiz')
        }
        const data = await response.json();
        return data;
        
    } catch (error: any) {
        console.error(error);
    }
}

export async function fetchAllQuizes() {
    try {
        const response = await fetch(`${BASE_URL}/quiz`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        return data;

    } catch (error: any) {
        console.error(error);
    }
};

export async function fetchQuiz(userId: string, quizId: string) {
    
    const token = sessionStorage.getItem('token') || ''; 
    if (token.length > 0) {
        try {
            const response = await fetch(`${BASE_URL}/quiz/${userId}/${quizId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            return data;

        } catch (error: any) {
            console.error(error);
        }
    }
};


export async function deleteQuiz(quizId: string) {
    try {
        const response = await fetch(`${BASE_URL}/quiz/${quizId}`, {
            method: "DELETE",
            headers: {
            'Content-Type': 'application/json', 
            'Authorization': `${sessionStorage.getItem('token')}`
            }
        });
        const data = await response.json();
        console.log('Token');
        return data;

        } catch (error) {
        console.error(error);
        }

  }