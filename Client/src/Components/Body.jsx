import {questions} from '../constants/questions'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import QuestionCard from '../Components/QuestionCard'
import SearchUser from './SearchUser';
import { useNavigate } from 'react-router-dom';
import useGetUser from '../utils/useGetUser';

const Body=()=>{
    const [data,setData]=useState([]);
    const [filterData,setFilterData]=useState([]);
    const [sortBy,setSortBy]=useState("latest");
    const [page,setPage]=useState(1);
    const {isLogin,user}=useGetUser();

    const navigate=useNavigate();
    const handleAddQuestion=()=>{
      if(!localStorage.getItem(token))
          navigate('/');
    }

    const getData=async(url)=>{
      try{
      const response=await fetch(url);
      console.log(response);
      const json=await response.json();
      if(json.success===false){
        alert(json.message);
    }
    else{
        setData(json.data);
        
        setFilterData(json.data);
        if(json.data.length===0){
           setPage(1);
        }
      }
      }
       catch(error){
          console.log(error);
       }
  }

  useEffect(()=>{
    const json=getData(`/api/question/?page=${page}&limit=3`)  
  },[page])


  useEffect(()=>{
       
        const sorted=[...filterData].sort((a,b)=>{
          
            if(sortBy==='likes')
             return b.likedBy.length-a.likedBy.length;

            if(sortBy==='answers')
             return b.answeredBy.length-a.answeredBy.length;

            if(sortBy==='earliest')
             return Date.parse(a.createdAt)-Date.parse(b.createdAt);

            if(sortBy==='latest')
              return Date.parse(b.createdAt)-Date.parse(a.createdAt);
        })
          setFilterData(sorted);      
    },[sortBy]);


    return (!filterData)?<h1>Loading</h1>:(
      <>
       <div className='flex justify-around'>
        <div className='flex justify-between my-2 w-60 h-8'>
         <button className="bg-sky-800 py-1 px-2 text-white rounded-lg">
          <Link to={(isLogin)?"/question/add":"/auth/login"} >Add Question</Link></button>

        <select onChange={(event)=>{setSortBy(event.target.value)}}>
       <option value="latest">Latest</option>
         <option value="likes">Likes</option>
         <option value="answers">Answers</option>
         <option value="earliest">Earliest</option>
       </select>
      
        </div>

        <div className='w-[500] border-black ml-3' >
        {filterData?.map((data)=>{
          const {title,_id,askedBy,likedBy}=data
                    return <QuestionCard title={title} _id={_id} askedBy={askedBy} likedBy={likedBy} displayAnsIcon="true" key={data._id}/>
            })}
        </div>

       <SearchUser />

        </div>

        <div className='flex p-2 justify-center'>
        {(page!=1) && <span className='text-2xl p-1 hover:cursor-pointer' onClick={()=>{
          setPage(page-1);
        }}>Prev</span>}

         <span className='text-2xl p-1 hover:cursor-pointer underline'>{page}</span>

        <span className='text-2xl p-1 hover:cursor-pointer' onClick={()=>{
          setPage(page+1);
        }}>Next</span>
       
        </div>
        </>
    )
}
export default Body;



