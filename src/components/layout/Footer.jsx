import KrovexLogo from '../ui/KrovexLogo'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return (
    <footer style={{background:'#07090F',borderTop:'1px solid rgba(255,255,255,.06)'}}>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'80px 28px 40px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr',gap:48}} className="grid-cols-1 md:grid-cols-3">
          <div>
            <KrovexLogo size={34} textSize="text-lg"/>
            <p style={{marginTop:16,fontSize:14,lineHeight:1.78,color:'rgba(148,163,184,.5)',maxWidth:280}}>
              Convertimos ideas en productos digitales que generan resultados reales. Cada proyecto, una oportunidad de hacer algo memorable.
            </p>
            <div style={{display:'flex',gap:10,marginTop:22}}>
              {[Github,Linkedin,Instagram,Mail].map((Icon,i)=>(
                <a key={i} href="#" style={{
                  width:36,height:36,borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',
                  background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.07)',
                  color:'rgba(148,163,184,.55)',transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.background='rgba(99,179,237,.1)';e.currentTarget.style.borderColor='rgba(99,179,237,.28)';e.currentTarget.style.color='#63B3ED'}}
                onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.04)';e.currentTarget.style.borderColor='rgba(255,255,255,.07)';e.currentTarget.style.color='rgba(148,163,184,.55)'}}>
                  <Icon size={14}/>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(148,163,184,.4)',marginBottom:20}}>Navegación</h4>
            <ul style={{display:'flex',flexDirection:'column',gap:12}}>
              {['Inicio','Servicios','Portfolio','Contacto'].map(item=>(
                <li key={item}>
                  <button onClick={()=>go(item==='Inicio'?'hero':item.toLowerCase())} style={{
                    fontSize:14,color:'rgba(148,163,184,.5)',background:'none',border:'none',cursor:'pointer',
                    transition:'color .2s',fontFamily:"'Outfit',sans-serif",padding:0,
                  }}
                  onMouseEnter={e=>e.currentTarget.style.color='white'}
                  onMouseLeave={e=>e.currentTarget.style.color='rgba(148,163,184,.5)'}>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(148,163,184,.4)',marginBottom:20}}>Contacto</h4>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <p style={{fontSize:14,color:'rgba(148,163,184,.5)'}}>hello@krovex.dev</p>
              <p style={{fontSize:14,color:'rgba(148,163,184,.5)'}}>Argentina</p>
              <span className="badge badge-green" style={{display:'inline-flex',width:'fit-content',marginTop:4}}>
                <span className="pulse-dot" style={{background:'#4ade80'}}/>
                Disponible
              </span>
            </div>
          </div>
        </div>

        <div className="divider" style={{margin:'52px 0 28px'}}/>
        <div style={{display:'flex',flexWrap:'wrap',gap:12,alignItems:'center',justifyContent:'space-between'}}>
          <p style={{fontSize:12,color:'rgba(148,163,184,.28)'}}>© {new Date().getFullYear()} Krovex. Todos los derechos reservados.</p>
          <p style={{fontSize:12,color:'rgba(148,163,184,.28)'}}>Diseñado y desarrollado por Krovex</p>
        </div>
      </div>
    </footer>
  )
}
