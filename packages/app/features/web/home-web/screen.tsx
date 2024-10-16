import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Course {
  id: number;
  name: string;
  progress: number;
  students: number;
  status: string;
  color: string;
}

const DashboardScreen = () => {
  const [userRoles, setUserRoles] = useState<('student' | 'teacher')[]>(['student', 'teacher']);
  const [userName, setUserName] = useState('John Doe');
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Mathematics 101', progress: 75, students: 30, status: 'In Progress', color: '#4CAF50' },
    { id: 2, name: 'English Literature', progress: 60, students: 25, status: 'In Progress', color: '#2196F3' },
    { id: 3, name: 'Physics', progress: 40, students: 20, status: 'Not Started', color: '#FFC107' },
  ]);
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New assignment in Mathematics 101', color: '#E91E63' },
    { id: 2, message: 'Upcoming quiz in English Literature', color: '#9C27B0' },
  ]);
  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 1, title: 'Mathematics Exam', date: '2023-06-15' },
    { id: 2, title: 'English Literature Presentation', date: '2023-06-20' },
  ]);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      setUserName('Jane Smith');
      setUserRoles(['student', 'teacher']);
    }, 1000);
  }, []);

  const toggleRole = () => {
    setSelectedRole(prevRole => prevRole === 'student' ? 'teacher' : 'student');
  };

  const renderCourseItem = (course: Course) => (
    <Link href={`/course/${course.id}`} key={course.id} className={`block rounded-lg p-4 mb-3 hover:opacity-90 transition-opacity duration-200`} style={{ backgroundColor: course.color }}>
      <h3 className="text-lg font-semibold text-white mb-2">{course.name}</h3>
      <div className="flex justify-between items-center">
        <div className="w-3/4 bg-white bg-opacity-30 rounded-full h-2.5">
          <div
            className="h-2.5 rounded-full bg-white"
            style={{ width: `${course.progress}%` }}
          />
        </div>
        <span className="text-white font-semibold">{`${course.progress}%`}</span>
      </div>
      <p className="text-white mt-2">{`${course.students} students • ${course.status}`}</p>
    </Link>
  );

  const renderDashboardItem = (title: string, color: string, href: string) => (
    <Link href={href} key={title} className={`w-[48%] p-4 rounded-lg mb-3 flex items-center justify-center hover:opacity-90 transition-opacity duration-200`} style={{ backgroundColor: color }}>
      <span className="text-white font-medium text-center">{title}</span>
    </Link>
  );

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-gray-900 h-screen p-2">
      <div className="p-6" style={{ background: 'linear-gradient(to bottom, #1F2937, #374151)' }}>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-white">Welcome, {userName}!</h1>
          <button className="bg-purple-600 p-2 rounded-full">
            <span className="text-white">👤</span>
          </button>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-white">
            Current Role: {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </p>
          <button
            onClick={toggleRole}
            className="bg-indigo-600 px-4 py-2 rounded-full text-white font-semibold"
          >
            Switch to {selectedRole === 'student' ? 'Teacher' : 'Student'}
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Your Courses</h2>
            <button className="bg-green-600 p-2 rounded-full">
              <span className="text-white">🔍</span>
            </button>
          </div>
          <input
            className="bg-gray-700 text-white p-3 rounded-lg mb-4 border border-gray-700 focus:border-indigo-500 transition-colors duration-200 w-full"
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ fontSize: '16px' }}
          />
          {filteredCourses.map(renderCourseItem)}
        </div>

        {selectedRole === 'teacher' && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Teacher Dashboard</h2>
            <div className="flex flex-wrap justify-between">
              {renderDashboardItem('Class Overview', '#2C3E50', '/teacher/class-overview')}
              {renderDashboardItem('Manage Lessons', '#34495E', '/teacher/manage-lessons')}
              {renderDashboardItem('Student Progress', '#2C3E50', '/teacher/student-progress')}
              {renderDashboardItem('Notifications', '#4A235A', '/teacher/notifications')}
              {renderDashboardItem('Teaching Schedule', '#4A235A', '/teacher/schedule')}
              {renderDashboardItem('Grade Assignments', '#34495E', '/teacher/grade-assignments')}
            </div>
          </div>
        )}

        {selectedRole === 'student' && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">Student Dashboard</h2>
            <div className="flex flex-wrap justify-between">
              {renderDashboardItem('Course Overview', '#1B4F72', '/student/course-overview')}
              {renderDashboardItem('Assignments', '#1B4F72', '/student/assignments')}
              {renderDashboardItem('Progress Tracker', '#1B4F72', '/student/progress')}
              {renderDashboardItem('Notifications', '#6E2C00', '/student/notifications')}
              {renderDashboardItem('Class Schedule', '#6E2C00', '/student/schedule')}
              {renderDashboardItem('Message Teacher', '#6E2C00', '/student/message')}
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-3">Recent Activity</h2>
          <Link href="/activity/1" className="block bg-blue-600 p-3 rounded-lg mb-2 flex items-center hover:opacity-90 transition-opacity duration-200">
            <span className="text-white ml-3">Completed Mathematics 101 quiz</span>
          </Link>
          <Link href="/activity/2" className="block bg-green-600 p-3 rounded-lg mb-2 flex items-center hover:opacity-90 transition-opacity duration-200">
            <span className="text-white ml-3">Submitted English Literature essay</span>
          </Link>
          <Link href="/activity/3" className="block bg-yellow-600 p-3 rounded-lg flex items-center hover:opacity-90 transition-opacity duration-200">
            <span className="text-white ml-3">Earned a new badge in Physics</span>
          </Link>
        </div>

        <div className="flex">
          <div className="bg-white rounded-lg p-4 shadow-md flex-1 mr-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Notifications</h2>
            {notifications.map(notification => (
              <div key={notification.id} className="bg-gray-100 p-3 rounded-lg mb-2">
                <p className="text-gray-700">{notification.message}</p>
              </div>
            ))}
            <button className="bg-blue-500 p-2 rounded-lg mt-2 w-full">
              <span className="text-white text-center">View All Notifications</span>
            </button>
          </div>
          
          <div className="bg-white rounded-lg p-4 shadow-md flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Upcoming Events</h2>
            {upcomingEvents.map(event => (
              <div key={event.id} className="bg-gray-100 p-3 rounded-lg mb-2">
                <p className="text-gray-700 font-semibold">{event.title}</p>
                <p className="text-gray-600">{event.date}</p>
              </div>
            ))}
            <button className="bg-green-500 p-2 rounded-lg mt-2 w-full">
              <span className="text-white text-center">View Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
