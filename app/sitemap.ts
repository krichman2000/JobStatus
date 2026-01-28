import { MetadataRoute } from 'next'
import { getAllJobSlugs } from '@/data/jobs'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://willmyjoblast.com'

  const jobSlugs = getAllJobSlugs()

  const jobPages = jobSlugs.map((slug) => ({
    url: `${baseUrl}/jobs/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...jobPages,
  ]
}
