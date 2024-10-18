"use client";

import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

export const Pagination: React.FC<{
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="mt-6 flex items-center justify-center space-x-2">
    <button
      className="rounded-md bg-gray-700 p-2 text-gray-100 transition duration-300 hover:bg-gray-600 disabled:opacity-50"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      <HiChevronLeft className="h-5 w-5" />
    </button>
    <span className="text-sm text-gray-400">
      Trang {currentPage} / {totalPages}
    </span>
    <button
      className="rounded-md bg-gray-700 p-2 text-gray-100 transition duration-300 hover:bg-gray-600 disabled:opacity-50"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      <HiChevronRight className="h-5 w-5" />
    </button>
  </div>
)
