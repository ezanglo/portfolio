import type { PortfolioData } from "@/lib/portfolio/types";

/**
 * Visually hidden but crawlable summary of the portfolio. This view's real content only
 * appears after user interaction (typing a command, sending a chat message), which search
 * crawlers won't do — so this renders the same underlying data as static text.
 */
export default function SeoFallbackContent({ data }: { data: PortfolioData }) {
  const { identity, bio, skills, experience, projects, process, pitch } = data;

  return (
    <div className="sr-only">
      <h1>
        {identity.name} — {identity.role}
      </h1>
      {bio.long.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <h2>How I work</h2>
      <p>{process.intro}</p>
      <ul>
        {process.steps.map((step) => (
          <li key={step.label}>
            {step.label}: {step.description}
          </li>
        ))}
      </ul>

      <h2>Why hire me</h2>
      <p>{pitch.intro}</p>
      <ul>
        {pitch.points.map((point) => (
          <li key={point.title}>
            {point.title}: {point.description}
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <p>{skills.flat.join(", ")}</p>

      <h2>Experience</h2>
      <ul>
        {experience.map((e) => (
          <li key={e.id}>
            {e.title} at {e.company} ({e.yearRange}). {e.description}
          </li>
        ))}
      </ul>

      <h2>Projects</h2>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            {p.title}: {p.description}
          </li>
        ))}
      </ul>

      <h2>Contact</h2>
      <p>
        Email: {identity.email}. LinkedIn: {identity.linkedinUrl}. GitHub: {identity.githubUrl}.
      </p>
    </div>
  );
}
