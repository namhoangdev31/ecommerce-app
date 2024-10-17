import { Course } from "../types/course";


export default function Header({ course }: { course: Course }) {
    return (
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
}