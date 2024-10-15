import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { MagnifyingGlass, DocumentText, RectangleStack, AcademicCap, Clock, Star, ArrowsUpDown, BookmarkSquare, Share } from '@nandorojo/heroicons/24/outline'
import { create } from 'zustand'

// Types and interfaces
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
}

interface CourseState {
    selectedCategory: string;
    searchQuery: string;
    sortBy: string;
    courses: Course[];
    loading: boolean;
    priceRange: [number, number];
    selectedLevel: string;
    savedCourses: number[];
    setSelectedCategory: (category: string) => void;
    setSearchQuery: (query: string) => void;
    setSortBy: (sortBy: string) => void;
    setCourses: (courses: Course[]) => void;
    setLoading: (loading: boolean) => void;
    setPriceRange: (range: [number, number]) => void;
    setSelectedLevel: (level: string) => void;
    setSavedCourses: (savedCourses: number[]) => void;
}

// Zustand store
const useCourseStore = create<CourseState>((set) => ({
    selectedCategory: 'All',
    searchQuery: '',
    sortBy: 'popularity',
    courses: [],
    loading: true,
    priceRange: [0, 1000],
    selectedLevel: 'All',
    savedCourses: [],
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSortBy: (sortBy) => set({ sortBy }),
    setCourses: (courses) => set({ courses }),
    setLoading: (loading) => set({ loading }),
    setPriceRange: (range) => set({ priceRange: range }),
    setSelectedLevel: (level) => set({ selectedLevel: level }),
    setSavedCourses: (savedCourses) => set({ savedCourses }),
}))

const categories = ['All', 'Computer Science', 'Business', 'Data Science', 'Language Learning', 'Arts and Humanities'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

// Header component
const Header = ({ searchQuery, setSearchQuery }) => (
    <header className="bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-100">Fubao Course</h1>
            <div className="flex items-center">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for courses"
                        className="w-64 sm:w-80 pl-10 pr-4 py-2 border rounded-md bg-gray-700 text-gray-100 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <MagnifyingGlass className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
            </div>
        </div>
    </header>
)

// Sidebar component
const Sidebar = ({ selectedCategory, setSelectedCategory, sortBy, setSortBy, priceRange, setPriceRange, selectedLevel, setSelectedLevel }) => (
    <div className="lg:w-1/4 space-y-6 overflow-y-hidden max-h-screen sticky top-0">
        <div className="bg-gray-800 shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-100">Categories</h2>
                <RectangleStack className="h-5 w-5 text-gray-400" />
            </div>
            <ul className="space-y-2">
                {categories.map((category) => (
                    <li
                        key={category}
                        className={`text-sm text-gray-300 cursor-pointer hover:text-gray-100 ${selectedCategory === category ? 'font-semibold text-gray-100' : ''}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">Sort By</h2>
            <select
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
            >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
            </select>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">Price Range</h2>
            <div className="flex items-center justify-between">
                <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="mx-2">-</span>
                <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-1 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
        <div className="bg-gray-800 shadow rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-100 mb-3">Level</h2>
            <select
                className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
            >
                {levels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                ))}
            </select>
        </div>
    </div>
)

// CourseCard component
const CourseCard = ({ course, handleEnroll, handleSaveCourse, handleShareCourse, savedCourses }) => (
    <div className="bg-gray-800 shadow rounded-lg overflow-hidden flex flex-col">
        <div className="w-full h-40 bg-gray-700 relative">
            <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
                Course Image {course.id}
            </span>
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
                <h3 className="text-base font-semibold mb-2 text-gray-100">{course.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{course.category}</p>
                <div className="flex items-center text-gray-400 mb-1 text-sm">
                    <DocumentText className="h-4 w-4 mr-2" />
                    <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center text-gray-400 mb-1 text-sm">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-1 text-sm">
                    <AcademicCap className="h-4 w-4 mr-2" />
                    <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-1 text-sm">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    <span>{course.rating} ({course.enrolled} enrolled)</span>
                </div>
                <div className="flex items-center text-gray-400 mb-1 text-sm">
                    <ArrowsUpDown className="h-4 w-4 mr-2" />
                    <span>{course.level}</span>
                </div>
                <div className="flex items-center text-gray-400 mb-3 text-sm">
                    <span className="font-semibold text-base text-gray-100">${course.price.toFixed(2)}</span>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button
                    className="flex-grow bg-blue-600 text-gray-100 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-sm font-medium mr-2"
                    onClick={() => handleEnroll(course.id)}
                >
                    Enroll Now
                </button>
                <button
                    className={`p-2 rounded-md transition duration-300 ${savedCourses.includes(course.id) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
                    onClick={() => handleSaveCourse(course.id)}
                >
                    <BookmarkSquare className="h-5 w-5 text-gray-100" />
                </button>
                <button
                    className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition duration-300 ml-2"
                    onClick={() => handleShareCourse(course.id)}
                >
                    <Share className="h-5 w-5 text-gray-100" />
                </button>
            </div>
        </div>
    </div>
)

// Main component
const CourseScreen = () => {
    const router = useRouter();
    const {
        selectedCategory,
        searchQuery,
        sortBy,
        courses,
        loading,
        priceRange,
        selectedLevel,
        savedCourses,
        setSelectedCategory,
        setSearchQuery,
        setSortBy,
        setCourses,
        setLoading,
        setPriceRange,
        setSelectedLevel,
        setSavedCourses
    } = useCourseStore()

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const response: Course[] = await new Promise(resolve => setTimeout(() => resolve([
                { id: 1, title: 'Introduction to Programming', category: 'Computer Science', lessons: 12, duration: '6 weeks', instructor: 'John Doe', rating: 4.5, enrolled: 1000, price: 49.99, level: 'Beginner' },
                { id: 2, title: 'Business Ethics', category: 'Business', lessons: 8, duration: '4 weeks', instructor: 'Jane Smith', rating: 4.2, enrolled: 800, price: 39.99, level: 'Intermediate' },
                { id: 3, title: 'Data Analysis with Python', category: 'Data Science', lessons: 15, duration: '8 weeks', instructor: 'Mike Johnson', rating: 4.8, enrolled: 1200, price: 59.99, level: 'Intermediate' },
                { id: 4, title: 'Spanish for Beginners', category: 'Language Learning', lessons: 20, duration: '10 weeks', instructor: 'Maria Garcia', rating: 4.6, enrolled: 950, price: 29.99, level: 'Beginner' },
                { id: 5, title: 'Art History', category: 'Arts and Humanities', lessons: 10, duration: '5 weeks', instructor: 'Emily Brown', rating: 4.3, enrolled: 750, price: 34.99, level: 'Beginner' },
                { id: 6, title: 'Machine Learning Fundamentals', category: 'Computer Science', lessons: 18, duration: '9 weeks', instructor: 'David Lee', rating: 4.7, enrolled: 1100, price: 79.99, level: 'Advanced' },
                { id: 7, title: 'Digital Marketing Strategies', category: 'Marketing', lessons: 14, duration: '7 weeks', instructor: 'Sarah Johnson', rating: 4.4, enrolled: 900, price: 54.99, level: 'Intermediate' },
                { id: 8, title: 'Introduction to Psychology', category: 'Social Sciences', lessons: 16, duration: '8 weeks', instructor: 'Robert Wilson', rating: 4.6, enrolled: 1050, price: 44.99, level: 'Beginner' },
                { id: 9, title: 'Web Development Bootcamp', category: 'Computer Science', lessons: 25, duration: '12 weeks', instructor: 'Jennifer Lee', rating: 4.9, enrolled: 1500, price: 89.99, level: 'Intermediate' },
                { id: 10, title: 'Financial Planning and Investment', category: 'Finance', lessons: 12, duration: '6 weeks', instructor: 'Michael Brown', rating: 4.5, enrolled: 850, price: 64.99, level: 'Advanced' },
                { id: 11, title: 'Graphic Design Fundamentals', category: 'Design', lessons: 18, duration: '9 weeks', instructor: 'Emma Davis', rating: 4.7, enrolled: 1000, price: 69.99, level: 'Beginner' },
                { id: 12, title: 'Environmental Science', category: 'Natural Sciences', lessons: 14, duration: '7 weeks', instructor: 'Daniel Green', rating: 4.3, enrolled: 700, price: 49.99, level: 'Intermediate' },
                { id: 13, title: 'Creative Writing Workshop', category: 'Arts and Humanities', lessons: 10, duration: '5 weeks', instructor: 'Olivia Taylor', rating: 4.8, enrolled: 600, price: 39.99, level: 'All Levels' },
                { id: 14, title: 'Mobile App Development', category: 'Computer Science', lessons: 20, duration: '10 weeks', instructor: 'Andrew Chen', rating: 4.6, enrolled: 1100, price: 74.99, level: 'Intermediate' },
                { id: 15, title: 'Public Speaking Mastery', category: 'Communication', lessons: 8, duration: '4 weeks', instructor: 'Lisa Thompson', rating: 4.5, enrolled: 750, price: 34.99, level: 'All Levels' },
                { id: 16, title: 'Artificial Intelligence Ethics', category: 'Computer Science', lessons: 12, duration: '6 weeks', instructor: 'James Wilson', rating: 4.7, enrolled: 950, price: 59.99, level: 'Advanced' },
            ]), 1000));
            setCourses(response);
            setLoading(false);
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course =>
        (selectedCategory === 'All' || course.category === selectedCategory) &&
        (selectedLevel === 'All' || course.level === selectedLevel) &&
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    const sortedCourses = [...filteredCourses].sort((a, b) => {
        if (sortBy === 'popularity') return b.enrolled - a.enrolled;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        return 0;
    });

    const handleEnroll = (courseId: number) => {
        console.log(`Enrolling in course ${courseId}`);
        router.push(`/course/${courseId}`);
    };

    const handleSaveCourse = (courseId: number) => {
        setSavedCourses(savedCourses.includes(courseId)
            ? savedCourses.filter(id => id !== courseId)
            : [...savedCourses, courseId]
        );
    };

    const handleShareCourse = (courseId: number) => {
        console.log(`Sharing course ${courseId}`);
        // Implement sharing functionality here
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6">
                    <Sidebar
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                    />
                    <div className="lg:w-3/4">
                        {loading ? (
                            <div className="text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                                <p className="mt-4 text-gray-400">Loading courses...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {sortedCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        course={course}
                                        handleEnroll={handleEnroll}
                                        handleSaveCourse={handleSaveCourse}
                                        handleShareCourse={handleShareCourse}
                                        savedCourses={savedCourses}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseScreen
