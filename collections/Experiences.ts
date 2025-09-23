import { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'year', 'date'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: {
        description: 'Display year range (e.g., "2023 - Present")',
      },
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: {
        description: 'Detailed date range (e.g., "July 2023 - Present")',
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'responsibilities',
      type: 'array',
      fields: [
        {
          name: 'responsibility',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'icon',
      type: 'select',
      options: [
        { label: 'Star', value: 'star' },
        { label: 'Code', value: 'code' },
        { label: 'Monitor', value: 'monitor' },
        { label: 'Book', value: 'book' },
        { label: 'Graduation Cap', value: 'graduation' },
      ],
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order for display (lower numbers appear first)',
      },
    },
  ],
  defaultSort: 'order',
};
