import { ArrowRight, Terminal, Zap, Shield, Clock, Star } from 'lucide-react'

function CodeLines() {
  const lines = [
    { t: '> krovex.init --mode=production', c: 'cmd' },
    { t: '✓ React 18 · Supabase · Vercel', c: 'ok' },
    { t: '✓ 7 sistemas SaaS deployados', c: 'ok' },
    { t: '✓ Multi-tenant · Auth · Pagos', c: 'ok' },
    { t: '> Listo para tu negocio.', c: 'cmd' },
  ]
  return (
    <div style={{
      background:'rgba(6,8,16,.85)',
      border:'1px solid rgba(77,166,255,.22)',
      borderRadius:8, padding:'20px 22px',
      fontFamily:"'DM Mono',monospace", fontSize:12.5,
      lineHeight:1.9, maxWidth:400, position:'relative',
      backdropFilter:'blur(12px)',
      boxShadow:'0 0 60px rgba(37,99,235,.12), inset 0 1px 0 rgba(255,255,255,.04)',
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(77,166,255,.5),transparent)'}}/>
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:14,paddingBottom:12,borderBottom:'1px solid rgba(255,255,255,.06)'}}>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#f87171'}}/>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#fbbf24'}}/>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#34d399'}}/>
        <span style={{marginLeft:8,fontSize:10,color:'rgba(148,163,200,.4)',letterSpacing:'.08em'}}>krovex — build log</span>
      </div>
      {lines.map((l,i)=>(
        <div key={i} style={{
          color: l.c==='ok' ? 'rgba(52,211,153,.85)' : 'rgba(77,166,255,.85)',
          animation:`fadeUp .35s ease ${i*.12+.2}s both`,
        }}>{l.t}</div>
      ))}
      <div style={{marginTop:14,paddingTop:12,borderTop:'1px solid rgba(255,255,255,.06)',display:'flex',alignItems:'center',gap:8}}>
        <div style={{width:6,height:6,borderRadius:'50%',background:'#34d399',boxShadow:'0 0 8px #34d399',animation:'pulse 2s infinite'}}/>
        <span style={{fontSize:10,color:'rgba(52,211,153,.7)',letterSpacing:'.1em'}}>SISTEMAS EN PRODUCCIÓN</span>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',background:'var(--bg0)'}}>
      <div className="blueprint" style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 50%,transparent 40%,var(--bg0) 100%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'-10%',left:'30%',width:900,height:600,background:'radial-gradient(ellipse,rgba(37,99,235,.1) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(80px)'}}/>

      {/* Watermark */}
      <div style={{position:'absolute',right:'-2%',top:'50%',transform:'translateY(-50%)',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(80px,14vw,200px)',color:'rgba(37,99,235,.035)',lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-.02em'}}>
        KROVEX
      </div>

      <div style={{position:'relative',zIndex:10,maxWidth:1280,margin:'0 auto',padding:'clamp(100px,14vw,140px) 32px 80px',width:'100%'}}>
        <div style={{display:'grid',gap:48,alignItems:'center',gridTemplateColumns:'1fr auto'}} className="hero-grid">
          <style>{`
            .hero-grid{@media(max-width:900px){grid-template-columns:1fr!important}}
            .hero-terminal{@media(max-width:900px){display:none!important}}
            @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
          `}</style>

          <div style={{maxWidth:660}}>
            {/* Badge */}
            <div style={{marginBottom:28,animation:'fadeIn .6s ease both',display:'flex',gap:10,flexWrap:'wrap'}}>
              <span className="pill">
                <span className="pdot" style={{background:'var(--green)'}}/>
                Disponible · Venado Tuerto, Santa Fe · Argentina
              </span>
              <span className="pill" style={{borderColor:'rgba(77,166,255,.2)'}}>
                <Star size={9} style={{color:'var(--kblue3)'}}/>
                Stack moderno · Entrega rápida
              </span>
            </div>

            {/* Headline */}
            <div style={{marginBottom:22,animation:'fadeUp .7s ease .1s both'}}>
              <div className="bebas gw" style={{fontSize:'clamp(42px,6.5vw,78px)',lineHeight:.92,marginBottom:4}}>
                Precisión
              </div>
              <div className="bebas gk" style={{fontSize:'clamp(42px,6.5vw,78px)',lineHeight:.92,marginBottom:4}}>
                Web & Software
              </div>
              <div className="bebas gw" style={{fontSize:'clamp(42px,6.5vw,78px)',lineHeight:.92}}>
                Development.
              </div>
            </div>

            {/* Sub */}
            <p style={{animation:'fadeUp .7s ease .2s both',color:'var(--t3)',fontSize:'clamp(15px,1.6vw,17px)',lineHeight:1.8,maxWidth:500,marginBottom:16,fontWeight:400}}>
              Construimos sistemas SaaS listos para usar — gimnasios, clínicas, hoteles, canchas —
              o desarrollamos desde cero lo que tu negocio necesita.
            </p>
            <p style={{animation:'fadeUp .7s ease .25s both',color:'rgba(77,166,255,.7)',fontSize:14,lineHeight:1.6,maxWidth:460,marginBottom:40,fontFamily:"'DM Mono',monospace"}}>
              &gt; Tu marca. Tu precio. Tu sistema.
            </p>

            {/* CTAs */}
            <div style={{animation:'fadeUp .7s ease .32s both',display:'flex',gap:14,flexWrap:'wrap',marginBottom:56}}>
              <button className="btn btn-p" style={{fontSize:13,padding:'13px 28px',letterSpacing:'.06em',textTransform:'uppercase'}}
                onClick={()=>document.getElementById('sistemas')?.scrollIntoView({behavior:'smooth'})}>
                Ver sistemas <ArrowRight size={15}/>
              </button>
              <a href={`https://wa.me/5493462375305?text=Hola%20Daniel%2C%20quiero%20saber%20m%C3%A1s%20sobre%20Krovex`}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-g" style={{fontSize:13,padding:'12px 28px',letterSpacing:'.06em',textTransform:'uppercase',textDecoration:'none'}}>
                Hablar por WhatsApp
              </a>
            </div>

            {/* Stats — reales y honestos */}
            <div style={{animation:'fadeUp .7s ease .42s both',display:'flex',gap:0,flexWrap:'wrap',alignItems:'center'}}>
              {[
                ['7','Sistemas SaaS'],
                ['React','+ Supabase'],
                ['100%','Código propio'],
              ].map(([n,l],i)=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:0}}>
                  {i>0&&<div style={{width:1,height:32,background:'var(--b0)',margin:'0 28px'}}/>}
                  <div>
                    <div className="bebas gk" style={{fontSize:26,lineHeight:1}}>{n}</div>
                    <div className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.12em',textTransform:'uppercase',marginTop:3}}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="hero-terminal" style={{animation:'fadeIn .8s ease .4s both'}}>
            <CodeLines/>
          </div>
        </div>
      </div>

      <div style={{position:'absolute',bottom:0,left:0,right:0,height:120,background:'linear-gradient(to bottom,transparent,var(--bg0))',pointerEvents:'none'}}/>
    </section>
  )
}
