import { CollectionConfig } from 'payload/types'
import SlugField from '../fields/slug.field'
import { hero } from '../fields/hero'
import * as process from 'process'
import { CallToAction } from '../blocks/CallToAction'
import { Content } from '../blocks/Content'
import { MediaBlock } from '../blocks/MediaBlock'
import { Archive } from '../blocks/ArchiveBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${doc.slug !== 'home' ? doc.slug : ''}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      validate: async (value: string, { payload, id }) => {
        if (!payload) return true

        const conflicts = await payload.find({
          collection: 'pages',
          where: { slug: { equals: value }, and: [{ id: { not_equals: id } }] },
        })

        if (conflicts.docs.length > 0) {
          return `This slug is already in use by page "${conflicts.docs[0].title}"`
        }

        return true
      },
      admin: {
        components: {
          Field: SlugField,
        },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [hero],
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
  ],
}
