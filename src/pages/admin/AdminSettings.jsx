import { useState, useEffect, useCallback } from 'react'
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

const fieldStyle = {
  width:'100%',
  background:'rgba(255,255,255,.06)',
  border:'1px solid rgba(255,255,255,.1)',
  borderRadius:6,
  padding:'10px 14px',
  color:'#F8FAFF',
  fontFamily:'DM Sans, sans-serif',
  fontSize:14,
  outline:'none',
  resize:'vertical',
}

export default function AdminSettings() {
  const [config, setConfig] = useState(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteConfig()
      .then(d => setConfig(p => ({ ...p, ...d })))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // useCallback para evitar que el input pierda el foco al re-render
  const set = useCallback((k, v) => {
    setConfig(c => ({ ...c, [k]: v }))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try { await updateSiteConfig(config); toast.success('Configuración guardada') }
    catch { toast.error('Error al guardar') }
    finally { setSaving(false) }
  }

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', padding:80 }}>
      <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"/>
    </div>
  )

  const Section = ({ icon: Icon, title, children }) => (
    <div style={{ background:'var(--bg1)', border:'1px solid var(--b0)', borderRadius:12, padding:24, marginBottom:20 }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <div style={{ width:36, height:36, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(34,39,249,.13)', border:'1px solid rgba(34,39,249,.2)' }}>
          <Icon size={15} style={{ color:'#60A5FA' }}/>
        </div>
        <h2 style={{ fontWeight:700, fontSize:16, color:'var(--t1)' }}>{title}</h2>
      </div>
      {children}
    </div>
  )

  const Field = ({ label, k, placeholder, mono, rows }) => (
    <div>
      <label style={{ display:'block', fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'rgba(160,176,200,.52)', marginBottom:8 }}>{label}</label>
      {rows
        ? <textarea
            rows={rows}
            style={{ ...fieldStyle, fontFamily: mono ? 'DM Mono, monospace' : 'DM Sans, sans-serif', fontSize: mono ? 12 : 14 }}
            placeholder={placeholder}
            value={config[k]}
            onChange={e => set(k, e.target.value)}
          />
        : <input
            style={{ ...fieldStyle, fontFamily: mono ? 'DM Mono, monospace' : 'DM Sans, sans-serif', fontSize: mono ? 12 : 14 }}
            placeholder={placeholder}
            value={config[k]}
            onChange={e => set(k, e.target.value)}
          />
      }
    </div>
  )

  return (
    <div style={{ paddingBottom: 100 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:28, fontWeight:800, color:'var(--t1)', marginBottom:4 }}>Configuración</h1>
          <p style={{ color:'rgba(160,176,200,.5)', fontSize:14 }}>Textos, contacto y EmailJS</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn btn-p" style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 22px', fontSize:14 }}>
          <Save size={14}/>{saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      <Section icon={Globe} title="Sitio público">
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <Field label="Subtítulo del hero" k="hero_subtitle" rows={2}/>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
            <Field label="Proyectos" k="stats_projects" placeholder="50+"/>
            <Field label="Satisfacción" k="stats_satisfaction" placeholder="100%"/>
            <Field label="Soporte" k="stats_support" placeholder="24/7"/>
          </div>
        </div>
      </Section>

      <Section icon={Mail} title="Contacto y redes">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14 }}>
          <Field label="Email" k="contact_email" placeholder="hello@krovex.dev"/>
          <Field label="WhatsApp" k="contact_phone" placeholder="+54 9..."/>
          <Field label="Ubicación" k="contact_location" placeholder="Argentina"/>
          <Field label="GitHub URL" k="social_github" placeholder="https://github.com/..."/>
          <Field label="LinkedIn URL" k="social_linkedin" placeholder="https://linkedin.com/..."/>
          <Field label="Instagram URL" k="social_instagram" placeholder="https://instagram.com/..."/>
        </div>
      </Section>

      <Section icon={Settings} title="EmailJS — Claves API">
        <div style={{ background:'rgba(250,204,21,.06)', border:'1px solid rgba(250,204,21,.18)', borderRadius:8, padding:'12px 16px', marginBottom:16, fontSize:12, color:'#facc15' }}>
          Registrate gratis en emailjs.com → creá 4 templates y copiá las IDs acá.
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:14 }}>
          <Field label="Service ID" k="emailjs_service_id" placeholder="service_xxxxxxx" mono/>
          <Field label="Public Key" k="emailjs_public_key" placeholder="tu_public_key" mono/>
          <Field label="Template: Contacto" k="emailjs_template_contact" placeholder="template_xxxxxxx" mono/>
          <Field label="Template: Aviso 3 días" k="emailjs_template_warning" placeholder="template_xxxxxxx" mono/>
          <Field label="Template: Pago vencido" k="emailjs_template_overdue" placeholder="template_xxxxxxx" mono/>
          <Field label="Template: Suspensión" k="emailjs_template_suspend" placeholder="template_xxxxxxx" mono/>
        </div>
      </Section>

      {/* Floating save */}
      <div style={{ position:'fixed', bottom:24, right:24, zIndex:50 }}>
        <button onClick={handleSave} disabled={saving} className="btn btn-p"
          style={{ display:'flex', alignItems:'center', gap:8, padding:'11px 22px', fontSize:14, boxShadow:'0 8px 28px rgba(34,39,249,.45)' }}>
          <Save size={15}/>{saving ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>
    </div>
  )
}
