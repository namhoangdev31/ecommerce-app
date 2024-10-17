import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  HiStar,
  HiClock,
  HiDocument,
  HiAcademicCap,
  HiBookmark,
  HiShare,
  HiChevronRight,
  HiUser,
  HiArrowsUpDown as HiArrowsExpand,
  HiChatBubbleOvalLeft as HiChat,
  HiPlay,
  HiPaperAirplane,
  HiXMark as HiX,
} from 'react-icons/hi2'
import { create } from 'zustand'
import Header from './component/HeaderDetail'
import { Course } from './types/course'
import { CourseInfo } from './component/CourseInfo'
import { CourseSyllabus } from './component/CourseSyllabus'
import { ChatWindow } from './component/ChatWindow'
import { CourseReviews, Review } from './component/CourseReviews'

const CourseDescription = ({ description }: { description: string }) => (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-semibold text-gray-100">
      Course Description
    </h2>
    <p className="leading-relaxed text-gray-300">{description}</p>
  </div>
)

const ActionButtons = ({
  course,
  onChatClick,
}: {
  course: Course
  onChatClick: () => void
}) => {
  const handleEnroll = () => {
    console.log(`Enrolling in course ${course.id}`)
    // Implement enrollment logic here
  }

  const handleSave = () => {
    console.log(`Saving course ${course.id}`)
    // Implement save course logic here
  }

  const handleShare = () => {
    console.log(`Sharing course ${course.id}`)
    // Implement share course logic here
  }

  return (
    <div className="space-y-4">
      <button
        className="flex w-full items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-gray-100 transition duration-300 hover:bg-blue-700"
        onClick={handleEnroll}
      >
        <HiAcademicCap className="mr-2 h-6 w-6" />
        Enroll Now
      </button>
      <div className="flex space-x-4">
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={handleSave}
        >
          <HiBookmark className="mr-2 h-5 w-5" />
          Save
        </button>
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={handleShare}
        >
          <HiShare className="mr-2 h-5 w-5" />
          Share
        </button>
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={onChatClick}
        >
          <HiChat className="mr-2 h-5 w-5" />
          Chat Now
        </button>
      </div>
    </div>
  )
}

// Instructor Component
const InstructorInfo = ({ instructor }: { instructor: string }) => {
  return (
    <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-semibold">Instructor</h2>
      <div className="flex items-center">
        <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
          <HiUser className="h-8 w-8 text-gray-400" />
        </div>
        <div>
          <h3 className="text-lg font-medium">{instructor}</h3>
          <p className="text-sm text-gray-400">Expert Web Developer</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-300">
        An experienced instructor with a passion for teaching web development.
        Specializes in React and modern JavaScript frameworks.
      </p>
    </div>
  )
}

// New Component: Course Preview Video
const CoursePreviewVideo = ({ videoUrl }: { videoUrl: string }) => (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-semibold text-gray-100">
      Course Preview
    </h2>
    <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute left-0 top-0 h-full w-full rounded-lg"
      ></iframe>
    </div>
  </div>
)


const CourseDetailScreen = () => {
  const router = useRouter()
  const { id } = router.query
  const [reviews, setReviews] = useState<Review[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      const mockReviews: Review[] = [
        {
          id: 1,
          userName: 'John Doe',
          rating: 5,
          comment: 'Great course! Learned a lot.',
          date: '2023-05-15',
        },
        {
          id: 2,
          userName: 'Jane Smith',
          rating: 4,
          comment: 'Very informative, but could use more practical examples.',
          date: '2023-05-10',
        },
      ]
      setReviews(mockReviews)
    }

    fetchReviews()
  }, [id])

  const course: Course = {
    id: Number(id),
    title: 'Mastering React: From Fundamentals to Advanced Concepts',
    category: 'Web Development',
    lessons: 15,
    duration: '8 weeks',
    instructor: 'Dr. Jane Smith',
    rating: 4.9,
    enrolled: 2500,
    price: 79.99,
    level: 'Intermediate to Advanced',
    description:
      "Dive deep into the world of React with this comprehensive course. From fundamental concepts to advanced techniques, you'll learn everything you need to build modern, scalable web applications. This course covers the latest React features, best practices, and real-world project implementations.",
    syllabus: [
      'Introduction to React and its ecosystem',
      'JSX and Components: Building blocks of React',
      'State management and Props',
      'Hooks: Revolutionizing functional components',
      'Advanced React patterns and performance optimization',
      'Routing in React applications',
      'State Management with Redux and Context API',
      'Server-Side Rendering with Next.js',
      'Testing React Applications: Unit and Integration tests',
      'Performance Optimization techniques',
      'Deploying React Applications to production',
      'Real-world project: Building a full-stack React application',
      'Best practices and common pitfalls',
      'Integrating with APIs and handling authentication',
      'Future of React and emerging trends',
    ],
    imageUrl:
      'https://cdn.tgdd.vn/News/1062931/bi-quyet-chup-anh-01-01-01-1280x720.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual preview video URL
  }

  const handleChatClick = () => {
    setIsChatOpen(true)
  }

  const handleChatClose = () => {
    setIsChatOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Header course={course} />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <CourseInfo course={course} />
            <CoursePreviewVideo videoUrl={course.videoUrl || ''} />
            <CourseDescription description={course.description} />
            <CourseSyllabus syllabus={course.syllabus} />
            <InstructorInfo instructor={course.instructor} />
            <CourseReviews reviews={reviews} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-lg bg-gray-800 p-6 shadow-lg">
              <ActionButtons course={course} onChatClick={handleChatClick} />
            </div>
          </div>
        </div>
      </main>

      <ChatWindow
        isOpen={isChatOpen}
        onClose={handleChatClose}
        course={course}
      />
    </div>
  )
}

export default CourseDetailScreen
