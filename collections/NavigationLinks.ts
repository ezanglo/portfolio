import { CollectionConfig } from "payload";

export const NavigationLinks: CollectionConfig = {
  slug: 'navigation-links',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hash', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'hash',
      type: 'text',
      required: true,
      admin: {
        description: 'URL hash (e.g., "#home", "#about")',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      admin: {
        description: 'Order for display (lower numbers appear first)',
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show this link in navigation',
      },
    },
  ],
  defaultSort: 'order',
};
