import { Provider } from 'app/provider'
import Head from 'next/head'

import '../global.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { LayoutDashboard } from '../../../packages/components/layout/LayoutDashboard'
import 'dayjs/locale/es-us'
import React from 'react'

type ExtendedAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: React.ReactElement) => React.ReactNode
  }
}

export default function MyApp({ Component, pageProps }: ExtendedAppProps) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return <LayoutDashboard>{page}</LayoutDashboard>
    })

  return (
    <>
      <Head>
        <title>Ứng dụng mẫu Solito</title>
        <meta
          name="description"
          content="Expo + Next.js với Solito. Bởi Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <>{getLayout(<Component {...pageProps} />)}</>
      </Provider>
    </>
  )
}
