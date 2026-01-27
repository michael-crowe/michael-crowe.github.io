import { createHashRouter,  RouterProvider, Outlet} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';

//Pages
import Home from './pages/Home/Home';
import Archive from './pages/Archive/Archive';

//Components
import Terminal from './components/Terminal/Terminal';

import '/src/assets/styles/main.scss';


// creating layout component to keep navbar up top

const RootLayout = () => (
  <div className='app-container'>
    <Navbar />
    <main className='main-content'>
      <Outlet />
    </main>
  </div>


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