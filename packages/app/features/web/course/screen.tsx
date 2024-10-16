import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  MagnifyingGlass,
  DocumentText,
  RectangleStack,
  AcademicCap,
  Clock,
  Star,
  ArrowsUpDown,
  BookmarkSquare,
  Share,
  AdjustmentsHorizontal,
} from '@nandorojo/heroicons/24/outline'
import { create } from 'zustand'

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
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: string) => void
  setCourses: (courses: Course[]) => void
  setLoading: (loading: boolean) => void
  setPriceRange: (range: [number, number]) => void
  setSelectedLevel: (level: string) => void
  setSavedCourses: (savedCourses: number[]) => void
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
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setCourses: (courses) => set({ courses }),
  setLoading: (loading) => set({ loading }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSelectedLevel: (level) => set({ selectedLevel: level }),
  setSavedCourses: (savedCourses) => set({ savedCourses }),
}))

const categories = [
  'All',
  'Computer Science',
  'Business',
  'Data Science',
  'Language Learning',
  'Arts and Humanities',
]
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

// Header component
const Header: React.FC<{ searchQuery: string; setSearchQuery: (query: string) => void; toggleSidebar: () => void }> = ({ searchQuery, setSearchQuery, toggleSidebar }) => (
  <header className="sticky top-0 z-10 bg-gray-800 shadow">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="text-xl font-bold text-gray-100 sm:text-2xl">Fubao Course</h1>
      <div className="flex items-center">
        <div className="relative mr-2">
          <input
            type="text"
            placeholder="Search courses"
            className="w-32 rounded-md border border-gray-600 bg-gray-700 py-2 pl-8 pr-2 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-48 md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlass className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
        </div>
        <button
          className="rounded-md bg-gray-700 p-2 text-gray-100 hover:bg-gray-600 md:hidden"
          onClick={toggleSidebar}
        >
          <AdjustmentsHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  </header>
)

// Sidebar component
const Sidebar: React.FC<{
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
  selectedLevel: string
  setSelectedLevel: (level: string) => void
  isOpen: boolean
  closeSidebar: () => void
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
  closeSidebar,
}) => (
  <div
    className={`fixed inset-y-0 left-0 z-20 w-64 transform overflow-y-auto bg-gray-800 p-2 transition-transform duration-300 ease-in-out md:static md:z-0 md:w-full md:transform-none ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <button
      className="absolute right-2 top-2 text-gray-400 hover:text-gray-100 md:hidden"
      onClick={closeSidebar}
    >
      &times;
    </button>
    <div className="space-y-3">
      <div className="rounded-lg bg-gray-700 p-2 shadow">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-100">Categories</h2>
          <RectangleStack className="h-3 w-3 text-gray-400" />
        </div>
        <ul className="space-y-1">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer text-xs text-gray-300 hover:text-gray-100 ${
                selectedCategory === category ? 'font-semibold text-gray-100' : ''
              }`}
              onClick={() => {
                setSelectedCategory(category)
                closeSidebar()
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg bg-gray-700 p-2 shadow">
        <h2 className="mb-1 text-sm font-semibold text-gray-100">Sort By</h2>
        <select
          className="w-full rounded-md border border-gray-600 bg-gray-600 px-1 py-0.5 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
        </select>
      </div>
      <div className="rounded-lg bg-gray-700 p-2 shadow">
        <h2 className="mb-1 text-sm font-semibold text-gray-100">Price Range</h2>
        <div className="flex items-center justify-between">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
            className="w-full"
          />
          <span className="ml-1 text-xs text-gray-300">${priceRange[0]}</span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full"
          />
          <span className="ml-1 text-xs text-gray-300">${priceRange[1]}</span>
        </div>
      </div>
      <div className="rounded-lg bg-gray-700 p-2 shadow">
        <h2 className="mb-1 text-sm font-semibold text-gray-100">Level</h2>
        <select
          className="w-full rounded-md border border-gray-600 bg-gray-600 px-1 py-0.5 text-xs text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

// CourseCard component
const CourseCard: React.FC<{
  course: Course;
  handleEnroll: (courseId: number) => void;
  handleSaveCourse: (courseId: number) => void;
  handleShareCourse: (courseId: number) => void;
  savedCourses: number[];
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
        <p className="mb-3 text-xs text-gray-400 sm:text-sm">{course.category}</p>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <DocumentText className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.lessons} lessons</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <Clock className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.duration}</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <AcademicCap className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span>{course.instructor}</span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <Star className="mr-2 h-3 w-3 text-yellow-400 sm:h-4 sm:w-4" />
          <span>
            {course.rating} ({course.enrolled} enrolled)
          </span>
        </div>
        <div className="mb-1 flex items-center text-xs text-gray-400 sm:text-sm">
          <ArrowsUpDown className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
          <BookmarkSquare className="h-4 w-4 text-gray-100 sm:h-5 sm:w-5" />
        </button>
        <button
          className="ml-2 rounded-md bg-gray-700 p-1 transition duration-300 hover:bg-gray-600 sm:p-2"
          onClick={() => handleShareCourse(course.id)}
        >
          <Share className="h-4 w-4 text-gray-100 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  </div>
)

// Main component
const CourseScreen = () => {
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
    setSelectedCategory,
    setSearchQuery,
    setSortBy,
    setCourses,
    setLoading,
    setPriceRange,
    setSelectedLevel,
    setSavedCourses,
  } = useCourseStore()

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} toggleSidebar={toggleSidebar} />
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="md:w-1/4">
            <Sidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              isOpen={isSidebarOpen}
              closeSidebar={closeSidebar}
            />
          </div>
          <div className="md:w-3/4">
            {loading ? (
              <div className="py-10 text-center">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 sm:h-12 sm:w-12"></div>
                <p className="mt-4 text-sm text-gray-400 sm:text-base">Loading courses...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {sortedCourses.map((course) => (
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
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CourseScreen
