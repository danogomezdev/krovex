import { useState, useEffect } from 'react'
import { X, ExternalLink, Github, FolderOpen, SlidersHorizontal } from 'lucide-react'
import { getProjects } from '../../lib/db'

const CATS=['Todos','Landing Page','E-Commerce','App Web','Sistema','Otro']
const DEMO=[
  {id:'p1',title:'E-Commerce Fashion',category:'E-Commerce',description:'Tienda online con MercadoPago, stock en tiempo real y panel admin.',long_description:'Tienda online completa con catálogo dinámico, carrito, integración MercadoPago, gestión de stock y notificaciones automáticas a clientes.',tech:['React','Node.js','PostgreSQL','MercadoPago'],url:'#',featured:true},
  {id:'p2',title:'Sistema de Logística',category:'Sistema',description:'Sistema interno para empresa de logística con seguimiento en tiempo real.',long_description:'Plataforma web para gestión de envíos con seguimiento GPS, roles diferenciados, reportes automáticos y panel de clientes.',tech:['React','Supabase','Chart.js'],url:null,featured:false},
  {id:'p3',title:'Landing Inmobiliaria',category:'Landing Page',description:'Landing de alto impacto con galería, filtros y WhatsApp integrado.',long_description:'Landing profesional para inmobiliaria con galería interactiva, filtros por tipo de propiedad, formulario y chat WhatsApp directo.',tech:['React','Framer Motion','EmailJS'],url:'#',featured:true},
  {id:'p4',title:'App de Turnos Médicos',category:'App Web',description:'Gestión de turnos para clínica con calendario y recordatorios automáticos.',long_description:'Pacientes reservan turnos online, el personal gestiona la agenda. Recordatorios por email y WhatsApp, historial de pacientes.',tech:['React','Node.js','MongoDB'],url:null,featured:false},
  {id:'p5',title:'Portal Corporativo',category:'Landing Page',description:'Sitio multi-idioma para empresa de exportación con catálogo.',long_description:'Sitio corporativo en español e inglés con catálogo de productos, blog, formularios de contacto y panel de administración.',tech:['Next.js','Prisma','PostgreSQL'],url:'#',featured:true},
  {id:'p6',title:'Dashboard Analytics',category:'App Web',description:'Panel de análisis conectado a Google Ads y Meta con métricas en tiempo real.',long_description:'Dashboard que centraliza métricas de Google Ads, Meta Ads y Analytics. Gráficos interactivos, reportes automáticos PDF y alertas.',tech:['React','Python','FastAPI','Recharts'],url:null,featured:false},
]

function Modal({p,onClose}) {
  return (
    <div className="modal-bg" onClick={onClose}>
      <div style={{
        position:'relative',width:'100%',maxWidth:640,maxHeight:'90vh',overflowY:'auto',
        borderRadius:24,background:'var(--bg1)',border:'1px solid rgba(99,179,237,.2)',
      }} onClick={e=>e.stopPropagation()}>
        {/* Header image area */}
        <div style={{
          height:180,display:'flex',alignItems:'center',justifyContent:'center',
          background:'var(--bg1)',
          borderBottom:'1px solid rgba(255,255,255,.06)',position:'relative',overflow:'hidden',
        }}>
          <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.8}}/>
          {p.image_url
            ?<img src={p.image_url} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
            :<div style={{position:'relative',zIndex:1,width:52,height:52,borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(99,179,237,.1)',border:'1px solid rgba(99,179,237,.25)'}}>
              <FolderOpen size={24} style={{color:'#63B3ED'}}/>
            </div>
          }
          <button onClick={onClose} style={{
            position:'absolute',top:16,right:16,width:34,height:34,borderRadius:'50%',
            background:'rgba(0,0,0,.35)',border:'1px solid rgba(255,255,255,.12)',
            display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',color:'var(--t1)'
          }}><X size={15}/></button>
        </div>

        <div style={{padding:32}}>
          <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:16,marginBottom:20}}>
            <div>
              <span className="pill" style={{marginBottom:10,display:'inline-flex',fontSize:10}}>{p.category}</span>
              <h3 className="syne" style={{fontSize:24,fontWeight:800,color:'var(--t1)'}}>{p.title}</h3>
            </div>
            <div style={{display:'flex',gap:8,flexShrink:0}}>
              {p.url&&<a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{padding:'7px 12px'}}><ExternalLink size={14}/></a>}
              {p.github_url&&<a href={p.github_url} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{padding:'7px 12px'}}><Github size={14}/></a>}
            </div>
          </div>

          <p style={{color:'rgba(148,163,184,.75)',fontSize:15,lineHeight:1.75,marginBottom:24}}>{p.long_description||p.description}</p>

          <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:28}}>
            {(p.tech||[]).map(t=><span key={t} className="badge b-blue">{t}</span>)}
          </div>

          <button onClick={()=>{onClose();document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}}
            className="btn-cta" style={{width:'100%',justifyContent:'center'}}>
            Quiero algo similar →
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [projects,setProjects]=useState(DEMO)
  const [active,setActive]=useState(null)
  const [filter,setFilter]=useState('Todos')
  useEffect(()=>{getProjects().then(d=>d?.length&&setProjects(d)).catch(()=>{})},[])
  const filtered=filter==='Todos'?projects:projects.filter(p=>p.category===filter)

  return (
    <section id="portfolio" style={{position:'relative',padding:'120px 0',background:'var(--bg0)',overflow:'hidden'}}>
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.45}}/>
      <div style={{position:'absolute',bottom:0,left:'50%',transform:'translateX(-50%)',width:600,height:300,background:'radial-gradient(ellipse,rgba(37,99,235,.08) 0%,transparent 65%)',pointerEvents:'none'}}/>

      <div style={{maxWidth:1280,margin:'0 auto',padding:'0 28px',position:'relative',zIndex:1}}>
        <div style={{textAlign:'center',marginBottom:56}}>
          <span className="pill" style={{marginBottom:18,display:'inline-flex'}}><FolderOpen size={11}/>Portfolio</span>
          <h2 className="syne" style={{fontSize:'clamp(34px,5vw,54px)',fontWeight:800,letterSpacing:'-.025em',color:'var(--t1)',marginBottom:16}}>
            Proyectos <span className="grad-cyan">realizados</span>
          </h2>
          <p style={{color:'rgba(148,163,184,.6)',fontSize:17,maxWidth:460,margin:'0 auto'}}>
            Cada proyecto es único. Acá algunos que nos enorgullecen.
          </p>
        </div>

        {/* Filter pills */}
        <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center',marginBottom:48}}>
          {CATS.map(c=>(
            <button key={c} onClick={()=>setFilter(c)}
              style={{
                padding:'8px 18px',borderRadius:100,fontSize:13,fontWeight:600,cursor:'pointer',
                transition:'all .2s',fontFamily:"'Outfit',sans-serif",letterSpacing:'.02em',
                background:filter===c?'var(--kblue)':'rgba(255,255,255,.04)',
                color:filter===c?'white':'rgba(148,163,184,.65)',
                border:filter===c?'1px solid rgba(255,255,255,.15)':'1px solid rgba(255,255,255,.07)',
                boxShadow:filter===c?'0 8px 24px rgba(37,99,235,.3)':'none',
              }}>
              {c==='Todos'&&<SlidersHorizontal size={11} style={{display:'inline',marginRight:5}}/>}{c}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:20}}>
          {filtered.map(p=>(
            <div key={p.id} className="card-glass" style={{cursor:'pointer',overflow:'hidden'}}
              onClick={()=>setActive(p)}>
              {/* Thumbnail */}
              <div style={{
                height:176,display:'flex',alignItems:'center',justifyContent:'center',
                background:'var(--bg1)',position:'relative',overflow:'hidden',
              }}>
                <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.9}}/>
                {p.image_url
                  ?<img src={p.image_url} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  :<div style={{position:'relative',zIndex:1,width:44,height:44,borderRadius:14,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(99,179,237,.08)',border:'1px solid rgba(99,179,237,.2)'}}>
                    <FolderOpen size={19} style={{color:'#63B3ED'}}/>
                  </div>
                }
                {p.featured&&(
                  <span className="badge b-blue" style={{position:'absolute',top:12,left:12,zIndex:2}}>Destacado</span>
                )}
                {/* Hover overlay */}
                <div style={{
                  position:'absolute',inset:0,background:'rgba(7,9,15,0)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  transition:'background .25s',zIndex:3,
                }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(7,9,15,.55)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(7,9,15,0)'}>
                  <span style={{
                    opacity:0,padding:'8px 18px',borderRadius:10,background:'rgba(37,99,235,.9)',
                    fontSize:13,fontWeight:700,color:'var(--t1)',transition:'opacity .25s',
                  }}
                    onMouseEnter={e=>{e.currentTarget.style.opacity='1';e.currentTarget.parentElement.style.background='rgba(7,9,15,.55)'}}
                    onMouseLeave={e=>{e.currentTarget.style.opacity='0';e.currentTarget.parentElement.style.background='rgba(7,9,15,0)'}}>
                    Ver detalles
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{padding:'20px 22px'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'#63B3ED'}}>{p.category}</span>
                  {p.url&&<ExternalLink size={12} style={{color:'rgba(148,163,184,.3)'}}/>}
                </div>
                <h3 className="syne" style={{fontSize:17,fontWeight:700,color:'var(--t1)',marginBottom:8}}>{p.title}</h3>
                <p style={{fontSize:13.5,color:'rgba(148,163,184,.58)',lineHeight:1.6,marginBottom:14,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{p.description}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {(p.tech||[]).slice(0,3).map(t=><span key={t} className="badge b-blue">{t}</span>)}
                  {(p.tech||[]).length>3&&<span style={{fontSize:11,color:'rgba(148,163,184,.38)'}}>+{p.tech.length-3}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {active&&<Modal p={active} onClose={()=>setActive(null)}/>}
    </section>
  )
}
