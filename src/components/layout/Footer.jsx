import KrovexLogo from '../ui/KrovexLogo'
import { Github, Linkedin, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'})
  return (
    <footer style={{background:'var(--bg1)',borderTop:'1px solid var(--b0)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(77,166,255,.25),transparent)'}}/>
      <div style={{maxWidth:1280,margin:'0 auto',padding:'64px 32px 32px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr 1fr',gap:48,marginBottom:48}} className="md:footer-grid">
          <style>{`@media(max-width:768px){.md\\:footer-grid{grid-template-columns:1fr!important}}`}</style>
          <div>
            <KrovexLogo size={32} textSize="lg"/>
            <p style={{marginTop:16,fontSize:13.5,lineHeight:1.78,color:'var(--t4)',maxWidth:280}}>
              Desarrollo web y software profesional para empresas y emprendedores.
            </p>
            <div style={{display:'flex',gap:9,marginTop:20}}>
              {[Github,Linkedin,Instagram,Mail].map((Icon,i)=>(
                <a key={i} href="#" style={{width:34,height:34,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.04)',border:'1px solid var(--b0)',color:'var(--t4)',transition:'all .2s',textDecoration:'none'}}
                  onMouseEnter={e=>{e.currentTarget.style.background='rgba(37,99,235,.1)';e.currentTarget.style.borderColor='rgba(77,166,255,.25)';e.currentTarget.style.color='var(--kblue3)'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,.04)';e.currentTarget.style.borderColor='var(--b0)';e.currentTarget.style.color='var(--t4)'}}>
                  <Icon size={14}/>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.16em',textTransform:'uppercase',marginBottom:18}}>Navegación</p>
            <ul style={{display:'flex',flexDirection:'column',gap:11}}>
              {['Inicio','Servicios','Portfolio','Contacto'].map(item=>(
                <li key={item}><button onClick={()=>go(item==='Inicio'?'hero':item.toLowerCase())} style={{fontSize:13.5,color:'var(--t4)',background:'none',border:'none',cursor:'pointer',transition:'color .2s',fontFamily:"'DM Sans',sans-serif",padding:0,letterSpacing:'.02em'}}
                  onMouseEnter={e=>e.currentTarget.style.color='white'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--t4)'}>{item}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.16em',textTransform:'uppercase',marginBottom:18}}>Contacto</p>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <p style={{fontSize:13.5,color:'var(--t4)'}}>krovex.dev@gmail.com</p>
              <p style={{fontSize:13.5,color:'var(--t4)'}}>Argentina</p>
              <span className="badge b-green" style={{width:'fit-content',marginTop:4}}>
                <span className="pdot" style={{background:'var(--green)'}}/>Disponible
              </span>
            </div>
          </div>
        </div>
        <div className="divider" style={{marginBottom:24}}/>
        <div style={{display:'flex',flexWrap:'wrap',gap:10,alignItems:'center',justifyContent:'space-between'}}>
          <p className="mono" style={{fontSize:10,color:'rgba(148,163,200,.22)',letterSpacing:'.06em'}}>© {new Date().getFullYear()} KROVEX · TODOS LOS DERECHOS RESERVADOS</p>
          <p className="mono" style={{fontSize:10,color:'rgba(148,163,200,.22)',letterSpacing:'.06em'}}>BUILD BY KROVEX</p>
        </div>
      </div>
    </footer>
  )
}
