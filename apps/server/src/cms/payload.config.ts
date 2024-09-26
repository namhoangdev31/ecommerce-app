import { buildConfig } from 'payload/config'
import { Pages } from './collections/pages.collection'
import * as path from 'path'
import { Logo, LogoIcon } from './logo/logo.component'
import * as process from 'process'
import BeforeLogin from "../views/BeforeLogin";
import { Footer } from "./globals/Footer";
import { Header } from "./globals/Header";
import { Settings } from "./globals/Settings";
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'


export default buildConfig({
  editor: undefined,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  collections: [
    Pages,
  ],
  express: {
    preMiddleware: [
      (req, res, next) => {
        next()
      }
    ],
    postMiddleware: [
      (req, res, next) => {
        next()
      }
    ]
  },
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
    graphQL: '/cms/graphql',
    graphQLPlayground: '/cms/playground',
  },
  globals: [
    Footer, Header, Settings
  ],
  admin: {
    // bundler: webpackBundler(),
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
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
