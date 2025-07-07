import fs from 'fs'
import path from 'path'

export async function getServerSideProps({ params }) {
  const linksPath = path.join(process.cwd(), 'links.json')
  const links = JSON.parse(fs.readFileSync(linksPath, 'utf8'))
  const url = links[params.slug]

  if (url) {
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    }
  }

  return { notFound: true }
}

export default function RedirectPage() {
  return null
}
