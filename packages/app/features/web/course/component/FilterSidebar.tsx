"use client";

import { IoFilterCircleOutline } from 'react-icons/io5'
export const categories = [
  'All',
  'Computer Science',
  'Business',
  'Data Science',
  'Language Learning',
  'Arts and Humanities',
]
export const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']
export const FilterSidebar: React.FC<{
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedLevel: string
  setSelectedLevel: (level: string) => void
}> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedLevel,
  setSelectedLevel,
}) => (
  <div className="sticky top-24 mr-4 flex h-fit flex-col gap-4 overflow-visible rounded-lg bg-gray-700 p-6 shadow-lg hidden md:flex">
    <div className="mb-2 flex flex-row items-center gap-2">
      <h3 className="text-xl font-semibold text-gray-100">Course Filters</h3>
      <IoFilterCircleOutline size={24} className="text-blue-400" />
    </div>

    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-300">Categories</h4>
        <select
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-300">Sort by</h4>
        <select
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-300">
          Price Range (VND)
        </h4>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="550"
            step="1"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-300">
            <span>$0</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-gray-300">Level</h4>
        <select
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-gray-100 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
)
