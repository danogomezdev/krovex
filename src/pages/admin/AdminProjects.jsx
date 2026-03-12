import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save, FolderOpen, Star } from 'lucide-react'
import { getProjects, createProject, updateProject, deleteProject } from '../../lib/db'
import toast from 'react-hot-toast'

const CATS = ['Landing Page','E-Commerce','App Web','Sistema','Otro']
const EMPTY = { title:'', category:'Landing Page', description:'', long_description:'', tech:'', image_url:'', url:'', github_url:'', featured:false }

function ProjectForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...initial, tech: Array.isArray(initial.tech) ? initial.tech.join(', ') : initial.tech } : EMPTY)
  const [saving, setSaving] = useState(false)
  const set = (k,v) => setForm(f => ({ ...f, [k]:v }))

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      await onSave({ ...form, tech: typeof form.tech === 'string' ? form.tech.split(',').map(s=>s.trim()).filter(Boolean) : form.tech })
    } finally { setSaving(false) }
  }

  return (
    <div className="card p-7 mb-6" style={{ borderColor:'rgba(34,39,249,.22)' }}>
      <h2 className="text-lg font-black text-white mb-6">{initial ? 'Editar proyecto' : 'Nuevo proyecto'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Título *</label>
            <input className="kv-input" placeholder="Nombre del proyecto" value={form.title} onChange={e => set('title', e.target.value)} required/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Categoría</label>
            <select className="kv-input" value={form.category} onChange={e => set('category', e.target.value)}>
              {CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Descripción corta *</label>
          <input className="kv-input" value={form.description} onChange={e => set('description', e.target.value)} required/>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Descripción completa (modal)</label>
          <textarea className="kv-input resize-none" rows={3} value={form.long_description} onChange={e => set('long_description', e.target.value)}/>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Tecnologías (separadas por coma)</label>
          <input className="kv-input" placeholder="React, Node.js, PostgreSQL" value={form.tech} onChange={e => set('tech', e.target.value)}/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>URL del proyecto</label>
            <input className="kv-input" placeholder="https://..." value={form.url} onChange={e => set('url', e.target.value)}/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>URL imagen</label>
            <input className="kv-input" placeholder="https://imagen.jpg" value={form.image_url} onChange={e => set('image_url', e.target.value)}/>
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} className="w-4 h-4 accent-blue-500"/>
          <span className="text-sm font-medium" style={{ color:'rgba(160,176,200,.75)' }}>Marcar como destacado</span>
        </label>
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2 px-6 py-3 text-sm disabled:opacity-50">
            <Save size={14}/>{saving ? 'Guardando...' : 'Guardar'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary flex items-center gap-2 px-5 py-3 text-sm">
            <X size={14}/>Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editing,  setEditing]  = useState(null)
  const [loading,  setLoading]  = useState(true)

  const load = () => { setLoading(true); getProjects().then(setProjects).catch(()=>toast.error('Error')).finally(()=>setLoading(false)) }
  useEffect(()=>{ load() },[])

  const handleCreate = async (d) => { try { await createProject(d); toast.success('Proyecto creado'); setShowForm(false); load() } catch { toast.error('Error') } }
  const handleUpdate = async (d) => { try { await updateProject(editing.id, d); toast.success('Actualizado'); setEditing(null); load() } catch { toast.error('Error') } }
  const handleDelete = async (id) => { if (!confirm('¿Eliminar?')) return; try { await deleteProject(id); toast.success('Eliminado'); load() } catch { toast.error('Error') } }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Portfolio</h1>
          <p style={{ color:'rgba(160,176,200,.5)' }}>{projects.length} proyectos</p>
        </div>
        {!showForm && !editing && (
          <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 px-5 py-3 text-sm">
            <Plus size={15}/>Nuevo proyecto
          </button>
        )}
      </div>

      {(showForm || editing) && (
        <ProjectForm
          initial={editing || null}
          onSave={editing ? handleUpdate : handleCreate}
          onCancel={() => { setShowForm(false); setEditing(null) }}
        />
      )}

      {loading ? (
        <div className="py-20 text-center" style={{ color:'rgba(160,176,200,.38)' }}>
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-3"/>
        </div>
      ) : projects.length === 0 ? (
        <div className="py-20 text-center rounded-2xl" style={{ border:'1px dashed rgba(34,39,249,.18)', color:'rgba(160,176,200,.38)' }}>
          <FolderOpen size={38} className="mx-auto mb-3 opacity-25"/>
          <p className="text-sm mb-3">No hay proyectos todavía</p>
          <button onClick={() => setShowForm(true)} className="btn-secondary px-4 py-2 text-sm">Agregar el primero</button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {projects.map(p => (
            <div key={p.id} className="card flex items-center gap-4 p-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background:'rgba(34,39,249,.13)', border:'1px solid rgba(34,39,249,.2)' }}>
                <FolderOpen size={17} style={{ color:'#60A5FA' }}/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white truncate">{p.title}</span>
                  {p.featured && <Star size={12} fill="#facc15" style={{ color:'#facc15', flexShrink:0 }}/>}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="badge badge-blue text-xs">{p.category}</span>
                  <span className="text-xs truncate" style={{ color:'rgba(160,176,200,.45)' }}>{p.description?.slice(0,55)}...</span>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(p); setShowForm(false) }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center btn-secondary"><Pencil size={13}/></button>
                <button onClick={() => handleDelete(p.id)}
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
