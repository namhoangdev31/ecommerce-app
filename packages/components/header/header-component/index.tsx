import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeaderComponent() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isDesktop = windowWidth >= 1024;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    const isMobile = windowWidth < 768;

    return (
        <header className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition duration-300 flex items-center">
                        <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Logo
                    </Link>
                </div>
                <nav className={`hidden md:flex items-center ${isDesktop ? 'mr-auto ml-8' : 'mx-auto'} space-x-8`}>
                    <Link href="/about" className="text-gray-600 hover:text-blue-600 transition duration-300 text-lg font-medium">
                        About
                    </Link>
                    <Link href="/services" className="text-gray-600 hover:text-blue-600 transition duration-300 text-lg font-medium">
                        Services
                    </Link>
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition duration-300 text-lg font-medium">
                        Contact
                    </Link>
                </nav>
                <div className={`hidden md:flex items-center ${isTablet ? 'space-x-2' : 'space-x-4'}`}>
                    <Link href="/login" className={`text-gray-600 hover:text-blue-600 transition duration-300 font-medium ${isTablet ? 'text-sm px-3 py-1' : ''}`}>
                        Login
                    </Link>
                    <Link href="/signup" className={`bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 font-semibold ${isTablet ? 'text-sm px-3 py-1' : 'px-6 py-2'}`}>
                        Sign Up
                    </Link>
                </div>
                <div className="md:hidden">
                    <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
            </div>
        </header>
    );
};
