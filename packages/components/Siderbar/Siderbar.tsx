import { Layout } from 'antd'
import { SidebarHeader } from './SiderbarHeader/SiderbarHeader'
import { MenuSidebar } from './menuSiderbar/MenuSiderbar'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

const { Sider } = Layout

interface Props {
  collapsed: boolean
  onCollapsed: () => void
}

export const Sidebar = ({ collapsed: propCollapsed, onCollapsed }: Props) => {
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(propCollapsed)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 770) {
        setCollapsed(true)
      } else {
        setCollapsed(propCollapsed)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [propCollapsed])

  useEffect(() => {
    if (collapsed !== propCollapsed) {
      onCollapsed()
    }
  }, [collapsed, propCollapsed, onCollapsed])

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={80}
      className={`
        bg-white dark:bg-gray-800 
        md:static absolute z-10 h-screen md:h-auto
        ${collapsed ? 'w-0 sm:w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex h-full flex-col">
        <SidebarHeader
          collapsed={collapsed}
          onCollapsed={() => setCollapsed(!collapsed)}
        />
        <MenuSidebar />
      </div>
    </Sider>
  )
}
