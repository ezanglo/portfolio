import { CollectionConfig } from "payload";
import { revalidateCollection } from "@/lib/revalidate";

export const SiteConfig: CollectionConfig = {
  slug: 'site-config',
  admin: {
    useAsTitle: 'siteName',
    description: 'Global site configuration settings',
  },
  hooks: revalidateCollection('site-config'),
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
      name: 'howIWork',
      type: 'group',
      label: 'How I Work Section',
      fields: [
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          defaultValue: 'I work in short, verifiable loops rather than long stretches of unreviewed code: scope a slice small enough to ship in a day, wire it end to end, and let real usage (not speculation) decide what comes next.',
        },
        {
          name: 'steps',
          type: 'array',
          minRows: 4,
          maxRows: 6,
          admin: {
            description: 'The process flow shown as a connected sequence. Keep labels to one or two words, verbs not "Step N".',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
            {
              name: 'tools',
              type: 'array',
              admin: {
                description: 'Tool logos attached to this step (Simple Icons slug, e.g. "react", "expo", "anthropic").',
              },
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'iconSlug',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'whyHireMe',
      type: 'group',
      label: 'Why Hire Me Section',
      fields: [
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          defaultValue: 'A single person who can take a mobile app from idea to app store, and wire real AI capability into it along the way, not a hand-off between three specialists.',
        },
        {
          name: 'points',
          type: 'array',
          minRows: 3,
          maxRows: 4,
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'aiEngineering',
      type: 'group',
      label: 'AI Engineering Section',
      fields: [
        {
          name: 'intro',
          type: 'textarea',
          required: true,
          defaultValue: 'I treat AI models as another backend service to integrate, not as a novelty. Every model I bring into a product is there to cut a specific cost or unlock a specific feature, chosen and swapped on evidence.',
        },
      ],
    },
    {
      name: 'stats',
      type: 'group',
      label: 'Stats',
      admin: {
        description: 'Editorial claims shown in the "Why Hire Me" section. Project count is derived automatically, not authored here.',
      },
      fields: [
        {
          name: 'yearsExperience',
          type: 'text',
          required: true,
          defaultValue: '10+',
        },
        {
          name: 'tokenSavings',
          type: 'text',
          required: true,
          defaultValue: '92%',
          admin: {
            description: 'e.g. "92%" — token cost reduction claim',
          },
        },
        {
          name: 'enginesOrchestrated',
          type: 'text',
          required: true,
          defaultValue: '4',
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
