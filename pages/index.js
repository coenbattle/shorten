import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [shortLink, setShortLink] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('/api/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
    const data = await res.json()
    if (data.slug) {
      setShortLink(window.location.origin + '/' + data.slug)
    } else {
      alert(data.error || 'Something went wrong')
    }
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🔗 URL Shortener (Supabase)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter a long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Shorten</button>
      </form>
      {shortLink && (
        <p style={{ marginTop: '1rem' }}>
          Short link: <a href={shortLink} target="_blank">{shortLink}</a>
        </p>
      )}
    </main>
  )
}
