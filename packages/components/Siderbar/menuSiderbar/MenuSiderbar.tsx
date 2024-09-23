 import { useRouter } from 'next/router'
  import { Menu, message } from 'antd'
  import { useEffect, useState } from 'react'
  import type { MenuProps } from 'antd'
  import styles from './MenuSiderbar.module.css'
  import { AgentIcon } from '../../../assets/icons/AgentIcon'
  import { LogoutIcon } from '../../../assets/icons/LogoutIcon'
  import { Routes } from '../../../constants/Routes'
  // import { useAuth } from '/hooks/useAuth';

  export const MenuSidebar = () => {
    const router = useRouter()
    // const { signOut } = useAuth();
    const [messageApi, contextHolder] = message.useMessage()
    const [optionSelect, setOptionSelect] = useState<Routes | undefined>()

    const OPTION_MENU: MenuProps['items'] = [
      {
        key: '/',
        icon: <AgentIcon fill="#FFF" />,
        label: 'DashBoard',
        onClick: () => push('/'),
      },
    ]

    const push = (path: Routes) => {
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
          className={styles.menu}
          selectedKeys={optionSelect ? [optionSelect] : []}
          items={OPTION_MENU}
        />

        <Menu
          mode="inline"
          className={styles.menuLogout}
          items={[
            {
              key: '1',
              icon: <LogoutIcon />,
              label: 'Cerrar Session',
              onClick: () => logout(),
            },
          ]}
        />
      </>
    )
  }