import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, Briefcase, Star } from 'lucide-react'
import { getServices, createService, updateService, deleteService } from '../../lib/db'
import toast from 'react-hot-toast'

const ICONS = ['Globe','ShoppingCart','Smartphone','Database','Layers','Zap']
const CURRENCIES = ['ARS','USD','EUR']
const EMPTY = { icon:'Globe', name:'', description:'', price_from:'', price_to:'', currency:'ARS', features:'', highlighted:false, order_index:0 }

function ServiceForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial, features: Array.isArray(initial.features) ? initial.features.join('\n') : initial.features||'' } : EMPTY)
  const [saving, setSaving] = useState(false)
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await onSave({
        ...form,
        price_from: form.price_from ? Number(form.price_from) : null,
        price_to:   form.price_to   ? Number(form.price_to)   : null,
        features: typeof form.features === 'string' ? form.features.split('\n').map(s=>s.trim()).filter(Boolean) : form.features,
        order_index: Number(form.order_index)||0,
      })
    } finally { setSaving(false) }
  }

  return (
    <div className="card p-7 mb-6" style={{ borderColor:'rgba(34,39,249,.22)' }}>
      <h2 className="text-lg font-black text-white mb-6">{initial ? 'Editar servicio' : 'Nuevo servicio'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Nombre *</label>
            <input className="inp" placeholder="Landing Page" value={form.name} onChange={e => set('name', e.target.value)} required/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Ícono</label>
            <select className="inp" value={form.icon} onChange={e => set('icon', e.target.value)}>
              {ICONS.map(i => <option key={i}>{i}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Descripción *</label>
          <textarea className="kv-input resize-none" rows={3} value={form.description} onChange={e => set('description', e.target.value)} required/>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[['Precio desde','price_from','150000'],['Precio hasta','price_to','300000 (opc)']].map(([l,k,ph]) => (
            <div key={k}>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>{l}</label>
              <input type="number" className="inp" placeholder={ph} value={form[k]} onChange={e => set(k, e.target.value)}/>
            </div>
          ))}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Moneda</label>
            <select className="inp" value={form.currency} onChange={e => set('currency', e.target.value)}>
              {CURRENCIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Características (una por línea)</label>
          <textarea className="kv-input resize-none" rows={5}
            placeholder={"Diseño responsive\nSEO optimizado\nEntrega en 7 días"}
            value={form.features} onChange={e => set('features', e.target.value)}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Orden</label>
            <input type="number" className="inp" value={form.order_index} onChange={e => set('order_index', e.target.value)}/>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.highlighted} onChange={e => set('highlighted', e.target.checked)} className="w-4 h-4 accent-blue-500"/>
              <span className="text-sm font-medium" style={{ color:'rgba(160,176,200,.75)' }}>Destacar (Más popular)</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn btn-p flex items-center gap-2 px-6 py-3 text-sm disabled:opacity-50">
            <Save size={14}/>{saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-g flex items-center gap-2 px-5 py-3 text-sm">
            <X size={14}/>Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AdminServices() {
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [loading,  setLoading]  = useState(true)

  const load = () => { setLoading(true); getServices().then(setServices).catch(()=>toast.error('Error')).finally(()=>setLoading(false)) }
  useEffect(()=>{ load() },[])

  const handleCreate = async (d) => { try { await createService(d); toast.success('Servicio creado'); setShowForm(false); load() } catch { toast.error('Error') } }
  const handleUpdate = async (d) => { try { await updateService(editing.id, d); toast.success('Actualizado'); setEditing(null); load() } catch { toast.error('Error') } }
  const handleDelete = async (id) => { if (!confirm('¿Eliminar?')) return; try { await deleteService(id); toast.success('Eliminado'); load() } catch { toast.error('Error') } }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Servicios</h1>
          <p style={{ color:'rgba(160,176,200,.5)' }}>{services.length} servicios</p>
        </div>
        {!showForm && !editing && (
          <button onClick={() => setShowForm(true)} className="btn btn-p flex items-center gap-2 px-5 py-3 text-sm">
            <Plus size={15}/>Nuevo servicio
          </button>
        )}
      </div>

      {(showForm || editing) && (
        <ServiceForm initial={editing||null} onSave={editing ? handleUpdate : handleCreate} onCancel={() => { setShowForm(false); setEditing(null) }}/>
      )}

      {loading ? (
        <div className="py-20 text-center"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"/></div>
      ) : services.length === 0 ? (
        <div className="py-20 text-center rounded-2xl" style={{ border:'1px dashed rgba(34,39,249,.18)', color:'rgba(160,176,200,.38)' }}>
          <Briefcase size={38} className="mx-auto mb-3 opacity-25"/>
          <p className="text-sm mb-3">No hay servicios todavía</p>
          <button onClick={() => setShowForm(true)} className="btn btn-g px-4 py-2 text-sm">Agregar el primero</button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {services.map(s => (
            <div key={s.id} className="card flex items-center gap-4 p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(34,39,249,.13)', border:'1px solid rgba(34,39,249,.2)' }}>
                <Briefcase size={17} style={{ color:'#60A5FA' }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{s.name}</span>
                  {s.highlighted && <Star size={12} fill="#facc15" style={{ color:'#facc15' }}/>}
                </div>
                <span className="text-xs" style={{ color:'#4ade80' }}>
                  {s.currency} {s.price_from?.toLocaleString('es-AR')}{s.price_to ? ` – ${s.price_to.toLocaleString('es-AR')}` : '+'}
                </span>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(s); setShowForm(false) }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center btn btn-g"><Pencil size={13}/></button>
                <button onClick={() => handleDelete(s.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background:'rgba(248,113,113,.1)', border:'1px solid rgba(248,113,113,.2)', color:'#f87171' }}>
                  <Trash2 size={13}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
