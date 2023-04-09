import {useState} from 'react';
import useGetUser from '../utils/useGetUser';
import { useNavigate } from 'react-router-dom';

const AddAnswer=({id})=>{
    const [content,setContent]=useState("");
    const {isLogin,token}=useGetUser();
    const navigate=useNavigate();


    const handleSubmit=async()=>{
        if(!isLogin){
           navigate('/auth/login')
        }
        if(content===""){
        alert("Answer Field Can't be Empty");
       }
         const response=await fetch(`/api/answer/add/${id}`,{
           
          method: "POST",
          body: JSON.stringify({
            content:content
    }),

    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "authorization":`Bearer ${token}`
    }
 })
 const json=await response.json();
 if(json.success===true){
    window.location.reload();
 }
else{
    alert(json.message)
}

    }
    return(
        <form className="flex flex-col justify-center items-center w-[800] m-auto" onSubmit={handleSubmit}>
      <textarea
      placeholder='Type Answer...'
      className='w-full mx-3 p-5 h-[300] mb-3 border border-sky-300  rounded-lg'
        value={content}
        onChange={(event)=>{
            if(!isLogin){
                navigate('/auth/login');
            }
             setContent(event.target.value);
        }}
       />
      <div className='flex justify-center w-[700]'>
      <button type="submit" className='w-96 p-2 bg-sky-800 text-white  hover:bg-sky-500 rounded-md'>Submit</button></div>
       </form>

    )
}
export default AddAnswer;