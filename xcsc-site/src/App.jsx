import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function App() {
  // 字体加载完成后刷新 ScrollTrigger —— 否则 pin 的距离会按 fallback 字体算错
  useEffect(() => {
    if (!document.fonts) return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <a href="#about" className="skip-link">
        跳到主要内容
      </a>
      <Nav />
      <main>
        <Hero />
        <div className="rule-wrap">
          <div className="shell">
            <div className="rule" />
          </div>
        </div>
        <About />
        <div className="rule-wrap">
          <div className="shell">
            <div className="rule" />
          </div>
        </div>
        <Projects />
        <Contact />
      </main>
    </>
  )
}
