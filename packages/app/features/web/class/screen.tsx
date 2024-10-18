'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  HiPlus,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCalendar,
} from 'react-icons/hi'
import CreateClassModal from './components/modalCreate'
import { useRouter } from 'next/router'

interface Class {
  id: string
  name: string
  subject: string
  teacher: string
  students: number
  nextAssignment: string
}

const ClassScreen: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setClasses([
        {
          id: '1',
          name: 'Mathematics 101',
          subject: 'Math',
          teacher: 'Dr. Smith',
          students: 30,
          nextAssignment: 'Algebra Quiz',
        },
        {
          id: '2',
          name: 'Introduction to Literature',
          subject: 'English',
          teacher: 'Prof. Johnson',
          students: 25,
          nextAssignment: 'Essay on Shakespeare',
        },
        {
          id: '3',
          name: 'Physics Fundamentals',
          subject: 'Science',
          teacher: 'Dr. Brown',
          students: 28,
          nextAssignment: 'Lab Report',
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateClass = (classData: {
    name: string
    subject: string
    description: string
  }) => {
    // Here you would typically send this data to your backend API
    // For now, we'll just add it to the local state
    const newClass: Class = {
      id: (classes.length + 1).toString(),
      name: classData.name,
      subject: classData.subject,
      teacher: 'New Teacher', // This would typically come from the logged-in user's info
      students: 0,
      nextAssignment: 'No assignments yet',
    }
    setClasses([...classes, newClass])
  }

  const handleClassClick = (id: string) => {
    router.push(`/class/${id}`)
  }

  const ClassCard: React.FC<{
    classItem: Class
    onClick: (id: string) => void
  }> = ({ classItem, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md"
      onClick={() => {
        onClick(classItem.id)
      }}
    >
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500" />
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">
          {classItem.name}
        </h3>
        <p className="mb-4 text-gray-600">{classItem.subject}</p>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <HiOutlineAcademicCap className="mr-2" />
          <span>{classItem.teacher}</span>
        </div>
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <HiOutlineUserGroup className="mr-2" />
          <span>{classItem.students} students</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <HiOutlineCalendar className="mr-2" />
          <span>Next: {classItem.nextAssignment}</span>
        </div>
      </div>
    </motion.div>
  )

  const SkeletonCard: React.FC = () => (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-md">
      <div className="h-32 bg-gray-300" />
      <div className="p-6">
        <div className="mb-2 h-6 w-3/4 rounded bg-gray-300" />
        <div className="mb-4 h-4 w-1/2 rounded bg-gray-300" />
        <div className="mb-2 h-4 w-full rounded bg-gray-300" />
        <div className="mb-2 h-4 w-full rounded bg-gray-300" />
        <div className="h-4 w-full rounded bg-gray-300" />
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-1/4 rounded bg-gray-300" />
          <div className="h-10 w-40 rounded-full bg-gray-300" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold ">My Classes</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm text-white sm:px-4 sm:text-base"
          onClick={() => setIsModalOpen(true)}
        >
          <HiPlus className="mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Join or Create Class</span>
          <span className="sm:hidden">New Class</span>
        </motion.button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <ClassCard
            key={classItem.id}
            classItem={classItem}
            onClick={handleClassClick}
          />
        ))}
      </div>
      <CreateClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateClass}
      />
    </div>
  )
}

export default ClassScreen
