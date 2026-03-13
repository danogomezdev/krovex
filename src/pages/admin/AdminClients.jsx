import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, Users, ExternalLink, AlertTriangle,
         CheckCircle, Clock, Ban, RotateCcw, Mail, StickyNote, ChevronDown, ChevronUp, Send } from 'lucide-react'
import { getClients, createClient, updateClient, deleteClient, addNote, deleteNote } from '../../lib/db'
import { sendPaymentWarning, sendOverdueNotice, sendSuspensionNotice } from '../../lib/email'
import { format, parseISO, isPast, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import toast from 'react-hot-toast'

const STATUSES = [
  { value:'development', label:'En desarrollo', cls:'badge b-blue'   },
  { value:'delivered',   label:'Entregado',      cls:'badge b-gray'   },
  { value:'active',      label:'Activo/Pagado',  cls:'badge b-green'  },
  { value:'overdue',     label:'Pago vencido',   cls:'badge b-yellow' },
  { value:'suspended',   label:'Suspendido',     cls:'badge b-red'    },
]
const CURRENCIES = ['ARS','USD','EUR']

const EMPTY_CLIENT = {
  name:'', email:'', phone:'', company:'', site_url:'',
  has_maintenance:false, maintenance_price:'', currency:'ARS',
  payment_due_date:'', payment_status:'development', notes:''
}

// ── Form modal ─────────────────────────────────────────────────────────
function ClientForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || EMPTY_CLIENT)
  const [saving, setSaving] = useState(false)
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await onSave({ ...form, maintenance_price: form.maintenance_price ? Number(form.maintenance_price) : null })
    } finally { setSaving(false) }
  }

  return (
    <div className="modal-bg" onClick={onCancel}>
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl"
        style={{ background:'#0A1525', border:'1px solid rgba(34,39,249,.25)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor:'rgba(255,255,255,.07)' }}>
          <h2 className="text-lg font-black text-white">{initial ? 'Editar cliente' : 'Nuevo cliente'}</h2>
          <button onClick={onCancel} style={{ color:'rgba(160,176,200,.5)' }}><X size={18}/></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          {/* Datos personales */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'#60A5FA' }}>Datos del cliente</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[['Nombre *','text','Juan García','name',true],
                ['Empresa','text','Empresa S.A.','company',false],
                ['Email *','email','juan@empresa.com','email',true],
                ['Teléfono','tel','+54 9 ...','phone',false],
              ].map(([label,type,ph,key,req]) => (
                <div key={key}>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>{label}</label>
                  <input type={type} className="inp" placeholder={ph} value={form[key]}
                    onChange={e => set(key, e.target.value)} required={req}/>
                </div>
              ))}
            </div>
          </div>

          {/* Proyecto */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'#60A5FA' }}>Proyecto</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>URL del sitio entregado</label>
                <input type="url" className="inp" placeholder="https://cliente.com" value={form.site_url}
                  onChange={e => set('site_url', e.target.value)}/>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Estado</label>
                <select className="inp" value={form.payment_status} onChange={e => set('payment_status', e.target.value)}>
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Mantenimiento */}
          <div className="rounded-xl p-4" style={{ background:'rgba(34,39,249,.06)', border:'1px solid rgba(34,39,249,.15)' }}>
            <label className="flex items-center gap-3 cursor-pointer mb-3">
              <input type="checkbox" checked={form.has_maintenance}
                onChange={e => set('has_maintenance', e.target.checked)}
                className="w-4 h-4 accent-blue-500"/>
              <span className="text-sm font-bold text-white">¿Tiene mantenimiento mensual?</span>
            </label>
            {form.has_maintenance && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Precio</label>
                  <input type="number" className="inp" placeholder="15000"
                    value={form.maintenance_price} onChange={e => set('maintenance_price', e.target.value)}/>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Moneda</label>
                  <select className="inp" value={form.currency} onChange={e => set('currency', e.target.value)}>
                    {CURRENCIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Próximo vencimiento</label>
                  <input type="date" className="inp" value={form.payment_due_date}
                    onChange={e => set('payment_due_date', e.target.value)}/>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button type="submit" disabled={saving}
              className="btn btn-p flex items-center gap-2 px-6 py-3 text-sm disabled:opacity-50">
              <Save size={14}/>{saving ? 'Guardando...' : 'Guardar cliente'}
            </button>
            <button type="button" onClick={onCancel}
              className="btn btn-g px-5 py-3 text-sm flex items-center gap-2">
              <X size={14}/>Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Client detail panel ───────────────────────────────────────────────
function ClientDetail({ client, onClose, onUpdate }) {
  const [sending, setSending]   = useState(null)
  const [note, setNote]         = useState('')
  const [addingNote, setAddingNote] = useState(false)
  const [notes, setNotes]       = useState(client.client_notes || [])

  const st = STATUSES.find(s => s.value === client.payment_status) || STATUSES[0]

  const sendEmail = async (type) => {
    setSending(type)
    try {
      if (type === 'warning') await sendPaymentWarning(client)
      if (type === 'overdue') await sendOverdueNotice(client)
      if (type === 'suspend') await sendSuspensionNotice(client)
      toast.success('Email enviado a ' + client.email)
    } catch { toast.error('Error al enviar email. Verificá tu configuración de EmailJS.') }
    finally { setSending(null) }
  }

  const suspend = async () => {
    if (!confirm(`¿Suspender el sitio de ${client.name}? Se le enviará un aviso por email.`)) return
    try {
      await updateClient(client.id, { payment_status:'suspended' })
      await sendSuspensionNotice(client)
      toast.success('Cliente suspendido y email enviado')
      onUpdate()
    } catch { toast.error('Error al suspender') }
  }

  const reactivate = async () => {
    try {
      await updateClient(client.id, { payment_status:'active' })
      toast.success('Cliente reactivado')
      onUpdate()
    } catch { toast.error('Error') }
  }

  const handleAddNote = async () => {
    if (!note.trim()) return
    setAddingNote(true)
    try {
      const n = await addNote(client.id, note.trim())
      setNotes(prev => [n, ...prev])
      setNote('')
      toast.success('Nota guardada')
    } catch { toast.error('Error al guardar nota') }
    finally { setAddingNote(false) }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId)
      setNotes(prev => prev.filter(n => n.id !== noteId))
    } catch { toast.error('Error') }
  }

  const isOverdue = client.payment_due_date && isPast(parseISO(client.payment_due_date))
  const daysUntil = client.payment_due_date ? differenceInDays(parseISO(client.payment_due_date), new Date()) : null

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto rounded-2xl"
        style={{ background:'#0A1525', border:'1px solid rgba(34,39,249,.22)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor:'rgba(255,255,255,.07)' }}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-black text-white">{client.name}</h2>
              {client.company && <p className="text-sm mt-0.5" style={{ color:'rgba(160,176,200,.5)' }}>{client.company}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge ${st.cls}`}>{st.label}</span>
              <button onClick={onClose} style={{ color:'rgba(160,176,200,.5)' }}><X size={18}/></button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">

          {/* Info */}
          <div className="grid grid-cols-2 gap-3">
            {[
              ['Email',    client.email],
              ['Teléfono', client.phone || '—'],
              ['Sitio',    client.site_url],
            ].map(([label, val]) => (
              <div key={label} className="rounded-xl p-3" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'rgba(160,176,200,.42)' }}>{label}</p>
                {label === 'Sitio' && val
                  ? <a href={val} target="_blank" rel="noopener noreferrer"
                      className="text-sm font-semibold hover:underline flex items-center gap-1" style={{ color:'#60A5FA' }}>
                      <ExternalLink size={11}/>{val.replace(/^https?:\/\//,'')}
                    </a>
                  : <p className="text-sm font-semibold text-white truncate">{val || '—'}</p>
                }
              </div>
            ))}
            {client.has_maintenance && (
              <div className="rounded-xl p-3" style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)' }}>
                <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'rgba(160,176,200,.42)' }}>Mantenimiento</p>
                <p className="text-sm font-semibold text-white">
                  {client.currency} {Number(client.maintenance_price||0).toLocaleString('es-AR')}/mes
                </p>
              </div>
            )}
          </div>

          {/* Payment status */}
          {client.has_maintenance && (
            <div className="rounded-xl p-4 space-y-3"
              style={{
                background: isOverdue ? 'rgba(248,113,113,.07)' : 'rgba(34,39,249,.06)',
                border: `1px solid ${isOverdue ? 'rgba(248,113,113,.22)' : 'rgba(34,39,249,.15)'}`,
              }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:'rgba(160,176,200,.45)' }}>Próximo vencimiento</p>
                  <p className="font-bold text-white">
                    {client.payment_due_date
                      ? format(parseISO(client.payment_due_date), "d 'de' MMMM yyyy", { locale:es })
                      : 'No configurado'}
                  </p>
                  {daysUntil !== null && (
                    <p className="text-xs mt-0.5"
                      style={{ color: isOverdue ? '#f87171' : daysUntil <= 3 ? '#facc15' : 'rgba(160,176,200,.5)' }}>
                      {isOverdue ? `Vencido hace ${Math.abs(daysUntil)} días` : `Vence en ${daysUntil} días`}
                    </p>
                  )}
                </div>
                {client.payment_status === 'suspended'
                  ? <button onClick={reactivate}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ background:'rgba(74,222,128,.15)', color:'#4ade80', border:'1px solid rgba(74,222,128,.25)' }}>
                      <RotateCcw size={14}/>Reactivar
                    </button>
                  : <button onClick={suspend}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ background:'rgba(248,113,113,.13)', color:'#f87171', border:'1px solid rgba(248,113,113,.22)' }}>
                      <Ban size={14}/>Suspender sitio
                    </button>
                }
              </div>

              {/* Email actions */}
              <div className="pt-2 border-t flex flex-wrap gap-2" style={{ borderColor:'rgba(255,255,255,.07)' }}>
                <p className="text-xs font-bold w-full" style={{ color:'rgba(160,176,200,.45)' }}>Enviar aviso por email:</p>
                {[
                  { type:'warning', label:'Aviso 3 días antes', color:'#facc15' },
                  { type:'overdue', label:'Pago vencido',        color:'#f97316' },
                  { type:'suspend', label:'Suspensión',          color:'#f87171' },
                ].map(({ type, label, color }) => (
                  <button key={type}
                    disabled={sending === type}
                    onClick={() => sendEmail(type)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold"
                    style={{ background:`${color}12`, color, border:`1px solid ${color}22` }}>
                    {sending === type
                      ? <div className="w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin"/>
                      : <Send size={11}/>
                    }
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color:'rgba(160,176,200,.45)' }}>
              <StickyNote size={13}/>Notas internas
            </p>
            <div className="flex gap-2 mb-3">
              <input className="kv-input flex-1" placeholder="Agregar nota..." value={note}
                onChange={e => setNote(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleAddNote()}/>
              <button onClick={handleAddNote} disabled={addingNote || !note.trim()}
                className="btn btn-p px-4 py-2 text-sm flex-shrink-0">
                <Plus size={15}/>
              </button>
            </div>
            <div className="space-y-2 max-h-52 overflow-y-auto">
              {notes.length === 0
                ? <p className="text-xs text-center py-6" style={{ color:'rgba(160,176,200,.3)' }}>Sin notas todavía</p>
                : notes.map(n => (
                    <div key={n.id} className="flex items-start gap-3 p-3 rounded-xl group"
                      style={{ background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.06)' }}>
                      <p className="text-sm flex-1 leading-relaxed" style={{ color:'rgba(160,176,200,.82)' }}>{n.content}</p>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs" style={{ color:'rgba(160,176,200,.3)' }}>
                          {format(new Date(n.created_at), 'd MMM', { locale:es })}
                        </span>
                        <button onClick={() => handleDeleteNote(n.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{ color:'rgba(248,113,113,.6)' }}>
                          <X size={12}/>
                        </button>
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────
export default function AdminClients() {
  const [clients,     setClients]     = useState([])
  const [loading,     setLoading]     = useState(true)
  const [showForm,    setShowForm]    = useState(false)
  const [editing,     setEditing]     = useState(null)
  const [viewing,     setViewing]     = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [search,      setSearch]      = useState('')

  const load = () => {
    setLoading(true)
    getClients().then(setClients).catch(() => toast.error('Error cargando clientes')).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const handleCreate = async (data) => {
    try { await createClient(data); toast.success('Cliente creado'); setShowForm(false); load() }
    catch { toast.error('Error al crear') }
  }
  const handleUpdate = async (data) => {
    try { await updateClient(editing.id, data); toast.success('Actualizado'); setEditing(null); load() }
    catch { toast.error('Error al actualizar') }
  }
  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este cliente y todos sus datos?')) return
    try { await deleteClient(id); toast.success('Cliente eliminado'); load() }
    catch { toast.error('Error') }
  }

  const filtered = clients.filter(c => {
    const matchStatus = filterStatus === 'all' || c.payment_status === filterStatus
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.company?.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  const st = (s) => STATUSES.find(x => x.value === s) || STATUSES[0]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Clientes</h1>
          <p style={{ color:'rgba(160,176,200,.5)' }}>{clients.length} clientes registrados</p>
        </div>
        <button onClick={() => setShowForm(true)}
          className="btn btn-p flex items-center gap-2 px-5 py-3 text-sm"
          style={{ boxShadow:'0 0 20px rgba(34,39,249,.28)' }}>
          <Plus size={15}/>Nuevo cliente
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input className="kv-input max-w-xs" placeholder="Buscar cliente..." value={search}
          onChange={e => setSearch(e.target.value)}/>
        <div className="flex gap-2 flex-wrap">
          {[{ value:'all', label:'Todos' }, ...STATUSES].map(s => (
            <button key={s.value} onClick={() => setFilterStatus(s.value)}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${filterStatus === s.value ? 'btn btn-p' : 'btn btn-g'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center" style={{ color:'rgba(160,176,200,.38)' }}>
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"/>
          Cargando...
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-20 text-center rounded-2xl" style={{ border:'1px dashed rgba(34,39,249,.18)', color:'rgba(160,176,200,.38)' }}>
          <Users size={38} className="mx-auto mb-3 opacity-25"/>
          <p className="text-sm mb-3">{clients.length === 0 ? 'No hay clientes todavía' : 'Sin resultados para ese filtro'}</p>
          {clients.length === 0 && <button onClick={() => setShowForm(true)} className="btn btn-g px-4 py-2 text-sm">Agregar el primero</button>}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="tbl">
            <thead><tr>
              <th>Cliente</th><th>Sitio</th><th>Mantenimiento</th><th>Vencimiento</th><th>Estado</th><th></th>
            </tr></thead>
            <tbody>
              {filtered.map(c => {
                const isOverdue = c.payment_due_date && isPast(parseISO(c.payment_due_date)) && c.payment_status !== 'suspended'
                const days = c.payment_due_date ? differenceInDays(parseISO(c.payment_due_date), new Date()) : null
                return (
                  <tr key={c.id} className="cursor-pointer" onClick={() => setViewing(c)}>
                    <td>
                      <div className="font-semibold text-white">{c.name}</div>
                      <div className="text-xs" style={{ color:'rgba(160,176,200,.42)' }}>{c.company || c.email}</div>
                    </td>
                    <td onClick={e => e.stopPropagation()}>
                      {c.site_url
                        ? <a href={c.site_url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1 text-xs hover:underline" style={{ color:'#60A5FA' }}>
                            <ExternalLink size={11}/>{c.site_url.replace(/^https?:\/\//,'').slice(0,22)}
                          </a>
                        : <span className="text-xs" style={{ color:'rgba(160,176,200,.3)' }}>—</span>
                      }
                    </td>
                    <td>
                      {c.has_maintenance
                        ? <span className="text-sm font-semibold" style={{ color:'#4ade80' }}>
                            {c.currency} {Number(c.maintenance_price||0).toLocaleString('es-AR')}
                          </span>
                        : <span className="text-xs" style={{ color:'rgba(160,176,200,.3)' }}>—</span>
                      }
                    </td>
                    <td>
                      {c.payment_due_date
                        ? <div>
                            <span className="text-xs text-white">{format(parseISO(c.payment_due_date), 'd MMM yyyy', { locale:es })}</span>
                            {days !== null && (
                              <div className="text-xs mt-0.5" style={{ color: isOverdue ? '#f87171' : days <= 3 ? '#facc15' : 'rgba(160,176,200,.38)' }}>
                                {isOverdue ? `Vencido hace ${Math.abs(days)}d` : `${days}d`}
                              </div>
                            )}
                          </div>
                        : <span className="text-xs" style={{ color:'rgba(160,176,200,.3)' }}>—</span>
                      }
                    </td>
                    <td><span className={`badge ${st(c.payment_status).cls}`}>{st(c.payment_status).label}</span></td>
                    <td onClick={e => e.stopPropagation()}>
                      <div className="flex gap-2">
                        <button onClick={() => { setEditing(c); setShowForm(false) }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center btn btn-g">
                          <Pencil size={13}/>
                        </button>
                        <button onClick={() => handleDelete(c.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background:'rgba(248,113,113,.1)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171' }}>
                          <Trash2 size={13}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {showForm    && <ClientForm onSave={handleCreate} onCancel={() => setShowForm(false)}/>}
      {editing     && <ClientForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)}/>}
      {viewing     && <ClientDetail client={viewing} onClose={() => { setViewing(null); load() }} onUpdate={() => { load(); setViewing(null) }}/>}
    </div>
  )
}
