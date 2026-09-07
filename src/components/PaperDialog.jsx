import { useEffect } from 'react'

export default function PaperDialog({ pageNumber, onClose, pdfUrl }) {
  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const src = pageNumber ? `${pdfUrl}#page=${pageNumber}` : pdfUrl

  return (
    <div className="paper-dialog" role="dialog" aria-modal="true" aria-labelledby="paper-dialog-title" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <div className="paper-dialog-panel">
        <div className="paper-dialog-head">
          <div className="paper-dialog-title" id="paper-dialog-title">Today's e-paper</div>
          <button className="paper-close" type="button" aria-label="Close e-paper" onClick={onClose}>×</button>
        </div>
        <iframe className="paper-frame" src={src} title="Today's e-paper" />
      </div>
    </div>
  )
}