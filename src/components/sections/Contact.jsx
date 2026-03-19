import { useState } from 'react'
import { Mail, MapPin, Send, CheckCircle, Terminal, Zap, Shield, Clock } from 'lucide-react'
import { sendContactEmail } from '../../lib/email'

export default function Contact() {
  const [form,setForm]=useState({name:'',email:'',service:'',message:''})
  const [sending,setSending]=useState(false)
  const [sent,setSent]=useState(false)
  const [err,setErr]=useState('')
  const set=(k,v)=>setForm(f=>({...f,[k]:v}))

  const handleSubmit=async e=>{
    e.preventDefault();setSending(true);setErr('')
    try{ await sendContactEmail(form); setSent(true); setForm({name:'',email:'',service:'',message:''}) }
    catch{ setErr('Error al enviar. Escribinos a hello@krovex.dev') }
    finally{ setSending(false) }
  }

  return (
    <section id="contacto" style={{position:'relative',padding:'120px 0',background:'var(--bg0)',overflow:'hidden'}}>
      <div className="blueprint" style={{position:'absolute',inset:0,opacity:.7}}/>
      <div style={{position:'absolute',bottom:'-10%',left:'50%',transform:'translateX(-50%)',width:700,height:400,background:'radial-gradient(ellipse,rgba(37,99,235,.07) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(50px)'}}/>

      <div style={{maxWidth:1160,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>
        {/* Header */}
        <div style={{marginBottom:56}}>
          <span className="pill" style={{marginBottom:16,display:'inline-flex'}}><Terminal size={10}/>Contacto</span>
          <h2 className="bebas gw" style={{fontSize:'clamp(40px,6vw,68px)',lineHeight:.9}}>
            Hablemos de<br/><span className="gk">tu proyecto</span>
          </h2>
        </div>
        <div className="divider" style={{marginBottom:48}}/>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1.7fr',gap:24,alignItems:'start'}} className="lg:grid-contact">
          <style>{`@media(max-width:900px){.lg\\:grid-contact{grid-template-columns:1fr!important}}`}</style>

          {/* Left */}
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[
              {icon:Mail,   label:'Email',     val:'krovex.dev@gmail.com', sub:'Respondemos en <24hs'},
              {icon:MapPin, label:'Ubicación', val:'Argentina',        sub:'Trabajo remoto · Worldwide'},
            ].map(({icon:Icon,label,val,sub})=>(
              <div key={label} className="card-flat" style={{padding:'16px 18px',display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:36,height:36,borderRadius:4,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(37,99,235,.1)',border:'1px solid rgba(77,166,255,.2)'}}>
                  <Icon size={14} style={{color:'var(--kblue3)'}}/>
                </div>
                <div>
                  <p className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:3}}>{label}</p>
                  <p style={{fontWeight:600,color:'var(--t1)',fontSize:14}}>{val}</p>
                  <p className="mono" style={{fontSize:11,color:'var(--t4)',marginTop:2}}>{sub}</p>
                </div>
              </div>
            ))}

            <div className="card-flat" style={{padding:'18px 18px'}}>
              <p className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:14}}>Por qué Krovex</p>
              {[[Zap,'Entregas a tiempo, siempre'],[Shield,'Código limpio y documentado'],[Clock,'Soporte post-entrega incluido']].map(([Icon,t])=>(
                <div key={t} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                  <Icon size={12} style={{color:'var(--kblue3)',flexShrink:0}}/>
                  <span style={{fontSize:13,color:'var(--t3)'}}>{t}</span>
                </div>
              ))}
              <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--b0)'}}>
                <span className="badge b-green">
                  <span className="pdot" style={{background:'var(--green)'}}/>Disponible
                </span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="card-flat" style={{padding:'clamp(24px,4vw,36px)'}}>
            {sent ? (
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',padding:'48px 0',gap:14,textAlign:'center'}}>
                <div style={{width:52,height:52,borderRadius:4,background:'rgba(52,211,153,.08)',border:'1px solid rgba(52,211,153,.2)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <CheckCircle size={24} style={{color:'var(--green)'}}/>
                </div>
                <div>
                  <h3 className="bebas" style={{fontSize:26,color:'var(--t1)',letterSpacing:'.06em',marginBottom:6}}>Mensaje recibido</h3>
                  <p style={{color:'var(--t3)',fontSize:14}}>Te respondemos en menos de 24 horas.</p>
                </div>
                <button onClick={()=>setSent(false)} className="btn btn-g btn-sm" style={{marginTop:4,textTransform:'uppercase',letterSpacing:'.06em',fontSize:12}}>Enviar otro</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{marginBottom:22,display:'flex',alignItems:'center',gap:10}}>
                  <Terminal size={14} style={{color:'var(--kblue3)'}}/>
                  <span className="mono" style={{fontSize:11,color:'var(--t4)',letterSpacing:'.1em',textTransform:'uppercase'}}>nuevo_proyecto.init()</span>
                </div>

                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                  {[['Nombre *','text','Tu nombre','name',true],['Email *','email','tu@email.com','email',true]].map(([l,t,ph,k,r])=>(
                    <div key={k}>
                      <label className="lbl">{l}</label>
                      <input type={t} className="inp" placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} required={r}/>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:14}}>
                  <label className="lbl">Servicio</label>
                  <select className="inp" value={form.service} onChange={e=>set('service',e.target.value)}>
                    <option value="">Seleccioná...</option>
                    {['Landing Page','Sitio Web Completo','E-Commerce','Sistema / App Web','Otro'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:22}}>
                  <label className="lbl">Mensaje *</label>
                  <textarea className="inp" rows={5} style={{resize:'none'}}
                    placeholder="Contanos tu proyecto: qué necesitás, en qué plazo y cualquier detalle relevante..."
                    value={form.message} onChange={e=>set('message',e.target.value)} required/>
                </div>
                {err&&<div style={{marginBottom:14,padding:'10px 14px',background:'rgba(248,113,113,.06)',border:'1px solid rgba(248,113,113,.18)',borderRadius:4,fontSize:13,color:'var(--red)'}}>{err}</div>}
                <button type="submit" disabled={sending} className="btn btn-p" style={{width:'100%',justifyContent:'center',fontSize:12,padding:'14px',textTransform:'uppercase',letterSpacing:'.08em',opacity:sending?.6:1}}>
                  {sending
                    ?<><div style={{width:14,height:14,border:'2px solid rgba(255,255,255,.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>Enviando...</>
                    :<><Send size={14}/>Enviar mensaje</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
