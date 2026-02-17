import { createHashRouter,  RouterProvider, Outlet} from 'react-router-dom';
import React, { useState } from 'react'

//Pages
import Home from './pages/Home/Home'
import Archive from './pages/Archive/Archive';
import About from './pages/About/About';

//Components
import Navbar from './components/Navbar/Navbar';
import TerminalDrawer from './components/Terminal/TerminalDrawer';
import TerminalTab from './components/Terminal/TerminalTab';

// Styles
import '/src/assets/styles/main.scss';


// creating layout component to keep navbar up top

const RootLayout = () => {
  //Values for below
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  //handlers for better readability
  const openTerminal = () => setIsTerminalOpen(true);
  const closeTerminal = () => setIsTerminalOpen(false);
  const toggleTerminal = () => setIsTerminalOpen(prev => !prev);

  return (
    <div className='app-container'>
      
      {/*Page Content */}
      <main className='main-content'>
        <Outlet />
      </main>

      {/* Global UI Elements (Stacked via DOM order NO z-index!) */}
      
      <TerminalTab
        isOpen={isTerminalOpen}
        onClick={openTerminal}
      />
      
      <TerminalDrawer 
        isOpen={isTerminalOpen}
        onClose={closeTerminal} //press red button to close
        onOpen={openTerminal} // for keyboard shortcuts
      />
    </div>
  );
};


//setting up the routers

const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />, 
    children:
    [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'archive',
        element: <Archive />
      },
      {
        path: 'about',
        element: <About />
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