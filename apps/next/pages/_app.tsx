import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import React from 'react'
import { Jost } from 'next/font/google'

import '../global.css'
import { AppProps } from 'next/app'
import {Header} from "../../../packages/_components/Header";
import {Footer} from "../../../packages/_components/Footer";
import {AdminBar} from "../../../packages/_components/AdminBar";

const jost = Jost({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-jost',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NextJS</title>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Provider>
        <div className={jost.variable}>
          <AdminBar />
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </Provider>
    </>
  )
}

export default MyApp
