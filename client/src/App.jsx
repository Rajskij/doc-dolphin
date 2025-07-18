import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import About from './pages/ResultsAnalyzer';
import Login from './pages/Login';
import Results from './pages/Results';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from './context/ThemProvider';
import NotFound from './pages/NotFound';

function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* <div className='flex justify-center'> */}
        <Routes>
          <Route element={<MainLayout user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/users' element={<Results />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route path='/*' element={ <NotFound /> } />
        </Routes>
        {/* </div> */}
      </Router>
    </ThemeProvider>
  )
}

export default App
