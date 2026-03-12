export default function KrovexLogo({ size = 38, showText = true, textSize = 'text-xl', dark = false }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      {/* Placeholder K mark — reemplazar con logo real cuando esté disponible */}
      <div style={{
        width:size,height:size,borderRadius:Math.round(size*.22),
        background:'linear-gradient(145deg,#1D4ED8,#2563EB)',
        border:'1px solid rgba(255,255,255,.15)',
        display:'flex',alignItems:'center',justifyContent:'center',
        flexShrink:0,
        boxShadow:'0 0 20px rgba(37,99,235,.35)',
      }}>
        <span style={{
          fontFamily:"'Syne',sans-serif",fontWeight:800,
          fontSize:Math.round(size*.5),color:'white',lineHeight:1,
          letterSpacing:'-.04em',
        }}>K</span>
      </div>

      {showText && (
        <div style={{display:'flex',flexDirection:'column',lineHeight:1,gap:2}}>
          <span style={{
            fontFamily:"'Syne',sans-serif",fontWeight:800,
            fontSize:textSize==='text-xl'?19:textSize==='text-lg'?17:textSize==='text-2xl'?22:17,
            letterSpacing:'.08em',textTransform:'uppercase',
            color:dark?'#111827':'white',
          }}>
            KROVEX
          </span>
          <span style={{
            fontFamily:"'Outfit',sans-serif",fontWeight:500,
            fontSize:9,letterSpacing:'.18em',textTransform:'uppercase',
            color:dark?'#6B7280':'rgba(148,163,184,.5)',
          }}>
            Web & Software Development
          </span>
        </div>
      )}
    </div>
  )
}
