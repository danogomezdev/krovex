import { useMemo } from 'react'
export default function Stars({ count = 80 }) {
  const stars = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random()*100, y: Math.random()*100,
    size: Math.random()*2.2+0.4,
    dur: (Math.random()*4+2).toFixed(1),
    delay: (Math.random()*5).toFixed(1),
    minOp: (Math.random()*.08+.03).toFixed(2),
    maxOp: (Math.random()*.55+.15).toFixed(2),
  })), [count])

  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none' }}>
      {stars.map(s => (
        <div key={s.id} className="star" style={{
          left:`${s.x}%`, top:`${s.y}%`,
          width:`${s.size}px`, height:`${s.size}px`,
          '--dur':`${s.dur}s`, '--delay':`${s.delay}s`,
          '--min-op':s.minOp, '--max-op':s.maxOp,
        }}/>
      ))}
      {[[18,28,200,.07],[74,18,240,.05],[50,68,170,.04],[88,55,150,.05]].map(([x,y,sz,op],i)=>(
        <div key={i} style={{
          position:'absolute', left:`${x}%`, top:`${y}%`,
          width:sz, height:sz, borderRadius:'50%',
          background:`radial-gradient(circle,rgba(34,39,249,${op}) 0%,transparent 70%)`,
          transform:'translate(-50%,-50%)', pointerEvents:'none'
        }}/>
      ))}
    </div>
  )
}
