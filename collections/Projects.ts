import { CollectionConfig } from "payload";
import { revalidateCollection } from "@/lib/revalidate";

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'tags', 'order'],
  },
  hooks: revalidateCollection('projects'),
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
    {
      name: 'aiEngine',
      type: 'select',
      options: [
        { label: 'Claude / Orchestration', value: 'claude' },
        { label: 'Gemini', value: 'gemini' },
        { label: 'Vertex AI', value: 'vertex' },
        { label: 'React Native', value: 'native' },
        { label: 'Web', value: 'web' },
      ],
      admin: {
        description: 'Drives the /ops-dashboard engine filter. Leave empty to hide this project from that view.',
      },
    },
    {
      name: 'personal',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Tags the project "Personal" for grid/tag filtering across views.',
      },
    },
  ],
  defaultSort: 'order',
};
