import { About } from '@/components/about'
import { Consultation } from '@/components/consultation'
import { pageMetadata } from '@/lib/seo'

const slug = 'about-the-clinic'

export const metadata = pageMetadata(slug)

export default function Page() {
  return (
    <>
      <About standalone />
      <Consultation />
    </>
  )
}
