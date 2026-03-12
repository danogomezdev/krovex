import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import KrovexLogo from '../../components/ui/KrovexLogo'
import { LayoutDashboard, FolderOpen, Briefcase, Users, Settings, LogOut, Menu, X, ExternalLink, ChevronRight } from 'lucide-react'

const NAV = [
  { to:'/admin/dashboard', label:'Dashboard',     icon:LayoutDashboard },
  { to:'/admin/clients',   label:'Clientes',       icon:Users },
  { to:'/admin/projects',  label:'Portfolio',      icon:FolderOpen },
  { to:'/admin/services',  label:'Servicios',      icon:Briefcase },
  { to:'/admin/settings',  label:'Configuración',  icon:Settings },
]

function SidebarContent({ onClose }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const doLogout = async () => { await logout(); navigate('/admin') }

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b" style={{ borderColor:'rgba(34,39,249,.12)' }}>
        <KrovexLogo size={28} textSize="text-base"/>
        <p className="text-xs mt-1 ml-0.5" style={{ color:'rgba(160,176,200,.35)' }}>Panel Administrador</p>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon:Icon }) => (
          <NavLink key={to} to={to} onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <Icon size={16}/>{label}
            <ChevronRight size={12} className="ml-auto opacity-25"/>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t space-y-1" style={{ borderColor:'rgba(34,39,249,.08)' }}>
        <a href="/" target="_blank" rel="noopener noreferrer" className="sidebar-link">
          <ExternalLink size={16}/>Ver sitio público
        </a>
        <div className="px-3 py-3 rounded-lg mt-1" style={{ background:'rgba(255,255,255,.03)' }}>
          <p className="text-xs font-semibold text-white truncate">{user?.email}</p>
          <button onClick={doLogout}
            className="flex items-center gap-1.5 text-xs mt-1.5 hover:text-red-400 transition-colors"
            style={{ color:'rgba(160,176,200,.45)' }}>
            <LogOut size={11}/>Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex" style={{ background:'#03070F' }}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 fixed top-0 left-0 h-full"
        style={{ background:'#060A12', borderRight:'1px solid rgba(34,39,249,.1)' }}>
        <SidebarContent onClose={() => {}}/>
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/65" onClick={() => setOpen(false)}/>
          <aside className="relative w-60 flex flex-col" style={{ background:'#060A12', borderRight:'1px solid rgba(34,39,249,.12)' }}>
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4" style={{ color:'rgba(160,176,200,.5)' }}>
              <X size={18}/>
            </button>
            <SidebarContent onClose={() => setOpen(false)}/>
          </aside>
        </div>
      )}

      <main className="flex-1 lg:ml-60 min-h-screen">
        <div className="lg:hidden flex items-center justify-between px-4 py-4 border-b"
          style={{ background:'#060A12', borderColor:'rgba(34,39,249,.1)' }}>
          <KrovexLogo size={26} textSize="text-sm"/>
          <button onClick={() => setOpen(true)} className="text-white"><Menu size={20}/></button>
        </div>
        <div className="p-5 md:p-8 max-w-7xl mx-auto">
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
