import { Fragment } from 'react'

/**
 * 把 "在无人注意的{缝隙}里" 解析成 React 节点，
 * 花括号内的词渲染为电蓝高亮 —— Atlantic 的签名手法：
 * 只高亮中性标题里的单个词，绝不整句上色。
 *
 * links: 可选，{ 高亮词: 'url' }，命中时把该词渲染为可点击链接（彩蛋入口）。
 */
export function parseAccent(str, links) {
  const parts = String(str).split(/(\{[^}]*\})/g).filter(Boolean)
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      const word = part.slice(1, -1)
      const href = links && links[word]
      if (href) {
        return (
          <a key={i} className="accent accent--link" href={href}>
            {word}
          </a>
        )
      }
      return (
        <span key={i} className="accent">
          {word}
        </span>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}

/** 按 \n 拆行，每行独立返回，便于做遮罩上推动画 */
export function splitLines(str) {
  return String(str).split('\n')
}
