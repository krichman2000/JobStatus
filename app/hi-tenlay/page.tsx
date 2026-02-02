import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hi Tenlay',
  robots: 'noindex, nofollow',
}

export default function HiTenlayPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Hi Tenlay
        </h1>
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          &larr; Back to home
        </Link>
      </div>
    </main>
  )
}
