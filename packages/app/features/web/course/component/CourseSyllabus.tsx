import { HiChevronRight } from 'react-icons/hi2'

export const CourseSyllabus = ({ syllabus }: { syllabus: string[] }) => (
    <div className="mb-6 rounded-lg bg-gray-800 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-100">
        Course Syllabus
      </h2>
      <ul className="space-y-3">
        {syllabus.map((item, index) => (
          <li key={index} className="flex items-start">
            <HiChevronRight className="mr-2 mt-0.5 h-5 w-5 text-blue-400" />
            <span className="text-gray-300">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
  