import { buildConfig } from 'payload/config'
import { Pages } from './collections/pages.collection'
import * as path from 'path'
import { Logo, LogoIcon } from './logo/logo.component'
import { BaseDatabaseAdapter } from 'payload/dist/database/types'
import { Payload } from 'payload/dist/payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
  collections: [
    Pages,
  ],
  editor: slateEditor({}),
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
    graphQL: '/cms/graphql',
    graphQLPlayground: '/cms/playground',
  },
  admin: {
    bundler: webpackBundler(),
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
  db: mongooseAdapter({
    url: 'mongodb://localhost:27017/payload-template-ecommerce',
  }),
})
