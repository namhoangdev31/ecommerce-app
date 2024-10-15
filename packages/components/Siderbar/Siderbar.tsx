import { Layout } from 'antd'
import { SidebarHeader } from './SiderbarHeader/SiderbarHeader'
import { MenuSidebar } from './menuSiderbar/MenuSiderbar'
import { useTheme } from 'next-themes'

const { Sider } = Layout

interface Props {
  collapsed: boolean
  onCollapsed: () => void
}

export const Sidebar = ({ collapsed, onCollapsed }: Props) => {
  const { theme } = useTheme()

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className={`
        bg-white dark:bg-gray-800 
        ${collapsed ? 'w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="flex flex-col h-full">
        <SidebarHeader collapsed={collapsed} onCollapsed={onCollapsed} />
        <MenuSidebar />
      </div>
    </Sider>
  )
}
