import { Course } from "../types/course";
import { HiClock, HiDocument, HiAcademicCap, HiArrowsUpDown as HiArrowsExpand, HiStar } from 'react-icons/hi2'
export const CourseInfo = ({ course }: { course: Course }) => (
    <div className="mb-8 rounded-lg bg-gray-800 p-8 shadow-lg transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <InfoItem
                icon={<HiClock className="h-7 w-7 text-blue-400" />}
                label="Duration"
                value={course.duration}
            />
            <InfoItem
                icon={<HiDocument className="h-7 w-7 text-green-400" />}
                label="Lessons"
                value={`${course.lessons} lessons`}
            />
            <InfoItem
                icon={<HiAcademicCap className="h-7 w-7 text-yellow-400" />}
                label="Instructor"
                value={course.instructor}
            />
            <InfoItem
                icon={<HiArrowsExpand className="h-7 w-7 text-purple-400" />}
                label="Level"
                value={course.level}
            />
            <InfoItem
                icon={<HiStar className="h-7 w-7 text-yellow-400" />}
                label="Rating"
                value={`${course.rating
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
