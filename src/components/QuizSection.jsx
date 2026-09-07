import { useState } from 'react'
import SectionHeader from './SectionHeader'

function QuizCard({ question, index }) {
  const [selected, setSelected] = useState(null)
  const options = Object.entries(question.options)

  return (
    <article className={`quiz-card ${selected ? 'answered' : ''}`}>
      <div className="q-num">Question {index + 1}</div>
      <p className="q-en">{question.question.en}</p>
      <p className="q-hi" lang="hi">{question.question.hi}</p>
      <div className="options">
        {options.map(([letter, option]) => {
          const isCorrect = letter === question.answer
          const className = selected ? isCorrect ? 'option correct' : selected === letter ? 'option incorrect' : 'option dim' : 'option'
          return (
            <button className={className} type="button" key={letter} onClick={() => !selected && setSelected(letter)}>
              <span className="opt-letter">{letter.toUpperCase()}</span>
              <span className="opt-text"><span className="en">{option.en}</span><span className="hi" lang="hi">{option.hi}</span></span>
            </button>
          )
        })}
      </div>
    </article>
  )
}

export default function QuizSection({ questions }) {
  const [shown, setShown] = useState(5)
  const ids = Object.keys(questions)
  const visibleIds = ids.slice(0, shown)

  return (
    <section className="section">
      <SectionHeader title="Daily quiz" count={`${ids.length} questions`} />
      <div className="quiz-list">
        {visibleIds.map((id, index) => <QuizCard key={id} question={questions[id]} index={index} />)}
      </div>
      {shown < ids.length && (
        <div className="see-more-row">
          <button className="btn" type="button" onClick={() => setShown(current => Math.min(current + 5, ids.length))}>See more questions</button>
        </div>
      )}
    </section>
  )
}