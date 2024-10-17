import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import {
  FaStar,
  FaClock,
  FaFileAlt,
  FaGraduationCap,
  FaArrowsAltV,
  FaBookmark,
  FaShare,
  FaChevronRight,
  FaUser,
  FaComments,
  FaPlay,
  FaTimes,
  FaPaperPlane,
} from 'react-icons/fa'
import { create } from 'zustand'
// Types
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
  description: string
  syllabus: string[]
  imageUrl: string
  videoUrl?: string
}

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
}

// Header Component
const Header = ({ course }: { course: Course }) => (
  <header className="sticky top-0 z-10 bg-gray-800 shadow">
    <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-gray-100">
            {course.title}
          </h1>
          <p className="text-sm text-gray-300">{course.category}</p>
        </div>
        <img
          src={course.imageUrl}
          alt={course.title}
          className="h-16 w-16 rounded-full object-cover shadow-md"
        />
      </div>
    </div>
  </header>
)

// Course Info Component
const CourseInfo = ({ course }: { course: Course }) => (
  <div className="mb-8 rounded-lg bg-gray-800 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
      <InfoItem
        icon={<FaClock className="h-7 w-7 text-blue-400" />}
        label="Duration"
        value={course.duration}
      />
      <InfoItem
        icon={<FaFileAlt className="h-7 w-7 text-green-400" />}
        label="Lessons"
        value={`${course.lessons} lessons`}
      />
      <InfoItem
        icon={<FaGraduationCap className="h-7 w-7 text-yellow-400" />}
        label="Instructor"
        value={course.instructor}
      />
      <InfoItem
        icon={<FaArrowsAltV className="h-7 w-7 text-purple-400" />}
        label="Level"
        value={course.level}
      />
      <InfoItem
        icon={<FaStar className="h-7 w-7 text-yellow-400" />}
        label="Rating"
        value={`${
          course.rating
        } (${course.enrolled.toLocaleString()} enrolled)`}
      />
      <div className="flex items-center justify-start">
        <div className="transform rounded-md p-3 transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
          <span className="text-2xl font-bold text-white">
            ${course.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  </div>
)

const InfoItem = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) => (
  <div className="flex items-center">
    <div className="mr-3">{icon}</div>
    <div>
      <span className="block text-sm text-gray-400">{label}</span>
      <span className="font-medium text-gray-200">{value}</span>
    </div>
  </div>
)

// Course Description Component
const CourseDescription = ({ description }: { description: string }) => (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-semibold text-gray-100">
      Course Description
    </h2>
    <p className="leading-relaxed text-gray-300">{description}</p>
  </div>
)

// Course Syllabus Component
const CourseSyllabus = ({ syllabus }: { syllabus: string[] }) => (
  <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
    <h2 className="mb-4 text-2xl font-semibold text-gray-100">
      Course Syllabus
    </h2>
    <ul className="space-y-3">
      {syllabus.map((item, index) => (
        <li key={index} className="flex items-start">
          <FaChevronRight className="mr-2 mt-0.5 h-5 w-5 text-blue-400" />
          <span className="text-gray-300">{item}</span>
        </li>
      ))}
    </ul>
  </div>
)

// Action Buttons Component
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
        <FaGraduationCap className="mr-2 h-6 w-6" />
        Enroll Now
      </button>
      <div className="flex space-x-4">
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={handleSave}
        >
          <FaBookmark className="mr-2 h-5 w-5" />
          Save
        </button>
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={handleShare}
        >
          <FaShare className="mr-2 h-5 w-5" />
          Share
        </button>
        <button
          className="flex flex-1 items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-gray-100 transition duration-300 hover:bg-gray-600"
          onClick={onChatClick}
        >
          <FaComments className="mr-2 h-5 w-5" />
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
          <FaUser className="h-8 w-8 text-gray-400" />
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

// New Component: Course Reviews
const CourseReviews = ({ reviews }: { reviews: Review[] }) => (
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
              <FaStar className="mr-1 h-5 w-5 text-yellow-400" />
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

// New Component: Chat Window

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
}

interface ChatState {
  messages: Message[]
  addMessage: (message: Message) => void
  clearMessages: () => void
}

const useChatStore = create<ChatState>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}))

const ChatWindow = ({
  isOpen,
  onClose,
  course,
}: {
  isOpen: boolean
  onClose: () => void
  course: Course
}) => {
  const { messages, addMessage } = useChatStore()
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSendMessage = (text: string) => {
    if (text.trim()) {
      addMessage({
        id: Date.now().toString(),
        text,
        sender: 'user',
      })
      setTimeout(() => {
        addMessage({
          id: (Date.now() + 1).toString(),
          text: `Echo: ${text}`,
          sender: 'bot',
        })
      }, 1000)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 mx-2 flex h-96 w-80 flex-col overflow-hidden rounded-lg bg-gray-800 shadow-lg">
      <div className="flex items-center justify-between bg-gray-700 p-2">
        <h3 className="text-sm font-semibold text-gray-100">
          Chat with {course.instructor}
        </h3>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-100">
          <FaTimes className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`my-4 flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-32 rounded-lg p-3 shadow-md ${
                message.sender === 'user'
                  ? 'bg-gray-300 text-gray-800'
                  : 'bg-blue-500 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="flex border-t border-gray-700 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-11/12 rounded-lg bg-gray-700 px-4 py-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.currentTarget.value)
              e.currentTarget.value = ''
            }
          }}
        />
        <FaPaperPlane
          className="m-1 h-6 w-6 hover:cursor-pointer"
          onClick={() => {
            const input = document.querySelector(
              'input[type="text"]',
            ) as HTMLInputElement
            handleSendMessage(input.value)
            input.value = ''
          }}
        />
      </div>
    </div>
  )
}

const CourseDetailScreen = () => {
  const router = useRouter()
  const { id } = router.query
  const [reviews, setReviews] = useState<Review[]>([])
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    // Simulating API call to fetch reviews
    const fetchReviews = async () => {
      // Replace this with actual API call
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

  // Mock course data (replace with actual data fetching logic)
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
            <div className="sticky top-6 overflow-hidden rounded-lg bg-gray-800 p-6 shadow-lg">
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
