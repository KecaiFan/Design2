import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from './SectionLabel'
import ParticleField from './ParticleField'
import { contact, brand } from '../content/site'
import { parseAccent, splitLines } from '../lib/text'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.ct__line-inner', {
          yPercent: 108,
          duration: 1.15,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: { trigger: '.ct__head', start: 'top 82%' },
        })
        gsap.from('.ct__lede, .ct__row, .ct__recruit-item', {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '.ct__body', start: 'top 85%' },
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.ct__line-inner, .ct__lede, .ct__row, .ct__recruit-item', {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
        })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="contact" className="ct" ref={root}>
      <div className="ct__bg" aria-hidden="true">
        <ParticleField />
        <div className="ct__scrim" />
      </div>

      <div className="ct__inner shell">
        <SectionLabel index={contact.index} text={contact.label} meta={contact.meta} />

        <div className="ct__head">
          <h2 className="ct__title display">
            {splitLines(contact.title).map((line, i) => (
              <span className="ct__line" key={i}>
                <span className="ct__line-inner">{parseAccent(line)}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="ct__body">
          <div className="ct__left">
            <p className="ct__lede muted">{contact.lede}</p>

            <ul className="ct__recruit">
              {contact.recruit.map((r) => (
                <li className="ct__recruit-item" key={r.k}>
                  <span className="mono">{r.k}</span>
                  <span className="ct__recruit-v">{r.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="ct__right">
            {contact.channels.map((c) => {
              const Inner = (
                <>
                  <span className="mono ct__row-k">{c.k}</span>
                  <span className="ct__row-v">{c.v}</span>
                  <span className="ct__row-arrow" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </>
              )
              return c.href ? (
                <a className="ct__row ct__row--link" key={c.k} href={c.href}>
                  {Inner}
                </a>
              ) : (
                <div className="ct__row" key={c.k}>
                  {Inner}
                </div>
              )
            })}
          </div>
        </div>

        <footer className="ct__foot">
          <div className="ct__foot-left">
            <img src="/logo.png" alt="XCSC 标志" className="ct__logo" />
            <div className="ct__foot-stack">
              <span className="brandmark__word">{brand.abbr}</span>
              <span className="mono">{brand.nameEn}</span>
            </div>
          </div>
          <div className="ct__foot-mid mono">
            {brand.governedBy.join(' · ')}
          </div>
          <div className="ct__foot-right mono">
            © {new Date().getFullYear()} {brand.abbr}
          </div>
        </footer>

        <p className="ct__disclaimer mono">{contact.footNote}</p>
      </div>
    </section>
  )
}
