import { useState } from 'react'
import {Link} from 'react-router-dom'
import logo from '../Assets/Images/logo.png'
import home from '../Assets/Images/home.png'

const Logo=()=>{
    return(
         <div>
             <a href='/'></a>
              <img className="w-14" src={logo} alt="AskIt"></img>
         </div>
    )
}
const Search=()=>{
    const [searchText,setSearchText]=useState("");
    return(
    <input
    className=" p-3 placeholder-sky-800 bg-sky-50 text-sm rounded-lg w-80 :focus outline-sky-900"
    placeholder="Ask It!"
    value={searchText}
    onChange={(Event)=>{
        setSearchText(Event.target.value);
    }}


     />)
}
const Utilties=()=>{
    return(
       <ul className='flex justify-around'>
           <li className='p-2 m-1 shrink-0'><Link to="/"><img  src={home} alt='Home'></img></Link></li>
           <li className='p-2 m-1'><Link to="/auth/signup">Signup</Link></li>
           <li className='p-2 m-1'><Link to="/auth/login">Login</Link></li>
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
