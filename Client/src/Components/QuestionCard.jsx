import { Link } from 'react-router-dom';
import like from '../Assets/Images/like.svg';
import chat from '../Assets/Images/chat.png'
import useGetUser from '../utils/useGetUser';
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from 'react'
const QuestionCard=({title,_id,askedBy,likedBy,desc,displayAnsIcon})=>{
  const {isLogin,user,token}=useGetUser();

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
      if(json.success===false){
        alert(json.message);
    }
    else{
       setUsername(json.data.username);
       setUserImage(json.data.profilephoto);
    }
    }
    catch(error){
      console.log("Error in getting username and photo ");
   }
  }

  const patchLikes=async(url)=>{
    try{
    const response=await fetch(url,{
      method:'PATCH',
      headers:{
        "authorization":`Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const json=await response.json();
    if(json.success===false){
      alert(json.message);
    }
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

  const handleDelete=async()=>{
    const perm=confirm("Are you sure you want to delete the question");
    if(!perm)
      return;

    try{
    const response=await fetch(`/api/question/${_id}`,{
      method:"DELETE",
      headers:{
        "authorization":`Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
    const json=await response.json();

   if(json.success==="false"){
    alert(json.message);
   }
   else{
    const currentUrl=window.location.href;
    console.log(currentUrl);
    if(currentUrl=='http://localhost:1234/')
       window.location.reload();
    else
      navigate('/');
   }
  }
  catch(error){
    console.log(error);
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
     <div className='flex justify-between'>
      <Link to={"/user/"+askedBy}>
        <div className='flex justify-start'>
        <img className='w-8' src={userImage} alt="NA"></img>
        <span className='p-2 text-sm'>{username}</span>
        
      </div></Link>
     { (askedBy===user?.id) && <button className='bg-red-800 p-1 text-white hover:bg-red-400 rounded-md'
       onClick={handleDelete}
      >Delete </button>}
      </div>
  
      <Link to={"/question/"+_id}>
        <div>
        <p className="text-2xl font-bold m-2">{title}</p>
      </div></Link>

    {(!desc)?null :  <div>
      <p className="text-lg m-2">{desc}</p>
      </div>}
  
     

     <div>
     <button onClick={handleLike}><img className="w-8"src={like} alt='like'></img></button>
    
        <span className='px-2 text-3xl'>{likeCount}</span>
       {displayAnsIcon && <Link to={"/question/"+_id}><button><img className="w-8"src={chat} alt='Comment'></img></button></Link>}
     </div>
    </div>

   )
}

export default QuestionCard;