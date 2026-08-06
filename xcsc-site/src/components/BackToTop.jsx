import { useEffect, useState } from 'react'

// 滚动到接近页面底部时浮现「返回首页」按钮，点击直接跳转网站首页
export default function BackToTop() {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    let ticking = false
    const check = () => {
      // 距底部 400px 内即视为「划到最后」
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 400
      setShown(nearBottom)
      ticking = false
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(check)
      }
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const toTop = () => {
    // 直接跳转网站首页（兼容根目录与子路径部署）
    window.location.href = '.'
  }

  return (
    <button
      type="button"
      className={`to-top${shown ? ' is-shown' : ''}`}
      onClick={toTop}
      aria-label="返回首页"
      tabIndex={shown ? 0 : -1}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path
          d="M12 5l-7 7m7-7l7 7m-7-7v14"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
