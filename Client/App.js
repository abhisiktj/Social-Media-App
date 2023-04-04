import React from 'react';
import ReactDom from 'react-dom/client';

const AppLayout=()=>{
   return <h1>A react app</h1>
}

const root=ReactDom.createRoot(document.getElementById('root'));
root.render(<AppLayout/>);
