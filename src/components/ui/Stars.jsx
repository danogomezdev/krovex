import { useMemo } from 'react'
export default function Stars({ count=80 }) {
  const pts = useMemo(()=>Array.from({length:count},(_,i)=>({
    id:i,x:Math.random()*100,y:Math.random()*100,
    sz:Math.random()*1.6+0.25,
    d:(Math.random()*6+2).toFixed(1),dl:(Math.random()*9).toFixed(1),
    lo:(Math.random()*.04+.01).toFixed(2),hi:(Math.random()*.4+.06).toFixed(2),
  })),[count])
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',pointerEvents:'none'}}>
      {pts.map(p=>(
        <div key={p.id} className="star" style={{left:`${p.x}%`,top:`${p.y}%`,width:p.sz,height:p.sz,'--d':`${p.d}s`,'--dl':`${p.dl}s`,'--lo':p.lo,'--hi':p.hi}}/>
      ))}
    </div>
  )
}
