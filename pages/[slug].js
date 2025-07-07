import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function getServerSideProps({ params }) {
  const { slug } = params

  const { data, error } = await supabase
    .from('links')
    .select('url')
    .eq('slug', slug)
    .single()

  console.log('Redirect lookup:', { slug, data, error })

  if (data?.url) {
    return {
      redirect: {
        destination: data.url,
        permanent: false,
      },
    }
  }

  return { notFound: true }
}

export default function RedirectPage() {
  return null
}
