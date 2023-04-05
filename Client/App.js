import React, { Children } from 'react';
import ReactDom from 'react-dom/client';
import { createBrowserRouter,RouterProvider,Outlet } from 'react-router-dom';

//importing Components
import Header from './src/Components/Header'
import Error from './src/Components/Error'
import About from './src/Components/About'
import Login from './src/Components/Login'
import Signup from './src/Components/Signup'
import Body from  './src/Components/Body';

const HeaderLayout=()=>{
 return(
   <>
   <Header />
   <Outlet />
   </>
 )
}
const AuthenticationLayout=()=>{
   return(
      <Outlet />
   )
}
const appRouter = createBrowserRouter([
   {
     path: "/",
     element: <HeaderLayout />,
     errorElement: <Error />,
     children: [
       {
         path: "/about",
         element: <About />,
       },
       {
        path: "/",
        element: <Body />,
      },
     ],
   },
   {
      path:"/auth",
      element:<AuthenticationLayout />,
      errorElement: <Error />,
      children: [
         {
           path: "login",
           element: <Login />,
         },
         {
            path: "signup",
            element: < Signup/>,
          },
       ],

   }
 ]);

const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={appRouter}/>);
