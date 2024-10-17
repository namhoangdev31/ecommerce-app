import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  HiMagnifyingGlass,
  HiDocumentText,
  HiSquares2X2,
  HiAcademicCap,
  HiClock,
  HiStar,
  HiArrowsUpDown,
  HiBookmark,
  HiShare,
  HiAdjustmentsHorizontal,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2'
import { IoFilterCircleOutline } from 'react-icons/io5'
import { create } from 'zustand'
import { categories, FilterSidebar, levels } from './component/FilterSidebar'

// Types and interfaces
interface Course {
  id: number
  title: string
  category: string
  lessons: number
  duration: string
  instructor: string
  rating: number
  enrolled: number
  price: number
  level: string
}

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
const Header: React.FC<{
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

// FilterModal component (for mobile)
const FilterModal: React.FC<{
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

// CourseCard component
const CourseCard: React.FC<{
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

// Pagination component
const Pagination: React.FC<{
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

// Main component
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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
