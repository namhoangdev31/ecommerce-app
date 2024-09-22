import { Layout } from 'antd'
import React, { useState } from 'react'
import { Sidebar } from '../Siderbar/Siderbar'
import { HeaderDashboard } from '../header/HeaderDashboard'

const { Content } = Layout

interface Props {
  children: React.ReactNode
}

export const LayoutDashboard = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout>
      <Sidebar
        collapsed={collapsed}
        onCollapsed={() => {
          return setCollapsed(!collapsed)
        }}
      />
      <Layout
        style={{
          height: '100vh',
        }}
      >
        <HeaderDashboard />
        <Content
          className="site-layout"
          style={{
            margin: '16px 0px',
            padding: 24,
            minHeight: 280,
            background: 'none',
            overflow: 'auto',
            maxHeight: '100%',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}
