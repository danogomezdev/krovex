import { useState, useEffect } from 'react'
import { Check, Globe, ShoppingCart, Database, Layers, Zap, ArrowRight, Sparkles } from 'lucide-react'
import { getServices } from '../../lib/db'

const ICON_MAP = {Globe,ShoppingCart,Database,Layers,Zap}
const DEFAULT=[
  {id:'d1',icon:'Globe',name:'Landing Page',description:'Una página de alto impacto que convierte visitantes en clientes desde el primer scroll.',price_from:150000,price_to:300000,currency:'ARS',features:['Diseño único y responsive','SEO técnico optimizado','Formulario + integración email','Hasta 5 secciones','Entrega en 7 días'],highlighted:false},
  {id:'d2',icon:'Layers',name:'Sitio Completo',description:'Sitio multi-página con panel de administración, blog dinámico y todo lo que tu marca necesita.',price_from:300000,price_to:600000,currency:'ARS',features:['Diseño premium responsive','Panel de administración','Blog & Noticias dinámico','SEO técnico avanzado','Hasta 10 páginas','Entrega en 14 días'],highlighted:true},
  {id:'d3',icon:'ShoppingCart',name:'E-Commerce',description:'Tienda online profesional con carrito, pagos online, stock y panel de gestión de pedidos.',price_from:500000,price_to:1200000,currency:'ARS',features:['Catálogo con filtros','Carrito & checkout','Integración MercadoPago','Panel de pedidos y stock','Notificaciones automáticas','Entrega en 21 días'],highlighted:false},
  {id:'d4',icon:'Database',name:'Sistema / App Web',description:'Aplicaciones web complejas con lógica de negocio, roles de usuario y integraciones a medida.',price_from:800000,price_to:null,currency:'ARS',features:['Backend personalizado','Base de datos escalable','Autenticación & roles','API REST completa','Integraciones externas','Cotización según proyecto'],highlighted:false},
]
const fmt=(n,c='ARS')=>n?new Intl.NumberFormat('es-AR',{style:'currency',currency:c,minimumFractionDigits:0}).format(n):'Consultar'

export default function Services() {
  const [svcs,setSvcs]=useState(DEFAULT)
  useEffect(()=>{getServices().then(d=>d?.length&&setSvcs(d)).catch(()=>{})},[])

  return (
    <section id="servicios" style={{
      position:'relative',padding:'120px 0',overflow:'hidden',
      background:'linear-gradient(180deg,#07090F 0%,#0C1018 50%,#07090F 100%)'
    }}>
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.5}}/>
      <div style={{position:'absolute',top:0,left:'50%',transform:'translateX(-50%)',width:700,height:350,background:'radial-gradient(ellipse,rgba(37,99,235,.1) 0%,transparent 65%)',pointerEvents:'none'}}/>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 28px',position:'relative',zIndex:1}}>
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:64}}>
          <span className="pill" style={{marginBottom:18,display:'inline-flex'}}><Sparkles size={11}/>Servicios</span>
          <h2 className="syne" style={{fontSize:'clamp(34px,5vw,54px)',fontWeight:800,letterSpacing:'-.025em',color:'white',marginBottom:16}}>
            Lo que <span className="grad-cyan">construimos</span>
          </h2>
          <p style={{color:'rgba(148,163,184,.62)',fontSize:17,maxWidth:500,margin:'0 auto'}}>
            Cada proyecto es cotizado individualmente. Los precios son referencias en pesos argentinos.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:20}}>
          {svcs.map(s=>{
            const Icon=ICON_MAP[s.icon]||Globe
            const isFeatured=s.highlighted
            return (
              <div key={s.id} className={isFeatured?'card-featured':'card-glass'}
                style={{padding:'32px 28px',display:'flex',flexDirection:'column',position:'relative'}}>

                {isFeatured&&(
                  <div style={{position:'absolute',top:-14,left:'50%',transform:'translateX(-50%)',zIndex:2}}>
                    <span className="btn-cta" style={{padding:'4px 16px',fontSize:11,borderRadius:100,pointerEvents:'none',letterSpacing:'.08em'}}>
                      ✦ Más popular
                    </span>
                  </div>
                )}

                {/* Icon */}
                <div style={{
                  width:48,height:48,borderRadius:14,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  marginBottom:20,marginTop:isFeatured?12:0,
                  background:isFeatured?'rgba(59,130,246,.22)':'rgba(255,255,255,.05)',
                  border:`1px solid ${isFeatured?'rgba(99,179,237,.35)':'rgba(255,255,255,.08)'}`,
                }}>
                  <Icon size={21} style={{color:isFeatured?'#93C5FD':'rgba(148,163,184,.65)'}}/>
                </div>

                <h3 className="syne" style={{fontSize:20,fontWeight:700,color:'white',marginBottom:10}}>{s.name}</h3>
                <p style={{color:'rgba(148,163,184,.6)',fontSize:14,lineHeight:1.7,marginBottom:22,flex:1}}>{s.description}</p>

                {/* Price */}
                <div style={{
                  borderTop:`1px solid ${isFeatured?'rgba(99,179,237,.2)':'rgba(255,255,255,.07)'}`,
                  paddingTop:18,marginBottom:18,
                }}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(148,163,184,.4)',marginBottom:5}}>Desde</div>
                  <div className={`syne ${isFeatured?'grad-cyan':'grad-white'}`} style={{fontSize:24,fontWeight:800,lineHeight:1}}>
                    {fmt(s.price_from,s.currency)}
                  </div>
                  {s.price_to&&<div style={{fontSize:12,color:'rgba(148,163,184,.33)',marginTop:4}}>hasta {fmt(s.price_to,s.currency)}</div>}
                </div>

                {/* Features */}
                <ul style={{marginBottom:26,display:'flex',flexDirection:'column',gap:9}}>
                  {(s.features||[]).map((f,i)=>(
                    <li key={i} style={{display:'flex',alignItems:'flex-start',gap:9,fontSize:13.5,color:'rgba(148,163,184,.75)'}}>
                      <Check size={13} style={{color:isFeatured?'#63B3ED':'rgba(148,163,184,.45)',flexShrink:0,marginTop:3}}/>{f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}
                  className={isFeatured?'btn-cta':'btn-outline'}
                  style={{justifyContent:'center',width:'100%'}}>
                  Consultar <ArrowRight size={14}/>
                </button>
              </div>
            )
          })}
        </div>
        <p style={{textAlign:'center',marginTop:24,fontSize:12,color:'rgba(148,163,184,.3)',letterSpacing:'.04em'}}>
          * Precios estimativos en ARS. Cada proyecto se cotiza según requerimientos específicos.
        </p>
      </div>
    </section>
  )
}
