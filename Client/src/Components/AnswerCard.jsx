import useGetUser from '../utils/useGetUser';
import { useNavigate,Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import like from '../Assets/Images/like.svg';

const AnswerCard=({_id,userId,content,likedBy})=>{

    const {isLogin,user,token}=useGetUser();
    const navigate=useNavigate();
    let flag=false;
    if(isLogin){
      if(likedBy.includes(user.id))
         flag=true;
    }

    const [likeCount,setLike]=useState(likedBy.length);
    const [liked,setLiked]=useState(flag);
    const [isMounted,setIsMounted]=useState(false);


    const [username,setUsername]=useState("");
    const [userImage,setUserImage]=useState(null);


    const handleDelete=async()=>{

      const perm=confirm("Are you sure you want to delete the answer");
       if(!perm)
          return;

    try{
    const response=await fetch(`/api/answer/${_id}`,{
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
      window.location.reload();
   }
  }
  catch(error){
    console.log(error);
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

  useEffect(()=>{
    if(isMounted)
       patchLikes(`/api/answer/updatelikes/${_id}`);
    setIsMounted(true);

},[likeCount]);



useEffect(()=>{
    getData(`/api/user/${userId}/getusernamepic`)
 },[])


    return(
       <div className='border border-black m-3 p-2'>
        <div className='flex justify-between'>
        <Link to={"/user/"+username}>
        <div className='flex justify-start'>
        <img className='w-8' src={userImage} alt="NA"></img>
        <span className='p-2 text-sm'>{username}</span></div></Link>
        { (userId===user?.id) && <button className='bg-red-800 p-1 text-white hover:bg-red-400 rounded-md'
       onClick={handleDelete}
      >Delete </button>}
      </div>
        
      
        <p className="my-2 text-lg">{content}</p>
         

     <div>
     <button onClick={handleLike}><img className="w-8"src={like} alt='like'></img></button>
     <span className='px-2 text-3xl'>{likeCount}</span>
     </div>

       </div>
    )
}
export default AnswerCard