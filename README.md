# Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Payload CMS. Features a clean design with dark/light mode support, contact form with email integration, and a fully customizable admin panel.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **CMS Integration**: Payload CMS for content management
- **Database**: PostgreSQL with Prisma-like adapter
- **UI Components**: Shadcn/ui components with Radix UI primitives
- **Animations**: Framer Motion for smooth animations
- **Email Integration**: Resend for contact form emails
- **File Storage**: Vercel Blob for file uploads
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark/Light Mode**: Theme switching with next-themes
- **SEO Optimized**: Built-in SEO features and meta tags

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun**
- **PostgreSQL** database
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URI=postgresql://username:password@localhost:5432/portfolio_db

# Payload CMS Configuration
PAYLOAD_SECRET=your-super-secret-payload-key-here

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-api-key

# Vercel Blob (for file uploads)
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token

# Optional: Custom domain for file uploads
NEXT_PUBLIC_BLOB_READ_URL=https://your-blob-domain.com
```

#### Environment Variables Explained:

- **DATABASE_URI**: PostgreSQL connection string for your database
- **PAYLOAD_SECRET**: A secure, random string for Payload CMS authentication
- **RESEND_API_KEY**: API key from [Resend](https://resend.com) for email functionality
- **BLOB_READ_WRITE_TOKEN**: Token from Vercel Blob for file storage
- **NEXT_PUBLIC_BLOB_READ_URL**: Public URL for accessing uploaded files

### 4. Database Setup

1. **Create a PostgreSQL database**:
   ```sql
   CREATE DATABASE portfolio_db;
   ```

2. **Update the DATABASE_URI** in your `.env.local` file with your actual database credentials.

3. **Run database migrations** (Payload will handle this automatically on first run):
   ```bash
   npm run dev
   ```

### 5. Generate Types and Import Map

```bash
# Generate Payload types
npm run generate:types

# Generate import map for admin panel
npm run generate:importmap
```

### 6. Start the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📝 Initial Setup

### 1. Create Admin User

1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Create your first admin user account
3. Log in to access the admin panel

### 2. Configure Site Settings

1. In the admin panel, go to **Site Config**
2. Fill in your personal information:
   - Site name
   - Hero section (photo, name, title, description)
   - Contact email
   - About section content
   - Footer information

### 3. Add Content

1. **Experiences**: Add your work experience and education
2. **Projects**: Showcase your portfolio projects
3. **Skills**: List your technical skills
4. **Navigation Links**: Configure menu items
5. **Media**: Upload images and files

## 🎨 Customization

### Styling

- **Global Styles**: `app/(frontend)/globals.css`
- **Component Styles**: Individual component files with Tailwind CSS
- **Theme Configuration**: `components/theme-provider.tsx`

### Components

- **UI Components**: `components/ui/` (Shadcn/ui components)
- **Page Sections**: `components/` (Hero, About, Projects, etc.)
- **Admin Components**: `components/admin/` (Custom admin fields)

### Content Management

- **Collections**: `collections/` (Payload CMS collection definitions)
- **Queries**: `lib/queries.ts` (Data fetching functions)

## 🚀 Deployment

### Vercel (Recommended)

1. **Push your code** to GitHub/GitLab
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Configure environment variables in Vercel dashboard
3. **Deploy**: Vercel will automatically deploy on every push

### Environment Variables for Production

Set these in your deployment platform:

```env
DATABASE_URI=your-production-database-url
PAYLOAD_SECRET=your-production-secret
RESEND_API_KEY=your-resend-api-key
BLOB_READ_WRITE_TOKEN=your-vercel-blob-token
NEXT_PUBLIC_BLOB_READ_URL=https://your-blob-domain.com
```

### Database Setup for Production

1. **Set up a production PostgreSQL database** (e.g., Vercel Postgres, Supabase, Railway)
2. **Update DATABASE_URI** with production credentials
3. **Deploy**: The database schema will be created automatically

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Public frontend pages
│   ├── (payload)/               # Payload CMS admin
│   └── api/                     # API routes
├── collections/                  # Payload CMS collections
├── components/                   # React components
│   ├── ui/                      # Shadcn/ui components
│   └── admin/                   # Custom admin components
├── lib/                         # Utility functions
├── hooks/                       # Custom React hooks
├── context/                     # React context providers
├── email/                       # Email templates
├── actions/                     # Server actions
└── types/                       # TypeScript type definitions
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build           # Build for production
npm run start           # Start production server

# Payload CMS
npm run generate:types  # Generate TypeScript types
npm run generate:importmap # Generate admin import map

# Utilities
npm run lint            # Run ESLint
```

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify your `DATABASE_URI` is correct
   - Ensure PostgreSQL is running
   - Check database credentials

2. **Admin Panel Not Loading**:
   - Run `npm run generate:importmap`
   - Clear browser cache
   - Check console for errors

3. **Email Not Sending**:
   - Verify `RESEND_API_KEY` is correct
   - Check Resend dashboard for API limits
   - Ensure email domain is verified in Resend

4. **File Upload Issues**:
   - Verify `BLOB_READ_WRITE_TOKEN` is correct
   - Check Vercel Blob configuration
   - Ensure proper CORS settings

### Getting Help

- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review [Payload CMS Documentation](https://payloadcms.com/docs)
- Open an issue in the repository

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Support

If you have any questions or need help setting up the project, please open an issue or contact the maintainer.
