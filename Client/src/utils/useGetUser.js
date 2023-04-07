
import {useSelector} from 'react-redux';
import {useEffect, useState,useState} from 'react';
import jwt from 'jsonwebtoken';
import { useDispatch } from 'react-redux';
import { setCredentials } from "../utils/slices/authSlice";

const useGetUser=()=>{
    const dispatch=useDispatch()
    const isLogin=useSelector((store)=>store.auth.isLogin)
    const user=useSelector((store)=>store.auth.user);
    const token=useSelector((store)=>store.auth.token)


    const getData=async (url)=>{
      try{
        const response=await fetch(url);
        const json=await response.json();
        const userVal=json.data.user;
        const tokenVal=localStorage.getItem(token);
        dispatch(setCredentials({user:userVal,token:tokenVal}));
      }
      catch(error){
          console.log("Error in useGetUser")
     }
    }
   
    useEffect(()=>{
      if(!isLogin){
        if(localStorage.getItem('token')){
         const id=jwt.decode(localStorage.getItem('token')).userId;
          getData(`/api/user/${id}`)
        }
      }

    },[]);
    
    return {isLogin,user,token};
}

export default useGetUser;