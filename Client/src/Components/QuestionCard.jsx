import { Link } from 'react-router-dom';
import like from '../Assets/Images/like.svg';
import chat from '../Assets/Images/chat.png'

import {useState,useEffect} from 'react'
const QuestionCard=({title,likes,_id,createdBy})=>{

  const [likeCount,setLike]=useState(likes);
  const [liked,setLiked]=useState(false);
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
    console.log("api call");
    //api call to update like
},[likeCount]);

   return(
    <div className="border-2 border-black p-3 m-2"  >
      <Link to={"/user/"+createdBy}>
        <div>
        <span>username</span>
        <span>userimage</span>
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