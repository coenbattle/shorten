import { createClient } from '@supabase/supabase-js'

export async function getServerSideProps({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )

  const { data, error } = await supabase
    .from('links')
    .select('url')
    .eq('slug', params.slug)
    .single()

  if (data?.url) {
    return {
      redirect: {
        destination: data.url,
        permanent: false,
      },
    }
  }

  return {
    notFound: true,
  }
}

export default function RedirectPage() {
  return null
}
