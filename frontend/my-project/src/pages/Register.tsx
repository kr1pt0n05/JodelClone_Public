import { useState } from "react";
import Header from "../components/Header"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../App.css'



function RegisterForm(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const[apiState, setApiState] = useState({ loading: false, error: false, success: false, errorMessage: "" });


    const handleRegister = async (e: React.FormEvent) =>{
        e.preventDefault();
        setApiState({loading: true, error: false, success: false, errorMessage: ""})
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        };

        try{
            const response = await fetch("http://localhost:8080/api/register", requestOptions);
            const result = await response.json();

            console.log(response);
            console.log(result);

            if (response.ok) {
                setApiState({loading: false, error: false, success: true, errorMessage: ""});
                window.location.href = "/";
                console.log("Success");
            }else{
                setApiState({loading: false, error: true, success: false, errorMessage: result.message || "Registration failed, please try again."});
            }

        }catch(error){
            setApiState({loading: false, error: true, success: false, errorMessage: "An unexpected error occurred. Please try again later."});
            console.log(error);
        }
};


    return(
    <div className="flex justify-center items-center h-screen bg-orange-200">
        <form 
            onSubmit={handleRegister} 
            className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-bold text-gray-700">Username</label>
            <input 
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full mt-1 p-2 border rounded-md" 
                required></input>
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700">Password</label>
            <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full mt-1 p-2 border rounded-md"
            required></input>
            </div>
            <button 
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
            Register
            </button>
            <div>
            {apiState.loading && <div>Loading...</div>}
            {apiState.error && 
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <br/><span className="block sm:inline">{apiState.errorMessage}</span>
                </div>
            }
            {apiState.success && <div>Success!</div>}
         </div>
            </form>
        </div>
);
}


function RegisterPage() {
    return (
      <>
       <Header/>
       <RegisterForm/>
      </>
    )
  }

  
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RegisterPage />
    </StrictMode>,
  )
  