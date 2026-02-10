import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://willmyjoblast.com'),
  title: {
    default: 'Will My Job Last? - Free AI Job Security Analyzer',
    template: '%s | Will My Job Last',
  },
  description: 'Free AI career impact analyzer. Get honest assessments of automation risk, job market outlook, and actionable tips to future-proof your career. Analyze 96+ jobs.',
  keywords: ['AI job impact', 'automation risk', 'career planning', 'job security', 'AI replacing jobs', 'future proof career'],
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YQ3WHK8CZZ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YQ3WHK8CZZ');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {children}
      </body>
    </html>
  )
}
