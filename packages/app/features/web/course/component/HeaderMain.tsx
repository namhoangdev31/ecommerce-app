import React from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export const HeaderMain: React.FC<{
  searchQuery: string
  setSearchQuery: (query: string) => void
}> = ({ searchQuery, setSearchQuery }) => (
  <header className="sticky top-0 z-10 bg-gray-800 shadow">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold text-gray-100 sm:text-2xl">
        Fubao Course
      </h1>
      <div className="flex items-center">
        <div className="relative mr-2">
          <input
            type="text"
            placeholder="Search courses"
            className="w-32 rounded-md border border-gray-600 bg-gray-700 py-2 pl-8 pr-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <HiMagnifyingGlass className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
      </div>
    </div>
  </header>
)
