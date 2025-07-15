import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import About from './pages/About';
import Login from './pages/Login';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from './context/ThemProvider';

function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* <div className='flex justify-center'> */}
          <Routes>
            <Route element={<MainLayout user={user} />}>
              <Route path='/' element={<Home />} />
              <Route path='/users' element={<Users />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
            </Route>
            <Route path='/*' element={<h1>404 Not found</h1>} />
          </Routes>
        {/* </div> */}
      </Router>
    </ThemeProvider>
  )
}

export default App
