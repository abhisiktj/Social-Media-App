import {questions} from '../constants/questions'
import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom'
import QuestionCard from '../Components/QuestionCard'
const Body=()=>{
    const [data,setData]=useState(questions);
    const [filterData,setFilterData]=useState(questions);
    const [sortBy,setSortBy]=useState("likes");

  useEffect(()=>{
    //api call to get data
  },[]);

     useEffect(()=>{
       
        const sorted=[...filterData].sort((a,b)=>{
            
            return b[sortBy]-a[sortBy]
        })
        console.log(sorted);
          setFilterData(sorted);
          
    },[sortBy]);


    return(
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
                    return <QuestionCard {...data}/>
            })}
        </div>
          
       
        </div>
    )
}
export default Body;



