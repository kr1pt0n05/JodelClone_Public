import { useState } from "react";
import Header from "../components/Header";


function Image(){
    return (
        <>
        {/* Right Side: Image */}
        <div className="flex justify-center items-center">
            <img src="https://dummyimage.com/200x200/ddd/000" alt="Placeholder Image" className="h-64 w-64 rounded-lg object-cover" />
        </div>
        </>
      ) 
}


function LoginForm(){
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [apiState, setApiState] = useState({ loading: false, error: false, success: false, errorMessage: "" });


    const handleLogin = async (e: React.FormEvent) =>{
        e.preventDefault();
        setApiState({loading: true, error: false, success: false, errorMessage: ""})
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        };

        try{
            const response = await fetch("http://localhost:8080/api/login", requestOptions);
            const result = await response.json();
            console.log(response);
            console.log(result);

            if(response.ok){
                setApiState({loading: false, error: false, success: true, errorMessage: ""});
                window.location.href = "/post";
                console.log("Success");
            }else{
                setApiState({loading: false, error: true, success: false, errorMessage: result.message || "Login failed, please try again."});
            }

        }catch(error){
            setApiState({loading: false, error: true, success: false, errorMessage: "An unexpected error occurred. Please try again later."});
            console.log(error);
        }
};

    return (
        <>
        {/* Left Side: Content (Text, Buttons, Login) */}
        <div className="max-w-md p-8 text-center mx-10">
            <div className='my-10'>
                <h1 className="mb-4 text-left text-4xl font-bold text-orange-500">
                    Jodel Doppelgänger - Bei uns ist Deine Anonymität gewährt
                </h1>
            </div>

        {/* Login Panel */}
        <form 
            onSubmit={  handleLogin} >
        <div className="space-y-4">
            <input 
            type="text" 
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username" 
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <input 
            type="password" 
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" 
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500" />
            <button className="w-full rounded-full bg-orange-500 px-6 py-3 font-bold text-white transition-all duration-300 hover:border-orange-500 hover:bg-white hover:text-orange-500 transform hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 hover:scale-105">
            Login
            </button>
         </div>
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
        </>
      ) 
}


function LoginPage() {
return (
    <>
    <Header/>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="flex flex-row items-center justify-center max-w-7xl w-full p-8">
                <LoginForm/>
                <Image/>
            </div>
        </div>
    </>
)
}


export default LoginPage;