import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isLogin:false,
        user:null,
        token:null
    },
     reducers:{
        setCredentials:(state,action)=>{
           const {user,token}=action.payload
           state.isLogin=true,
           state.user=user;
           state.token=token;
        },
        logout:(state,action)=>{
            state.isLogin=false,
            state.user=null,
            state.token=null;
        }
     }
})

export const{setCredentials,logout}=authSlice.actions;
export default authSlice.reducer;