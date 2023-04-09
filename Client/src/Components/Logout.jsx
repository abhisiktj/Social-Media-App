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
        <span onClick={handleClick} className="p-1 borde  text-xs rounded-lg w-14 flex items-center hover:cursor-pointer">Log Out</span>
    )
}

 export default Logout;

