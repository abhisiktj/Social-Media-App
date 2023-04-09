import {useState} from 'react';
import useGetUser from '../utils/useGetUser';
import { useNavigate } from 'react-router-dom';

const AddQuestion=()=>{
const [title,setTitle]=useState("");
const [desc,setDesc]=useState("");

const [titleError,setTitleError]=useState("");
const {user,token}=useGetUser();

const navigate=useNavigate();
const validate=()=>{
  let validated=true;

  if(!title){
     validated=false;
     setTitleError("*Please Enter a Title")
  }
  else{
    setTitle("");
  }
  return validated;
}
const handleSubmit=async(event)=>{
    event.preventDefault();
    if(!validate())
      return;
  
      const url="/api/question/add"

      const response=await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            title:title,
            desc:desc,
            askedBy:user.id
        }),
        headers: {
            "authorization":`Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }

      })
      const json= await response.json();
      if(json.success===false){
        alert(json.message);
    }
    else{
      navigate('/');
    }
    
}
    return(
        <div className='flex flex-col justify-center items-center'>
    <p className=' text-4xl m-5'>Hi {user?.username} <img src={user?.profilephoto} className='inline w-10 rounded-full'></img> you can ask your question</p>
    <form className='flex flex-col items-start p-2' onSubmit={handleSubmit}>
        <input
        type="text"
        name="title"
        placeholder="Provide title for the question"
        value={title}
        onChange={(event)=>{
            setTitle(event.target.value);
        }}
        className="w-[700] p-5 mb-3 border border-sky-300  rounded-lg"
        ></input>
<p className="text-s mb-3 text-red-700">{titleError}</p>
      <textarea
        type="text"
        name="desc"
        placeholder="Provide description for the question"
        value={desc}
        onChange={(event)=>{
            setDesc(event.target.value);
       
        }}
        className="w-[700] p-5 h-[300] mb-3 border border-sky-300  rounded-lg"
        ></textarea>
        <div className='flex justify-center w-[700]'>
      <button type="submit" className='w-96 p-2 bg-sky-800 text-white  hover:bg-sky-500 rounded-md'>Submit</button></div>
    </form>
    </div>
    )

}
export default AddQuestion;