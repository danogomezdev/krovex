import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import KrovexLogo from '../ui/KrovexLogo'

const LINKS = [
  {label:'Inicio',id:'hero'},{label:'Servicios',id:'servicios'},
  {label:'Portfolio',id:'portfolio'},{label:'Contacto',id:'contacto'},
]

export default function Navbar() {
  const [scrolled,setScrolled]=useState(false)
  const [open,setOpen]=useState(false)
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>60)
    window.addEventListener('scroll',h);return()=>window.removeEventListener('scroll',h)
  },[])
  const go=(id)=>{setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})}

  return (
    <header style={{
      position:'fixed',top:0,left:0,right:0,zIndex:50,
      transition:'all .4s ease',
      background:scrolled?'rgba(7,9,15,0.85)':'transparent',
      backdropFilter:scrolled?'blur(24px) saturate(1.8)':'none',
      borderBottom:scrolled?'1px solid rgba(255,255,255,0.06)':'none',
    }}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 28px',height:76,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link to="/" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>
          <KrovexLogo size={34} textSize="text-lg"/>
        </Link>

        <nav style={{display:'flex',gap:36,alignItems:'center'}} className="hidden md:flex">
          {LINKS.map(l=>(
            <button key={l.id} onClick={()=>go(l.id)} style={{
              fontSize:14,fontWeight:500,color:'rgba(148,163,184,.75)',
              background:'none',border:'none',cursor:'pointer',
              letterSpacing:'.01em',transition:'color .2s',
              fontFamily:"'Outfit',sans-serif"
            }}
            onMouseEnter={e=>e.currentTarget.style.color='white'}
            onMouseLeave={e=>e.currentTarget.style.color='rgba(148,163,184,.75)'}>
              {l.label}
            </button>
          ))}
        </nav>

        <button onClick={()=>go('contacto')} className="btn-cta hidden md:inline-flex" style={{padding:'10px 22px',fontSize:14}}>
          Trabajemos juntos
        </button>

        <button onClick={()=>setOpen(!open)} className="md:hidden" style={{background:'none',border:'none',cursor:'pointer',color:'rgba(255,255,255,.8)',padding:8}}>
          {open?<X size={22}/>:<Menu size={22}/>}
        </button>
      </div>

      {open&&(
        <div style={{background:'rgba(7,9,15,.97)',borderTop:'1px solid rgba(255,255,255,.06)',backdropFilter:'blur(24px)'}}>
          <div style={{padding:'20px 28px',display:'flex',flexDirection:'column',gap:16}}>
            {LINKS.map(l=>(
              <button key={l.id} onClick={()=>go(l.id)} style={{
                textAlign:'left',fontSize:17,fontWeight:500,color:'rgba(148,163,184,.8)',
                background:'none',border:'none',cursor:'pointer',padding:'8px 0',
                fontFamily:"'Outfit',sans-serif"
              }}>{l.label}</button>
            ))}
            <button onClick={()=>go('contacto')} className="btn-cta" style={{justifyContent:'center',marginTop:8}}>Trabajemos juntos</button>
          </div>
        </div>
      )}
    </header>
  )
}
