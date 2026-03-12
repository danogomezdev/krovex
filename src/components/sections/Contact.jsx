import { useState } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle, MessageSquare, Clock, Zap } from 'lucide-react'
import { sendContactEmail } from '../../lib/email'

export default function Contact() {
  const [form,setForm]=useState({name:'',email:'',service:'',message:''})
  const [sending,setSending]=useState(false)
  const [sent,setSent]=useState(false)
  const [err,setErr]=useState('')
  const set=(k,v)=>setForm(f=>({...f,[k]:v}))

  const handleSubmit=async(e)=>{
    e.preventDefault();setSending(true);setErr('')
    try{await sendContactEmail(form);setSent(true);setForm({name:'',email:'',service:'',message:''})}
    catch{setErr('Hubo un error. Escribinos directo a hello@krovex.dev')}
    finally{setSending(false)}
  }

  return (
    <section id="contacto" style={{
      position:'relative',padding:'120px 0',overflow:'hidden',
      background:'linear-gradient(180deg,#07090F 0%,#0C1018 60%,#07090F 100%)',
    }}>
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.45}}/>
      <div style={{position:'absolute',bottom:'-5%',left:'50%',transform:'translateX(-50%)',width:800,height:400,background:'radial-gradient(ellipse,rgba(37,99,235,.09) 0%,transparent 65%)',pointerEvents:'none'}}/>

      <div style={{maxWidth:1180,margin:'0 auto',padding:'0 28px',position:'relative',zIndex:1}}>
        {/* Header */}
        <div style={{textAlign:'center',marginBottom:72}}>
          <span className="pill" style={{marginBottom:18,display:'inline-flex'}}><MessageSquare size={11}/>Contacto</span>
          <h2 className="syne" style={{fontSize:'clamp(34px,5vw,54px)',fontWeight:800,letterSpacing:'-.025em',color:'white',marginBottom:16}}>
            Hablemos de tu <span className="grad-cyan">proyecto</span>
          </h2>
          <p style={{color:'rgba(148,163,184,.62)',fontSize:17,maxWidth:460,margin:'0 auto'}}>
            Respondemos en menos de 24 horas. Sin vueltas.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1.6fr',gap:28,alignItems:'start'}} className="grid-cols-1 lg:grid-cols-contact">

          {/* Left info */}
          <div style={{display:'flex',flexDirection:'column',gap:16}}>
            {[
              {icon:Mail,label:'Email',val:'hello@krovex.dev',sub:'Respondemos en <24hs'},
              {icon:Phone,label:'WhatsApp',val:'+54 9 XXX XXX XXXX',sub:'Lunes a Viernes, 9:00–18:00'},
              {icon:MapPin,label:'Ubicación',val:'Argentina',sub:'Trabajo remoto · Mundo'},
            ].map(({icon:Icon,label,val,sub})=>(
              <div key={label} className="card-glass" style={{padding:'20px 22px',display:'flex',gap:16,alignItems:'flex-start'}}>
                <div style={{width:40,height:40,borderRadius:12,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(99,179,237,.1)',border:'1px solid rgba(99,179,237,.2)'}}>
                  <Icon size={16} style={{color:'#63B3ED'}}/>
                </div>
                <div>
                  <p style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(148,163,184,.42)',marginBottom:3}}>{label}</p>
                  <p style={{fontWeight:700,color:'white',fontSize:14}}>{val}</p>
                  <p style={{fontSize:12,color:'rgba(148,163,184,.45)',marginTop:2}}>{sub}</p>
                </div>
              </div>
            ))}

            {/* Trust bullets */}
            <div className="card-glass" style={{padding:'20px 22px'}}>
              <p style={{fontSize:11,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(148,163,184,.4)',marginBottom:14}}>Por qué elegirnos</p>
              {[
                [Zap,'Entregas a tiempo, siempre'],
                [CheckCircle,'Código limpio y documentado'],
                [Clock,'Soporte post-entrega incluido'],
              ].map(([Icon,txt])=>(
                <div key={txt} style={{display:'flex',alignItems:'center',gap:10,marginBottom:10}}>
                  <Icon size={14} style={{color:'#63B3ED',flexShrink:0}}/>
                  <span style={{fontSize:13.5,color:'rgba(148,163,184,.72)'}}>{txt}</span>
                </div>
              ))}
              <div style={{marginTop:14}}>
                <span className="badge badge-green">
                  <span className="pulse-dot" style={{background:'#4ade80'}}/>
                  Disponible para proyectos
                </span>
              </div>
            </div>
          </div>

          {/* Right form */}
          <div className="card-glass" style={{padding:'40px 36px'}}>
            {sent?(
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'48px 0',gap:16,textAlign:'center'}}>
                <div style={{width:60,height:60,borderRadius:'50%',background:'rgba(74,222,128,.1)',border:'1px solid rgba(74,222,128,.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <CheckCircle size={28} style={{color:'#4ade80'}}/>
                </div>
                <div>
                  <h3 className="syne" style={{fontSize:22,fontWeight:800,color:'white',marginBottom:8}}>¡Mensaje enviado!</h3>
                  <p style={{color:'rgba(148,163,184,.6)',fontSize:15}}>Te respondemos en menos de 24 horas.</p>
                </div>
                <button onClick={()=>setSent(false)} className="btn-outline" style={{marginTop:8}}>Enviar otro mensaje</button>
              </div>
            ):(
              <form onSubmit={handleSubmit}>
                <h3 className="syne" style={{fontSize:20,fontWeight:800,color:'white',marginBottom:28}}>Contanos tu proyecto</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  {[['Nombre *','text','Tu nombre','name',true],['Email *','email','tu@email.com','email',true]].map(([l,t,ph,k,r])=>(
                    <div key={k}>
                      <label className="kv-label">{l}</label>
                      <input type={t} className="kv-input" placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} required={r}/>
                    </div>
                  ))}
                </div>
                <div style={{marginBottom:16}}>
                  <label className="kv-label">Servicio de interés</label>
                  <select className="kv-input" value={form.service} onChange={e=>set('service',e.target.value)}>
                    <option value="">Seleccioná un servicio...</option>
                    {['Landing Page','Sitio Web Completo','E-Commerce','Sistema / App Web','Otro'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
                <div style={{marginBottom:24}}>
                  <label className="kv-label">Mensaje *</label>
                  <textarea className="kv-input" rows={5} style={{resize:'none'}}
                    placeholder="Contanos sobre tu proyecto: qué necesitás, el plazo que tenés en mente y cualquier detalle relevante..."
                    value={form.message} onChange={e=>set('message',e.target.value)} required/>
                </div>
                {err&&<div style={{marginBottom:16,padding:'12px 16px',background:'rgba(248,113,113,.08)',border:'1px solid rgba(248,113,113,.2)',borderRadius:10,fontSize:14,color:'#f87171'}}>{err}</div>}
                <button type="submit" disabled={sending} className="btn-cta" style={{width:'100%',justifyContent:'center',fontSize:16,padding:'16px',opacity:sending?.6:1}}>
                  {sending
                    ?<><div style={{width:16,height:16,border:'2px solid rgba(255,255,255,.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>Enviando...</>
                    :<><Send size={16}/>Enviar mensaje</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
