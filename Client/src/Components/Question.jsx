import QuestionCard from "./QuestionCard"
import {useParams,Link,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import AnswerCard from "./AnswerCard";
import useGetUser from "../utils/useGetUser";
import AddAnswer from './AddAnswer'
import answer from "../../../Server/Models/answer";
const Question=()=>{
    const {id}=useParams();
    const [answers,setAnswers]=useState(null);
    const [question,setQuestion]=useState(null);
    const {isLogin}=useGetUser();
    const navigate=useNavigate();


  
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
    },[answer]);

   return (!question || !answers)?null :(
    <div>
    <QuestionCard  {...question} />
     <AddAnswer id={question._id}/>
     {answers.map((ans)=>{
        return <AnswerCard _id={ans._id} likedBy={ans.likedBy} userId={ans.answeredBy} content={ans.content} key={ans._id}/>
     })}
    </div>
   )
}
export default Question;