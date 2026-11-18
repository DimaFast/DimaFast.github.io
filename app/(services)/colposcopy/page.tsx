import { notFound } from 'next/navigation'
import { ServiceDetailPage } from '@/components/service-detail'
import { getServicePage } from '@/content/service-details'
import { pageMetadata } from '@/lib/seo'

const slug = 'colposcopy'

export const metadata = pageMetadata(slug)

export default function Page() {
  const service = getServicePage(slug)
  if (!service) notFound()

  return <ServiceDetailPage service={service} />
}
