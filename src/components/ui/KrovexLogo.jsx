// Logo placeholder — reemplazar con SVG real cuando esté disponible
export default function KrovexLogo({ size=36, showText=true, textSize='lg' }) {
  const fs = textSize==='xl'?20:textSize==='lg'?17:textSize==='sm'?14:17
  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      {/* K mark — placeholder del logo real */}
      <div style={{
        width:size, height:size,
        borderRadius:Math.round(size*.15),
        background:'linear-gradient(145deg,#4da6ff 0%,#2563EB 50%,#1a3fa8 100%)',
        display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink:0,
        boxShadow:'0 0 16px rgba(37,99,235,.4), inset 0 1px 0 rgba(255,255,255,.2)',
        border:'1px solid rgba(77,166,255,.3)',
        animation:'glow-k 4s ease-in-out infinite',
      }}>
        <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:Math.round(size*.58),color:'white',lineHeight:1,letterSpacing:'-.02em',textShadow:'0 1px 3px rgba(0,0,0,.4)'}}>K</span>
      </div>
      {showText&&(
        <div style={{display:'flex',flexDirection:'column',gap:1}}>
          <span style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:fs+4,letterSpacing:'.12em',color:'var(--t1)',lineHeight:1}}>KROVEX</span>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:'.14em',textTransform:'uppercase',color:'rgba(148,163,200,.38)'}}>Web & Software Dev</span>
        </div>
      )}
    </div>
  )
}
