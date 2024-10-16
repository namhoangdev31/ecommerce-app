import { Layout } from 'antd'
import React, { useState } from 'react'
import { Sidebar } from '../Siderbar/Siderbar'
import { HeaderDashboard } from '../header/HeaderDashboard'
import { useTheme } from 'next-themes'

const { Content } = Layout

interface Props {
  children: React.ReactNode
}

export const LayoutDashboard = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  return (
    <Layout className={theme === 'dark' ? 'dark' : 'dark'}>
      <Sidebar 
        collapsed={collapsed}
        onCollapsed={() => {
          return setCollapsed(!collapsed)
        }}
      />
      <Layout className={`h-screen dark:bg-gray-900 transition-all duration-300`}>
        {/* <HeaderDashboard /> */}
        <Content className="site-layout min-h-[280px] bg-transparent overflow-auto max-h-full dark:text-white">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
