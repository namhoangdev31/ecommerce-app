'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  HiAcademicCap,
  HiUserGroup,
  HiCalendar,
  HiClock,
  HiInformationCircle,
  HiBookOpen,
} from 'react-icons/hi'
import { InfoItem } from 'app/features/web/class/components/InfoItem'
import { useRouter } from 'next/router'

const ClassDetail: React.FC = () => {
  const router = useRouter()
  const { id: slug } = router.query

  return (
    <div className="container mx-auto bg-gray-900 px-4 py-8 text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-lg bg-gray-800 shadow-lg"
      >
        <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="p-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-100">Class Name</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <InfoItem
                icon={<HiAcademicCap />}
                label="Subject"
                value="Subject Name"
              />
              <InfoItem
                icon={<HiUserGroup />}
                label="Instructor"
                value="Instructor Name"
              />
              <InfoItem icon={<HiUserGroup />} label="Students" value="20/30" />
            </div>
            <div>
              <InfoItem
                icon={<HiCalendar />}
                label="Start Date"
                value="01/01/2023"
              />
              <InfoItem
                icon={<HiCalendar />}
                label="End Date"
                value="31/12/2023"
              />
              <InfoItem
                icon={<HiClock />}
                label="Schedule"
                value="Mon, Wed, Fri 10:00 AM"
              />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="mb-2 flex items-center text-xl font-semibold text-gray-200">
              <HiInformationCircle className="mr-2" />
              Description
            </h2>
            <p className="text-gray-300">
              This is a placeholder description for the class. It provides an
              overview of the course content and objectives.
            </p>
          </div>
          <div className="mt-6">
            <h2 className="mb-2 flex items-center text-xl font-semibold text-gray-200">
              <HiBookOpen className="mr-2" />
              Course Materials
            </h2>
            <ul className="list-inside list-disc text-gray-300">
              <li>Lecture slides</li>
              <li>Homework assignments</li>
              <li>Supplementary readings</li>
            </ul>
          </div>
        </div>
        <div
          className="mb-4 ml-4 w-fit rounded-lg bg-amber-100 p-4 text-xl font-bold text-cyan-900 hover:cursor-pointer"
          onClick={() => {
            if (slug) {
              router.push(`/class/stream/${slug}`)
            }
          }}
        >
          Join Class
        </div>
      </motion.div>
    </div>
  )
}

export default ClassDetail
