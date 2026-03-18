import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp, Eye, Copy, Check, Building2, Heart, Hotel, ShoppingBag, Dumbbell, Truck, Landmark } from 'lucide-react'

const SISTEMAS = [
  {
    id: 'cobranzas',
    icon: Building2,
    nombre: 'Krovex Cobranzas',
    rubro: 'Clubes · Asociaciones · Mutuales',
    tagline: 'Terminá con las planillas. Cobrá con un clic.',
    descripcion: 'Sistema completo para gestión de socios, cuotas y cobros. Con campañas de WhatsApp masivo, portal de pago online y reportes de morosidad en tiempo real.',
    color: '#2563EB',
    colorLight: 'rgba(37,99,235,.12)',
    colorBorder: 'rgba(37,99,235,.25)',
    url: 'https://cobranzas.krovex.dev',
    features: [
      'Gestión de socios y cuotas',
      'Cobro online con MercadoPago',
      'Campañas WhatsApp masivo',
      'Portal de pago para socios',
      'Reportes de morosidad',
      'Multi-categoría de socios',
    ],
    demo: { url: 'https://cobranzas.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'MercadoPago'],
  },
  {
    id: 'salud',
    icon: Heart,
    nombre: 'Krovex Salud',
    rubro: 'Clínicas · Consultorios · Centros de salud',
    tagline: 'De la agenda de papel al sistema digital en 1 día.',
    descripcion: 'Turnos online, sala de espera digital, historia clínica electrónica, recetas y gestión de obras sociales. Todo desde el celular.',
    color: '#10B981',
    colorLight: 'rgba(16,185,129,.1)',
    colorBorder: 'rgba(16,185,129,.25)',
    url: 'https://salud.krovex.dev',
    features: [
      'Turnos online para pacientes',
      'Sala de espera en tiempo real',
      'Historia clínica electrónica',
      'Gestión de obras sociales',
      'Recetas digitales',
      'Portal del paciente',
    ],
    demo: { url: 'https://salud.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'WhatsApp API'],
  },
  {
    id: 'alojamientos',
    icon: Hotel,
    nombre: 'Krovex Alojamientos',
    rubro: 'Hoteles · Cabañas · Hosterías · Apart',
    tagline: 'Tu recepción 24/7, sin recepcionista.',
    descripcion: 'Reservas online, check-in/out, gestión de huéspedes, tarifas por temporada y portal para que el huésped acceda a toda la info del hospedaje.',
    color: '#F59E0B',
    colorLight: 'rgba(245,158,11,.1)',
    colorBorder: 'rgba(245,158,11,.25)',
    url: 'https://alojamientos.krovex.dev',
    features: [
      'Reservas online con seña',
      'Check-in / Check-out digital',
      'Gestión de huéspedes',
      'Tarifas por temporada',
      'Portal del huésped',
      'Calendario de disponibilidad',
    ],
    demo: { url: 'https://alojamientos.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'MercadoPago'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    nombre: 'Krovex Ecommerce',
    rubro: 'Tiendas · Comercios · Distribuidores',
    tagline: 'Vendé online hoy mismo, sin comisiones de marketplace.',
    descripcion: 'Tienda online completa con catálogo, carrito, cupones de descuento, checkout con MercadoPago o transferencia y panel de pedidos para el admin.',
    color: '#8B5CF6',
    colorLight: 'rgba(139,92,246,.1)',
    colorBorder: 'rgba(139,92,246,.25)',
    url: 'https://ecommerce.krovex.dev',
    features: [
      'Catálogo con categorías',
      'Carrito y checkout completo',
      'MercadoPago integrado',
      'Cupones de descuento',
      'Panel de pedidos admin',
      'Sin comisiones extras',
    ],
    demo: { url: 'https://ecommerce.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'MercadoPago'],
  },
  {
    id: 'gym',
    icon: Dumbbell,
    nombre: 'Krovex Gym',
    rubro: 'Gimnasios · Estudios · CrossFit · Pilates',
    tagline: 'Control total de tu gimnasio desde el celular.',
    descripcion: 'Socios, membresías, check-in por QR, clases grupales, rutinas personalizadas e inventario. Con portal para que el miembro vea su plan y asistencia.',
    color: '#EF4444',
    colorLight: 'rgba(239,68,68,.1)',
    colorBorder: 'rgba(239,68,68,.25)',
    url: 'https://gym.krovex.dev',
    features: [
      'Socios y membresías',
      'Check-in por QR / PIN',
      'Clases grupales con cupo',
      'Rutinas personalizadas',
      'Control de inventario',
      'Portal del miembro',
    ],
    demo: { url: 'https://gym.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'QR Code'],
  },
  {
    id: 'logistica',
    icon: Truck,
    nombre: 'Krovex Logística',
    rubro: 'Transportistas · Distribuidoras · Couriers',
    tagline: 'Seguimiento en tiempo real para vos y tu cliente.',
    descripcion: 'Gestión de envíos, repartidores y rutas. Tu cliente rastrea su paquete con un link. Vos ves todo en un mapa. Sin apps ni costo extra.',
    color: '#06B6D4',
    colorLight: 'rgba(6,182,212,.1)',
    colorBorder: 'rgba(6,182,212,.25)',
    url: 'https://logistica.krovex.dev',
    features: [
      'Gestión de envíos y rutas',
      'App para repartidores',
      'Tracking público por link',
      'Estados en tiempo real',
      'Reportes de entregas',
      'Portal del cliente',
    ],
    demo: { url: 'https://logistica.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'Mapas'],
  },
  {
    id: 'canchas',
    icon: Landmark,
    nombre: 'Krovex Canchas',
    rubro: 'Pádel · Fútbol 5 · Tenis · Complejos deportivos',
    tagline: 'Tu complejo lleno. Sin llamadas, sin confusiones.',
    descripcion: 'Reservas online por slot, precios peak/off-peak, torneos con fixture automático, bloqueos por socios concurrentes y portal del jugador desde el celular.',
    color: '#4da6ff',
    colorLight: 'rgba(77,166,255,.1)',
    colorBorder: 'rgba(77,166,255,.25)',
    url: 'https://canchas.krovex.dev',
    features: [
      'Reservas online con seña',
      'Precios por horario/día',
      'Torneos y fixture automático',
      'Bloqueos de socios fijos',
      'MercadoPago integrado',
      'Portal del jugador',
    ],
    demo: { url: 'https://canchas.krovex.dev', user: 'demo@krovex.dev', pass: 'krovex2025' },
    tech: ['React', 'Supabase', 'MercadoPago'],
  },
]

function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button onClick={copy} style={{
      background:'none',border:'none',cursor:'pointer',padding:'2px 4px',
      color: copied ? '#34d399' : 'rgba(148,163,200,.4)',
      transition:'color .2s',display:'inline-flex',alignItems:'center',
    }}>
      {copied ? <Check size={11}/> : <Copy size={11}/>}
    </button>
  )
}

function SistemaCard({ s }) {
  const [open, setOpen] = useState(false)
  const Icon = s.icon

  return (
    <div style={{
      background:'var(--bg1)',
      border:`1px solid ${open ? s.colorBorder : 'var(--b0)'}`,
      borderRadius:10,
      overflow:'hidden',
      transition:'border-color .25s, box-shadow .25s',
      boxShadow: open ? `0 0 40px ${s.colorLight}` : 'none',
    }}>
      {/* Header card — siempre visible */}
      <div style={{
        padding:'24px 24px',
        cursor:'pointer',
        display:'flex',
        alignItems:'flex-start',
        gap:16,
      }} onClick={() => setOpen(o => !o)}>
        {/* Icono */}
        <div style={{
          width:46,height:46,borderRadius:8,flexShrink:0,
          display:'flex',alignItems:'center',justifyContent:'center',
          background:s.colorLight,border:`1px solid ${s.colorBorder}`,
        }}>
          <Icon size={20} style={{color:s.color}}/>
        </div>

        {/* Info */}
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap',marginBottom:4}}>
            <h3 style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:'.05em',color:'var(--t1)'}}>
              {s.nombre}
            </h3>
            <span style={{
              fontSize:10,fontFamily:"'DM Mono',monospace",color:s.color,
              border:`1px solid ${s.colorBorder}`,borderRadius:3,
              padding:'2px 8px',letterSpacing:'.08em',
            }}>
              {s.tech[0]}
            </span>
          </div>
          <p style={{fontSize:11,fontFamily:"'DM Mono',monospace",color:'var(--t4)',letterSpacing:'.06em',marginBottom:6}}>
            {s.rubro}
          </p>
          <p style={{fontSize:14,color:'var(--t2)',fontWeight:600,lineHeight:1.4}}>
            "{s.tagline}"
          </p>
        </div>

        {/* Toggle */}
        <div style={{
          width:32,height:32,borderRadius:4,flexShrink:0,
          display:'flex',alignItems:'center',justifyContent:'center',
          border:'1px solid var(--b0)',color:'var(--t4)',
          transition:'all .2s',
          background: open ? s.colorLight : 'transparent',
          borderColor: open ? s.colorBorder : 'var(--b0)',
        }}>
          {open ? <ChevronUp size={16} style={{color:s.color}}/> : <ChevronDown size={16}/>}
        </div>
      </div>

      {/* Expandido */}
      {open && (
        <div style={{borderTop:`1px solid var(--b0)`}}>
          <div style={{padding:'24px 24px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}} className="sistema-inner">
            <style>{`@media(max-width:640px){.sistema-inner{grid-template-columns:1fr!important}}`}</style>

            {/* Descripción + features */}
            <div>
              <p style={{color:'var(--t3)',fontSize:14,lineHeight:1.75,marginBottom:20}}>
                {s.descripcion}
              </p>
              <ul style={{display:'flex',flexDirection:'column',gap:8}}>
                {s.features.map(f => (
                  <li key={f} style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--t2)'}}>
                    <div style={{width:5,height:5,borderRadius:'50%',background:s.color,flexShrink:0}}/>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Demo box */}
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              {/* Credenciales */}
              <div style={{
                background:'rgba(6,8,16,.6)',
                border:`1px solid ${s.colorBorder}`,
                borderRadius:8,padding:'16px 18px',
                fontFamily:"'DM Mono',monospace",
              }}>
                <div style={{fontSize:9,color:s.color,letterSpacing:'.14em',textTransform:'uppercase',marginBottom:12}}>
                  ▸ CREDENCIALES DEMO
                </div>
                {[
                  ['URL', s.demo.url],
                  ['Usuario', s.demo.user],
                  ['Contraseña', s.demo.pass],
                ].map(([label, val]) => (
                  <div key={label} style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <span style={{fontSize:10,color:'var(--t4)',minWidth:72}}>{label}</span>
                    <div style={{display:'flex',alignItems:'center',gap:4}}>
                      <span style={{fontSize:11,color:'var(--t1)'}}>{val}</span>
                      <CopyBtn text={val}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Botones */}
              <a href={s.demo.url} target="_blank" rel="noopener noreferrer"
                style={{
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  padding:'11px 20px',borderRadius:6,
                  background:`linear-gradient(135deg, ${s.color}dd, ${s.color}99)`,
                  color:'white',fontSize:13,fontWeight:700,textDecoration:'none',
                  border:`1px solid ${s.colorBorder}`,
                  boxShadow:`0 4px 20px ${s.colorLight}`,
                  letterSpacing:'.04em',fontFamily:"'DM Sans',sans-serif",
                  transition:'transform .2s, box-shadow .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow=`0 8px 32px ${s.color}44`}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow=`0 4px 20px ${s.colorLight}`}}
              >
                <Eye size={15}/> Ver demo en vivo
              </a>

              <a href={`https://wa.me/5493462375305?text=Hola%20Daniel%2C%20me%20interesa%20${encodeURIComponent(s.nombre)}%20para%20mi%20negocio`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display:'flex',alignItems:'center',justifyContent:'center',gap:8,
                  padding:'10px 20px',borderRadius:6,
                  background:'transparent',
                  color:'var(--t2)',fontSize:13,fontWeight:600,textDecoration:'none',
                  border:'1px solid var(--b1)',
                  letterSpacing:'.03em',fontFamily:"'DM Sans',sans-serif",
                  transition:'all .2s',
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(37,206,109,.4)';e.currentTarget.style.color='#34d399'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--b1)';e.currentTarget.style.color='var(--t2)'}}
              >
                💬 Me interesa este sistema
              </a>

              <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                {s.tech.map(t=>(
                  <span key={t} style={{
                    fontSize:10,fontFamily:"'DM Mono',monospace",
                    color:'var(--t4)',border:'1px solid var(--b0)',
                    borderRadius:3,padding:'3px 8px',letterSpacing:'.06em',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Sistemas() {
  return (
    <section id="sistemas" style={{position:'relative',padding:'120px 0',background:'var(--bg0)',overflow:'hidden'}}>
      <div className="blueprint" style={{position:'absolute',inset:0,opacity:.6}}/>
      <div style={{position:'absolute',top:'20%',left:'50%',transform:'translateX(-50%)',width:700,height:400,background:'radial-gradient(ellipse,rgba(37,99,235,.07) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(60px)'}}/>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:1}}>

        {/* Header */}
        <div style={{marginBottom:56}}>
          <span className="pill" style={{marginBottom:16,display:'inline-flex',fontSize:10,letterSpacing:'.12em'}}>
            ▸ SISTEMAS KROVEX
          </span>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',flexWrap:'wrap',gap:20}}>
            <div>
              <h2 className="bebas gw" style={{fontSize:'clamp(38px,5.5vw,64px)',lineHeight:.9,marginBottom:6}}>
                7 sistemas listos.
              </h2>
              <h2 className="bebas gk" style={{fontSize:'clamp(38px,5.5vw,64px)',lineHeight:.9}}>
                Tu rubro. Tu marca. Tu precio.
              </h2>
            </div>
            <p style={{color:'var(--t3)',fontSize:14,maxWidth:360,lineHeight:1.75}}>
              Cada sistema está en producción y puede tener tu dominio y marca en menos de 48 horas.
              Probá el demo con las credenciales de cada uno.
            </p>
          </div>
        </div>

        <div className="divider" style={{marginBottom:40}}/>

        {/* Cards */}
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {SISTEMAS.map(s => <SistemaCard key={s.id} s={s}/>)}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop:48,padding:'28px 32px',
          background:'rgba(37,99,235,.06)',
          border:'1px solid rgba(37,99,235,.18)',
          borderRadius:10,
          display:'flex',alignItems:'center',justifyContent:'space-between',
          flexWrap:'wrap',gap:16,
        }}>
          <div>
            <p style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:20,letterSpacing:'.05em',color:'var(--t1)',marginBottom:4}}>
              ¿No encontrás tu rubro?
            </p>
            <p style={{color:'var(--t3)',fontSize:14}}>
              También desarrollamos sistemas a medida desde cero.
            </p>
          </div>
          <a href={`https://wa.me/5493462375305?text=Hola%20Daniel%2C%20necesito%20un%20sistema%20a%20medida`}
            target="_blank" rel="noopener noreferrer"
            className="btn btn-p"
            style={{textDecoration:'none',fontSize:13,padding:'12px 24px',letterSpacing:'.06em',textTransform:'uppercase'}}>
            Hablemos del proyecto →
          </a>
        </div>
      </div>
    </section>
  )
}
