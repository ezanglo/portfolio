import type { PitchPoint, PortfolioPitch, PortfolioProcess, ProcessNote, ProcessStep } from './types'

/**
 * The "How I work" process flow and the "Why hire me" pitch, shared by every view.
 *
 * The steps and points below are the only source there has ever been: the CMS's
 * `how_i_work_steps` and `why_hire_me_points` tables were empty in every environment,
 * so every view has always rendered these constants. Only the intro strings came
 * from the CMS, and they now live in `content/site.ts`.
 */

export const FALLBACK_PROCESS_INTRO =
  'I work in short, verifiable loops rather than long stretches of unreviewed code: scope a slice small enough to ship in a day, wire it end to end, and let real usage decide what comes next.'

export const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  { label: 'Discover', description: 'Understand the real problem before opening an editor.', tools: [] },
  {
    label: 'Plan',
    description: 'Break the feature into a slice small enough to ship in a day.',
    tools: [{ name: 'Figma', iconSlug: 'figma' }],
  },
  {
    label: 'Build',
    description: 'Wire the feature end to end, native app to backend to model.',
    tools: [
      { name: 'React Native', iconSlug: 'react-native' },
      { name: 'TypeScript', iconSlug: 'typescript' },
      { name: 'Claude', iconSlug: 'claude' },
    ],
  },
  {
    label: 'Test',
    description: 'Run it on a real device before trusting it in review.',
    tools: [{ name: 'Expo', iconSlug: 'expo' }],
  },
  {
    label: 'Ship',
    description: 'Release behind a flag, watch real usage, not a demo.',
    tools: [{ name: 'Vercel', iconSlug: 'vercel' }],
  },
  {
    label: 'Iterate',
    description: "Let production data, not speculation, decide what's next.",
    tools: [{ name: 'Git', iconSlug: 'git' }],
  },
]

/** How AI coding agents run inside the process above — the "ship faster, solve better" story. */
export const FALLBACK_PROCESS_NOTE: ProcessNote = {
  title: 'Working with AI agents',
  body:
    'The loop above runs with coding agents inside it. I drive Claude and Claude Code through the mechanical work — scaffolding, refactors, test coverage, hunting regressions, mapping an unfamiliar codebase — so the hours go to scoping, architecture, and the decisions that need judgment. The agent works in small, reviewable diffs; I stay accountable for what ships. This site was built this way.',
}

export const FALLBACK_PITCH_INTRO =
  'A single person who can take a mobile app from idea to app store, and wire real AI capability into it along the way, not a hand-off between three specialists.'

export const FALLBACK_PITCH_POINTS: PitchPoint[] = [
  {
    title: 'One person, the full mobile stack',
    description:
      'I take a React Native app from a blank repo to the App Store and Play Store myself, so there is no hand-off gap between design, native code, and release.',
  },
  {
    title: 'AI features that ship, not demo',
    description:
      "I've wired Claude, Gemini, and Vertex AI into production apps as real backend services with cost and latency budgets, not one-off prototypes.",
  },
  {
    title: 'Fast without being reckless',
    description:
      'Small, reviewable slices shipped daily, backed by real device testing before anything reaches production.',
  },
  {
    title: 'AI agents in how I ship',
    description:
      'Claude and coding agents are part of my real workflow, not a demo. I use them to clear the mechanical work fast and to pressure-test the hard calls — more shipped per week, fewer regressions, held to the same review bar as anything I write by hand.',
  },
]

export function buildProcess(site: { processIntro: string }): PortfolioProcess {
  return {
    intro: site.processIntro || FALLBACK_PROCESS_INTRO,
    steps: FALLBACK_PROCESS_STEPS,
    note: FALLBACK_PROCESS_NOTE,
  }
}

export function buildPitch(site: { pitchIntro: string }): PortfolioPitch {
  return {
    intro: site.pitchIntro || FALLBACK_PITCH_INTRO,
    points: FALLBACK_PITCH_POINTS,
  }
}
