import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux';
import { setCredentials } from "../utils/slices/authSlice";

const Signup=()=>{


    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("")

    const [usernameError,setUsernameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [passwordError,setPasswordError]=useState("");
    

    const  dispatch=useDispatch();
    const navigate=useNavigate();

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

        if(email.length===0){
            setEmailError("Email field can't be empty");
            validated=false;
        }
        else{
            setEmailError("");
        }
        
        return validated;
        

    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        if(!validateForm())
          return;
         const url='/api/user/register';
         try{
          const response=await fetch(url,{
            method:"POST",
            body:JSON.stringify({
              username:username,
              email:email,
              password:password
            }),
           headers:{ 
            "Content-type": "application/json; charset=UTF-8"
           }
        })
        const json=await response.json();
        const {user,token}=json.data;
        dispatch(setCredentials({user,token}))
        localStorage.setItem('token',token);
        alert("logged in");
        navigate('/');
    }
    catch(error){
        console.log("Error in logging in");
     }
    }
    return (
        <div >
            <div className="flex flex-col items-center">
            <p className="text-6xl text-sky-600 mb-5"><Link to="/">AskIt</Link></p>
            <p className="text-2xl mb-2"> Signup</p>
            <p className="text-xl mb-2">Already have an account?<Link to="/auth/login" className="underline-offset-4 text-blue-600">Login</Link></p>
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
                 className=" w-96 p-2  outline-blue-800"
                   name="email"
                   type="email"
                   value={email}
                   placeholder="Email*"
                   onChange={(event)=>{
                    setEmail(event.target.value)
                   }}
                 />
                  <p  className="text-xs text-red-700">{emailError}</p>
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
                 type="submit" className="m-3 bg-blue-700 text-white w-80 p-2 rounded-lg text-lg hover:bg-blue-500 border-black" 
                 >Signup</button>
            </form>
        </div>
    )
 } 
 export default Signup;
 