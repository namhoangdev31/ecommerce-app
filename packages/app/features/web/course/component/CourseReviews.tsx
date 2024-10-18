'use client'

import { HiStar } from 'react-icons/hi2'
export interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
}

export const CourseReviews = ({ reviews }: { reviews: Review[] }) => (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-semibold text-gray-100">
      Student Reviews
    </h2>
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border-b border-gray-700 pb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-gray-200">{review.userName}</span>
            <div className="flex items-center">
              <HiStar className="mr-1 h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">{review.rating}</span>
            </div>
          </div>
          <p className="text-gray-300">{review.comment}</p>
          <span className="text-sm text-gray-400">{review.date}</span>
        </div>
      ))}
    </div>
  </div>
)
