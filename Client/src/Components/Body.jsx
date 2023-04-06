import {questions} from '../constants/questions'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import QuestionCard from '../Components/QuestionCard'
// import getData from '../utils/getData';

const Body=()=>{
    const [data,setData]=useState([]);
    const [filterData,setFilterData]=useState([]);
    const [sortBy,setSortBy]=useState("likes");

    const getData=async(url)=>{
      const response=await fetch(url);
      const json=await response.json();
      setData(json.data);
       setFilterData(json.data);
  }

  useEffect(()=>{
       const json=getData("/api/question/?page=1&limit=3")    
  },[]);

     useEffect(()=>{
       
        const sorted=[...filterData].sort((a,b)=>{
            
            return b[sortBy]-a[sortBy]
        })
          setFilterData(sorted);
          
    },[sortBy]);


    return (!filterData)?<h1>Loading</h1>:(
        <div>
        <div className='flex justify-between my-2 w-96'>
         <button className="bg-sky-800 p-2 text-white rounded-lg">Add Question</button>

       <select onChange={(event)=>{setSortBy(event.target.value)}}>
         <option value="likes">Likes</option>
         <option value="comments">Comments</option>
       </select>
      
        </div>
        <div className='w-96 border-black' >
        {filterData?.map((data)=>{

          
                    return <QuestionCard {...data} key={data._id}/>
            })}
        </div>
          
       
        </div>
    )
}
export default Body;



