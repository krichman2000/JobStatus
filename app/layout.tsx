import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jobstatus - AI Job Security Analyzer',
  description: 'Discover how AI might impact your career and learn actionable steps to stay ahead.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {children}
      </body>
    </html>
  )
}
