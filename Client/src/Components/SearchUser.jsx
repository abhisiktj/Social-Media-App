import { useState,useEffect } from "react";
import {Link} from 'react-router-dom';

const SearchUser=()=>{
    const [searchText,setSearchText]=useState("");
    const[userData,setUserData]=useState([]);


    const handleSearchText=async(event)=>{
        setSearchText(event.target.value);
        try{
             const response=await fetch("/api/user/getdetailsforsearch",{
                method:'POST',
                body:JSON.stringify({
                    searchText:event.target.value
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
             });
             const json=await response.json();
             if(json.success===false){
                alert(json.message);
            }
            else{
             setUserData(json.data);
            }
        }
        catch(error){
            console.log("error in search user data");
        }

    }
    
    return(
        <div>
        <input 
         className=" p-3 placeholder-sky-800 bg-sky-50 text-sm rounded-lg w-80 :focus outline-sky-900"
         placeholder="Search User"
         value={searchText}
          onChange={handleSearchText}
        />

    {(userData.length>0) && <ul>
          {
            userData.map((data,index)=>{
                return(
               <li key={data._id}><Link to={`/user/${data.username}`}><img className="w-8 rounded-full inline-block m-2" src={data.profilephoto}></img><span>{data.username}</span></Link></li>)
            })
          }
        </ul>}
        {(userData.length ==0 && searchText!=="") &&
           <p className="p-2">No user Available</p>
        }
        </div>

    )

}

export default SearchUser;


