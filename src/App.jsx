import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminClients from './pages/admin/AdminClients'
import AdminProjects from './pages/admin/AdminProjects'
import AdminServices from './pages/admin/AdminServices'
import AdminSettings from './pages/admin/AdminSettings'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin" element={<ProtectedRoute><AdminLayout/></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard/>}/>
            <Route path="clients"   element={<AdminClients/>}/>
            <Route path="projects"  element={<AdminProjects/>}/>
            <Route path="services"  element={<AdminServices/>}/>
            <Route path="settings"  element={<AdminSettings/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}/>
        </Routes>
      </BrowserRouter>

      <Toaster position="bottom-right" toastOptions={{
        style: { background:'#0A1525', color:'#fff', border:'1px solid rgba(34,39,249,.22)', fontFamily:'Urbanist,sans-serif', fontSize:'14px', fontWeight:500 },
        success: { iconTheme:{ primary:'#4ade80', secondary:'#0A1525' } },
        error:   { iconTheme:{ primary:'#f87171', secondary:'#0A1525' } },
      }}/>
    </AuthProvider>
  )
}
