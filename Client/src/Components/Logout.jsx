import { useDispatch } from "react-redux";
import { logout } from "../utils/slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
const Logout=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleClick=()=>{
        dispatch(logout());
        localStorage.removeItem('token');
        alert('Logged Out');
        navigate('/');

       }
    return(
        <button onClick={handleClick} className="p-1 text-xs rounded-lg w-14">Log Out</button>
    )
}

 export default Logout;

