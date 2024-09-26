import { slateEditor } from '@payloadcms/richtext-slate'
import type {
  AdapterArguments,
  RichTextElement,
  RichTextLeaf,
} from '@payloadcms/richtext-slate/dist/types'
import type { RichTextField } from 'payload/dist/fields/config/types'

import elements from './elements'
import leaves from './leaves'
import { deepMerge } from 'payload/utilities'
import link from '../link'

type RichText = (
  overrides?: Partial<RichTextField> & { admin?: AdapterArguments['admin'] },
  additions?: {
    elements?: RichTextElement[]
    leaves?: RichTextLeaf[]
  },
) => RichTextField

const richText: RichText = (
  overrides,
  additions = {
    elements: [],
    leaves: [],
  },
) => {
  const slateOptions = deepMerge(
    overrides?.admin || {},
    {
      upload: {
        collections: {
          media: {
            fields: [
              {
                type: 'richText',
                name: 'caption',
                label: 'Caption',
                editor: slateEditor({
                  admin: {
                    elements: [...elements],
                    leaves: [...leaves],
                  },
                }),
              },
              {
                type: 'radio',
                name: 'alignment',
                label: 'Alignment',
                options: [
                  {
                    label: 'Left',
                    value: 'left',
                  },
                  {
                    label: 'Center',
                    value: 'center',
                  },
                  {
                    label: 'Right',
                    value: 'right',
                  },
                ],
              },
              {
                name: 'enableLink',
                type: 'checkbox',
                label: 'Enable Link',
              },
              link({
                appearances: false,
                disableLabel: true,
                overrides: {
                  admin: {
                    condition: (_, data) => Boolean(data?.enableLink),
                  },
                },
              }),
            ],
          },
        },
      },
      elements: [...elements, ...(additions.elements || [])],
      leaves: [...leaves, ...(additions.leaves || [])],
    },
  )

  const fieldOverrides = {
    ...(overrides || {}),
  }

  delete fieldOverrides.admin

  return deepMerge(
    {
      name: 'richText',
      type: 'richText',
      required: true,
      editor: slateEditor({
        admin: slateOptions,
      }),
    },
    fieldOverrides || {},
  )
}
export default richText
