"use client";

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { create } from 'zustand'
import { FilterSidebar, levels } from './component/FilterSidebar'
import { FilterModal } from 'app/features/web/course/component/FilterModal'
import { Pagination } from 'app/features/web/course/component/Pagination'
import { CourseCard } from 'app/features/web/course/component/CourseCard'
import { Course } from 'app/features/web/course/types/course'
import { HeaderMain } from 'app/features/web/course/component/HeaderMain'

interface CourseState {
  selectedCategory: string
  searchQuery: string
  sortBy: string
  courses: Course[]
  loading: boolean
  priceRange: [number, number]
  selectedLevel: string
  savedCourses: number[]
  currentPage: number
  itemsPerPage: number
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: string) => void
  setCourses: (courses: Course[]) => void
  setLoading: (loading: boolean) => void
  setPriceRange: (range: [number, number]) => void
  setSelectedLevel: (level: string) => void
  setSavedCourses: (savedCourses: number[]) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
}

// Zustand store
const useCourseStore = create<CourseState>((set) => ({
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'popularity',
  courses: [],
  loading: true,
  priceRange: [0, 1000],
  selectedLevel: 'All',
  savedCourses: [],
  currentPage: 1,
  itemsPerPage: 9,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setCourses: (courses) => set({ courses }),
  setLoading: (loading) => set({ loading }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  setSavedCourses: (savedCourses) => set({ savedCourses }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}))

// Header component

const CourseScreen: React.FC = () => {
  const router = useRouter()
  const {
    selectedCategory,
    searchQuery,
    sortBy,
    courses,
    loading,
    priceRange,
    selectedLevel,
    savedCourses,
    currentPage,
    itemsPerPage,
    setSelectedCategory,
    setSearchQuery,
    setSortBy,
    setCourses,
    setLoading,
    setPriceRange,
    setSelectedLevel,
    setSavedCourses,
    setCurrentPage,
  } = useCourseStore()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true)
      const response: Course[] = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                title: 'Introduction to React',
                category: 'Computer Science',
                lessons: 12,
                duration: '6 weeks',
                instructor: 'John Doe',
                rating: 4.8,
                enrolled: 1500,
                price: 49.99,
                level: 'Beginner',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 2,
                title: 'Advanced JavaScript Concepts',
                category: 'Computer Science',
                lessons: 15,
                duration: '8 weeks',
                instructor: 'Jane Smith',
                rating: 4.9,
                enrolled: 2000,
                price: 79.99,
                level: 'Advanced',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 3,
                title: 'Data Science Fundamentals',
                category: 'Data Science',
                lessons: 10,
                duration: '5 weeks',
                instructor: 'Alice Johnson',
                rating: 4.7,
                enrolled: 1200,
                price: 59.99,
                level: 'Intermediate',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 4,
                title: 'Business Strategy',
                category: 'Business',
                lessons: 8,
                duration: '4 weeks',
                instructor: 'Robert Brown',
                rating: 4.6,
                enrolled: 800,
                price: 39.99,
                level: 'Beginner',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 5,
                title: 'Spanish for Beginners',
                category: 'Language Learning',
                lessons: 20,
                duration: '10 weeks',
                instructor: 'Maria Garcia',
                rating: 4.9,
                enrolled: 2500,
                price: 69.99,
                level: 'Beginner',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 6,
                title: 'French for Intermediate Learners',
                category: 'Language Learning',
                lessons: 18,
                duration: '9 weeks',
                instructor: 'Pierre Dubois',
                rating: 4.7,
                enrolled: 1800,
                price: 74.99,
                level: 'Intermediate',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 7,
                title: 'Digital Marketing Essentials',
                category: 'Marketing',
                lessons: 14,
                duration: '7 weeks',
                instructor: 'Emily Chen',
                rating: 4.8,
                enrolled: 2200,
                price: 64.99,
                level: 'Beginner',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
              {
                id: 8,
                title: 'Machine Learning Fundamentals',
                category: 'Data Science',
                lessons: 16,
                duration: '8 weeks',
                instructor: 'Michael Johnson',
                rating: 4.9,
                enrolled: 1900,
                price: 89.99,
                level: 'Intermediate',
                description: '',
                syllabus: [],
                imageUrl: '',
              },
            ]),
          1000,
        ),
      )
      setCourses(response)
      setLoading(false)
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === 'All' || course.category === selectedCategory) &&
      (selectedLevel === 'All' || course.level === selectedLevel) &&
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      course.price >= priceRange[0] &&
      course.price <= priceRange[1],
  )

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'popularity') return b.enrolled - a.enrolled
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price_low') return a.price - b.price
    if (sortBy === 'price_high') return b.price - a.price
    return 0
  })

  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage)
  const paginatedCourses = sortedCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleEnroll = (courseId: number) => {
    console.log(`Enrolling in course ${courseId}`)
    router.push(`/course/${courseId}`)
  }

  const handleSaveCourse = (courseId: number) => {
    setSavedCourses(
      savedCourses.includes(courseId)
        ? savedCourses.filter((id) => id !== courseId)
        : [...savedCourses, courseId],
    )
  }

  const handleShareCourse = (courseId: number) => {
    console.log(`Sharing course ${courseId}`)
    // Implement sharing functionality here
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <HeaderMain searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="mx-auto flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <FilterSidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
        <div className="flex-grow">
          <div className="mb-4 flex items-center justify-between lg:hidden">
            <h2 className="text-lg font-semibold">Courses</h2>
            <button
              className="rounded-md bg-gray-700 p-2 text-gray-100 transition duration-300 hover:bg-gray-600"
              onClick={toggleModal}
            >
              <HiAdjustmentsHorizontal className="h-5 w-5" />
            </button>
          </div>
          <FilterModal
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            isOpen={isModalOpen}
            closeModal={closeModal}
          />
          {loading ? (
            <div className="py-10 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 sm:h-12 sm:w-12"></div>
              <p className="mt-4 text-sm text-gray-400 sm:text-base">
                Loading courses...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    handleEnroll={handleEnroll}
                    handleSaveCourse={handleSaveCourse}
                    handleShareCourse={handleShareCourse}
                    savedCourses={savedCourses}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default CourseScreen
