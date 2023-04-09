import QuestionCard from "./QuestionCard"
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
import AnswerCard from "./AnswerCard";
const Question=()=>{
    const {id}=useParams();
    const [answers,setAnswers]=useState(null);
    const [question,setQuestion]=useState(null);

    const getData=async(url)=>{
        try{
        const response=await fetch(url);
        console.log(response);
        const json=await response.json();

        if(json.success===false){
            alert(json.message);
        }

        else{
            setAnswers(json?.data?.answers);
            setQuestion(json?.data?.question);

            console.log(json);
        }
    }
    catch(error){
        console.log(error);
    }
    }

    useEffect(()=>{
        const url=`/api/question/answers/${id}`;
        getData(url)
    },[]);

   return (!question || !answers)?null :(
    <div>
    <QuestionCard  {...question} />
     {answers.map((ans)=>{
        return <AnswerCard _id={ans._id} likedBy={ans.likedBy} userId={ans.answeredBy} content={ans.content} key={ans._id}/>
     })}
    </div>
   )
}
export default Question;