import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoHome } from 'react-icons/io5'
import SearchIcon from '../../../assets/search.svg'
import ShortcutIcon from '../../../assets/shortcut_command.svg'

export default function HeaderComponent() {
  const [windowWidth, setWindowWidth] = useState(0)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isDesktop = windowWidth >= 1024
  const isTablet = windowWidth >= 768 && windowWidth < 1024
  const isMobile = windowWidth < 768

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <header className="bg-white py-[12px] pl-[32px]">
      <div className="">
        <div className="flex w-[360px] items-center rounded-xl border-none bg-[#F4F4F4] p-2 hover:border-solid focus:border-solid">
          <SearchIcon
            alt="search"
            className="mx-[8px] h-[19px] w-[19px] items-center"
          />
          <input
            type="text"
            placeholder="Search or type a command"
            className="flex-grow bg-[#F4F4F4] text-base text-sm font-semibold outline-none"
            value={inputValue}
            onChange={handleInputChange}
          />
          {!inputValue ? (
            <ShortcutIcon className="ml-[6px] h-[32px] w-[56px]" />
          ) : (
            <div className="ml-[6px] h-[32px] w-[56px]"></div>
          )}
        </div>
      </div>
    </header>
  )
}
