import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from './SectionLabel'
import { about } from '../content/site'
import { parseAccent, splitLines } from '../lib/text'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const root = useRef(null)
  const track = useRef(null)
  const rail = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ---- 通用揭示动画（所有断点 + 减动效兜底） ---- */
      mm.add(
        {
          motionOk: '(prefers-reduced-motion: no-preference)',
          reduced: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const { motionOk } = ctx.conditions
          if (!motionOk) {
            gsap.set('.about__line-inner, .about__para, .about__track', { autoAlpha: 1, y: 0, yPercent: 0 })
            return
          }

          gsap.from('.about__line-inner', {
            yPercent: 106,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.about__head', start: 'top 78%' },
          })

          gsap.from('.about__para', {
            autoAlpha: 0,
            y: 22,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: { trigger: '.about__body', start: 'top 80%' },
          })

          gsap.from('.about__track', {
            autoAlpha: 0,
            y: 18,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.07,
            scrollTrigger: { trigger: '.about__tracks', start: 'top 85%' },
          })
        }
      )

      /* ---- 时间线：横向 pin 推进（仅桌面端） ---- */
      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const el = track.current
          const railEl = rail.current
          if (!el || !railEl) return

          // 轨道左缘相对 .tl 的偏移（= shell 左内边距 PL）。末卡需滚动到与首卡
          // 对称的右内边距处（右缘距 .tl 右缘也为 PL），否则会被 overflow:hidden 裁掉。
          let _n = railEl
          let railLeft = 0
          while (_n && _n !== el) {
            railLeft += _n.offsetLeft
            _n = _n.offsetParent
          }
          const distance = () =>
            Math.max(0, railEl.scrollWidth - (el.clientWidth - 2 * railLeft))

          const tween = gsap.to(railEl, {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: () => '+=' + distance(),
              pin: true,
              scrub: 0.8,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          })

          // 进度条随横向推进填充
          gsap.to('.tl__progress-fill', {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top top',
              end: () => '+=' + distance(),
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })

          return () => tween.kill()
        }
      )

      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="about" className="about" ref={root}>
      <div className="shell">
        <SectionLabel index={about.index} text={about.label} meta={about.meta} />

        <div className="about__head">
          <h2 className="about__title display">
            {splitLines(about.title).map((line, i) => (
              <span className="about__line" key={i}>
                <span className="about__line-inner">{parseAccent(line)}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="about__body">
          <div className="about__prose">
            {about.paragraphs.map((p, i) => (
              <p className="about__para" key={i}>
                {p}
              </p>
            ))}
          </div>

          <aside className="about__tracks" aria-label="技术方向">
            <p className="about__tracks-cap mono">TECHNICAL TRACKS · 07</p>
            {about.tracks.map((t, i) => (
              <div className="about__track" key={t.code}>
                <span className="about__track-code mono">{String(i + 1).padStart(2, '0')}</span>
                <div className="about__track-main">
                  <div className="about__track-top">
                    <span className="about__track-name">{t.name}</span>
                    <span className="tag tag--accent">{t.code}</span>
                  </div>
                  <p className="about__track-desc muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </div>

      {/* ---- 横向时间线 ---- */}
      <div className="tl" ref={track}>
        <div className="tl__inner shell">
          <div className="tl__head">
            <span className="mono">GROWTH TIMELINE</span>
            <div className="tl__progress" aria-hidden="true">
              <span className="tl__progress-fill" />
            </div>
            <span className="mono tl__hint">向下滚动以推进 →</span>
          </div>

          <div className="tl__rail" ref={rail}>
            {about.timeline.map((item, i) => (
              <article className="tlcard" key={item.year + i}>
                <div className="tlcard__top">
                  <span className="tlcard__year display">{item.year}</span>
                  <span className="tag">{item.tag}</span>
                </div>
                <div className="tlcard__node" aria-hidden="true">
                  <span className="tlcard__dot" />
                  <span className="tlcard__wire" />
                </div>
                <h3 className="tlcard__title">{item.title}</h3>
                <p className="tlcard__body muted">{item.body}</p>
                <span className="tlcard__idx mono">{String(i + 1).padStart(2, '0')} / {String(about.timeline.length).padStart(2, '0')}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
