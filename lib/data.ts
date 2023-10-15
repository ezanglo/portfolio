import React from "react";

import aiPersonaChatBot from "@/public/ai-persona-chatbot.png";
import plokerNow from "@/public/ploker-now.png";
import mariBot from "@/public/mari-bot.png";
import mariWeb from "@/public/mari-web.png";
import shopDiggy from "@/public/shop-diggy.png";

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
    title: "Real-time RFID Registration",
    description:
      "I worked as full-stack developer on this project, working with a team. Appointment system for the company's customers to install their RFID Stickers to be used in the expressway Toll Systems.",
    type: "mobile",
    tags: ["ReactJS", "Vite", "ASP.NET", "MSSQL"],
    imageUrl: "",
  },
  {
    title: "AI Persona Chat Bot",
    description:
      "An AI Persona Chat Bot that helps you with specific topics the model is trained on. I worked solo on this project using the latest tech stack with NextJS and AI Technology",
    type: "mobile",
    tags: [
      "NextJS",
      "ReactJS",
      "Prisma",
      "Clerk",
      "Vercel",
      "Generative AI",
      "Vertex AI",
    ],
    imageUrl: aiPersonaChatBot,
  },
  {
    title: "SaaS Platform Mobile Application",
    description:
      "I was lead front-end developer for this project, helped plan, design and setup initial back-end. This project is the mobile version of an existing SaaS Platform",
    type: "mobile",
    tags: [
      "React Native",
      "PHP",
      "Symfony",
      "api-platform",
      "PostgreSQL",
      "MongoDB",
    ],
    imageUrl: "",
  },
  {
    title: "PlokerNow",
    description:
      "A public web application for easily setting up a Planning Poker Session. This is a personal project",
    type: "web",
    tags: ["VueJS", "Quasar", "Firebase", "Firestore"],
    imageUrl: plokerNow,
  },
  {
    title: "Plant Tea-ta",
    description:
      "Web Application for our local Milk Tea business. This serves as the POS System as well as inventory system and gives us sales analytics. I have a also integrated rewards systems for frequent buyers.",
    type: "web",
    tags: ["VueJS", "Quasar", "Firebase", "Firestore"],
    imageUrl: "",
  },
  {
    title: "Disguised Mari Web",
    description:
      "Web Application of the Discord Bot for managing and updating recommendation data.",
    type: "web",
    tags: ["VueJS", "AWS Api Gateway", "AWS Lambda", "DiscordJS", "Heroku"],
    imageUrl: mariWeb,
  },
  {
    title: "Disguised Mari Bot",
    description:
      "A Discord Bot I created for the game Grand Chase. This bot accepts commands and gives specific recommendations based on the user input.",
    type: "web",
    tags: ["NodeJS", "AWS S3", "Canvas", "DiscordJS", "Heroku"],
    imageUrl: mariBot,
  },
  {
    title: "Shop Diggy",
    description:
      "I worked as the front-end developer on this project, this is a bobile application to help users get the best deal from different e-commerce websites",
    type: "mobile",
    tags: ["C#", "Xamarin", "Cross Platform"],
    imageUrl: shopDiggy,
  },
  {
    title: "TARA: Tracking and Routing",
    description:
      "Tracking and routing application like Grab and Uber to reserve seats and view user location",
    type: "mobile",
    tags: [
      "C#",
      "Xamarin",
      "Cross Platform",
      "Web API",
      "ASP.NET",
      "Google Maps",
    ],
    imageUrl: "",
  },
  {
    title: "HOME VISION: Face Recognition",
    description:
      "Security system that uses face recognition to detect unrecognized persons entering the home",
    type: "mobile",
    tags: ["C#", "Image Processing", "EmguCV", "WPF"],
    imageUrl: "",
  },
  {
    title: "HALOMET: Voice Command Navigation System",
    description:
      "A navigating system embedded on a helmet that utilizes speech recognition to navigate, including collision sensors.",
    type: "mobile",
    tags: ["Raspberry Pi", "C#", "Web API", "Google Maps", "Windows 10 IoT"],
    imageUrl: "",
  },
] as const;

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