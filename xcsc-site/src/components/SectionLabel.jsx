export default function SectionLabel({ index, text, meta }) {
  return (
    <div className="slabel">
      <span className="slabel__idx">{index}</span>
      <span className="slabel__text">{text}</span>
      {meta ? <span className="slabel__meta">{meta}</span> : null}
    </div>
  )
}
