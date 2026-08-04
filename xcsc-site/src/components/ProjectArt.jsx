import { memo, useMemo } from 'react'

/* 确定性伪随机 —— 同一 seed 每次渲染结果一致，避免闪烁 */
function rng(seed) {
  let s = 0
  for (let i = 0; i < seed.length; i++) s = (s * 31 + seed.charCodeAt(i)) >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

const W = 1000
const H = 620
const BLUE = '#1f58f2'
const ICE = '#d8eaff'

/* ---------- 变体 1：雷达同心环 + 散点 ---------- */
function Radar(r) {
  const cx = W * 0.62
  const cy = H * 0.5
  const rings = [70, 130, 195, 262, 330, 400]
  const dots = Array.from({ length: 90 }, () => {
    const a = r() * Math.PI * 2
    const rad = 40 + r() * 380
    return { x: cx + Math.cos(a) * rad, y: cy + Math.sin(a) * rad * 0.82, s: 0.8 + r() * 2 }
  })
  return (
    <>
      {rings.map((rad, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={rad} ry={rad * 0.82} fill="none" stroke={ICE} strokeOpacity={0.09} />
      ))}
      {[0, 45, 90, 135].map((deg) => (
        <line
          key={deg}
          x1={cx - Math.cos((deg * Math.PI) / 180) * 400}
          y1={cy - Math.sin((deg * Math.PI) / 180) * 330}
          x2={cx + Math.cos((deg * Math.PI) / 180) * 400}
          y2={cy + Math.sin((deg * Math.PI) / 180) * 330}
          stroke={ICE}
          strokeOpacity={0.06}
        />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={i % 7 === 0 ? ICE : BLUE} fillOpacity={i % 7 === 0 ? 0.7 : 0.5} />
      ))}
      <circle cx={cx} cy={cy} r={5} fill={BLUE} />
      <circle cx={cx} cy={cy} r={14} fill="none" stroke={BLUE} strokeOpacity={0.5} />
    </>
  )
}

/* ---------- 变体 2：频谱柱阵 ---------- */
function Spectrum(r) {
  const n = 64
  const bw = (W - 160) / n
  const bars = Array.from({ length: n }, (_, i) => {
    const t = i / n
    const env = Math.sin(t * Math.PI) ** 0.7
    return Math.max(6, env * (H * 0.62) * (0.35 + r() * 0.65))
  })
  return (
    <>
      {[0.25, 0.5, 0.75].map((p, i) => (
        <line key={i} x1={80} y1={H * p} x2={W - 80} y2={H * p} stroke={ICE} strokeOpacity={0.05} />
      ))}
      {bars.map((hgt, i) => (
        <rect
          key={i}
          x={80 + i * bw}
          y={H - 90 - hgt}
          width={Math.max(1.5, bw - 3)}
          height={hgt}
          fill={i % 9 === 0 ? ICE : BLUE}
          fillOpacity={i % 9 === 0 ? 0.55 : 0.24 + (hgt / H) * 0.4}
        />
      ))}
      <line x1={80} y1={H - 90} x2={W - 80} y2={H - 90} stroke={ICE} strokeOpacity={0.2} />
    </>
  )
}

/* ---------- 变体 3：节点网络 ---------- */
function Mesh(r) {
  const nodes = Array.from({ length: 34 }, () => ({
    x: 90 + r() * (W - 180),
    y: 70 + r() * (H - 140),
  }))
  const edges = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y)
      if (d < 190) edges.push({ a: nodes[i], b: nodes[j], d })
    }
  }
  return (
    <>
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.a.x}
          y1={e.a.y}
          x2={e.b.x}
          y2={e.b.y}
          stroke={BLUE}
          strokeOpacity={0.34 * (1 - e.d / 190)}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={i % 6 === 0 ? 4 : 2.2} fill={i % 6 === 0 ? ICE : BLUE} fillOpacity={0.85} />
          {i % 6 === 0 && <circle cx={n.x} cy={n.y} r={11} fill="none" stroke={ICE} strokeOpacity={0.22} />}
        </g>
      ))}
    </>
  )
}

/* ---------- 变体 4：等高线地形 ---------- */
function Contour(r) {
  const lines = 22
  const seedA = r() * 10
  const seedB = r() * 10
  const path = (k) => {
    const pts = []
    for (let x = 60; x <= W - 60; x += 14) {
      const t = x / W
      const y =
        H * 0.52 +
        Math.sin(t * 5.2 + seedA + k * 0.32) * 62 +
        Math.sin(t * 11.6 + seedB - k * 0.2) * 22 +
        (k - lines / 2) * 21
      pts.push(`${x},${y.toFixed(1)}`)
    }
    return 'M' + pts.join(' L')
  }
  return (
    <>
      {Array.from({ length: lines }, (_, k) => (
        <path
          key={k}
          d={path(k)}
          fill="none"
          stroke={k % 5 === 0 ? ICE : BLUE}
          strokeOpacity={k % 5 === 0 ? 0.28 : 0.16}
        />
      ))}
    </>
  )
}

/* ---------- 变体 5：等距网格 ---------- */
function Isogrid(r) {
  const cols = 15
  const rows = 9
  const cw = (W - 160) / cols
  const ch = (H - 150) / rows
  const cells = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells.push({ x: 80 + x * cw, y: 75 + y * ch, on: r() > 0.76, hot: r() > 0.955 })
    }
  }
  return (
    <>
      {cells.map((c, i) => (
        <g key={i}>
          <rect
            x={c.x}
            y={c.y}
            width={cw - 6}
            height={ch - 6}
            fill={c.on ? BLUE : 'none'}
            fillOpacity={c.on ? 0.14 : 0}
            stroke={c.hot ? ICE : ICE}
            strokeOpacity={c.hot ? 0.4 : 0.07}
          />
          {c.hot && <rect x={c.x + (cw - 6) / 2 - 3} y={c.y + (ch - 6) / 2 - 3} width={6} height={6} fill={BLUE} />}
        </g>
      ))}
    </>
  )
}

/* ---------- 变体 6：星座连线 ---------- */
function Constellation(r) {
  const stars = Array.from({ length: 120 }, () => ({
    x: 60 + r() * (W - 120),
    y: 50 + r() * (H - 100),
    s: 0.6 + r() * 2.4,
  }))
  const chain = stars.slice(0, 14)
  return (
    <>
      <path
        d={'M' + chain.map((p) => `${p.x.toFixed(0)},${p.y.toFixed(0)}`).join(' L')}
        fill="none"
        stroke={BLUE}
        strokeOpacity={0.42}
      />
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s} fill={s.s > 2.2 ? ICE : BLUE} fillOpacity={s.s > 2.2 ? 0.8 : 0.42} />
      ))}
      {chain.map((p, i) => (
        <circle key={'c' + i} cx={p.x} cy={p.y} r={5.5} fill="none" stroke={ICE} strokeOpacity={0.3} />
      ))}
    </>
  )
}

const VARIANTS = {
  ciscn: Radar,
  qwb: Spectrum,
  wdb: Mesh,
  xihu: Contour,
  dfjk: Isogrid,
  region: Constellation,
}

/**
 * ProjectArt — 赛事卡片的程序化视觉
 * 拿到真实比赛照片后，把 <svg> 换成 <img src="./assets/images/xxx.webp" /> 即可。
 */
function ProjectArtImpl({ variant = 'ciscn' }) {
  const node = useMemo(() => {
    const fn = VARIANTS[variant] || Radar
    return fn(rng(variant))
  }, [variant])

  return (
    <svg className="pcard__art" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width={W} height={H} fill="#0a0b0e" />
      {node}
      {/* 底部渐隐，让文字压在图上仍然可读 */}
      <rect width={W} height={H} fill="url(#pcardFade)" />
      <defs>
        <linearGradient id="pcardFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#06070a" stopOpacity="0.1" />
          <stop offset="55%" stopColor="#06070a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#06070a" stopOpacity="0.94" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default memo(ProjectArtImpl)
