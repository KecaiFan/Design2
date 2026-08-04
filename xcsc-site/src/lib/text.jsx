import { Fragment } from 'react'

/**
 * 把 "在无人注意的{缝隙}里" 解析成 React 节点，
 * 花括号内的词渲染为电蓝高亮 —— Atlantic 的签名手法：
 * 只高亮中性标题里的单个词，绝不整句上色。
 */
export function parseAccent(str) {
  const parts = String(str).split(/(\{[^}]*\})/g).filter(Boolean)
  return parts.map((part, i) =>
    part.startsWith('{') && part.endsWith('}') ? (
      <span key={i} className="accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  )
}

/** 按 \n 拆行，每行独立返回，便于做遮罩上推动画 */
export function splitLines(str) {
  return String(str).split('\n')
}
