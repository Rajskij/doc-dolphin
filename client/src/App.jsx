import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import About from './pages/analyze/ResultsAnalyzer';
import Login from './pages/Login';
import Results from './pages/analyze/Results';
import Signup from './pages/Signup';
import Home from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import { ThemeProvider } from './context/ThemProvider';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/sonner';
import ResultDetails from './pages/analyze/ResultDetails';
import LogMood from './pages/mood-journal/LogMood';
import MoodHistory from './pages/mood-journal/MoodHistory';
import MoodInsights from './pages/mood-journal/MoodInsights';

function App() {
  const { user } = useAuthContext();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* <div className='flex justify-center'> */}
        <Routes>
          <Route element={<MainLayout user={user} />}>
            <Route path='/' element={<Home />} />
            <Route path='/analyze' element={<About />} />
            <Route path='/results' element={<Results />} />
            <Route path='/result/:result_id' element={<ResultDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/mood' element={<LogMood />} />
            <Route path='/mood/history' element={<MoodHistory />} />
            <Route path='/mood/insights' element={<MoodInsights />} />
          </Route>
          <Route path='/*' element={<NotFound />} />
        </Routes>
        {/* </div> */}
      </Router>
      <Toaster richColors />
    </ThemeProvider>
  )
}

export default App
