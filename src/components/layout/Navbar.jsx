import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sun, Moon } from 'lucide-react'
import KrovexLogo from '../ui/KrovexLogo'
import { useTheme } from '../../context/ThemeContext'

const LINKS = [
  {label:'Inicio',id:'hero'},{label:'Sistemas',id:'sistemas'},{label:'Servicios',id:'servicios'},{label:'Contacto',id:'contacto'},
]

export default function Navbar() {
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  const { theme, toggle } = useTheme()

  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',h); return()=>window.removeEventListener('scroll',h)
  },[])

  const go=id=>{setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}
  const isLight = theme === 'light'

  return (
    <header style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,
      transition:'all .35s ease',
      background: scrolled
        ? isLight ? 'rgba(244,246,251,0.92)' : 'rgba(6,8,16,0.92)'
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${isLight?'rgba(37,99,235,.1)':'rgba(255,255,255,.05)'}` : 'none',
    }}>
      {scrolled && <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(37,99,235,.35),transparent)'}}/>}

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 32px',height:72,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
          <KrovexLogo size={32} textSize="lg"/>
        </Link>

        <nav style={{alignItems:'center',gap:40,display:'flex'}} className="desktop-nav">
          {LINKS.map(l=>(
            <button key={l.id} onClick={()=>go(l.id)} style={{
              fontSize:13,fontWeight:500,color:'var(--t3)',
              background:'none',border:'none',cursor:'pointer',
              letterSpacing:'.06em',textTransform:'uppercase',
              transition:'color .2s',fontFamily:"'DM Sans',sans-serif",
            }}
            onMouseEnter={e=>e.currentTarget.style.color='var(--t1)'}
            onMouseLeave={e=>e.currentTarget.style.color='var(--t3)'}>
              {l.label}
            </button>
          ))}
        </nav>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {/* Theme toggle */}
          <button onClick={toggle} style={{
            width:36,height:36,borderRadius:4,
            display:'flex',alignItems:'center',justifyContent:'center',
            background:'rgba(37,99,235,.08)',
            border:'1px solid var(--b1)',
            cursor:'pointer',color:'var(--t3)',
            transition:'all .2s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.background='rgba(37,99,235,.15)';e.currentTarget.style.color='var(--kblue3)'}}
          onMouseLeave={e=>{e.currentTarget.style.background='rgba(37,99,235,.08)';e.currentTarget.style.color='var(--t3)'}}>
            {isLight ? <Moon size={15}/> : <Sun size={15}/>}
          </button>

          <button onClick={()=>go('contacto')} className="btn btn-p desktop-only" style={{fontSize:13,padding:'10px 22px',letterSpacing:'.06em',textTransform:'uppercase'}}>
            Contacto
          </button>

          <button onClick={()=>setOpen(!open)} className="mobile-menu-btn" style={{background:'none',border:'none',cursor:'pointer',color:'var(--t1)',padding:6}}>
            {open?<X size={20}/>:<Menu size={20}/>}
          </button>
        </div>
      </div>

      {open&&(
        <div style={{background:isLight?'rgba(244,246,251,.97)':'rgba(6,8,16,.97)',borderTop:`1px solid var(--b0)`,backdropFilter:'blur(20px)'}}>
          <div style={{padding:'20px 28px',display:'flex',flexDirection:'column',gap:16}}>
            {LINKS.map(l=>(
              <button key={l.id} onClick={()=>go(l.id)} style={{textAlign:'left',fontSize:15,fontWeight:500,color:'var(--t3)',background:'none',border:'none',cursor:'pointer',padding:'6px 0',fontFamily:"'DM Sans',sans-serif",letterSpacing:'.04em',textTransform:'uppercase'}}>{l.label}</button>
            ))}
            <div style={{display:'flex',gap:10}}>
              <button onClick={()=>go('contacto')} className="btn btn-p" style={{flex:1,justifyContent:'center',textTransform:'uppercase',letterSpacing:'.06em',fontSize:13}}>Contacto</button>
              <button onClick={toggle} style={{width:44,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(37,99,235,.08)',border:'1px solid var(--b1)',cursor:'pointer',color:'var(--t3)'}}>
                {isLight?<Moon size={15}/>:<Sun size={15}/>}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
