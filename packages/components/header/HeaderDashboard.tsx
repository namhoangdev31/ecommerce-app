import { Avatar, Button, Input, Layout, theme } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import { ExclamationMarkIcon } from '../../assets/icons/ExclamationMarkIcon'
import { SearchIcon } from '../../assets/icons/SearchIcon'
import { useSearch } from '../../hooks/useSearch'
import {
  NAME_PAGE,
  NOT_SHOW_INPUT,
  Routes,
  SHOW_BUTTONBACK,
} from '../../constants/Routes'
// import { useAuth } from '@/hooks/useAuth'

const { Header } = Layout

export const HeaderDashboard = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken()
  const { onSearchValue, searchValue } = useSearch()
  const { pathname, back } = useRouter()
  // const { userInfo } = useAuth()

  return (
    <Header style={{ padding: 0, background: 'none', zIndex: 99 }}>
      <div className={styles.contentHeader}>
        <div className={styles.contentBreadcrumb}>
          {SHOW_BUTTONBACK[pathname as Routes] && (
            <Button
              icon={<ArrowLeftOutlined style={{ fontSize: '16px' }} />}
              onClick={() => back()}
            />
          )}
          <div>
            <p className={styles.breadcrumb}>
              Pagina / {NAME_PAGE[pathname as Routes]}
            </p>
            <p className={styles.title} style={{ color: colorPrimary }}>
              {NAME_PAGE[pathname as Routes]}
            </p>
          </div>
        </div>

        <div className={styles.contentSearch}>
          {!NOT_SHOW_INPUT[pathname as Routes] && (
            <Input
              prefix={<SearchIcon style={{ marginRight: '5px' }} />}
              className={styles.inputSearch}
              placeholder="Buscar"
              size="large"
              onChange={(event) => onSearchValue(event.target.value)}
              value={searchValue}
            />
          )}
          {NOT_SHOW_INPUT[pathname as Routes] && <div></div>}
          <Button icon={<ExclamationMarkIcon />} type="text"></Button>

          {/*<Avatar>{userInfo?.username.slice(0, 2).toUpperCase()}</Avatar>*/}
        </div>
      </div>
    </Header>
  )
}
