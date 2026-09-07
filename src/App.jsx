import { useState } from 'react'
import data from './data.json'
import newspaperPdf from '../newspaper-07092026.pdf'
import Masthead from './components/Masthead'
import NewsSection from './components/NewsSection'
import PaperDialog from './components/PaperDialog'
import QuizSection from './components/QuizSection'
import ThoughtSection from './components/ThoughtSection'

export default function App() {
  const [paperPage, setPaperPage] = useState(null)
  const openPaper = pageNumber => setPaperPage(pageNumber || 0)
  const closePaper = () => setPaperPage(null)

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
      {paperPage !== null && <PaperDialog pageNumber={paperPage} onClose={closePaper} pdfUrl={newspaperPdf} />}
    </>
  )
}