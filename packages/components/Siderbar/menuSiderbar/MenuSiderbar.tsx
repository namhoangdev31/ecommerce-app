import { useRouter } from 'next/router'
import { Menu, message } from 'antd'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Routes } from '../../../constants/Routes'
import { HiHome, HiDocumentText, HiCollection, HiLogout } from 'react-icons/hi'
import { RiPresentationFill, RiPresentationLine } from 'react-icons/ri'

export const MenuSidebar = () => {
  const router = useRouter()
  // const { signOut } = useAuth();
  const [messageApi, contextHolder] = message.useMessage()
  const [optionSelect, setOptionSelect] = useState<Routes | undefined>()

  const OPTION_MENU: MenuProps['items'] = [
    {
      key: '/',
      icon: <HiHome size={20} />,
      label: 'DashBoard',
      onClick: () => push('/'),
    },
    {
      key: '/tasks',
      icon: <HiDocumentText size={20} />,
      label: 'Tasks',
      children: [
        {
          key: '/write-task',
          label: 'Write Task',
          onClick: () => push('/write-task'),
        },
        {
          key: '/read-task',
          label: 'Read Task',
          onClick: () => push('/read-task'),
        },
        {
          key: '/read/multi-choice',
          label: 'Multiple Choice',
          onClick: () => push('/read/multi-choice'),
        },
      ],
    },
    {
      key: '/course',
      icon: <HiCollection size={20} />,
      label: 'Training program',
      onClick: () => push('/course'),
    },
    {
      key: '/class',
      icon: <RiPresentationFill size={20} />,
      label: 'ClassRoom',
      onClick: () => push('/class'),
    },
  ]

  const push = (path: string) => {
    router.push(path).catch(async () => {
      await messageApi.error(`No se encontro la ruta ${path}`)
    })
  }

  const logout = () => {
    push('/login')
    // signOut();
  }

  useEffect(() => {
    const { pathname } = router
    setOptionSelect(pathname as Routes)
  }, [router.pathname])

  return (
    <>
      {contextHolder}
      <Menu
        mode="inline"
        className="font-inter bg-gray-800 text-white [&_.ant-menu-item-icon]:text-white [&_.ant-menu-item-selected]:bg-gray-700 [&_.ant-menu-item-selected]:text-center [&_.ant-menu-item-selected]:font-semibold [&_.ant-menu-item-selected]:shadow-[0_-2px_1px_rgba(255,255,255,0.05),0_1px_1px_rgba(255,255,255,0.05)] [&_.ant-menu-item]:text-white [&_.ant-menu-submenu-arrow]:text-white [&_.ant-menu-submenu-title]:text-white"
        selectedKeys={optionSelect ? [optionSelect] : []}
        items={OPTION_MENU}
      />

      <Menu
        mode="inline"
        className="[&_.ant-menu-title-content]:font-poppins mt-auto bg-gray-800 text-white [&_.ant-menu-item-icon]:text-white [&_.ant-menu-item]:text-white [&_.ant-menu-title-content]:text-sm [&_.ant-menu-title-content]:font-normal [&_.ant-menu-title-content]:leading-[170%] [&_.ant-menu-title-content]:text-white"
        items={[
          {
            key: '1',
            icon: <HiLogout size={24} color="red" />,
            label: 'Logout',
            onClick: logout,
          },
        ]}
      />
    </>
  )
}
