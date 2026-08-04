import { memo, useEffect, useRef } from 'react'

/**
 * ParticleField — 首屏点云观测场
 * Atlantic 的签名视觉：数千个电蓝色点在近黑画布上聚成有机波形。
 *
 * 性能约束（遵循 motion 规范）：
 *  - 粒子数按设备分级：desktop 800 / tablet 300 / mobile 100
 *  - 仅在 canvas 内绘制，不触发任何 layout
 *  - prefers-reduced-motion 时渲染静态单帧
 *  - React.memo 叶子组件，父级重渲染不影响
 */
function ParticleFieldImpl() {
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let particles = []

    const countForWidth = (width) => {
      if (width < 768) return 100
      if (width < 1280) return 300
      return 800
    }

    const build = () => {
      const n = countForWidth(w)
      particles = new Array(n).fill(0).map(() => {
        const depth = Math.random() // 0 far → 1 near
        return {
          // 归一化坐标，resize 时无需重建
          bx: Math.random(),
          by: Math.random(),
          depth,
          r: 0.4 + depth * 1.5,
          // 每个点自己的相位，避免整齐划一的波
          phase: Math.random() * Math.PI * 2,
          speed: 0.12 + Math.random() * 0.35,
          drift: (Math.random() - 0.5) * 0.00012,
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const draw = (t) => {
      const time = t * 0.001
      ctx.clearRect(0, 0, w, h)

      // 指针视差（触摸设备关闭）
      const p = pointerRef.current
      p.x += (p.tx - p.x) * 0.045
      p.y += (p.ty - p.y) * 0.045

      for (let i = 0; i < particles.length; i++) {
        const s = particles[i]

        // 基础位置 + 缓慢横向漂移
        s.bx += s.drift
        if (s.bx > 1.05) s.bx = -0.05
        if (s.bx < -0.05) s.bx = 1.05

        const x0 = s.bx * w
        const y0 = s.by * h

        // 波场：两组不同频率的正弦叠加，形成有机起伏而非规则栅格
        const wave =
          Math.sin(x0 * 0.0042 + time * s.speed + s.phase) * 26 +
          Math.sin(y0 * 0.0031 - time * s.speed * 0.7) * 14

        // 近处的点位移更大 → 视差纵深
        const par = 0.25 + s.depth * 0.75
        const x = x0 + p.x * par * 26
        const y = y0 + wave * par + p.y * par * 18

        // 亮度随深度与波相变化，形成"呼吸"的星云
        const pulse = 0.55 + 0.45 * Math.sin(time * 0.6 + s.phase)
        const alpha = (0.06 + s.depth * 0.5) * pulse

        // 近点偏冰白，远点偏电蓝 —— 冷色单调系统内的层次
        if (s.depth > 0.82) {
          ctx.fillStyle = `rgba(216, 234, 255, ${alpha * 0.9})`
        } else {
          ctx.fillStyle = `rgba(31, 88, 242, ${alpha})`
        }

        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    const onPointerMove = (e) => {
      if (coarse) return
      pointerRef.current.tx = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.ty = (e.clientY / window.innerHeight) * 2 - 1
    }

    resize()
    window.addEventListener('resize', resize)
    if (!coarse) window.addEventListener('pointermove', onPointerMove, { passive: true })

    if (reduced) {
      draw(0)
      cancelAnimationFrame(rafRef.current)
    } else {
      rafRef.current = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="pfield" aria-hidden="true" />
}

export default memo(ParticleFieldImpl)
