import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import KrovexLogo from '../components/ui/KrovexLogo'
import Stars from '../components/ui/Stars'
import { Lock, Mail, Eye, EyeOff } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail]     = useState('')
  const [pass, setPass]       = useState('')
  const [show, setShow]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const { login }             = useAuth()
  const navigate              = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    try { await login(email, pass); navigate('/admin/dashboard') }
    catch { setError('Credenciales incorrectas. Verificá email y contraseña.') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background:'linear-gradient(135deg,#03070F 0%,#060C1A 100%)' }}>
      <Stars count={60}/>
      <div className="absolute inset-0 grid-lines opacity-18"/>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex justify-center mb-10">
          <KrovexLogo size={42} textSize="text-2xl"/>
        </div>

        <div className="card p-8" style={{ borderColor:'rgba(34,39,249,.22)', backdropFilter:'blur(20px)' }}>
          <div className="text-center mb-8">
            <div className="w-13 h-13 rounded-2xl flex items-center justify-center mx-auto mb-4 w-14 h-14"
              style={{ background:'rgba(34,39,249,.13)', border:'1px solid rgba(34,39,249,.25)' }}>
              <Lock size={22} style={{ color:'#60A5FA' }}/>
            </div>
            <h1 className="text-2xl font-black text-white mb-1">Panel Admin</h1>
            <p className="text-sm" style={{ color:'rgba(160,176,200,.5)' }}>Ingresá tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.55)' }}>Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:'rgba(160,176,200,.38)' }}/>
                <input type="email" className="kv-input pl-10" placeholder="admin@krovex.dev"
                  value={email} onChange={e => setEmail(e.target.value)} required/>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color:'rgba(160,176,200,.55)' }}>Contraseña</label>
              <div className="relative">
                <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:'rgba(160,176,200,.38)' }}/>
                <input type={show ? 'text':'password'} className="kv-input pl-10 pr-10" placeholder="••••••••"
                  value={pass} onChange={e => setPass(e.target.value)} required/>
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:'rgba(160,176,200,.38)' }}>
                  {show ? <EyeOff size={14}/> : <Eye size={14}/>}
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">{error}</p>}
            <button type="submit" disabled={loading}
              className="btn-primary w-full py-3.5 text-base"
              style={{ boxShadow:'0 0 22px rgba(34,39,249,.32)' }}>
              {loading
                ? <div className="flex items-center justify-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Ingresando...</div>
                : 'Ingresar'}
            </button>
          </form>
        </div>
        <p className="text-center text-xs mt-6" style={{ color:'rgba(160,176,200,.25)' }}>Krovex Admin Panel v2.0</p>
      </div>
    </div>
  )
}
