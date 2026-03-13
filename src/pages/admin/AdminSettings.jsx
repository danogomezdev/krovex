import { useState, useEffect } from 'react'
import { Save, Globe, Mail, Settings } from 'lucide-react'
import { getSiteConfig, updateSiteConfig } from '../../lib/db'
import toast from 'react-hot-toast'

const DEFAULTS = {
  hero_subtitle:'Soluciones digitales profesionales que impulsan tu negocio.',
  contact_email:'hello@krovex.dev', contact_phone:'+54 9 XXX XXX XXXX', contact_location:'Argentina',
  social_github:'#', social_linkedin:'#', social_instagram:'#',
  stats_projects:'50+', stats_satisfaction:'100%', stats_support:'24/7',
  emailjs_service_id:'', emailjs_template_contact:'', emailjs_template_warning:'',
  emailjs_template_overdue:'', emailjs_template_suspend:'', emailjs_public_key:'',
}

export default function AdminSettings() {
  const [config,  setConfig]  = useState(DEFAULTS)
  const [saving,  setSaving]  = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteConfig().then(d => setConfig(p => ({ ...p, ...d }))).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const set = (k,v) => setConfig(c => ({ ...c, [k]:v }))
  const handleSave = async () => {
    setSaving(true)
    try { await updateSiteConfig(config); toast.success('Configuración guardada') }
    catch { toast.error('Error al guardar') }
    finally { setSaving(false) }
  }

  if (loading) return (
    <div className="py-20 text-center"><div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"/></div>
  )

  const Section = ({ icon:Icon, title, children }) => (
    <div className="card p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ background:'rgba(34,39,249,.13)', border:'1px solid rgba(34,39,249,.2)' }}>
          <Icon size={15} style={{ color:'#60A5FA' }}/>
        </div>
        <h2 className="font-black text-white">{title}</h2>
      </div>
      {children}
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-white mb-1">Configuración</h1>
          <p style={{ color:'rgba(160,176,200,.5)' }}>Textos, contacto y EmailJS</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="btn btn-p flex items-center gap-2 px-5 py-3 text-sm disabled:opacity-50">
          <Save size={14}/>{saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      <div className="space-y-5">
        <Section icon={Globe} title="Sitio público">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>Subtítulo del hero</label>
              <textarea className="kv-input resize-none" rows={2} value={config.hero_subtitle} onChange={e => set('hero_subtitle', e.target.value)}/>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[['stats_projects','Proyectos'],['stats_satisfaction','Satisfacción'],['stats_support','Soporte']].map(([k,l]) => (
                <div key={k}>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>{l}</label>
                  <input className="inp" value={config[k]} onChange={e => set(k, e.target.value)}/>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section icon={Mail} title="Contacto y redes">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[['contact_email','Email','hello@krovex.dev'],['contact_phone','WhatsApp','+54 9...'],
              ['contact_location','Ubicación','Argentina'],['social_github','GitHub URL','https://github.com/...'],
              ['social_linkedin','LinkedIn URL','https://linkedin.com/...'],['social_instagram','Instagram URL','https://instagram.com/...'],
            ].map(([k,l,ph]) => (
              <div key={k}>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>{l}</label>
                <input className="inp" placeholder={ph} value={config[k]} onChange={e => set(k, e.target.value)}/>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={Settings} title="EmailJS — Claves API">
          <div className="rounded-lg p-3 mb-4 text-xs" style={{ background:'rgba(250,204,21,.06)', border:'1px solid rgba(250,204,21,.18)', color:'#facc15' }}>
            Registrate gratis en emailjs.com → creá 4 templates (contacto, aviso, vencido, suspensión) y copiá las IDs acá.
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[['emailjs_service_id','Service ID','service_xxxxxxx'],
              ['emailjs_public_key','Public Key','tu_public_key'],
              ['emailjs_template_contact','Template: Contacto (sitio)','template_xxxxxxx'],
              ['emailjs_template_warning','Template: Aviso 3 días antes','template_xxxxxxx'],
              ['emailjs_template_overdue','Template: Pago vencido','template_xxxxxxx'],
              ['emailjs_template_suspend','Template: Suspensión','template_xxxxxxx'],
            ].map(([k,l,ph]) => (
              <div key={k}>
                <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.52)' }}>{l}</label>
                <input className="kv-input font-mono text-xs" placeholder={ph} value={config[k]} onChange={e => set(k, e.target.value)}/>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Floating save */}
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={handleSave} disabled={saving}
          className="btn btn-p flex items-center gap-2 px-5 py-3 text-sm disabled:opacity-50"
          style={{ boxShadow:'0 8px 28px rgba(34,39,249,.45)' }}>
          <Save size={15}/>{saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>
    </div>
  )
}
