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
import AddQuestion from './src/Components/AddQuestion';
import Question from './src/Components/Question';

import { Provider } from 'react-redux';
import store from './src/utils/store';

const HeaderLayout=()=>{
 return(
   <>
   <Provider store={store}>
     <Header />
     <Outlet />
   </Provider>
   </>
 )
}
const AuthenticationLayout=()=>{
   return(
    <Provider store={store}>
      <Outlet />
    </Provider>
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
      {
        path:'/question/add',
        element:<AddQuestion />
      },
      {
        path:'/question/:id',
        element:<Question />
      }
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
