import { useRouteError } from "react-router-dom"
const Error=()=>{
    const error=useRouteError()
    console.log(error);
    const {data}=error;
    return(
      <div className="text-3xl">
          <p>😞</p>
          <p>{data}</p>
          
      </div>
    )
}
export default Error;