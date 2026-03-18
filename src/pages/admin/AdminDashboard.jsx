import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Users, AlertTriangle, Clock, CheckCircle, ExternalLink, ArrowRight, Zap } from 'lucide-react'
import { getProjects, getClients, getClientsDueSoon, getClientsOverdue } from '../../lib/db'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

const ST = {
  active:      { label:'Activo',        cls:'b-green'  },
  development: { label:'En desarrollo', cls:'b-blue'   },
  suspended:   { label:'Suspendido',    cls:'b-red'    },
  delivered:   { label:'Entregado',     cls:'b-gray'   },
  overdue:     { label:'Pago vencido',  cls:'b-yellow' },
}

function StatCard({ label, value, icon: Icon, color, sub, onClick }) {
  return (
    <div onClick={onClick}
      style={{
        background:`rgba(${hexToRgb(color)},.07)`,
        border:`1px solid rgba(${hexToRgb(color)},.2)`,
        borderRadius:12, padding:'20px 20px 16px',
        cursor:'pointer', position:'relative', overflow:'hidden',
        transition:'all .22s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 12px 32px rgba(${hexToRgb(color)},.15)` }}
      onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
    >
      <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:`linear-gradient(90deg,transparent,rgba(${hexToRgb(color)},.4),transparent)` }}/>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ width:38, height:38, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:`rgba(${hexToRgb(color)},.15)`, border:`1px solid rgba(${hexToRgb(color)},.25)` }}>
          <Icon size={17} style={{ color }}/>
        </div>
        <ArrowRight size={13} style={{ color:'var(--t4)', marginTop:4 }}/>
      </div>
      <div style={{ fontSize:32, fontWeight:800, color:'var(--t1)', lineHeight:1, marginBottom:5 }}>{value}</div>
      <div style={{ fontSize:11, fontWeight:700, color:'var(--t4)', letterSpacing:'.06em', textTransform:'uppercase' }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:'var(--t4)', marginTop:3, opacity:.7 }}>{sub}</div>}
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16)
  const g = parseInt(hex.slice(3,5),16)
  const b = parseInt(hex.slice(5,7),16)
  return `${r},${g},${b}`
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState([])
  const [clients,  setClients]  = useState([])
  const [dueSoon,  setDueSoon]  = useState([])
  const [overdue,  setOverdue]  = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProjects().then(setProjects).catch(() => {})
    getClients().then(setClients).catch(() => {})
    getClientsDueSoon(3).then(setDueSoon).catch(() => {})
    getClientsOverdue().then(setOverdue).catch(() => {})
  }, [])

  const activeClients = clients.filter(c => c.payment_status === 'active').length

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
          <Zap size={14} style={{ color:'var(--kblue3)' }}/>
          <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase', color:'var(--t4)' }}>Panel de control</span>
        </div>
        <h1 style={{ fontSize:28, fontWeight:800, color:'var(--t1)', letterSpacing:'-.02em', marginBottom:4 }}>Dashboard</h1>
        <p style={{ fontSize:14, color:'var(--t3)' }}>
          {new Date().toLocaleDateString('es-AR', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:12, marginBottom:24 }}>
        <StatCard label="Clientes" value={clients.length} icon={Users} color="#3B82F6" sub="Total registrados" onClick={() => navigate('/admin/clients')}/>
        <StatCard label="Activos" value={activeClients} icon={CheckCircle} color="#34D399" sub="Con mantenimiento" onClick={() => navigate('/admin/clients')}/>
        <StatCard label="Vencidos" value={overdue.length} icon={AlertTriangle} color="#F87171" sub="Requieren atención" onClick={() => navigate('/admin/clients')}/>
        <StatCard label="Portfolio" value={projects.length} icon={FolderOpen} color="#818CF8" sub="Proyectos" onClick={() => navigate('/admin/projects')}/>
      </div>

      {/* Alertas */}
      {(overdue.length > 0 || dueSoon.length > 0) && (
        <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
          {overdue.length > 0 && (
            <div style={{ background:'rgba(248,113,113,.07)', border:'1px solid rgba(248,113,113,.2)', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
              <AlertTriangle size={17} style={{ color:'#F87171', flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:14, color:'#F87171', marginBottom:2 }}>{overdue.length} cliente{overdue.length > 1 ? 's' : ''} con pago vencido</p>
                <p style={{ fontSize:12, color:'rgba(248,113,113,.55)' }}>{overdue.map(c => c.name).join(', ')}</p>
              </div>
              <button onClick={() => navigate('/admin/clients')}
                style={{ padding:'6px 12px', borderRadius:8, background:'rgba(248,113,113,.15)', color:'#F87171', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}>
                Gestionar →
              </button>
            </div>
          )}
          {dueSoon.length > 0 && (
            <div style={{ background:'rgba(251,191,36,.06)', border:'1px solid rgba(251,191,36,.2)', borderRadius:12, padding:'14px 18px', display:'flex', alignItems:'center', gap:12 }}>
              <Clock size={17} style={{ color:'#FBBF24', flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:14, color:'#FBBF24', marginBottom:2 }}>{dueSoon.length} pago{dueSoon.length > 1 ? 's' : ''} vence{dueSoon.length > 1 ? 'n' : ''} en 3 días</p>
                <p style={{ fontSize:12, color:'rgba(251,191,36,.55)' }}>{dueSoon.map(c => c.name).join(', ')}</p>
              </div>
              <button onClick={() => navigate('/admin/clients')}
                style={{ padding:'6px 12px', borderRadius:8, background:'rgba(251,191,36,.13)', color:'#FBBF24', border:'none', cursor:'pointer', fontSize:12, fontWeight:700 }}>
                Ver →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tabla clientes recientes */}
      <div style={{ background:'var(--bg1)', border:'1px solid var(--b0)', borderRadius:12, overflow:'hidden' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:'1px solid var(--b0)' }}>
          <div>
            <h2 style={{ fontSize:15, fontWeight:700, color:'var(--t1)' }}>Últimos clientes</h2>
            <p style={{ fontSize:12, color:'var(--t4)', marginTop:2 }}>Vista rápida de actividad reciente</p>
          </div>
          <button onClick={() => navigate('/admin/clients')} className="btn btn-g btn-xs">
            Ver todos <ArrowRight size={12}/>
          </button>
        </div>

        {clients.length === 0 ? (
          <div style={{ padding:'48px 0', textAlign:'center' }}>
            <Users size={28} style={{ color:'var(--t4)', margin:'0 auto 12px', display:'block' }}/>
            <p style={{ fontSize:14, color:'var(--t4)', marginBottom:14 }}>Todavía no hay clientes registrados</p>
            <button onClick={() => navigate('/admin/clients')} className="btn btn-p btn-sm">Agregar primer cliente</button>
          </div>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table className="tbl">
              <thead><tr>
                <th>Cliente</th><th>Sitio</th><th>Estado</th><th>Vencimiento</th>
              </tr></thead>
              <tbody>
                {clients.slice(0, 6).map(c => {
                  const st = ST[c.payment_status] || ST.delivered
                  return (
                    <tr key={c.id} onClick={() => navigate('/admin/clients')} style={{ cursor:'pointer' }}>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:32, height:32, borderRadius:'50%', background:'linear-gradient(135deg,#4da6ff,#2563EB)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:800, color:'white', flexShrink:0 }}>
                            {c.name?.[0]?.toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight:600, color:'var(--t1)', fontSize:13.5 }}>{c.name}</div>
                            <div style={{ fontSize:11, color:'var(--t4)' }}>{c.company || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {c.site_url
                          ? <a href={c.site_url} target="_blank" rel="noopener noreferrer"
                              style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'#93C5FD', textDecoration:'none' }}
                              onClick={e => e.stopPropagation()}>
                              <ExternalLink size={11}/>{c.site_url.replace(/^https?:\/\//, '')}
                            </a>
                          : <span style={{ fontSize:12, color:'var(--t4)' }}>—</span>
                        }
                      </td>
                      <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                      <td style={{ fontSize:12, color:'var(--t3)' }}>
                        {c.payment_due_date ? format(parseISO(c.payment_due_date), 'd MMM yyyy', { locale:es }) : '—'}
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
