import type { GlobalConfig } from 'payload/types'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        {
          name: 'link',
          type: 'text',
          label: 'Link',
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
      ],
    },
  ],
}
