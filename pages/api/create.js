import fs from 'fs'
import path from 'path'
import { nanoid } from 'nanoid'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'Missing URL' })

    const linksPath = path.join(process.cwd(), 'links.json')
    const links = JSON.parse(fs.readFileSync(linksPath, 'utf8'))
    const slug = nanoid(6)
    links[slug] = url
    fs.writeFileSync(linksPath, JSON.stringify(links, null, 2))

    res.status(200).json({ short: slug })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
