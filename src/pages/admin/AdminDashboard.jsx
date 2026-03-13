import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Briefcase, Users, AlertTriangle, Clock, CheckCircle, TrendingUp, ExternalLink, ArrowRight, Zap } from 'lucide-react'
import { getProjects, getServices, getClients, getClientsDueSoon, getClientsOverdue } from '../../lib/db'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

const ST = {
  active:      { label:'Activo',        cls:'b-green'  },
  development: { label:'En desarrollo', cls:'b-blue'   },
  suspended:   { label:'Suspendido',    cls:'b-red'    },
  delivered:   { label:'Entregado',     cls:'b-gray'   },
  overdue:     { label:'Pago vencido',  cls:'b-yellow' },
}

function StatCard({ label, value, icon:Icon, color, sub, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:`linear-gradient(145deg,${color}14,${color}06)`,
      border:`1px solid ${color}28`,
      borderRadius:16,padding:'22px 22px 18px',cursor:'pointer',position:'relative',overflow:'hidden',
      transition:'all .25s ease',
    }}
    onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 16px 44px ${color}20`}}
    onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
      {/* Glow top */}
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:`linear-gradient(90deg,transparent,${color}50,transparent)`}}/>
      <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:16}}>
        <div style={{width:40,height:40,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:`${color}18`,border:`1px solid ${color}30`}}>
          <Icon size={18} style={{color}}/>
        </div>
        <ArrowRight size={13} style={{color:'rgba(167,182,220,.25)',marginTop:4}}/>
      </div>
      <div className="syne" style={{fontSize:34,fontWeight:800,color:'var(--t1)',lineHeight:1,marginBottom:5}}>{value}</div>
      <div style={{fontSize:12,fontWeight:600,color:'rgba(167,182,220,.5)',letterSpacing:'.06em',textTransform:'uppercase'}}>{label}</div>
      {sub&&<div style={{fontSize:11,color:'rgba(167,182,220,.35)',marginTop:3}}>{sub}</div>}
    </div>
  )
}

export default function AdminDashboard() {
  const [projects,setProjects]=useState([])
  const [clients,setClients]=useState([])
  const [dueSoon,setDueSoon]=useState([])
  const [overdue,setOverdue]=useState([])
  const navigate=useNavigate()

  useEffect(()=>{
    getProjects().then(setProjects).catch(()=>{})
    getClients().then(setClients).catch(()=>{})
    getClientsDueSoon(3).then(setDueSoon).catch(()=>{})
    getClientsOverdue().then(setOverdue).catch(()=>{})
  },[])

  const activeClients = clients.filter(c=>c.payment_status==='active').length
  const monthlyIncome = clients.filter(c=>c.payment_status==='active').reduce((a,c)=>a+(c.maintenance_price||0),0)

  return (
    <div>
      {/* Page header */}
      <div style={{marginBottom:32}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:6}}>
          <Zap size={16} style={{color:'var(--cyan)'}}/>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--t4)'}}>Panel de control</span>
        </div>
        <h1 className="syne" style={{fontSize:'clamp(24px,4vw,32px)',fontWeight:800,color:'var(--t1)',letterSpacing:'-.02em',marginBottom:4}}>Dashboard</h1>
        <p style={{fontSize:14,color:'var(--t3)'}}>Resumen general de Krovex — {new Date().toLocaleDateString('es-AR',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
      </div>

      {/* Stat cards */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(190px,1fr))',gap:14,marginBottom:28}}>
        <StatCard label="Clientes" value={clients.length} icon={Users} color="#3B82F6" sub="Total registrados" onClick={()=>navigate('/admin/clients')}/>
        <StatCard label="Activos" value={activeClients} icon={CheckCircle} color="#34D399" sub="Con mantenimiento" onClick={()=>navigate('/admin/clients')}/>
        <StatCard label="Vencidos" value={overdue.length} icon={AlertTriangle} color="#F87171" sub="Requieren atención" onClick={()=>navigate('/admin/clients')}/>
        <StatCard label="Portfolio" value={projects.length} icon={FolderOpen} color="#818CF8" sub="Proyectos publicados" onClick={()=>navigate('/admin/projects')}/>
      </div>

      {/* Alerts */}
      {(overdue.length>0||dueSoon.length>0)&&(
        <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:28}}>
          {overdue.length>0&&(
            <div style={{background:'rgba(248,113,113,.07)',border:'1px solid rgba(248,113,113,.2)',borderRadius:14,padding:'16px 20px',display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:38,height:38,borderRadius:11,background:'rgba(248,113,113,.12)',border:'1px solid rgba(248,113,113,.25)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <AlertTriangle size={17} style={{color:'var(--red)'}}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontWeight:700,fontSize:14,color:'var(--red)',marginBottom:2}}>{overdue.length} cliente{overdue.length>1?'s':''} con pago vencido</p>
                <p style={{fontSize:12,color:'rgba(248,113,113,.55)'}}>{overdue.map(c=>c.name).join(', ')}</p>
              </div>
              <button onClick={()=>navigate('/admin/clients')} style={{padding:'7px 14px',borderRadius:9,background:'rgba(248,113,113,.15)',color:'var(--red)',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:"'Outfit',sans-serif",whiteSpace:'nowrap'}}>
                Gestionar →
              </button>
            </div>
          )}
          {dueSoon.length>0&&(
            <div style={{background:'rgba(251,191,36,.06)',border:'1px solid rgba(251,191,36,.2)',borderRadius:14,padding:'16px 20px',display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:38,height:38,borderRadius:11,background:'rgba(251,191,36,.1)',border:'1px solid rgba(251,191,36,.22)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <Clock size={17} style={{color:'var(--yell)'}}/>
              </div>
              <div style={{flex:1}}>
                <p style={{fontWeight:700,fontSize:14,color:'var(--yell)',marginBottom:2}}>{dueSoon.length} pago{dueSoon.length>1?'s':''} vence{dueSoon.length>1?'n':''} en 3 días</p>
                <p style={{fontSize:12,color:'rgba(251,191,36,.55)'}}>{dueSoon.map(c=>c.name).join(', ')}</p>
              </div>
              <button onClick={()=>navigate('/admin/clients')} style={{padding:'7px 14px',borderRadius:9,background:'rgba(251,191,36,.13)',color:'var(--yell)',border:'none',cursor:'pointer',fontSize:12,fontWeight:700,fontFamily:"'Outfit',sans-serif",whiteSpace:'nowrap'}}>
                Ver →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recent clients table */}
      <div className="card-flat" style={{overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 22px',borderBottom:'1px solid var(--b0)'}}>
          <div>
            <h2 className="syne" style={{fontSize:16,fontWeight:700,color:'var(--t1)'}}>Últimos clientes</h2>
            <p style={{fontSize:12,color:'var(--t4)',marginTop:2}}>Vista rápida de actividad reciente</p>
          </div>
          <button onClick={()=>navigate('/admin/clients')} className="btn btn-g btn-xs">
            Ver todos <ArrowRight size={12}/>
          </button>
        </div>

        {clients.length===0?(
          <div style={{padding:'52px 0',textAlign:'center'}}>
            <div style={{width:52,height:52,borderRadius:'50%',background:'rgba(255,255,255,.04)',border:'1px solid var(--b0)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px'}}>
              <Users size={22} style={{color:'var(--t4)'}}/>
            </div>
            <p style={{fontSize:14,color:'var(--t4)',marginBottom:14}}>Todavía no hay clientes registrados</p>
            <button onClick={()=>navigate('/admin/clients')} className="btn btn-p btn-sm">
              Agregar primer cliente
            </button>
          </div>
        ):(
          <div style={{overflowX:'auto'}}>
            <table className="tbl">
              <thead><tr>
                <th>Cliente</th><th>Sitio</th><th>Estado</th><th>Vencimiento</th>
              </tr></thead>
              <tbody>
                {clients.slice(0,6).map(c=>{
                  const st=ST[c.payment_status]||ST.delivered
                  return (
                    <tr key={c.id} onClick={()=>navigate('/admin/clients')}>
                      <td>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,var(--blue),var(--blue3))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:800,color:'var(--t1)',flexShrink:0}}>
                            {c.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div style={{fontWeight:600,color:'var(--t1)',fontSize:13.5}}>{c.name}</div>
                            <div style={{fontSize:11,color:'var(--t4)'}}>{c.company||'—'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {c.site_url
                          ?<a href={c.site_url} target="_blank" rel="noopener noreferrer"
                              style={{display:'flex',alignItems:'center',gap:5,fontSize:12,color:'#93C5FD',textDecoration:'none'}}
                              onClick={e=>e.stopPropagation()}>
                              <ExternalLink size={11}/>{c.site_url.replace(/^https?:\/\//,'')}
                            </a>
                          :<span style={{fontSize:12,color:'var(--t4)'}}>—</span>
                        }
                      </td>
                      <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                      <td style={{fontSize:12,color:'var(--t3)'}}>
                        {c.payment_due_date?format(parseISO(c.payment_due_date),'d MMM yyyy',{locale:es}):'—'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
