"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HiAcademicCap, HiChartBar, HiChatAlt2, HiClipboardList, HiClock, HiUserGroup, HiUser, HiSearch } from 'react-icons/hi';
import { create } from 'zustand';

interface Course {
  id: number;
  name: string;
  progress: number;
  students: number;
  status: string;
}

interface Notification {
  id: number;
  message: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
}

interface DashboardState {
  userRoles: ('student' | 'teacher')[];
  userName: string;
  courses: Course[];
  selectedRole: 'student' | 'teacher';
  searchQuery: string;
  notifications: Notification[];
  upcomingEvents: Event[];
  isLoading: boolean;
  setUserRoles: (roles: ('student' | 'teacher')[]) => void;
  setUserName: (name: string) => void;
  setCourses: (courses: Course[]) => void;
  setSelectedRole: (role: 'student' | 'teacher') => void;
  setSearchQuery: (query: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  setUpcomingEvents: (events: Event[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  toggleRole: () => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  userRoles: [],
  userName: '',
  courses: [],
  selectedRole: 'student',
  searchQuery: '',
  notifications: [],
  upcomingEvents: [],
  isLoading: true,
  setUserRoles: (roles) => set({ userRoles: roles }),
  setUserName: (name) => set({ userName: name }),
  setCourses: (courses) => set({ courses }),
  setSelectedRole: (role) => set({ selectedRole: role }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setNotifications: (notifications) => set({ notifications }),
  setUpcomingEvents: (events) => set({ upcomingEvents: events }),
  setIsLoading: (isLoading) => set({ isLoading }),
  toggleRole: () => set((state) => ({ selectedRole: state.selectedRole === 'student' ? 'teacher' : 'student' })),
}));

const DashboardScreen: React.FC = () => {
  const {
    userRoles,
    userName,
    courses,
    selectedRole,
    searchQuery,
    notifications,
    upcomingEvents,
    isLoading,
    setUserRoles,
    setUserName,
    setCourses,
    setSelectedRole,
    setSearchQuery,
    setNotifications,
    setUpcomingEvents,
    setIsLoading,
    toggleRole,
  } = useDashboardStore();

  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchData = async () => {
      try {
        // Simulating API calls
        // Simulating API responses with fake data
        const userData = {
          name: 'John Doe',
          roles: ['student', 'teacher']
        };
        const coursesData = [
          { id: 1, name: 'Introduction to React', progress: 75, students: 150, status: 'In Progress' },
          { id: 2, name: 'Advanced JavaScript', progress: 40, students: 120, status: 'Not Started' },
          { id: 3, name: 'Web Design Fundamentals', progress: 90, students: 200, status: 'Completed' }
        ];
        const notificationsData = [
          { id: 1, message: 'New assignment due tomorrow', type: 'assignment' },
          { id: 2, message: 'Upcoming live session in 2 hours', type: 'live_session' }
        ];
        const eventsData = [
          { id: 1, title: 'Web Development Workshop', date: '2023-06-15' },
          { id: 2, title: 'Career Fair', date: '2023-06-20' }
        ];

        setTimeout(() => {
          setUserName(userData.name);
          setUserRoles(userData.roles as ('student' | 'teacher')[]);
          setCourses(coursesData);
          setNotifications(notificationsData);
          setUpcomingEvents(eventsData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredCourses = React.useMemo(() =>
    courses.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [courses, searchQuery]
  );

  const renderCourseItem = (course: Course) => (
    <motion.div
      key={course.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link href={`/course/${course.id}`} className="block bg-gray-700 rounded-lg p-4 mb-3 transition-all duration-300 shadow-lg hover:shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-2">{course.name}</h3>
        <div className="flex justify-between items-center">
          <div className="w-3/4 bg-gray-600 rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full bg-blue-500 transition-all duration-500 ease-in-out"
              style={{ width: `${course.progress}%` }}
            />
          </div>
          <span className="text-white font-semibold">{`${course.progress}%`}</span>
        </div>
        <p className="text-gray-300 mt-2">{`${course.students} students • ${course.status}`}</p>
      </Link>
    </motion.div>
  );

  const renderDashboardItem = (title: string, href: string, icon: React.ReactNode) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full sm:w-[48%] lg:w-[31%] mb-3"
    >
      <Link href={href} className="bg-gray-700 p-4 rounded-lg flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg">
        {icon}
        <span className="text-white font-medium text-center ml-2">{title}</span>
      </Link>
    </motion.div>
  );

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen p-2 md:p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 rounded-lg mb-6 bg-gray-800"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0">
            {`Welcome, ${userName}!`}
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gray-700 p-2 rounded-full shadow-lg"
          >
            <HiUser className="text-white text-xl" />
          </motion.button>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-lg md:text-xl font-semibold text-white mb-2 sm:mb-0">
            {`Current Role: ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleRole}
            className="bg-blue-600 px-4 py-2 rounded-full text-white font-semibold w-full sm:w-auto transition-colors duration-300 hover:bg-blue-700"
          >
            {`Switch to ${selectedRole === 'student' ? 'Teacher' : 'Student'}`}
          </motion.button>
        </div>
      </motion.div>

      <div className="p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white">Your Courses</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-gray-700 p-2 rounded-full shadow-lg"
            >
              <HiSearch className="text-white text-xl" />
            </motion.button>
          </div>
          <input
            className="bg-gray-700 text-white p-3 rounded-lg mb-4 border border-gray-600 focus:border-blue-500 transition-colors duration-200 w-full"
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: '16px' }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map(renderCourseItem)}
          </div>
        </motion.div>

        {selectedRole === 'teacher' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Teacher Dashboard</h2>
            <div className="flex flex-wrap justify-between">
              {renderDashboardItem('Class Overview', '/teacher/class-overview', <HiUserGroup className="text-2xl" />)}
              {renderDashboardItem('Manage Lessons', '/teacher/manage-lessons', <HiClipboardList className="text-2xl" />)}
              {renderDashboardItem('Student Progress', '/teacher/student-progress', <HiChartBar className="text-2xl" />)}
              {renderDashboardItem('Notifications', '/teacher/notifications', <HiChatAlt2 className="text-2xl" />)}
              {renderDashboardItem('Teaching Schedule', '/teacher/schedule', <HiClock className="text-2xl" />)}
              {renderDashboardItem('Grade Assignments', '/teacher/grade-assignments', <HiAcademicCap className="text-2xl" />)}
            </div>
          </motion.div>
        )}

        {selectedRole === 'student' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">Student Dashboard</h2>
            <div className="flex flex-wrap justify-between">
              {renderDashboardItem('Course Overview', '/student/course-overview', <HiClipboardList className="text-2xl" />)}
              {renderDashboardItem('Assignments', '/student/assignments', <HiAcademicCap className="text-2xl" />)}
              {renderDashboardItem('Progress Tracker', '/student/progress', <HiChartBar className="text-2xl" />)}
              {renderDashboardItem('Notifications', '/student/notifications', <HiChatAlt2 className="text-2xl" />)}
              {renderDashboardItem('Class Schedule', '/student/schedule', <HiClock className="text-2xl" />)}
              {renderDashboardItem('Message Teacher', '/student/message', <HiUserGroup className="text-2xl" />)}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800 rounded-lg p-4 mb-6 shadow-lg"
        >
          <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Recent Activity</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { href: '/activity/1', text: 'Completed Mathematics 101 quiz' },
              { href: '/activity/2', text: 'Submitted English Literature essay' },
              { href: '/activity/3', text: 'Earned a new badge in Physics' },
            ].map(({ href, text }) => (
              <motion.div
                key={href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={href} className="block bg-gray-700 p-3 rounded-lg flex items-center hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg">
                  <span className="text-white ml-3">{text}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Notifications</h2>
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700 p-3 rounded-lg mb-2"
              >
                <p className="text-white">{notification.message}</p>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-gray-700 p-2 rounded-lg mt-2 w-full transition-colors duration-300 hover:bg-gray-600"
            >
              <span className="text-white text-center font-semibold">View All Notifications</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="bg-gray-800 rounded-lg p-4 shadow-lg"
          >
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Upcoming Events</h2>
            {upcomingEvents.map(event => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-700 p-3 rounded-lg mb-2"
              >
                <p className="text-white font-semibold">{event.title}</p>
                <p className="text-gray-300">{event.date}</p>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="bg-gray-700 p-2 rounded-lg mt-2 w-full transition-colors duration-300 hover:bg-gray-600"
            >
              <span className="text-white text-center font-semibold">View Calendar</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
