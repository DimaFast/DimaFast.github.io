import type { MetadataRoute } from 'next'
import { pageSlugs } from '@/lib/seo'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/` }, ...pageSlugs.map((slug) => ({ url: `${site.url}/${slug}/` }))]
}
