import { Button, Divider } from 'antd'
import { LeftArrowIcon } from '../../../assets/icons/LeftArrowIcon'
import AppIcon from '../../../assets/icons/AppIcon'
import { useTheme } from 'next-themes'

interface Props {
  collapsed: boolean
  onCollapsed: () => void
}

export const SidebarHeader = ({ collapsed, onCollapsed }: Props) => {
  return (
    <div className="p-5 pb-1 relative rounded-tr-[11px] bg-gray-800">
      <div 
        className={`flex items-center ${collapsed ? 'justify-center' : 'justify-center'} transition-all duration-500 cursor-pointer`}
        onClick={onCollapsed}
      >
        <div className="bg-[#3498db] rounded-full p-2">
          <AppIcon />
        </div>
      </div>
      <Divider className="bg-gray-700 mt-4" />
    </div>
  )
}
