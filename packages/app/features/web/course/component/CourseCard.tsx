"use client";

import React from 'react'
import {
  HiAcademicCap,
  HiArrowsUpDown,
  HiBookmark,
  HiClock,
  HiDocumentText,
  HiShare,
  HiStar,
} from 'react-icons/hi2'
import { Course } from 'app/features/web/course/types/course'

export const CourseCard: React.FC<{
  course: Course
  handleEnroll: (courseId: number) => void
  handleSaveCourse: (courseId: number) => void
  handleShareCourse: (courseId: number) => void
  savedCourses: number[]
}> = ({
  course,
  handleEnroll,
  handleSaveCourse,
  handleShareCourse,
  savedCourses,
}) => (
  <div className="flex flex-col overflow-hidden rounded-lg bg-gray-800 shadow">
    <div className="relative h-32 w-full bg-gray-700 sm:h-40">
      <span className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
        Course Image {course.id}
      </span>
    </div>
    <div className="flex flex-grow flex-col justify-between p-4">
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-100 sm:text-base">
          {course.title}
        </h3>
        <p className="mb-3 text-xs text-gray-400 sm:text-sm">
          {course.category}
        </p>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <HiDocumentText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.lessons} lessons</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <HiClock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.duration}</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <HiAcademicCap className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.instructor}</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <HiStar className="mr-2 h-3 w-3 text-yellow-400 sm:h-4 sm:w-4" />
          <span>
            {course.rating} ({course.enrolled} enrolled)
          </span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <HiArrowsUpDown className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.level}</span>
        </div>
        <div className="mb-3 flex items-center text-xs text-gray-400 sm:text-sm">
          <span className="text-sm font-semibold text-gray-100 sm:text-base">
            ${course.price.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="mr-2 flex-grow rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-gray-100 transition duration-300 hover:bg-blue-700 sm:px-4 sm:py-2 sm:text-sm"
          onClick={() => handleEnroll(course.id)}
        >
          Enroll Now
        </button>
        <button
          className={`rounded-md p-1 transition duration-300 sm:p-2 ${
            savedCourses.includes(course.id)
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
          onClick={() => handleSaveCourse(course.id)}
        >
          <HiBookmark className="h-4 w-4 text-gray-100 sm:h-5 sm:w-5" />
        </button>
        <button
          className="ml-2 rounded-md bg-gray-700 p-1 transition duration-300 hover:bg-gray-600 sm:p-2"
          onClick={() => handleShareCourse(course.id)}
        >
          <HiShare className="h-4 w-4 text-gray-100 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  </div>
)
