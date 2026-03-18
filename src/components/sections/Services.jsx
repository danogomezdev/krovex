import { ArrowRight, Code2, Palette, Cpu, Globe, MessageCircle } from 'lucide-react'

const SERVICIOS = [
  {
    icon: Globe,
    tag: '01 / PRESENCIA WEB',
    nombre: 'Landing Page',
    sub: 'Tu negocio en la web, sin excusas.',
    desc: 'Una página que convierte visitantes en clientes. Diseño único, rápida, con formulario de contacto y SEO básico incluido.',
    items: ['Diseño exclusivo a tu marca','100% responsive · mobile-first','Formulario de contacto','Entrega en 5-7 días hábiles'],
    color: '#4da6ff',
    accent: 'rgba(77,166,255,.08)',
  },
  {
    icon: Palette,
    tag: '02 / BRANDING DIGITAL',
    nombre: 'Sitio Web Completo',
    sub: 'Más que una web, una plataforma.',
    desc: 'Multi-página con panel de administración, blog, galería y todo lo que tu empresa necesita para comunicarse profesionalmente.',
    items: ['Hasta 8 páginas personalizadas','Panel admin para editar contenido','Blog y noticias dinámico','Dominio y hosting incluido 1er año'],
    color: '#a78bfa',
    accent: 'rgba(167,139,250,.08)',
    highlight: true,
  },
  {
    icon: Code2,
    tag: '03 / SOFTWARE A MEDIDA',
    nombre: 'Sistema / App Web',
    sub: 'El software que tu operación necesita.',
    desc: 'Si tu problema no entra en un sistema estándar, lo construimos desde cero. Con tu lógica de negocio, tus roles y tus integraciones.',
    items: ['Análisis y diseño del sistema','Backend + base de datos escalable','Autenticación y roles de usuario','Soporte y mantenimiento post-entrega'],
    color: '#34d399',
    accent: 'rgba(52,211,153,.08)',
  },
]

export default function Services() {
  return (
    <section id="servicios" style={{position:'relative',padding:'120px 0',background:'var(--bg0)',overflow:'hidden'}}>
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.4}}/>
      <div style={{position:'absolute',bottom:'-5%',right:'10%',width:500,height:400,background:'radial-gradient(ellipse,rgba(77,166,255,.06) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(60px)'}}/>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>

        {/* Header */}
        <div style={{marginBottom:64}}>
          <span className="pill" style={{marginBottom:16,display:'inline-flex',fontSize:10,letterSpacing:'.12em'}}>
            ▸ SERVICIOS
          </span>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,alignItems:'end'}} className="srv-header">
            <style>{`@media(max-width:700px){.srv-header{grid-template-columns:1fr!important}}`}</style>
            <div>
              <h2 className="bebas gw" style={{fontSize:'clamp(36px,5vw,60px)',lineHeight:.9,marginBottom:6}}>
                Construimos
              </h2>
              <h2 className="bebas gk" style={{fontSize:'clamp(36px,5vw,60px)',lineHeight:.9}}>
                lo que necesitás.
              </h2>
            </div>
            <p style={{color:'var(--t3)',fontSize:14.5,lineHeight:1.8}}>
              Desde una landing hasta un sistema complejo. Cada entrega con código limpio,
              documentado y soporte post-entrega incluido. Sin tercerizaciones.
            </p>
          </div>
        </div>

        <div className="divider" style={{marginBottom:52}}/>

        {/* Cards de servicios */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:56}} className="srv-grid">
          <style>{`@media(max-width:800px){.srv-grid{grid-template-columns:1fr!important}}`}</style>

          {SERVICIOS.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={s.nombre} style={{
                background: s.highlight ? `linear-gradient(160deg, rgba(167,139,250,.07) 0%, var(--bg1) 60%)` : 'var(--bg1)',
                border: s.highlight ? '1px solid rgba(167,139,250,.3)' : '1px solid var(--b0)',
                borderRadius:10,padding:'28px 24px',
                display:'flex',flexDirection:'column',
                position:'relative',overflow:'hidden',
                transition:'transform .25s, box-shadow .25s',
                boxShadow: s.highlight ? '0 0 40px rgba(167,139,250,.08)' : 'none',
              }}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow=`0 12px 40px ${s.accent}`}}
              onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow=s.highlight?'0 0 40px rgba(167,139,250,.08)':'none'}}
              >
                {/* Glow top */}
                <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${s.color}55,transparent)`}}/>

                {/* Tag */}
                <div style={{
                  fontFamily:"'DM Mono',monospace",fontSize:9,
                  color:s.color,letterSpacing:'.14em',
                  marginBottom:18,
                }}>{s.tag}</div>

                {/* Icon */}
                <div style={{
                  width:44,height:44,borderRadius:6,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  background:s.accent,border:`1px solid ${s.color}44`,
                  marginBottom:18,
                }}>
                  <Icon size={20} style={{color:s.color}}/>
                </div>

                {/* Nombre + sub */}
                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:'.06em',color:'var(--t1)',marginBottom:4}}>
                  {s.nombre}
                </h3>
                <p style={{fontSize:12,color:s.color,fontWeight:600,marginBottom:12,fontFamily:"'DM Sans',sans-serif"}}>
                  {s.sub}
                </p>

                {/* Desc */}
                <p style={{color:'var(--t3)',fontSize:13.5,lineHeight:1.7,marginBottom:20,flex:1}}>
                  {s.desc}
                </p>

                {/* Items */}
                <ul style={{display:'flex',flexDirection:'column',gap:8,marginBottom:24}}>
                  {s.items.map(item => (
                    <li key={item} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:12.5,color:'var(--t2)'}}>
                      <div style={{width:4,height:4,borderRadius:'50%',background:s.color,flexShrink:0,marginTop:5}}/>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}
                  style={{
                    display:'flex',alignItems:'center',justifyContent:'center',gap:6,
                    padding:'10px 16px',borderRadius:5,
                    background:'transparent',
                    color:s.color,fontSize:12,fontWeight:700,
                    border:`1px solid ${s.color}44`,
                    cursor:'pointer',fontFamily:"'DM Sans',sans-serif",
                    letterSpacing:'.04em',textTransform:'uppercase',
                    transition:'all .2s',
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background=s.accent;e.currentTarget.style.borderColor=s.color+'99'}}
                  onMouseLeave={e=>{e.currentTarget.style.background='transparent';e.currentTarget.style.borderColor=s.color+'44'}}
                >
                  Consultar <ArrowRight size={12}/>
                </button>
              </div>
            )
          })}
        </div>

        {/* Banner "¿No es ninguno de estos?" */}
        <div style={{
          position:'relative',overflow:'hidden',
          background:'var(--bg1)',
          border:'1px solid var(--b1)',
          borderRadius:10,
          padding:'32px 36px',
          display:'flex',alignItems:'center',justifyContent:'space-between',
          flexWrap:'wrap',gap:24,
        }}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(77,166,255,.4),transparent)'}}/>
          <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 40% 100% at 0% 50%,rgba(37,99,235,.05),transparent)',pointerEvents:'none'}}/>

          <div style={{position:'relative',zIndex:1}}>
            <div style={{fontFamily:"'DM Mono',monospace",fontSize:9,color:'var(--kblue3)',letterSpacing:'.14em',marginBottom:8}}>
              ▸ DESARROLLO A MEDIDA
            </div>
            <h3 className="bebas" style={{fontSize:24,letterSpacing:'.05em',color:'var(--t1)',marginBottom:6}}>
              ¿Tenés algo en mente que no está acá?
            </h3>
            <p style={{color:'var(--t3)',fontSize:14,maxWidth:480,lineHeight:1.6}}>
              Contanos qué necesitás. Analizamos el proyecto sin costo y te decimos si podemos hacerlo — y en cuánto tiempo.
            </p>
          </div>

          <div style={{display:'flex',gap:10,flexWrap:'wrap',position:'relative',zIndex:1}}>
            <a href={`https://wa.me/5493462375305?text=Hola%20Daniel%2C%20quiero%20consultar%20sobre%20un%20proyecto`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-p"
              style={{textDecoration:'none',fontSize:13,padding:'12px 22px',letterSpacing:'.05em',textTransform:'uppercase',display:'flex',alignItems:'center',gap:8}}>
              <MessageCircle size={15}/> WhatsApp
            </a>
            <button
              onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}
              className="btn btn-g"
              style={{fontSize:13,padding:'11px 22px',letterSpacing:'.05em',textTransform:'uppercase'}}>
              Formulario de contacto
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
