import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import KrovexLogo from '../components/ui/KrovexLogo'
import { Lock, Mail, Eye, EyeOff, Terminal } from 'lucide-react'

export default function AdminLogin() {
  const [email,setEmail]=useState('')
  const [pass,setPass]=useState('')
  const [show,setShow]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();setLoading(true);setError('')
    try{ await login(email,pass); navigate('/admin/dashboard') }
    catch{ setError('Credenciales incorrectas.') }
    finally{ setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden',background:'var(--bg0)'}}>
      <div className="blueprint" style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',top:'30%',left:'50%',transform:'translate(-50%,-50%)',width:500,height:350,background:'radial-gradient(ellipse,rgba(37,99,235,.12) 0%,transparent 65%)',filter:'blur(40px)',pointerEvents:'none'}}/>

      <div style={{position:'relative',zIndex:10,width:'100%',maxWidth:400,padding:'0 24px'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:32}}>
          <KrovexLogo size={36} textSize="xl"/>
        </div>

        <div className="card-flat" style={{padding:'36px 32px'}}>
          <div style={{marginBottom:24}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <Terminal size={13} style={{color:'var(--kblue3)'}}/>
              <span className="mono" style={{fontSize:10,color:'var(--t4)',letterSpacing:'.12em',textTransform:'uppercase'}}>admin.krovex.dev</span>
            </div>
            <h1 className="bebas" style={{fontSize:28,color:'var(--t1)',letterSpacing:'.08em'}}>Acceso al panel</h1>
          </div>

          <div className="divider" style={{marginBottom:24}}/>

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:14}}>
              <label className="lbl">Email</label>
              <div style={{position:'relative'}}>
                <Mail size={13} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--t4)'}}/>
                <input type="email" className="inp" style={{paddingLeft:36}} placeholder="admin@krovex.dev"
                  value={email} onChange={e=>setEmail(e.target.value)} required/>
              </div>
            </div>
            <div style={{marginBottom:20}}>
              <label className="lbl">Contraseña</label>
              <div style={{position:'relative'}}>
                <Lock size={13} style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'var(--t4)'}}/>
                <input type={show?'text':'password'} className="inp" style={{paddingLeft:36,paddingRight:40}} placeholder="••••••••"
                  value={pass} onChange={e=>setPass(e.target.value)} required/>
                <button type="button" onClick={()=>setShow(!show)}
                  style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'var(--t4)',display:'flex'}}>
                  {show?<EyeOff size={13}/>:<Eye size={13}/>}
                </button>
              </div>
            </div>
            {error&&<div style={{marginBottom:14,padding:'10px 12px',background:'rgba(248,113,113,.06)',border:'1px solid rgba(248,113,113,.18)',borderRadius:4,fontSize:13,color:'var(--red)',fontFamily:"'DM Mono',monospace"}}>{error}</div>}
            <button type="submit" disabled={loading} className="btn btn-p" style={{width:'100%',justifyContent:'center',fontSize:12,padding:'13px',textTransform:'uppercase',letterSpacing:'.1em',opacity:loading?.6:1}}>
              {loading
                ?<><div style={{width:13,height:13,border:'2px solid rgba(255,255,255,.3)',borderTop:'2px solid white',borderRadius:'50%',animation:'spin 1s linear infinite'}}/>Verificando...</>
                :<>Ingresar <Lock size={12}/></>}
            </button>
          </form>
        </div>
        <p className="mono" style={{textAlign:'center',fontSize:9,color:'rgba(148,163,200,.2)',marginTop:16,letterSpacing:'.1em'}}>KROVEX ADMIN · ACCESO RESTRINGIDO</p>
      </div>
    </div>
  )
}
