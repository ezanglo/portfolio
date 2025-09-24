import { CollectionConfig } from "payload";

export const SiteConfig: CollectionConfig = {
  slug: 'site-config',
  admin: {
    useAsTitle: 'siteName',
    description: 'Global site configuration settings',
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => {
      // Allow creation if user is logged in
      return Boolean(user);
    },
    update: ({ req: { user } }) => {
      // Allow updates if user is logged in
      return Boolean(user);
    },
    delete:  ({ req: { user } }) => {
      // Allow updates if user is logged in
      return Boolean(user);
    },
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Ezra Anglo Portfolio',
    },
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        {
          name: 'photo',
          type: 'text',
          required: true,
          admin: {
            description: 'Upload a new profile photo or enter a URL',
            components: {
              Field: '/components/admin/PhotoUploadField',
            },
          },
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          defaultValue: 'Ezra',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Full Stack Developer',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          defaultValue: 'with 9 years of development experience. I enjoy building applications for Web, Mobile, Desktop. I currently focus on',
        },
        {
          name: 'descriptionHighlight',
          type: 'text',
          required: true,
          defaultValue: 'React, PHP and .NET',
          admin: {
            description: 'Highlighted text that appears in the description (will be styled with gradient)',
          },
        },
        {
          name: 'cvDownloadUrl',
          type: 'text',
          required: true,
          admin: {
            description: 'Upload a new CV file or enter a URL',
            components: {
              Field: '/components/admin/CVUploadField',
            },
          },
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          required: true,
          defaultValue: 'https://www.linkedin.com/in/ezraanglo',
        },
        {
          name: 'githubUrl',
          type: 'text',
          required: true,
          defaultValue: 'https://www.github.com/ezanglo',
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Section',
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'dev.ezraanglo@gmail.com',
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'About Section',
      fields: [
        {
          name: 'description',
          type: 'richText',
          required: true,
        },
        {
          name: 'mainStack',
          type: 'text',
          required: true,
          defaultValue: 'React, Typescript, PostgreSQL and PHP',
        },
        {
          name: 'additionalTech',
          type: 'text',
          required: true,
          defaultValue: 'TailwindCSS, .NET, Prisma, and React Native',
        },
        {
          name: 'careerStatus',
          type: 'text',
          required: true,
          defaultValue: 'full-time position as a full-stack developer',
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'copyrightText',
          type: 'text',
          required: true,
          defaultValue: '© 2023 Ezra Anglo. All rights reserved.',
        },
        {
          name: 'techStackDescription',
          type: 'text',
          required: true,
          defaultValue: 'Built with React & Next.js (App Router & Server Actions), TypeScript, Tailwind CSS, Framer Motion, Shadcn/ui, React Hook Form, Zod, Email & Resend, Vercel hosting.',
        },
      ],
    },
  ],
};
