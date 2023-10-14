import React from "react";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    // icon: React.createElement(LuGraduationCap),
    icon: "",
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    // icon: React.createElement(CgWorkAlt),
    icon: "",
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    // icon: React.createElement(FaReact),
    icon: "",
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "CorpComment",
    description:
      "I worked as a full-stack developer on this startup project for 2 years. Users can give public feedback to companies.",
    tags: ["React", "Next.js", "MongoDB", "Tailwind", "Prisma"],
    imageUrl: "",
    // imageUrl: corpcommentImg,
  },
  {
    title: "rmtDev",
    description:
      "Job board for remote developer jobs. I was the front-end developer. It has features like filtering, sorting and pagination.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind", "Redux"],
    imageUrl: "",
    // imageUrl: rmtdevImg,
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: "",
    // imageUrl: wordanalyticsImg,
  },
] as const;

// export const skillsData = {
//   web: {
//     label: "Web",
//     skills: [
//       "ReactJS",
//       "NextJS",
//       "VueJS",
//       "PHP",
//       "ASP.NET",
//       "REST API",
//       "CodeIgniter",
//       "Symfony",
//       "Ionic Framework",
//       "Quasar Framework",
//       "HTML",
//       "CSS",
//       "Javascript",
//     ],
//   },
//   mobileSoftware: {
//     label: "Mobile and Software",
//     skills: [
//       "Android",
//       "iOS",
//       "React Native",
//       "Xamarin",
//       "Firebase Cloud Messaging",
//       "Cross Platform Development",
//       ".NET",
//       "C#",
//       "WPF",
//     ],
//   },
//   others: {
//     label: "Others",
//     skills: [
//       "PostgreSQL",
//       "SQL Server",
//       "MySQL",
//       "MongoDB",
//       "Firestore",
//       "AWS",
//       "Firebase",
//       "JIRA",
//       "VersionOne",
//       "Mantis",
//       "git",
//       "Github",
//       "Bitbucket",
//       "VS Team Services",
//     ],
//   },
// };

export const skillsData = [
  "HTML",
  "CSS",
  "Javascript",
  "PHP",
  "ReactJS",
  "NextJS",
  "VueJS",
  "Tailwind",
  "Prisma",
  "Typescript",
  "Framer Motion",
  "Node.js",
  "React Native",
  "Redux",
  "C#",
  "WPF",
  "ASP.NET",
  "Windows IoT",
  "Raspberry Pi",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Firestore",
  "FCM",
  "REST API",
  "CodeIgniter",
  "Symfony",
  "Xamarin",
  "Ionic Framework",
  "Quasar Framework",
  "SQL Server",
  "MySQL",
  "Firestore",
  "AWS",
  "JIRA",
  "VersionOne",
  "Mantis",
  "Git",
  "GitHub",
  "BitBucket",
  "AWS Code Commit",
  "AWS API Gateway",
  "AWS Lambda",
  "Google Vertex AI",
  "Google Generative AI",
];

export const skillsDatax = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Git",
  "Tailwind",
  "Prisma",
  "MongoDB",
  "Redux",
  "GraphQL",
  "Apollo",
  "Express",
  "PostgreSQL",
  "Python",
  "Django",
  "Framer Motion",
] as const;