'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiX,
  HiAcademicCap,
  HiBookOpen,
  HiInformationCircle,
  HiUserGroup,
  HiClock,
  HiCalendar,
  HiUpload,
} from 'react-icons/hi'
import { FaChalkboardTeacher } from 'react-icons/fa'

interface CreateClassModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (classData: {
    name: string
    subject: string
    description: string
    instructor: string
    maxStudents: number
    startDate: string
    endDate: string
    schedule: string
    lessonFile: File | null
  }) => void
}

const CreateClassModal: React.FC<CreateClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [instructor, setInstructor] = useState('')
  const [maxStudents, setMaxStudents] = useState(20)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [schedule, setSchedule] = useState('')
  const [lessonFile, setLessonFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      name,
      subject,
      description,
      instructor,
      maxStudents,
      startDate,
      endDate,
      schedule,
      lessonFile,
    })
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit')
        return
      }
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ]
      if (!allowedTypes.includes(file.type)) {
        alert(
          'Invalid file type. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.',
        )
        return
      }
      setLessonFile(file)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Create New Class</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-gray-500 transition-colors duration-200 hover:text-gray-700"
              >
                <HiX size={24} />
              </motion.button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                    <HiAcademicCap className="mr-2 inline-block text-blue-500" />
                    Class Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter class name"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-1 block text-sm font-medium text-gray-700">
                    <HiBookOpen className="mr-2 inline-block text-blue-500" />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter subject"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                  <HiInformationCircle className="mr-2 inline-block text-blue-500" />
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  required
                  placeholder="Enter class description"
                ></textarea>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="instructor" className="mb-1 block text-sm font-medium text-gray-700">
                    <FaChalkboardTeacher className="mr-2 inline-block text-blue-500" />
                    Instructor
                  </label>
                  <input
                    type="text"
                    id="instructor"
                    value={instructor}
                    onChange={(e) => setInstructor(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    placeholder="Enter instructor name"
                  />
                </div>
                <div>
                  <label htmlFor="maxStudents" className="mb-1 block text-sm font-medium text-gray-700">
                    <HiUserGroup className="mr-2 inline-block text-blue-500" />
                    Max Students
                  </label>
                  <input
                    type="number"
                    id="maxStudents"
                    value={maxStudents}
                    onChange={(e) => setMaxStudents(parseInt(e.target.value))}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    min={1}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="startDate" className="mb-1 block text-sm font-medium text-gray-700">
                    <HiCalendar className="mr-2 inline-block text-blue-500" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="mb-1 block text-sm font-medium text-gray-700">
                    <HiCalendar className="mr-2 inline-block text-blue-500" />
                    End Date
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="schedule" className="mb-1 block text-sm font-medium text-gray-700">
                  <HiClock className="mr-2 inline-block text-blue-500" />
                  Schedule
                </label>
                <input
                  type="text"
                  id="schedule"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="e.g. Mon, Wed, Fri 10:00 AM - 11:30 AM"
                />
              </div>
              <div>
                <label htmlFor="lessonFile" className="mb-1 block text-sm font-medium text-gray-700">
                  <HiUpload className="mr-2 inline-block text-blue-500" />
                  Lesson File
                </label>
                <input
                  type="file"
                  id="lessonFile"
                  onChange={handleFileChange}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
              </div>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:w-1/2"
                >
                  Create Class
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={onClose}
                  className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 sm:w-1/2"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateClassModal
