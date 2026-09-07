import { useState } from 'react'
import SectionHeader from './SectionHeader'

function NewsCard({ item, onOpenPaper }) {
  return (
    <article className="news-card">
      <p className="headline" lang="hi">{item.headline}</p>
      <p className="sub" lang="hi">{item.sub_headline}</p>
      <div className="meta-row">
        <span className="cat">{item.category}</span>
        <button className="page-badge" type="button" title={`Open page ${item.page_number}`} onClick={() => onOpenPaper(item.page_number)}>{item.page_number}</button>
      </div>
    </article>
  )
}

export default function NewsSection({ primaryNews, additionalNews, onOpenPaper }) {
  const [expanded, setExpanded] = useState(false)
  const stories = expanded ? [...primaryNews, ...additionalNews] : primaryNews

  return (
    <section className="section">
      <SectionHeader title="Today's news" count={`${primaryNews.length + additionalNews.length} stories`} />
      <div className="news-list">
        {stories.map((item, index) => <NewsCard key={`${item.headline}-${index}`} item={item} onOpenPaper={onOpenPaper} />)}
      </div>
      {!expanded && additionalNews.length > 0 && (
        <div className="see-more-row">
          <button className="btn" type="button" onClick={() => setExpanded(true)}>See more stories</button>
        </div>
      )}
    </section>
  )
}