import { ArrowRight, Terminal } from 'lucide-react'

function CodeLines() {
  const lines = [
    '> krovex.build --target=web --scale=unlimited',
    '✓ Stack: React · Node · PostgreSQL · Supabase',
    '✓ Deploy: Vercel · Railway · Cloud',
    '> Proyecto listo para producción.',
  ]
  return (
    <div style={{
      background:'rgba(10,13,24,.7)',
      border:'1px solid var(--b1)',
      borderRadius:6, padding:'16px 20px',
      fontFamily:"'DM Mono',monospace", fontSize:12,
      lineHeight:1.8, maxWidth:420, position:'relative',
    }}>
      <div style={{position:'absolute',top:0,left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(37,99,235,.4),transparent)'}}/>
      <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12,paddingBottom:10,borderBottom:'1px solid var(--b0)'}}>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#f87171'}}/>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#fbbf24'}}/>
        <div style={{width:8,height:8,borderRadius:'50%',background:'#34d399'}}/>
        <span style={{marginLeft:8,fontSize:10,color:'var(--t4)',letterSpacing:'.08em'}}>krovex.dev — terminal</span>
      </div>
      {lines.map((l,i)=>(
        <div key={i} style={{
          color: l.startsWith('✓') ? 'rgba(52,211,153,.8)' : l.startsWith('>') ? 'var(--kblue3)' : 'var(--t4)',
          animation:`fadeUp .4s ease ${i*.15+.3}s both`,
        }}>{l}</div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section id="hero" style={{position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',overflow:'hidden',background:'var(--bg0)'}}>
      <div className="blueprint" style={{position:'absolute',inset:0}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, var(--bg0) 100%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'-15%',left:'50%',transform:'translateX(-50%)',width:800,height:500,background:'radial-gradient(ellipse,rgba(37,99,235,.12) 0%,transparent 65%)',pointerEvents:'none',filter:'blur(60px)'}}/>
      <div style={{position:'absolute',top:'50%',left:0,right:0,height:'1px',background:'linear-gradient(90deg,transparent,rgba(77,166,255,.06),transparent)',pointerEvents:'none'}}/>

      {/* KROVEX watermark de fondo */}
      <div style={{position:'absolute',right:'3%',top:'50%',transform:'translateY(-50%)',fontFamily:"'Bebas Neue',sans-serif",fontSize:'clamp(100px,16vw,220px)',color:'rgba(37,99,235,.04)',lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-.02em'}}>
        KROVEX
      </div>

      <div style={{position:'relative',zIndex:10,maxWidth:1280,margin:'0 auto',padding:'clamp(100px,14vw,140px) 32px 80px',width:'100%'}}>
        <div style={{display:'grid',gap:48,alignItems:'center',gridTemplateColumns:'1fr auto'}} className="hero-grid">
          <style>{`.hero-grid{@media(max-width:900px){grid-template-columns:1fr!important}}`}</style>
          <style>{`@media(max-width:900px){.hero-terminal{display:none!important}}`}</style>

          <div style={{maxWidth:640}}>
            {/* Badge */}
            <div style={{marginBottom:28,animation:'fadeIn .6s ease both'}}>
              <span className="pill">
                <span className="pdot" style={{background:'var(--green)'}}/>
                Disponible · Argentina
              </span>
            </div>

            {/* Headline fija */}
            <div style={{marginBottom:20,animation:'fadeUp .7s ease .1s both'}}>
              <div className="bebas gw" style={{fontSize:'clamp(54px,8.5vw,100px)',lineHeight:.9,marginBottom:6}}>
                Precision
              </div>
              <div className="bebas gk" style={{fontSize:'clamp(54px,8.5vw,100px)',lineHeight:.9,marginBottom:6}}>
                Web & Software
              </div>
              <div className="bebas gw" style={{fontSize:'clamp(54px,8.5vw,100px)',lineHeight:.9}}>
                Development.
              </div>
            </div>

            {/* Sub */}
            <p style={{animation:'fadeUp .7s ease .2s both',color:'var(--t3)',fontSize:'clamp(15px,1.6vw,18px)',lineHeight:1.75,maxWidth:460,marginBottom:40,fontWeight:400}}>
              Desarrollamos productos digitales a medida — desde landing pages hasta sistemas complejos — con foco en resultados reales.
            </p>

            {/* CTAs */}
            <div style={{animation:'fadeUp .7s ease .3s both',display:'flex',gap:14,flexWrap:'wrap',marginBottom:56}}>
              <button className="btn btn-p" style={{fontSize:13,padding:'13px 28px',letterSpacing:'.06em',textTransform:'uppercase'}}
                onClick={()=>document.getElementById('servicios')?.scrollIntoView({behavior:'smooth'})}>
                Ver servicios <ArrowRight size={15}/>
              </button>
              <button className="btn btn-g" style={{fontSize:13,padding:'12px 28px',letterSpacing:'.06em',textTransform:'uppercase'}}
                onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>
                Hablar del proyecto
              </button>
            </div>

            {/* Stats */}
            <div style={{animation:'fadeUp .7s ease .42s both',display:'flex',gap:0,flexWrap:'wrap',alignItems:'center'}}>
              {[['50+','Proyectos'],['5+','Años'],['100%','Satisfacción']].map(([n,l],i)=>(
                <div key={l} style={{display:'flex',alignItems:'center',gap:0}}>
                  {i>0&&<div style={{width:1,height:32,background:'var(--b0)',margin:'0 32px'}}/>}
                  <div>
                    <div className="bebas gk" style={{fontSize:28,lineHeight:1}}>{n}</div>
                    <div className="mono" style={{fontSize:9,color:'var(--t4)',letterSpacing:'.12em',textTransform:'uppercase',marginTop:3}}>{l}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal decorativo */}
          <div className="hero-terminal" style={{animation:'fadeIn .8s ease .4s both'}}>
            <CodeLines/>
          </div>
        </div>
      </div>

      <div style={{position:'absolute',bottom:0,left:0,right:0,height:120,background:'linear-gradient(to bottom,transparent,var(--bg0))',pointerEvents:'none'}}/>
    </section>
  )
}
