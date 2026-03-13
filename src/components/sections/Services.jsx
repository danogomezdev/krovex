import { useState, useEffect } from 'react'
import { Check, Globe, ShoppingCart, Database, Layers, ArrowRight, Terminal } from 'lucide-react'
import { getServices } from '../../lib/db'

const ICONS = { Globe, ShoppingCart, Database, Layers }
const DEF = [
  { id:'d1', icon:'Globe',        name:'Landing Page',      description:'Una página de alto impacto diseñada para convertir visitantes en clientes desde el primer scroll.',      price_from:150000, price_to:300000, currency:'ARS', features:['Diseño único y responsive','SEO técnico incluido','Formulario de contacto','Hasta 5 secciones','Entrega en 7 días'], highlighted:false },
  { id:'d2', icon:'Layers',       name:'Sitio Completo',    description:'Sitio multi-página con panel de administración, blog dinámico y gestión de contenido a medida.',        price_from:300000, price_to:600000, currency:'ARS', features:['Diseño premium responsive','Panel de administración','Blog & Noticias dinámico','SEO avanzado','Hasta 10 páginas','Entrega en 14 días'], highlighted:true },
  { id:'d3', icon:'ShoppingCart', name:'E-Commerce',        description:'Tienda online profesional con carrito, pagos, gestión de stock y panel de pedidos.',                    price_from:500000, price_to:1200000,currency:'ARS', features:['Catálogo con filtros','Carrito & checkout','MercadoPago integrado','Panel de pedidos','Stock en tiempo real','Entrega en 21 días'], highlighted:false },
  { id:'d4', icon:'Database',     name:'Sistema / App Web', description:'Aplicaciones web complejas con lógica de negocio personalizada, roles de usuario e integraciones.',     price_from:800000, price_to:null,   currency:'ARS', features:['Backend personalizado','Base de datos escalable','Autenticación & roles','API REST completa','Integraciones externas','Cotización según proyecto'], highlighted:false },
]
const fmt = (n,c='ARS') => n ? new Intl.NumberFormat('es-AR',{style:'currency',currency:c,minimumFractionDigits:0}).format(n) : 'Consultar'

export default function Services() {
  const [svcs,setSvcs] = useState(DEF)
  useEffect(()=>{ getServices().then(d=>d?.length&&setSvcs(d)).catch(()=>{}) },[])

  return (
    <section id="servicios" style={{position:'relative',padding:'120px 0',background:'var(--bg0)',overflow:'hidden'}}>
      <div className="blueprint" style={{position:'absolute',inset:0,opacity:.7}}/>
      <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:600,height:300,background:'radial-gradient(ellipse,rgba(37,99,235,.08) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(40px)'}}/>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        {/* Header */}
        <div style={{marginBottom:56}}>
          <span className="pill" style={{marginBottom:16,display:'inline-flex'}}><Terminal size={10}/>Servicios</span>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:16}}>
            <h2 className="bebas gw" style={{fontSize:'clamp(40px,6vw,68px)',lineHeight:.9}}>
              Lo que<br/><span className="gk">construimos</span>
            </h2>
            <p style={{color:'var(--t3)',fontSize:15,maxWidth:380,lineHeight:1.7}}>
              Cada proyecto es único y cotizado individualmente. Los precios son referencias orientativas.
            </p>
          </div>
        </div>

        <div className="divider" style={{marginBottom:48}}/>

        {/* Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16}}>
          {svcs.map((s,i)=>{
            const Icon = ICONS[s.icon]||Globe
            return s.highlighted ? (
              <div key={s.id} className="card-accent" style={{padding:'32px 26px',display:'flex',flexDirection:'column',position:'relative',marginTop:0}}>
                {/* Featured badge */}
                <div style={{position:'absolute',top:-1,right:20}}>
                  <span className="mono" style={{fontSize:9,color:'var(--kblue3)',letterSpacing:'.14em',textTransform:'uppercase',background:'var(--bg0)',padding:'4px 10px',border:'1px solid rgba(77,166,255,.3)',borderTop:'none',borderRadius:'0 0 4px 4px'}}>
                    ★ Recomendado
                  </span>
                </div>

                <div style={{width:44,height:44,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(37,99,235,.15)',border:'1px solid rgba(77,166,255,.3)',marginBottom:20}}>
                  <Icon size={20} style={{color:'var(--kblue3)'}}/>
                </div>

                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:'.06em',color:'var(--t1)',marginBottom:8}}>{s.name}</h3>
                <p style={{color:'var(--t3)',fontSize:13.5,lineHeight:1.7,marginBottom:20,flex:1}}>{s.description}</p>

                <div style={{borderTop:'1px solid rgba(77,166,255,.15)',paddingTop:16,marginBottom:16}}>
                  <div className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.12em',marginBottom:6}}>PRECIO DESDE</div>
                  <div className="bebas gk" style={{fontSize:28}}>{fmt(s.price_from,s.currency)}</div>
                  {s.price_to&&<div className="mono" style={{fontSize:11,color:'var(--t4)',marginTop:3}}>hasta {fmt(s.price_to,s.currency)}</div>}
                  {!s.price_from&&<div className="mono" style={{fontSize:11,color:'var(--kblue3)',marginTop:3}}>Cotización personalizada</div>}
                </div>

                <ul style={{marginBottom:22,display:'flex',flexDirection:'column',gap:7}}>
                  {(s.features||[]).map((f,j)=>(
                    <li key={j} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'var(--t2)'}}>
                      <Check size={12} style={{color:'var(--kblue3)',flexShrink:0,marginTop:3}}/>{f}
                    </li>
                  ))}
                </ul>

                <button className="btn btn-p" style={{justifyContent:'center',width:'100%',textTransform:'uppercase',letterSpacing:'.06em',fontSize:12}}
                  onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>
                  Consultar <ArrowRight size={13}/>
                </button>
              </div>
            ) : (
              <div key={s.id} className="card" style={{padding:'32px 26px',display:'flex',flexDirection:'column'}}>
                <div style={{width:44,height:44,borderRadius:4,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(255,255,255,.03)',border:'1px solid var(--b0)',marginBottom:20}}>
                  <Icon size={20} style={{color:'var(--t4)'}}/>
                </div>

                <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:22,letterSpacing:'.06em',color:'var(--t1)',marginBottom:8}}>{s.name}</h3>
                <p style={{color:'var(--t3)',fontSize:13.5,lineHeight:1.7,marginBottom:20,flex:1}}>{s.description}</p>

                <div style={{borderTop:'1px solid var(--b0)',paddingTop:16,marginBottom:16}}>
                  <div className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.12em',marginBottom:6}}>PRECIO DESDE</div>
                  <div className="bebas gk" style={{fontSize:26}}>{fmt(s.price_from,s.currency)}</div>
                  {s.price_to&&<div className="mono" style={{fontSize:11,color:'var(--t4)',marginTop:3}}>hasta {fmt(s.price_to,s.currency)}</div>}
                  {!s.price_from&&<div className="mono" style={{fontSize:11,color:'var(--kblue3)',marginTop:3}}>Cotización personalizada</div>}
                </div>

                <ul style={{marginBottom:22,display:'flex',flexDirection:'column',gap:7}}>
                  {(s.features||[]).map((f,j)=>(
                    <li key={j} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'var(--t3)'}}>
                      <Check size={12} style={{color:'var(--t4)',flexShrink:0,marginTop:3}}/>{f}
                    </li>
                  ))}
                </ul>

                <button className="btn btn-g" style={{justifyContent:'center',width:'100%',textTransform:'uppercase',letterSpacing:'.06em',fontSize:12}}
                  onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>
                  Consultar <ArrowRight size={13}/>
                </button>
              </div>
            )
          })}
        </div>

        <p className="mono" style={{textAlign:'center',marginTop:20,fontSize:10,color:'var(--t4)',letterSpacing:'.08em'}}>
          * PRECIOS ESTIMATIVOS EN ARS — CADA PROYECTO SE COTIZA INDIVIDUALMENTE
        </p>
      </div>
    </section>
  )
}
