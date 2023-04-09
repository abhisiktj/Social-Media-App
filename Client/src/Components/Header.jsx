import { useState } from 'react'
import {Link} from 'react-router-dom'
import home from '../Assets/Images/home.png'
import useGetUser from '../utils/useGetUser'
import Logout from './Logout'

const Logo=()=>{
    return(
        <p className="text-5xl text-sky-600 mb-5 ml-3"><Link to="/">AskIt</Link></p>
    )
}
const Search=()=>{
    const [searchText,setSearchText]=useState("");
    return(
    <input
    className=" p-3 placeholder-sky-800 bg-sky-50 text-sm rounded-lg w-96 :focus outline-sky-900"
    placeholder="Ask It!"
    value={searchText}
    onChange={(Event)=>{
        setSearchText(Event.target.value);
    }}


     />)
}
const Utilties=()=>{
  
  const {isLogin,user}=useGetUser();
    return(
       <ul className='flex justify-around'>
           <li className='p-2 m-1 shrink-0 flex items-center'><Link to="/"><img  src={home} alt='Home'></img></Link></li>
      { (isLogin) &&  <li className='p-2 m-1 flex items-center'><Link to={`/user/${user.id}`}><img className='w-7' src={user.profilephoto} alt="Profile" /></Link></li>}
      {(isLogin) && <Logout />}
       { (!isLogin) &&<li className='p-2 m-1 flex items-center'><Link to="/auth/signup">Signup</Link></li> }
       { (!isLogin) &&  <li className='p-2 m-1 flex items-center'><Link to="/auth/login">Login</Link></li> } 
       </ul>
        )
}
const Header=()=>{
    return(
        <div className='flex justify-between py-2'>
        <Logo />
        <Search />
        <Utilties />
        </div>
    

    )
}
export default Header;
