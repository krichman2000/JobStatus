import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Browse All Jobs - AI Impact Analysis | Will My Job Last',
  description: 'Explore AI impact assessments for 96+ careers. Filter by risk level and find detailed analysis for any job to plan your future.',
  alternates: {
    canonical: '/jobs',
  },
}

export default function JobsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
