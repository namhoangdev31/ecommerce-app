import 'raf/polyfill'
import 'setimmediate'

import { Provider } from 'app/provider'
import Head from 'next/head'
import * as React from "react";
import { Jost } from 'next/font/google'

import '../global.css'
import { AppProps } from 'next/app'
import { InitTheme } from "app/provider/themes/init-themes";
import Header from '../../../packages/components/header'
import Footer from "../../../packages/components/footer";

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Solito Example App</title>
        <meta
          name="description"
          content="Expo + Next.js with Solito. By Fernando Rojo."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
