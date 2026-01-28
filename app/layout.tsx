import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Will My Job Last - AI Job Security Analyzer',
  description: 'Discover how AI might impact your career and learn actionable steps to stay ahead.',
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
