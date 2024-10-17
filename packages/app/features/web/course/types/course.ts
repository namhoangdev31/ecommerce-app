export interface Course {
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