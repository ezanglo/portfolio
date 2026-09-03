import type { PortfolioIdentity } from './portfolio/types'

export interface ViewCopy {
  eyebrow: string | null
  h1: string
  tagline: string
  ctaHeading: string
  ctaButton: string
  sectionLabels: {
    about: string
    process: string
    pitch: string
    skills: string
    projects: string
    experience: string
    contact: string
  }
  bioVariant: 'long' | 'short' | 'thirdPerson'
}

type Template = (id: PortfolioIdentity) => ViewCopy

const TRADITIONAL_LABELS = {
  about: 'About',
  process: 'How I work',
  pitch: 'Why hire me',
  skills: 'Skills',
  projects: 'Projects',
  experience: 'Experience',
  contact: 'Contact',
}

const RUNTIME_LABELS = {
  about: '// about',
  process: '// process',
  pitch: '// why-me',
  skills: '// stack',
  projects: '// projects',
  experience: '// experience',
  contact: '// contact',
}

export const VIEW_COPY: Record<string, Template> = {
  corporate: (id) => ({
    eyebrow: 'Open to full-time roles',
    h1: `Hello, I'm ${id.name}.`,
    tagline: `Full-stack developer with over ${id.yearsExperience} years of experience building for Web, Mobile, and Desktop. Currently focused on React Native and AI-integrated products.`,
    ctaHeading: "Let's work together.",
    ctaButton: 'Say hello',
    sectionLabels: TRADITIONAL_LABELS,
    bioVariant: 'long',
  }),
  runtime: (id) => ({
    eyebrow: '> status: open to full-time roles',
    h1: 'Building for React Native & AI, at runtime.',
    tagline: `${id.name}, full-stack developer, ${id.yearsExperience} years across Web, Mobile and Desktop. Currently shipping React Native apps wired to AI orchestration layers.`,
    ctaHeading: 'ship something together?',
    ctaButton: 'say hello',
    sectionLabels: RUNTIME_LABELS,
    bioVariant: 'long',
  }),
  'field-notes': (id) => ({
    eyebrow: `Field Notes, Vol. ${id.yearsExperience.replace('+', '')}, ${new Date().getFullYear()}`,
    h1: 'A decade of building for web, mobile, and desktop, now leaning into React Native and AI.',
    tagline: `${id.name}, full-stack developer. Here's a record of the work.`,
    ctaHeading: 'Get in touch',
    ctaButton: 'Say hello',
    sectionLabels: TRADITIONAL_LABELS,
    bioVariant: 'long',
  }),
  blockwork: (id) => ({
    eyebrow: null,
    h1: `${id.name} builds React Native + AI products.`,
    tagline: `${id.yearsExperience} years full-stack across Web, Mobile and Desktop.`,
    ctaHeading: "Let's build something.",
    ctaButton: 'Hire me',
    sectionLabels: TRADITIONAL_LABELS,
    bioVariant: 'long',
  }),
}

export const CTA_BUTTON_LABELS = {
  hire: 'Hire me',
  cv: 'Download CV',
  hello: 'Say hello',
}

export function getViewCopy(slug: keyof typeof VIEW_COPY, identity: PortfolioIdentity): ViewCopy {
  return VIEW_COPY[slug](identity)
}
