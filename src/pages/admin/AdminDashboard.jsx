import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FolderOpen, Briefcase, Users, AlertTriangle, Clock, CheckCircle, TrendingUp, ExternalLink } from 'lucide-react'
import { getProjects, getServices, getClients, getClientsDueSoon, getClientsOverdue } from '../../lib/db'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

const STATUS_LABELS = {
  active:      { label:'Activo',         cls:'badge-green'  },
  development: { label:'En desarrollo',  cls:'badge-blue'   },
  suspended:   { label:'Suspendido',     cls:'badge-red'    },
  delivered:   { label:'Entregado',      cls:'badge-gray'   },
  overdue:     { label:'Pago vencido',   cls:'badge-yellow' },
}

export default function AdminDashboard() {
  const [projects,  setProjects]  = useState([])
  const [services,  setServices]  = useState([])
  const [clients,   setClients]   = useState([])
  const [dueSoon,   setDueSoon]   = useState([])
  const [overdue,   setOverdue]   = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getProjects().then(setProjects).catch(()=>{})
    getServices().then(setServices).catch(()=>{})
    getClients().then(setClients).catch(()=>{})
    getClientsDueSoon(3).then(setDueSoon).catch(()=>{})
    getClientsOverdue().then(setOverdue).catch(()=>{})
  }, [])

  const stats = [
    { label:'Clientes',          value:clients.length,                                  icon:Users,       color:'#2227F9', to:'/admin/clients'  },
    { label:'Activos',           value:clients.filter(c=>c.payment_status==='active').length, icon:CheckCircle, color:'#4ade80', to:'/admin/clients'  },
    { label:'Vencidos',          value:overdue.length,                                  icon:AlertTriangle,color:'#f87171', to:'/admin/clients'  },
    { label:'Portfolio',         value:projects.length,                                 icon:FolderOpen,  color:'#60A5FA', to:'/admin/projects' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Dashboard</h1>
        <p style={{ color:'rgba(160,176,200,.5)' }}>Resumen general de Krovex</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon:Icon, color, to }) => (
          <div key={label} onClick={() => navigate(to)}
            className="card p-5 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background:`${color}18`, border:`1px solid ${color}30` }}>
                <Icon size={18} style={{ color }}/>
              </div>
              <ExternalLink size={12} style={{ color:'rgba(160,176,200,.28)' }}/>
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            <div className="text-xs font-medium" style={{ color:'rgba(160,176,200,.5)' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      {(overdue.length > 0 || dueSoon.length > 0) && (
        <div className="space-y-3 mb-8">
          {overdue.length > 0 && (
            <div className="rounded-xl p-4 flex items-start gap-3"
              style={{ background:'rgba(248,113,113,.07)', border:'1px solid rgba(248,113,113,.22)' }}>
              <AlertTriangle size={18} style={{ color:'#f87171', flexShrink:0, marginTop:2 }}/>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color:'#f87171' }}>
                  {overdue.length} cliente{overdue.length>1?'s':''} con pago vencido
                </p>
                <p className="text-xs mt-1" style={{ color:'rgba(248,113,113,.65)' }}>
                  {overdue.map(c => c.name).join(', ')}
                </p>
              </div>
              <button onClick={() => navigate('/admin/clients')}
                className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={{ background:'rgba(248,113,113,.18)', color:'#f87171' }}>
                Gestionar →
              </button>
            </div>
          )}
          {dueSoon.length > 0 && (
            <div className="rounded-xl p-4 flex items-start gap-3"
              style={{ background:'rgba(250,204,21,.06)', border:'1px solid rgba(250,204,21,.2)' }}>
              <Clock size={18} style={{ color:'#facc15', flexShrink:0, marginTop:2 }}/>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color:'#facc15' }}>
                  {dueSoon.length} pago{dueSoon.length>1?'s':''} que vence{dueSoon.length>1?'n':''} en los próximos 3 días
                </p>
                <p className="text-xs mt-1" style={{ color:'rgba(250,204,21,.6)' }}>
                  {dueSoon.map(c => c.name).join(', ')}
                </p>
              </div>
              <button onClick={() => navigate('/admin/clients')}
                className="text-xs font-bold px-3 py-1.5 rounded-lg flex-shrink-0"
                style={{ background:'rgba(250,204,21,.15)', color:'#facc15' }}>
                Ver →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recent clients */}
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor:'rgba(255,255,255,.06)' }}>
          <h2 className="font-black text-white">Últimos clientes</h2>
          <button onClick={() => navigate('/admin/clients')}
            className="text-xs font-bold" style={{ color:'#60A5FA' }}>Ver todos →</button>
        </div>
        {clients.length === 0 ? (
          <div className="py-14 text-center" style={{ color:'rgba(160,176,200,.38)' }}>
            <Users size={32} className="mx-auto mb-3 opacity-30"/>
            <p className="text-sm">Todavía no hay clientes registrados</p>
            <button onClick={() => navigate('/admin/clients')}
              className="btn-secondary px-4 py-2 text-sm mt-3">Agregar cliente</button>
          </div>
        ) : (
          <table className="kv-table">
            <thead><tr>
              <th>Cliente</th><th>Sitio</th><th>Estado</th><th>Vencimiento</th>
            </tr></thead>
            <tbody>
              {clients.slice(0,6).map(c => {
                const st = STATUS_LABELS[c.payment_status] || STATUS_LABELS.delivered
                return (
                  <tr key={c.id} className="cursor-pointer" onClick={() => navigate('/admin/clients')}>
                    <td>
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-xs" style={{ color:'rgba(160,176,200,.45)' }}>{c.company}</div>
                    </td>
                    <td>
                      {c.site_url
                        ? <a href={c.site_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs hover:underline" style={{ color:'#60A5FA' }}
                            onClick={e => e.stopPropagation()}>
                            <ExternalLink size={11}/>{c.site_url.replace(/^https?:\/\//,'')}
                          </a>
                        : <span className="text-xs" style={{ color:'rgba(160,176,200,.35)' }}>—</span>
                      }
                    </td>
                    <td><span className={`badge ${st.cls}`}>{st.label}</span></td>
                    <td className="text-xs" style={{ color:'rgba(160,176,200,.55)' }}>
                      {c.payment_due_date
                        ? format(parseISO(c.payment_due_date), 'd MMM yyyy', { locale:es })
                        : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
