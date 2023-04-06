import { Link } from 'react-router-dom';
import like from '../Assets/Images/like.svg';
import chat from '../Assets/Images/chat.png'

import {useState,useEffect} from 'react'
const QuestionCard=({title,likes,_id,askedBy})=>{

  const [likeCount,setLike]=useState(likes);
  const [liked,setLiked]=useState(false);
  const [username,setUsername]=useState("");
  const [userImage,setUserImage]=useState(null);
  const getData=async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
       setUsername(json.data.username);
       setUserImage(json.data.profilephoto);
  }

  const patchLikes=async(url)=>{
    const response=await fetch(url,{
      method:'PATCH',
      body:JSON.stringify({
        likes:likeCount
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const json=await response.json();
    console.log(json);
  }

  const handleLike=(event)=>{
    if(!liked){
        setLike(likeCount+1);
        setLiked(true);
    }
    else{
        setLike(likeCount-1);
        setLiked(false);
    }
  }
  useEffect(()=>{
     getData(`/api/user/${askedBy}/getusernamepassword`)
  })
  useEffect(()=>{
    patchLikes(`/api/question/updatelikes/${_id}`);
},[likeCount]);

   return(
    <div className="border-2 border-black p-3 m-2"  >
      <Link to={"/user/"+askedBy}>
        <div className='flex justify-start'>
        <img className='w-8' src={userImage} alt="NA"></img>
        <span className='text-xl'>{username}</span>
        
      </div></Link>
  
      <Link to={"/question/"+_id}>
        <div>
        <p className="text-2xl font-bold m-2">{title}</p>
      </div></Link>
  
     

     <div>
     <button onClick={handleLike}><img className="w-8"src={like} alt='like'></img></button>
    
        <span className='px-2 text-3xl'>{likeCount}</span>
        <Link to={"/question/"+_id}><button><img className="w-8"src={chat} alt='Comment'></img></button></Link>
     </div>
    </div>

   )
}

export default QuestionCard;