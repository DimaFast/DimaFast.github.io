import { Hero } from '@/components/hero'
import { Reviews } from '@/components/reviews'
import { HomeServices } from '@/components/home-sections'
import { About } from '@/components/about'
import { Consultation } from '@/components/consultation'
import { Contacts } from '@/components/contacts'
import { Blog } from '@/components/blog'
import { Doctors } from '@/components/doctors'
import { StructuredData } from '@/components/structured-data'
import { pageMetadata } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMetadata()

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  '@id': `${site.url}/#medical-center`,
  name: site.name,
  url: site.url,
  image: `${site.url}/share-logo.png`,
  telephone: site.telephone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'вул. Подільська, 10',
    addressLocality: 'Хмельницький',
    addressRegion: 'Хмельницька область',
    postalCode: '29000',
    addressCountry: 'UA',
  },
  hasMap: site.directions,
  medicalSpecialty: ['https://schema.org/Gynecologic', 'https://schema.org/Oncologic'],
  sameAs: ['https://www.instagram.com/verbena.med/'],
}

export default function Home() {
  return (
    <>
      <StructuredData data={structuredData} />
      <Hero />
      <HomeServices />
      <About />
      <Doctors />
      <Consultation withBenefits />
      <Reviews />
      <Blog />
      <Contacts />
    </>
  )
}
