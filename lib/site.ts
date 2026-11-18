import homepage from '@/content/homepage.json'
import detailPages from '@/content/detail-pages.json'

export { navigation, site, socials } from '@/lib/clinic'

export type Card = { title: string; description: string; image: string; slug: string }
export type TextBlock = { type: string; text: string | string[] }
export type DetailPage = {
  title: string
  heading: string
  kind: string
  image?: string
  blocks: TextBlock[]
}

export const { about, blog, doctors, services, benefits, reviews } = homepage
export const details: Record<string, DetailPage> = detailPages
