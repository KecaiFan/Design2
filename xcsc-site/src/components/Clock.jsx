import { useEffect, useState } from 'react'

// 取北京时间（UTC+8），每秒刷新
function formatBeijing(now) {
  const timeParts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(now)
  const get = (t) => timeParts.find((p) => p.type === t)?.value ?? '00'

  const dateParts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(now)
  const g = (t) => dateParts.find((p) => p.type === t)?.value ?? ''
  const date = `${g('year')}-${g('month')}-${g('day')} ${g('weekday')}`

  return { time: `${get('hour')}:${get('minute')}:${get('second')}`, date }
}

export default function Clock() {
  const [t, setT] = useState(() => formatBeijing(new Date()))

  useEffect(() => {
    const id = setInterval(() => setT(formatBeijing(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="hero__clock mono" aria-label="北京时间">
      <span className="hero__clock-k">北京时间</span>
      <span className="hero__clock-v">{t.time}</span>
      <span className="hero__clock-date">{t.date}</span>
    </div>
  )
}
