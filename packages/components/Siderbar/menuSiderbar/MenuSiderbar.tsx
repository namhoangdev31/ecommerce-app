import { useRouter } from 'next/router'
import { Menu, message } from 'antd'
import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { LogoutIcon } from '../../../assets/icons/LogoutIcon'
import { Routes } from '../../../constants/Routes'
import { HomeIcon } from '../../../assets/icons/HomeIcon'
import { LoanIcon } from '../../../assets/icons/LoanIcon'
import { NextIcon } from '../../../assets/icons/NextIcon'
import { InvoiceIcon } from '../../../assets/icons/InvoiceIcon'
// import { useAuth } from '/hooks/useAuth';

export const MenuSidebar = () => {
  const router = useRouter()
  // const { signOut } = useAuth();
  const [messageApi, contextHolder] = message.useMessage()
  const [optionSelect, setOptionSelect] = useState<Routes | undefined>()

  const OPTION_MENU: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeIcon fill="#FFF" />,
      label: 'DashBoard',
      onClick: () => push('/'),
    },
    {
      key: '/tasks',
      icon: <InvoiceIcon fill="#FFF" />,
      label: 'Tasks',

      children: [
        {
          key: '/learning',
          label: 'Write Task',
          onClick: () => push('/learning'),
        },
        {
          key: '/reading',
          label: 'Read Task',
          onClick: () => push('/reading'),
        },
        {
          key: '/reading/multi-choice',
          label: 'Read Task Multiple',
          onClick: () => push('/reading/multi-choice'),
        },
      ]
    }
  ]

  const push = (path: any) => {
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
        className="bg-gray-800 text-white [&_.ant-menu-item]:text-white [&_.ant-menu-item-icon]:text-white [&_.ant-menu-submenu-title]:text-white [&_.ant-menu-submenu-arrow]:text-white [&_.ant-menu-item-selected]:text-white [&_.ant-menu-item-selected]:bg-gray-700 [&_.ant-menu-item-selected]:shadow-[0_-2px_1px_rgba(255,255,255,0.05),0_1px_1px_rgba(255,255,255,0.05)] [&_.ant-menu-item-selected]:flex [&_.ant-menu-item-selected]:font-semibold [&_.ant-menu-item-selected]:text-center font-inter"
        selectedKeys={optionSelect ? [optionSelect] : []}
        items={OPTION_MENU}
      />

      <Menu
        mode="inline"
        className="mt-auto bg-gray-800 text-white [&_.ant-menu-item]:text-white [&_.ant-menu-item-icon]:text-white [&_.ant-menu-title-content]:text-white [&_.ant-menu-title-content]:font-poppins [&_.ant-menu-title-content]:text-sm [&_.ant-menu-title-content]:font-normal [&_.ant-menu-title-content]:leading-[170%]"
        items={[
          {
            key: '1',
            icon: <LogoutIcon fill="#FFF" />,
            label: 'Logout',
            onClick: () => logout(),
          },
        ]}
      />
    </>
  )
}
