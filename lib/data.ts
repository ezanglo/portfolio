import React from "react";

import aiPersonaChatBot from "@/public/ai-persona-chatbot.png";
import plokerNow from "@/public/ploker-now.png";
import mariBot from "@/public/mari-bot.png";
import mariWeb from "@/public/mari-web.png";
import shopDiggy from "@/public/shop-diggy.png";
import {
  GraduationCap,
  MonitorIcon,
  Code2Icon,
  BookOpenIcon,
} from "lucide-react";
import { StarIcon } from "@radix-ui/react-icons";

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
    year: "2023 - Present",
    company: "Freelance",
    title: "Freelance Full Stack Developer",
    date: "July 2023 - Present",
    location: "Georgetown, KY",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, PHP and PostgreSQL. I'm open to full-time opportunities.",
    responsibilities: [],
    icon: React.createElement(StarIcon),
  },
  {
    year: "2019 - 2023",
    company: "NET(net) Inc.",
    title: "Senior Full Stack Developer",
    date: "January 2019 - July 2023",
    location: "Georgetown, KY",
    description:
      "I worked as full-stack developer, and started to work with the mobile project which introduced me to React Native and React",
    icon: React.createElement(Code2Icon),
  },
  {
    year: "2017 - 2018",
    company: "Quad IT Solutions",
    title: ".NET Developer",
    date: "October 2017 - January 2018",
    location: "Pasay, PH",
    description:
      "I worked as a .NET Developer for 3 months, my main responsibilities are to fix existing bugs and implement new features.",
    icon: React.createElement(MonitorIcon),
  },
  {
    year: "2015 - 2017",
    company: "Egis Projects Philippines",
    title: "Software Developer",
    date: "November 2015 - August 2017",
    location: "Pasig, PH",
    description:
      "I finally started working in the IT Industry. I learned the fundamentals of software developement and how to work with a team.",
    icon: React.createElement(MonitorIcon),
  },
  {
    year: "2014 - 2015",
    company: "Cavite State University",
    title: "IT Instructor",
    date: "June 2014 - May 2015",
    location: "Cavite, PH",
    description:
      "I worked as an IT instructor for two semesters at my alma mater. I primarily taught introductory computer subjects to first-year students and some intermediate courses to fourth-year students.",
    icon: React.createElement(BookOpenIcon),
  },
  {
    year: "2014 - 2018",
    company: "Freelance",
    title: "Freelance Software Developer",
    date: "April 2014 - December 2018",
    location: "Cavite, PH",
    description:
      "After graduating, I started to actively look for freelance projects and has been doing it part-time until 2018. This gave me opportunity to explore on different platforms such as mobile and IoT",
    icon: React.createElement(MonitorIcon),
  },
  {
    year: "2010 - 2014",
    company: "Cavite State University",
    title: "BS Computer Science",
    date: "June 2010 - April 2014",
    location: "Cavite, PH",
    description:
      "I graduated with a degree in BS Computer Science, my main programming language was C#. I also started accepting project commissions for non-IT students to help with their thesis.",
    icon: React.createElement(GraduationCap),
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