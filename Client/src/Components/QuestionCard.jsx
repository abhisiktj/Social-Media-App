import { Link } from 'react-router-dom';
import like from '../Assets/Images/like.svg';
import chat from '../Assets/Images/chat.png'
import useGetUser from '../utils/useGetUser';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
const QuestionCard=({title,_id,askedBy,likedBy})=>{
  const {isLogin,user}=useGetUser();

  let flag=false;
  if(isLogin){
    if(likedBy.includes(user.id))
       flag=true;
  }

  const [likeCount,setLike]=useState(likedBy.length);
  const [liked,setLiked]=useState(flag);
  const [username,setUsername]=useState("");
  const [userImage,setUserImage]=useState(null);
  const [isMounted,setIsMounted]=useState(false);
  const navigate=useNavigate();

  const getData=async(url)=>{
    try{
      const response=await fetch(url);
      const json=await response.json();
       setUsername(json.data.username);
       setUserImage(json.data.profilephoto);
    }
    catch(error){
      console.log("Error in getting username and photo ");
   }
  }

  const patchLikes=async(url)=>{
    try{
    const response=await fetch(url,{
      method:'PATCH',
      body:JSON.stringify({
        userId:user.id
      }),
      headers:{
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const json=await response.json();
  }
  catch(error){
   console.log("Error in updating likes");
 }
   
  }

  const handleLike=(event)=>{
    if(!isLogin){
      navigate('/auth/login');
    }

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
     getData(`/api/user/${askedBy}/getusernamepic`)
  })
  useEffect(()=>{
    if(isMounted)
       patchLikes(`/api/question/updatelikes/${_id}`);
    setIsMounted(true);

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