import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from './SectionLabel'
import ProjectArt from './ProjectArt'
import { projects } from '../content/site'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // 标题揭示
        gsap.from('.pj__title-inner', {
          yPercent: 106,
          duration: 1.05,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.pj__head', start: 'top 80%' },
        })
        gsap.from('.pj__lede', {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.pj__head', start: 'top 78%' },
        })

        // 卡片入场
        gsap.utils.toArray('.pcard').forEach((card) => {
          gsap.from(card, {
            autoAlpha: 0,
            y: 42,
            duration: 0.95,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 88%' },
          })

          // 视觉层 scrub 视差 —— 只动 transform
          const art = card.querySelector('.pcard__media')
          if (art) {
            gsap.fromTo(
              art,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              }
            )
          }
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.pcard, .pj__lede, .pj__title-inner', { autoAlpha: 1, y: 0, yPercent: 0 })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="projects" className="pj" ref={root}>
      <div className="shell">
        <SectionLabel index={projects.index} text={projects.label} meta={projects.meta} />

        <div className="pj__head">
          <h2 className="pj__title display">
            <span className="pj__title-line">
              <span className="pj__title-inner">{projects.title}</span>
            </span>
          </h2>
          <p className="pj__lede muted">{projects.lede}</p>
        </div>

        <div className="pj__grid">
          {projects.items.map((p) => (
            <article className={`pcard ${p.featured ? 'pcard--wide' : ''}`} key={p.id}>
              <div className="pcard__media">
                <ProjectArt variant={p.art} />
              </div>

              <div className="pcard__scrim" aria-hidden="true" />

              <div className="pcard__content">
                <div className="pcard__meta">
                  <span className="mono pcard__year">{p.year}</span>
                  <span className="pcard__sep" aria-hidden="true" />
                  <span className="mono pcard__sub">{p.subtitle}</span>
                </div>

                <h3 className="pcard__event">{p.event}</h3>

                <div className="pcard__result">
                  <span className="pcard__result-mark" aria-hidden="true" />
                  {p.result}
                </div>

                <p className="pcard__note muted">{p.note}</p>

                <div className="pcard__foot">
                  <div className="pcard__tags">
                    {p.tracks.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="pcard__stat">
                    <span className="mono">{p.stat.k}</span>
                    <span className="pcard__stat-v display">{p.stat.v}</span>
                  </div>
                </div>
              </div>

              {/* 四角取景标记 */}
              <span className="pcard__corner pcard__corner--tl" aria-hidden="true" />
              <span className="pcard__corner pcard__corner--br" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
