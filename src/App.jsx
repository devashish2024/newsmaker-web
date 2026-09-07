import { useEffect, useState } from 'react'
import Masthead from './components/Masthead'
import NewsSection from './components/NewsSection'
import PaperDialog from './components/PaperDialog'
import QuizSection from './components/QuizSection'
import ThoughtSection from './components/ThoughtSection'

const DATA_URL = 'https://news.ashish.top/data/today'
const NEWSPAPER_PDF_URL = 'https://news.ashish.top/newspaper/today.pdf'

export default function App() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [paperPage, setPaperPage] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(DATA_URL, { cache: 'no-store', signal: controller.signal })
      .then(response => {
        if (!response.ok) throw new Error(`News data request failed (${response.status})`)
        return response.json()
      })
      .then(setData)
      .catch(requestError => {
        if (requestError.name !== 'AbortError') setError(requestError)
      })

    return () => controller.abort()
  }, [])

  const openPaper = pageNumber => setPaperPage(pageNumber || 0)
  const closePaper = () => setPaperPage(null)

  if (error) {
    return <main className="wrap"><p role="alert">Unable to load today’s news. Please try again later.</p></main>
  }

  if (!data) {
    return <main className="wrap"><p aria-live="polite">Loading today’s news…</p></main>
  }

  return (
    <>
      <main className="wrap">
        <Masthead newspaper={data.newspaper} generatedAt={data.generated_at} />
        <div className="epaper-row">
          <button className="btn btn-primary btn-block" type="button" onClick={() => openPaper()}>Open today's e-paper</button>
        </div>
        <NewsSection primaryNews={data.top_10} additionalNews={data.see_all || []} onOpenPaper={openPaper} />
        <QuizSection questions={data.mcqs} />
        <ThoughtSection thought={data.subh_vichar} />
      </main>
      {paperPage !== null && <PaperDialog pageNumber={paperPage} onClose={closePaper} pdfUrl={NEWSPAPER_PDF_URL} />}
    </>
  )
}