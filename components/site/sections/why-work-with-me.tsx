import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

const POINTS = [
  {
    title: "10+ Years of Engineering Experience",
    description: "I've worked across software engineering, web, backend, mobile, infrastructure, and production systems.",
  },
  {
    title: "React Native Focus",
    description: "I specialize in building mobile applications with React Native and Expo.",
  },
  {
    title: "Full-Stack Capability",
    description: "I can work across the mobile app and the systems behind it.",
  },
  {
    title: "Production Mindset",
    description:
      "The goal isn't just to make something work. It's to build something maintainable, testable, deployable, and ready for real users.",
  },
  {
    title: "AI-Accelerated Workflow",
    description: "Modern AI tools help me move faster while engineering judgment remains human-led.",
  },
];

/** brief §15. Server component — text and proof, no motion needed. */
export function WhyWorkWithMe() {
  return (
    <Section id="why-work-with-me">
      <Container>
        <SectionHeading eyebrow="Why work with me" heading="Senior judgment, not just hands on a keyboard." align="center" className="mx-auto" />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((point) => (
            <li key={point.title}>
              <h3 className="text-(length:--text-small) font-semibold">{point.title}</h3>
              <p className="mt-2 text-(length:--text-small) text-muted-foreground">{point.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
