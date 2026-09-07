import SectionHeader from './SectionHeader'

export default function ThoughtSection({ thought }) {
  return (
    <section className="section">
      <SectionHeader title="Thought for the day" />
      <div className="vichar-card">
        <div className="mark">“</div>
        {thought.en && <p className="en">{thought.en}</p>}
        <p className="hi" lang="hi">{thought.hi}</p>
        {thought.author && <div className="author">— {thought.author}</div>}
      </div>
    </section>
  )
}