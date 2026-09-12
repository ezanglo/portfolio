import type { Experience } from './types'

/** Work history. Exported 1:1 from the Payload `experiences` collection on 2026-09-12, minus
 * the one CMS row that recorded a formal education entry (BS Computer Science) rather than a
 * job — that fact already lives in `SITE.bio`, and the row was never rendered on its own by any
 * part of the redesigned site, so it isn't carried forward as content nothing displays.
 *
 * `responsibilities` were added 2026-09-13, transcribed from the old `cv-ezra-anglo.pdf` bullet
 * points, for the resume PDF (`app/cv-ezra-anglo.pdf/route.tsx`) — the only current consumer of
 * this field. Dates/date ranges are this file's, treated as the authoritative source over the
 * older PDF where the two disagreed (Stream.TV start, NET(net) end). */
export const WORK_EXPERIENCE: Experience[] = [
  {
    slug: "freelance-software-engineer-freelance",
    title: "Freelance Software Engineer",
    company: "Freelance",
    location: "Malolos, Bulacan, PH",
    yearRange: "2024 - Present",
    dateRange: "Sept 2024 - Present",
    description: "Freelance full-stack developer building web applications with React, Next.js, TypeScript, Tailwind, PHP, and PostgreSQL.",
    responsibilities: [
      "Built and deployed full-stack web and mobile apps with Next.js, React Native (Expo), and PostgreSQL, optimized for performance and scalability.",
      "Developed AI-powered solutions using LLMs, chatbots, and NLP pipelines to enhance user interaction.",
      "Integrated Payload CMS and Next.js APIs for dynamic, content-driven applications.",
      "Managed AWS deployments (EC2, S3, CloudFront, RDS) with secure, automated CI/CD pipelines.",
      "Optimized Expo app performance and handled successful App Store and Play Store releases.",
    ],
    order: 1,
  },
  {
    slug: "full-stack-developer-stream-tv-cayman",
    title: "Full Stack Developer",
    company: "Stream.TV (Cayman)",
    location: "Georgetown, KY",
    yearRange: "2023 - 2024",
    dateRange: "July 2023 - Sept 2024",
    description: "Maintained and extended a Laravel and MySQL backend, and led the introduction of Next.js for the new web application along with Dockerized deployments to AWS.",
    responsibilities: [
      "Built and maintained front-end apps and admin consoles for YuVee using React, Next.js, and Laravel.",
      "Managed backend APIs in Laravel (PHP) and handled MySQL database design and optimization.",
      "Oversaw DevOps and deployments on AWS using Docker, ensuring uptime and scalability.",
      "Integrated third-party services (rewards, video, advertising, analytics, push notifications) into platform workflows.",
    ],
    order: 2,
  },
  {
    slug: "senior-full-stack-developer-net-net-inc",
    title: "Senior Full Stack Developer",
    company: "NET(net) Inc.",
    location: "Georgetown, KY",
    yearRange: "2019 - 2023",
    dateRange: "January 2019 - July 2023",
    description: "Worked as a full-stack developer before moving onto the mobile team, where I began building with React Native and React.",
    responsibilities: [
      "Designed and developed the company's SaaS platform (WIN(win)) using PHP, Symfony, and React.",
      "Built and documented RESTful APIs with RAML specifications for scalable service integration.",
      "Developed and maintained the mobile app using React Native for iOS and Android.",
      "Managed AWS infrastructure, including web, database, and search servers for production environments.",
    ],
    order: 3,
  },
  {
    slug: "software-developer-egis-projects-philippines",
    title: "Software Developer",
    company: "Egis Projects Philippines",
    location: "Pasig, PH",
    yearRange: "2015 - 2017",
    dateRange: "November 2015 - August 2017",
    description: "Started my career in software development, building and maintaining .NET applications with MSSQL and JavaScript while learning to work within a professional engineering team.",
    responsibilities: [
      "Developed and supported internal applications using .NET (C#), WPF, and SQL Server.",
      "Delivered system enhancements and bug fixes based on QA testing and user feedback, improving reliability and performance.",
    ],
    order: 4,
  },
  {
    slug: "freelance-software-developer-freelance",
    title: "Freelance Software Developer",
    company: "Freelance",
    location: "Cavite, PH",
    yearRange: "2014 - 2018",
    dateRange: "April 2014 - December 2018",
    description: "Took on freelance projects part-time after graduating, exploring mobile and IoT development with Xamarin and Raspberry Pi.",
    responsibilities: [],
    order: 5,
  },
]
