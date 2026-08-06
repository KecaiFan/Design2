import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import ParticleField from './ParticleField'
import Clock from './Clock'
import { hero, brand } from '../content/site'
import { parseAccent, splitLines } from '../lib/text'

export default function Hero() {
  const root = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        gsap.set('[data-hero-anim]', { autoAlpha: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        delay: 0.15,
      })

      tl.from('.hero__eyebrow', { autoAlpha: 0, y: 12, duration: 0.8 })
        // 逐行遮罩上推 —— 每行在 overflow:hidden 容器内
        .from(
          '.hero__line-inner',
          { yPercent: 108, duration: 1.15, stagger: 0.09 },
          '-=0.5'
        )
        .from('.hero__lede', { autoAlpha: 0, y: 16, duration: 0.9 }, '-=0.75')
        .from('.hero__actions > *', { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 }, '-=0.6')
        .from(
          '.hero__readout',
          { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.07 },
          '-=0.5'
        )
        .from('.hero__frame', { autoAlpha: 0, duration: 1.2 }, '-=1.0')
        .from('.hero__scroll', { autoAlpha: 0, y: -10, duration: 0.6 }, '-=0.4')

      return () => tl.kill()
    },
    { scope: root }
  )

  const lines = splitLines(hero.headline)

  return (
    <section id="hero" className="hero" ref={root}>
      {/* 背景层：有真实视频时用视频，否则回退到粒子观测场 */}
      <div className="hero__bg" aria-hidden="true">
        {hero.videoSrc ? (
          <video
            className="hero__video"
            src={hero.videoSrc}
            poster={hero.poster || undefined}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <ParticleField />
        )}
        <div className="hero__scrim" />
        <div className="hero__grid" />
        <div className="hero__scan" />
      </div>

      {/* 四角线框标记 —— "看进某个东西"的取景框语义 */}
      <div className="hero__frame" aria-hidden="true">
        <span className="hero__corner hero__corner--tl" />
        <span className="hero__corner hero__corner--tr" />
        <span className="hero__corner hero__corner--bl" />
        <span className="hero__corner hero__corner--br" />
      </div>

      <Clock />

      <div className="hero__inner shell">
        <p className="hero__eyebrow mono">
          <span className="hero__pip" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className="hero__title display">
          {lines.map((line, i) => (
            <span className="hero__line" key={i}>
              <span className="hero__line-inner">{parseAccent(line, hero.accentLinks)}</span>
            </span>
          ))}
        </h1>

        <p className="hero__lede muted">{hero.lede}</p>

        <div className="hero__actions">
          <a href={hero.primaryCta.href} className="btn-outline">
            {hero.primaryCta.label}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
          <a href={hero.secondaryCta.href} className="btn-ghost">
            {hero.secondaryCta.label}
          </a>
          <a
            href={hero.tertiaryCta.href}
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.tertiaryCta.label}
          </a>
          <a
            href={hero.quaternaryCta.href}
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.quaternaryCta.label}
          </a>
        </div>
      </div>

      {/* 底部读数条 —— 仪器面板语义 */}
      <div className="hero__readouts">
        <div className="hero__readouts-inner shell">
          {hero.readouts.map((r) => (
            <div className="hero__readout" key={r.k}>
              <span className="hero__readout-k mono">{r.k}</span>
              <span className="hero__readout-v">{r.v}</span>
            </div>
          ))}
          <div className="hero__readout hero__readout--wide">
            <span className="hero__readout-k mono">CHARTER</span>
            <span className="hero__readout-note">{brand.charter}</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-box">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 0V10M5 10L1 6M5 10L9 6" stroke="currentColor" strokeWidth="1" />
          </svg>
        </span>
        <span className="mono">SCROLL</span>
      </div>
    </section>
  )
}
