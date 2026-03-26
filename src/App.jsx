import { createHashRouter,  RouterProvider, Outlet} from 'react-router-dom';
import React, { useState, useMemo } from 'react'

//data
import { useMousePosition } from './hooks/useMousePosition';

//Pages
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import About from './pages/About/About';
import SecretProject from './pages/SecretProject/SecretProject';

//Components
import Navbar from './components/Navbar/Navbar';
import TerminalDrawer from './components/Terminal/TerminalDrawer';
import TerminalTab from './components/Terminal/TerminalTab';

// Styles
import '/src/assets/styles/main.scss';


const RootLayout = ({ isAdmin, setIsAdmin, isTerminalOpen, setIsTerminalOpen }) => {

  // Starts the mouse tracking for the whole app instantly
  useMousePosition();

  //handlers for better readability
  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);

  return (
    <div className='app-container'>
      {/*Page Content */}
      <main className='main-content'>
        <Outlet />
      </main>

      {/* Global UI Elements (Stacked via DOM order NO z-index!) */}

      <Navbar isAdmin={isAdmin}/>

      <TerminalTab
        isOpen={isTerminalOpen}
        onClick={openTerminal}
      />
      
      <TerminalDrawer 
        isOpen={isTerminalOpen}
        onClose={closeTerminal}
        onOpen={openTerminal}
        setIsAdmin={setIsAdmin}
      />

    </div>
  );
};

function App() {

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('portfolio_admin') === 'true';
  });

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Define the router INSIDE App or use useMemo 
  // so it updates when isAdmin changes
  const router = useMemo(() => createHashRouter([
    {
      path: '/',
      element: <RootLayout 
                  isAdmin={isAdmin}
                  setIsAdmin={setIsAdmin}
                  isTerminalOpen={isTerminalOpen} 
                  setIsTerminalOpen={setIsTerminalOpen} 
                />, 
      children: [
        { index: true, element: <Home /> },
        { path: '/projects', element: <Projects /> },
        { path: '/about', element: <About /> },
        //Conditional Route: Only exists if isAdmin is true
        ...(isAdmin ? [{
          path: '/admin', 
          element: <SecretProject />
        }] : [])
      ]
    }
  ]), [isAdmin, isTerminalOpen]);
  

  return <RouterProvider router={router} /> 
  
}

export default App