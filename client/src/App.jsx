import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './components/Login'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from '@/components/ui/sonner'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <AdminDashboard />
                <Toaster position='top-right' richColors />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
