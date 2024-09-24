import { buildConfig } from 'payload/config'
import { Pages } from './collections/pages.collection'
import * as path from 'path'
import { Logo, LogoIcon } from './logo/logo.component'
import Users from './collections/Users'
import * as process from 'process'
import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import

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
  admin: {
    components: {
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
