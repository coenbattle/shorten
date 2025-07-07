import { nanoid } from 'nanoid'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { url } = req.body
  if (!url) return res.status(400).json({ error: 'Missing URL' })

  const slug = nanoid(6)

  const { error } = await supabase
    .from('links')
    .insert([{ slug, url }])

  if (error) return res.status(500).json({ error: error.message })

  res.status(200).json({ slug })
}
