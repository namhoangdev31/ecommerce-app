import { buildConfig } from 'payload/config'
import { Pages } from './collections/pages.collection'
import * as path from 'path'
import { Logo, LogoIcon } from './logo/logo.component'
import * as process from 'process'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { email, password } from "payload/dist/fields/validations";
import BeforeLogin from "../views/BeforeLogin";
import BeforeDashboard from '../views/BeforeDashboard'
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Settings } from "./globals/Settings";

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Pages,
  ],
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
    graphQL: '/cms/graphql',
    graphQLPlayground: '/cms/playground',
  },
  globals: [
    Footer,Header,Settings
  ],
  admin: {
    components: {
      beforeLogin: [BeforeLogin],
      graphics: {
        Logo,
        Icon: LogoIcon,
      },
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, './cms/types/cms.types.ts'),
  },
})
