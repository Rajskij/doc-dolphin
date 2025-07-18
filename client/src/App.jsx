import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import About from './pages/ResultsAnalyzer';
import Login from './pages/Login';
import Users from './pages/Users';
import Signup from './pages/Signup';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from './context/ThemProvider';
import { Separator } from './components/ui/separator';

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
          <Route path='/*' element={
            <div className='flex justify-center items-center h-200 bg-background w-full'>
              <h1 className='text-2xl'>404</h1>
              <Separator
                    orientation="vertical"
                    className="mx-6 data-[orientation=vertical]:h-14"
                />
              <h2 className='text-xl'>This page could not be found</h2>
            </div>
          } />
        </Routes>
        {/* </div> */}
      </Router>
    </ThemeProvider>
  )
}

export default App
