function formatGeneratedAt(timestamp) {
  const generatedAt = Number(timestamp)
  if (!Number.isFinite(generatedAt)) return null

  const elapsedSeconds = Math.max(0, Math.floor(Date.now() / 1000 - generatedAt))
  if (elapsedSeconds < 60) return 'just now'

  const minutes = Math.floor(elapsedSeconds / 60)
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`

  const days = Math.floor(hours / 24)
  return `${days} day${days === 1 ? '' : 's'} ago`
}

export default function Masthead({ newspaper, generatedAt }) {
  const generatedLabel = formatGeneratedAt(generatedAt)

  return (
    <header className="masthead">
      <div className="rule" />
      <h1>Today's News</h1>
      <div className="hi-title">आज की ख़बर</div>
      <div className="date-line">
        <span>{newspaper?.date}</span>
      </div>
      {generatedLabel && <div className="generated-line">Generated {generatedLabel}</div>}
      <div className="byline">by <b>Ashish Agarwal</b></div>
    </header>
  )
}