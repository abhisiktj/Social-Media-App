import { useState } from "react";
import { Link } from "react-router-dom";

const Login=()=>{
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("")

    const [usernameError,setUsernameError]=useState("");
    const [passwordError,setPasswordError]=useState("");

    const validateForm=()=>{
        let validated=true;

        if(!username){
            setUsernameError("Username Field can't Be  Empty")
            validated=false;
        }
        else if(username.length<6){
            setUsernameError("Length should be of atleast 6 characters");
            validated=false;
        }
        else{
            setUsernameError("");
        }

        if(!password){
            setPasswordError("Password Field can't Be  Empty")
            validated=false;
        }
        else if(password.length<6){
            setPasswordError("Length should be of atleast 6 characters");
            validated=false;
        }
        else{
            setPasswordError("");
        }

        
        return validated;
        

    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(!validateForm())
          return;

    console.log("form validated");
    }
    return (
        <div >
            <div className="flex flex-col items-center">
            <p className="text-6xl text-sky-600 mb-5">AskIt</p>
            <p className="text-2xl ,mb-1">Login</p>
            <p className="text-xl mb-2">New to AskIt?<Link to="/auth/signup" className="underline-offset-4 text-blue-600">Signup</Link></p>
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="m-2">
                <input
                className="w-96 p-2 outline-blue-800"
                   name="username"
                   type="text"
                   value={username}
                   placeholder="Username*"
                   onChange={(event)=>{
                    setUsername(event.target.value)
                   }}
                 />
                 <p className="text-xs text-red-700">{usernameError}</p>
                 </div>


                 <div className="m-2">
                <input
                className="w-96 p-2 outline-blue-800"
                   name="password"
                   type="password"
                   value={password}
                   placeholder="Password*"
                   onChange={(event)=>{
                    setPassword(event.target.value)
                   }}
                 />
                 <p className="text-xs text-red-700">{passwordError}</p>
                 </div>

                 <button 
                 type="submit" className="m-3 bg-blue-700 text-white w-80 p-2 rounded-lg text-lg hover:bg-blue-500" 
                 >Signup</button>

            </form>
        </div>
    )
 } 
 export default Login;
 