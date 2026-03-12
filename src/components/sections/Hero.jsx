import { useEffect, useState, useMemo } from 'react'
import { ArrowRight, Sparkles, Code2 } from 'lucide-react'

const WORDS = ['Web Apps','E-Commerce','Sistemas','Landing Pages','Software a Medida']

function Particles() {
  const pts = useMemo(()=>Array.from({length:90},(_,i)=>({
    id:i,x:Math.random()*100,y:Math.random()*100,
    sz:Math.random()*1.6+0.3,
    dur:(Math.random()*6+2).toFixed(1),
    del:(Math.random()*9).toFixed(1),
    lo:(Math.random()*.04+.01).toFixed(2),
    hi:(Math.random()*.45+.06).toFixed(2),
  })),[])
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
      {pts.map(p=>(
        <div key={p.id} className="star" style={{
          left:`${p.x}%`,top:`${p.y}%`,width:p.sz,height:p.sz,
          '--dur':`${p.dur}s`,'--delay':`${p.del}s`,'--lo':p.lo,'--hi':p.hi,
        }}/>
      ))}
    </div>
  )
}

export default function Hero() {
  const [idx,setIdx]=useState(0)
  const [txt,setTxt]=useState('')
  const [del,setDel]=useState(false)
  const [mp,setMp]=useState({x:.5,y:.5})

  useEffect(()=>{
    const w=WORDS[idx];let t
    if(!del&&txt.length<w.length) t=setTimeout(()=>setTxt(w.slice(0,txt.length+1)),68)
    else if(!del&&txt.length===w.length) t=setTimeout(()=>setDel(true),2200)
    else if(del&&txt.length>0) t=setTimeout(()=>setTxt(txt.slice(0,-1)),38)
    else if(del&&txt.length===0){setDel(false);setIdx(i=>(i+1)%WORDS.length)}
    return()=>clearTimeout(t)
  },[txt,del,idx])

  useEffect(()=>{
    const h=e=>setMp({x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight})
    window.addEventListener('mousemove',h);return()=>window.removeEventListener('mousemove',h)
  },[])

  const dx=(mp.x-.5)*22,dy=(mp.y-.5)*22

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{background:'#07090F'}}>

      {/* Mesh gradient background */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        {/* Top center bloom */}
        <div style={{
          position:'absolute',top:'-8%',left:'50%',transform:'translateX(-50%)',
          width:900,height:500,
          background:'radial-gradient(ellipse,rgba(37,99,235,.22) 0%,rgba(59,130,246,.06) 45%,transparent 70%)',
          filter:'blur(40px)',
        }}/>
        {/* Left accent */}
        <div style={{
          position:'absolute',top:'20%',left:'-8%',
          width:500,height:500,
          background:'radial-gradient(circle,rgba(99,179,237,.1) 0%,transparent 65%)',
          transform:`translate(${-dx*.5}px,${-dy*.5}px)`,
          transition:'transform .15s linear',
          filter:'blur(20px)',
        }}/>
        {/* Right accent */}
        <div style={{
          position:'absolute',bottom:'18%',right:'-5%',
          width:420,height:420,
          background:'radial-gradient(circle,rgba(129,140,248,.09) 0%,transparent 65%)',
          transform:`translate(${dx*.4}px,${dy*.4}px)`,
          transition:'transform .15s linear',
          filter:'blur(20px)',
        }}/>
      </div>

      {/* Dot grid */}
      <div className="dot-grid" style={{position:'absolute',inset:0,opacity:.7,pointerEvents:'none'}}/>

      <Particles/>

      {/* Thin diagonal decorative lines */}
      <div style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'32%',left:'-3%',width:'28%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(99,179,237,.2),transparent)',transform:'rotate(-6deg)'}}/>
        <div style={{position:'absolute',top:'62%',right:'-3%',width:'22%',height:'1px',background:'linear-gradient(90deg,transparent,rgba(129,140,248,.18),transparent)',transform:'rotate(5deg)'}}/>
        {/* Corner bracket TL */}
        <div style={{position:'absolute',top:40,left:40,width:32,height:32,borderTop:'1px solid rgba(99,179,237,.25)',borderLeft:'1px solid rgba(99,179,237,.25)',borderRadius:'4px 0 0 0'}}/>
        {/* Corner bracket BR */}
        <div style={{position:'absolute',bottom:40,right:40,width:32,height:32,borderBottom:'1px solid rgba(99,179,237,.25)',borderRight:'1px solid rgba(99,179,237,.25)',borderRadius:'0 0 4px 0'}}/>
      </div>

      {/* CONTENT */}
      <div style={{
        position:'relative',zIndex:10,maxWidth:900,margin:'0 auto',
        padding:'120px 28px 80px',textAlign:'center',
      }}>

        {/* Pill badge */}
        <div style={{animation:'fadeDown .7s ease both',display:'flex',justifyContent:'center',marginBottom:32}}>
          <span className="pill">
            <span style={{width:6,height:6,borderRadius:'50%',background:'#4ade80',animation:'pulse 2s ease-in-out infinite',flexShrink:0}}/>
            Disponible para nuevos proyectos
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{animation:'fadeUp .85s cubic-bezier(.22,.68,0,1.1) .08s both',marginBottom:20}}>
          <span className="syne grad-white" style={{
            display:'block',fontSize:'clamp(44px,7.5vw,86px)',
            fontWeight:800,letterSpacing:'-.03em',lineHeight:1.0,
          }}>
            Desarrollamos
          </span>
          <span className="syne grad-cyan" style={{
            display:'block',fontSize:'clamp(46px,8vw,92px)',
            fontWeight:800,letterSpacing:'-.03em',lineHeight:1.05,
            minHeight:'1.1em',
          }}>
            {txt}
            <span style={{
              display:'inline-block',width:3,height:'.8em',
              background:'#63B3ED',borderRadius:2,verticalAlign:'middle',marginLeft:3,
              animation:'pulse 1s ease-in-out infinite',
            }}/>
          </span>
          <span className="syne grad-white" style={{
            display:'block',fontSize:'clamp(44px,7.5vw,86px)',
            fontWeight:800,letterSpacing:'-.03em',lineHeight:1.0,
          }}>
            a medida
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          animation:'fadeUp .85s ease .2s both',
          color:'rgba(148,163,184,.7)',fontSize:'clamp(16px,2vw,19px)',
          lineHeight:1.75,maxWidth:500,margin:'0 auto 44px',fontWeight:400,
        }}>
          Convertimos tu idea en un producto digital que genera confianza, retiene usuarios y escala con tu negocio.
        </p>

        {/* CTA buttons */}
        <div style={{
          animation:'fadeUp .85s ease .3s both',
          display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',marginBottom:72,
        }}>
          <button className="btn-cta" style={{fontSize:16,padding:'15px 32px'}}
            onClick={()=>document.getElementById('portfolio')?.scrollIntoView({behavior:'smooth'})}>
            Ver Portfolio <ArrowRight size={17}/>
          </button>
          <button className="btn-outline" style={{fontSize:16,padding:'15px 32px'}}
            onClick={()=>document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'})}>
            <Code2 size={17}/> Hablar del proyecto
          </button>
        </div>

        {/* Stats row */}
        <div style={{animation:'fadeUp .85s ease .42s both'}}>
          <div className="divider" style={{marginBottom:40}}/>
          <div style={{display:'flex',justifyContent:'center',gap:'clamp(28px,6vw,80px)',flexWrap:'wrap'}}>
            {[['50+','Proyectos entregados'],['5+','Años de experiencia'],['100%','Satisfacción']].map(([n,l])=>(
              <div key={l} style={{textAlign:'center'}}>
                <div className="syne grad-cyan" style={{fontSize:28,fontWeight:800,lineHeight:1}}>{n}</div>
                <div style={{fontSize:11,fontWeight:600,color:'rgba(148,163,184,.42)',marginTop:8,letterSpacing:'.1em',textTransform:'uppercase'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient floor */}
      <div style={{position:'absolute',bottom:0,left:0,right:0,height:140,background:'linear-gradient(to bottom,transparent,#07090F)',pointerEvents:'none'}}/>
    </section>
  )
}
