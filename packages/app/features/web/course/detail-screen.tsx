import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Star, Clock, DocumentText, AcademicCap, ArrowsUpDown, BookmarkSquare, Share, ChevronRight, User, ChatBubbleLeftRight, Play } from '@nandorojo/heroicons/24/outline';

// Types
interface Course {
    id: number;
    title: string;
    category: string;
    lessons: number;
    duration: string;
    instructor: string;
    rating: number;
    enrolled: number;
    price: number;
    level: string;
    description: string;
    syllabus: string[];
    imageUrl: string;
    videoUrl?: string;
}

interface Review {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

// Header Component
const Header = ({ course }: { course: Course }) => (
    <header className="bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-100 mb-1">{course.title}</h1>
                    <p className="text-sm text-gray-300">{course.category}</p>
                </div>
                <img src={course.imageUrl} alt={course.title} className="w-16 h-16 object-cover rounded-lg shadow-md" />
            </div>
        </div>
    </header>
);

// Course Info Component
const CourseInfo = ({ course }: { course: Course }) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 transition-all duration-300 hover:shadow-xl">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <InfoItem icon={<Clock className="h-7 w-7 text-blue-400" />} label="Duration" value={course.duration} />
            <InfoItem icon={<DocumentText className="h-7 w-7 text-green-400" />} label="Lessons" value={`${course.lessons} lessons`} />
            <InfoItem icon={<AcademicCap className="h-7 w-7 text-yellow-400" />} label="Instructor" value={course.instructor} />
            <InfoItem icon={<ArrowsUpDown className="h-7 w-7 text-purple-400" />} label="Level" value={course.level} />
            <InfoItem icon={<Star className="h-7 w-7 text-yellow-400" />} label="Rating" value={`${course.rating} (${course.enrolled.toLocaleString()} enrolled)`} />
            <div className="flex items-center justify-start">
                <div className="bg-blue-600 rounded-lg p-3 transform transition-transform duration-300 hover:scale-105">
                    <span className="text-3xl font-bold text-white">${course.price.toFixed(2)}</span>
                </div>
            </div>
        </div>
    </div>
);

const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <div>
            <span className="block text-sm text-gray-400">{label}</span>
            <span className="text-gray-200 font-medium">{value}</span>
        </div>
    </div>
);

// Course Description Component
const CourseDescription = ({ description }: { description: string }) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Course Description</h2>
        <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
);

// Course Syllabus Component
const CourseSyllabus = ({ syllabus }: { syllabus: string[] }) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Course Syllabus</h2>
        <ul className="space-y-3">
            {syllabus.map((item, index) => (
                <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

// Action Buttons Component
const ActionButtons = ({ course }: { course: Course }) => {
    const handleEnroll = () => {
        console.log(`Enrolling in course ${course.id}`);
        // Implement enrollment logic here
    };

    const handleSave = () => {
        console.log(`Saving course ${course.id}`);
        // Implement save course logic here
    };

    const handleShare = () => {
        console.log(`Sharing course ${course.id}`);
        // Implement share course logic here
    };

    return (
        <div className="space-y-4">
            <button
                className="w-full bg-blue-600 text-gray-100 py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-medium flex items-center justify-center"
                onClick={handleEnroll}
            >
                <AcademicCap className="h-6 w-6 mr-2" />
                Enroll Now
            </button>
            <div className="flex space-x-4">
                <button
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                    onClick={handleSave}
                >
                    <BookmarkSquare className="h-5 w-5 mr-2" />
                    Save
                </button>
                <button
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-100 py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                    onClick={handleShare}
                >
                    <Share className="h-5 w-5 mr-2" />
                    Share
                </button>
            </div>
        </div>
    );
};

// Instructor Component
const InstructorInfo = ({ instructor }: { instructor: string }) => {
    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Instructor</h2>
            <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-full mr-4 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-400" />
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
    );
};

// New Component: Course Preview Video
const CoursePreviewVideo = ({ videoUrl }: { videoUrl: string }) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Course Preview</h2>
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
                src={videoUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
        </div>
    </div>
);

// New Component: Course Reviews
const CourseReviews = ({ reviews }: { reviews: Review[] }) => (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">Student Reviews</h2>
        <div className="space-y-4">
            {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-700 pb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-200">{review.userName}</span>
                        <div className="flex items-center">
                            <Star className="h-5 w-5 text-yellow-400 mr-1" />
                            <span className="text-gray-300">{review.rating}</span>
                        </div>
                    </div>
                    <p className="text-gray-300">{review.comment}</p>
                    <span className="text-sm text-gray-400">{review.date}</span>
                </div>
            ))}
        </div>
    </div>
);

const CourseDetailScreen = () => {
    const router = useRouter();
    const { id } = router.query;
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Simulating API call to fetch reviews
        const fetchReviews = async () => {
            // Replace this with actual API call
            const mockReviews: Review[] = [
                { id: 1, userName: "John Doe", rating: 5, comment: "Great course! Learned a lot.", date: "2023-05-15" },
                { id: 2, userName: "Jane Smith", rating: 4, comment: "Very informative, but could use more practical examples.", date: "2023-05-10" },
            ];
            setReviews(mockReviews);
        };

        fetchReviews();
    }, [id]);

    // Mock course data (replace with actual data fetching logic)
    const course: Course = {
        id: Number(id),
        title: "Mastering React: From Fundamentals to Advanced Concepts",
        category: "Web Development",
        lessons: 15,
        duration: "8 weeks",
        instructor: "Dr. Jane Smith",
        rating: 4.9,
        enrolled: 2500,
        price: 79.99,
        level: "Intermediate to Advanced",
        description: "Dive deep into the world of React with this comprehensive course. From fundamental concepts to advanced techniques, you'll learn everything you need to build modern, scalable web applications. This course covers the latest React features, best practices, and real-world project implementations.",
        syllabus: [
            "Introduction to React and its ecosystem",
            "JSX and Components: Building blocks of React",
            "State management and Props",
            "Hooks: Revolutionizing functional components",
            "Advanced React patterns and performance optimization",
            "Routing in React applications",
            "State Management with Redux and Context API",
            "Server-Side Rendering with Next.js",
            "Testing React Applications: Unit and Integration tests",
            "Performance Optimization techniques",
            "Deploying React Applications to production",
            "Real-world project: Building a full-stack React application",
            "Best practices and common pitfalls",
            "Integrating with APIs and handling authentication",
            "Future of React and emerging trends",
        ],
        imageUrl: "https://example.com/react-course-image.jpg",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual preview video URL
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
            <Header course={course} />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <CourseInfo course={course} />
                        <CoursePreviewVideo videoUrl={course.videoUrl || ''} />
                        <CourseDescription description={course.description} />
                        <CourseSyllabus syllabus={course.syllabus} />
                        <InstructorInfo instructor={course.instructor} />
                        <CourseReviews reviews={reviews} />
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 shadow-lg rounded-lg p-6 sticky top-6">
                            <ActionButtons course={course} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetailScreen;
