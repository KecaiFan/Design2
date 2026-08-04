import { useEffect, useRef, useState } from 'react'
import { brand, nav } from '../content/site'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 当前区块高亮 —— IntersectionObserver 比 scroll 计算更省
  useEffect(() => {
    const ids = nav.map((n) => n.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const jump = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav__inner shell">
        <a href="#hero" className="brandmark" onClick={(e) => jump(e, 'hero')}>
          <img src="/logo.png" alt="XCSC 标志" className="brandmark__logo" />
          <span className="brandmark__word">{brand.abbr}</span>
          <span className="brandmark__sub">{brand.nameCn}</span>
        </a>

        <nav className="nav__links" aria-label="主导航">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => jump(e, item.id)}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
            >
              <span className="nav__dot" aria-hidden="true" />
              {item.label}
            </a>
          ))}
        </nav>

        <a href="#contact" className="btn-outline" onClick={(e) => jump(e, 'contact')}>
          联系我们
        </a>
      </div>
      <div className="nav__rule" />
    </header>
  )
}
