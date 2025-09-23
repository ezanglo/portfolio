import { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'tags', 'order'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Web', value: 'web' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Desktop', value: 'desktop' },
        { label: 'IoT', value: 'iot' },
      ],
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'imageUrl',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Project screenshot or logo',
      },
    },
    {
      name: 'liveUrl',
      type: 'text',
      admin: {
        description: 'Live demo URL (optional)',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        description: 'GitHub repository URL (optional)',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Order for display (lower numbers appear first)',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this project prominently',
      },
    },
  ],
  defaultSort: 'order',
};
