import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import KrovexLogo from '../../components/ui/KrovexLogo'
import { LayoutDashboard, FolderOpen, Briefcase, Users, Settings, LogOut, Menu, X, ExternalLink, ChevronRight } from 'lucide-react'

const NAV = [
  { to:'/admin/dashboard', label:'Dashboard',    icon:LayoutDashboard },
  { to:'/admin/clients',   label:'Clientes',      icon:Users },
  { to:'/admin/projects',  label:'Portfolio',     icon:FolderOpen },
  { to:'/admin/services',  label:'Servicios',     icon:Briefcase },
  { to:'/admin/settings',  label:'Configuración', icon:Settings },
]

function Sidebar({ onClose }) {
  const { logout, user } = useAuth()
  const navigate = useNavigate()
  const doLogout = async () => { await logout(); navigate('/admin') }

  return (
    <div style={{display:'flex',flexDirection:'column',height:'100%'}}>
      {/* Logo */}
      <div style={{padding:'22px 18px 18px',borderBottom:'1px solid var(--b0)'}}>
        <KrovexLogo size={28} textSize="sm"/>
        <div style={{marginTop:10}}>
          <span className="pill" style={{fontSize:8,padding:'3px 10px'}}>Panel Admin</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{flex:1,padding:'12px 10px',display:'flex',flexDirection:'column',gap:2,overflowY:'auto'}}>
        <p className="mono" style={{fontSize:8,color:'var(--t4)',letterSpacing:'.18em',textTransform:'uppercase',padding:'0 6px',marginBottom:6,marginTop:4}}>Menú principal</p>
        {NAV.map(({to,label,icon:Icon})=>(
          <NavLink key={to} to={to} onClick={onClose}
            className={({isActive})=>`adm-nav${isActive?' active':''}`}>
            <Icon size={14}/><span style={{flex:1}}>{label}</span>
            <ChevronRight size={10} style={{opacity:.2}}/>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{padding:'10px',borderTop:'1px solid var(--b0)'}}>
        <a href="/" target="_blank" rel="noopener noreferrer" className="adm-nav" style={{marginBottom:6,textDecoration:'none'}}>
          <ExternalLink size={13}/><span>Ver sitio público</span>
        </a>
        <div style={{background:'rgba(255,255,255,.02)',border:'1px solid var(--b0)',borderRadius:4,padding:'11px 12px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
            <div style={{width:26,height:26,borderRadius:4,background:'var(--kg)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--t1)',flexShrink:0}}>
              {user?.email?.[0]?.toUpperCase()||'A'}
            </div>
            <p style={{fontSize:11,fontWeight:500,color:'var(--t2)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1,fontFamily:"'DM Mono',monospace"}}>{user?.email}</p>
          </div>
          <button onClick={doLogout} style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'rgba(248,113,113,.5)',background:'none',border:'none',cursor:'pointer',fontFamily:"'DM Mono',monospace",padding:0,letterSpacing:'.04em'}}
            onMouseEnter={e=>e.currentTarget.style.color='var(--red)'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(248,113,113,.5)'}>
            <LogOut size={11}/>logout()
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminLayout() {
  const [open,setOpen]=useState(false)
  return (
    <div className="adm-wrap">
      <aside className="adm-sidebar hidden lg:flex" style={{position:'fixed',top:0,left:0,height:'100vh',flexDirection:'column'}}>
        <Sidebar onClose={()=>{}}/>
      </aside>
      {open&&(
        <div style={{position:'fixed',inset:0,zIndex:50,display:'flex'}}>
          <div style={{position:'absolute',inset:0,background:'rgba(6,8,16,.8)',backdropFilter:'blur(6px)'}} onClick={()=>setOpen(false)}/>
          <aside className="adm-sidebar" style={{position:'relative',width:232,zIndex:1,display:'flex',flexDirection:'column'}}>
            <button onClick={()=>setOpen(false)} style={{position:'absolute',top:14,right:14,background:'none',border:'none',cursor:'pointer',color:'var(--t3)'}}><X size={16}/></button>
            <Sidebar onClose={()=>setOpen(false)}/>
          </aside>
        </div>
      )}
      <main className="adm-main" id="adm-main">
        <style>{`@media(min-width:1024px){#adm-main{margin-left:232px}}`}</style>
        <div className="adm-topbar lg:hidden">
          <KrovexLogo size={24} textSize="sm"/>
          <button onClick={()=>setOpen(true)} style={{background:'none',border:'none',cursor:'pointer',color:'var(--t1)',padding:4}}><Menu size={18}/></button>
        </div>
        <div className="adm-topbar hidden lg:flex">
          <div/>
          <span className="badge b-green" style={{fontSize:9}}><span className="pdot" style={{background:'var(--green)'}}/>Sistema activo</span>
        </div>
        <div style={{padding:'clamp(20px,3vw,32px)',maxWidth:1280,margin:'0 auto'}}>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
