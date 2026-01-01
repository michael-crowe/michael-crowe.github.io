import { createHashRouter,  RouterProvider, Outlet} from 'react-router-dom';
import React, { Children } from 'react';
import Navbar from './components/Navbar/Navbar';
import CommandInput from './components/CommandInput/CommandInput';

import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';
import Terminal from './pages/Terminal/Terminal';

import '/src/assets/styles/main.scss';


// creating layout component to keep navbar up top

const RootLayout = () => (
  <>
  <Navbar />
  <main className="$bg-charcoal">
    <Outlet />
  </main>
  <CommandInput />
  </>

);

//setting up the routers

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children:
    [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/Archive',
        element: <Archive />
      },
      {
        path: '/Terminal',
        element: <Terminal />
      }
    ]
  }
]);

function App() {
  

  return (
    <RouterProvider router={router} /> 
  ) 
  
}

export default App