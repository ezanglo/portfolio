import { CollectionConfig } from "payload";

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Database', value: 'database' },
        { label: 'Cloud & DevOps', value: 'cloud' },
        { label: 'Tools & Others', value: 'tools' },
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
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show this skill prominently',
      },
    },
  ],
  defaultSort: 'order',
};
