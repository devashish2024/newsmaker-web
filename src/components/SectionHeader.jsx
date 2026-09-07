export default function SectionHeader({ title, count }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {count && <span className="count">{count}</span>}
    </div>
  )
}