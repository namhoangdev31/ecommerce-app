import React from 'react'
import {
  categories,
  levels,
} from 'app/features/web/course/component/FilterSidebar'

export const FilterModal: React.FC<{
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedLevel: string
  setSelectedLevel: (level: string) => void
  isOpen: boolean
  closeModal: () => void
}> = ({
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedLevel,
  setSelectedLevel,
  isOpen,
  closeModal,
}) => (
  <div
    className={`fixed inset-0 z-50 overflow-y-auto lg:hidden ${
      isOpen ? 'block' : 'hidden'
    }`}
  >
    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span
        className="hidden sm:inline-block sm:h-screen sm:align-middle"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block transform overflow-hidden rounded-lg bg-gray-800 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div className="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3
                className="text-lg font-medium leading-6 text-gray-100"
                id="modal-title"
              >
                Bộ lọc khóa học
              </h3>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-100">
                    Chủ đề
                  </h4>
                  <select
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  <h4 className="mb-1 text-sm font-semibold text-gray-100">
                    Sắp xếp theo
                  </h4>
                  <select
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="popularity">Phổ biến nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                    <option value="price_low">Giá thấp đến cao</option>
                    <option value="price_high">Giá cao đến thấp</option>
                  </select>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-100">
                    Khoảng giá (VNĐ)
                  </h4>
                  <div className="flex items-center justify-between">
                    <input
                      type="range"
                      min="0"
                      max="550"
                      step="0.5"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      ${priceRange[0].toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <input
                      type="range"
                      min="0"
                      max="550"
                      step="0.5"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      ${priceRange[1].toLocaleString()}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-semibold text-gray-100">
                    Trình độ
                  </h4>
                  <select
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          </div>
        </div>
        <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Áp dụng
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-gray-700 px-4 py-2 text-base font-medium text-gray-100 shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={closeModal}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
)
