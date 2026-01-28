'use client'

import { useState } from 'react'

interface JobInputProps {
  onSubmit: (jobTitle: string) => void
  isLoading: boolean
}

export default function JobInput({ onSubmit, isLoading }: JobInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim() && !isLoading) {
      onSubmit(value.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g., Software Engineer, Nurse, Accountant"
          className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-slate-800 placeholder:text-slate-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>
    </form>
  )
}
