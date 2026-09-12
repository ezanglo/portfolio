import path from "node:path";
import { Document, Page, Text, View, Image, Link, StyleSheet } from "@react-pdf/renderer";
import { SITE, WORK_EXPERIENCE, SKILLS, PROJECTS, RESUME } from "@/content";
import type { SkillCategory } from "@/content/types";

// Read straight off disk (this only ever runs at build time, in the `nodejs` route runtime)
// rather than fetching SITE.portraitUrl over HTTP — no server to fetch it from during the build.
const PORTRAIT_SRC = path.join(process.cwd(), "public", "images", "ezra-anglo.png");

const ACCENT = "#0f6e8c";
const MUTED = "#5b6470";
const INK = "#1a1d21";

const styles = StyleSheet.create({
  // paddingTop/paddingBottom live on the Page itself (not `main`) because Page-level padding
  // repeats on every page the content wraps to, matching the `fixed` sidebar's own padding —
  // a child View's padding, by contrast, only applies once at the start/end of the whole
  // flowed block, which is what caused page breaks to misalign against the sidebar before.
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: INK,
  },
  // Positioned absolutely and marked `fixed` below so it repeats on every page the resume
  // spills onto, instead of only covering page 1 while `main` continues past it.
  //
  // top/bottom are -32 (not 0/height:'100%') to cancel out the Page's own paddingTop/
  // paddingBottom: an absolutely positioned child's percentage height resolves against the
  // Page's padded content box, not its full border box, so `height: '100%'` alone came up
  // exactly paddingBottom (32) short of the true bottom edge, leaving a gap there. Offsetting
  // both edges by the page padding stretches the box back out to the full page bleed.
  sidebar: {
    position: "absolute",
    top: -32,
    bottom: -32,
    left: 0,
    width: "32%",
    backgroundColor: "#f4f8f9",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  main: {
    marginLeft: "32%",
    paddingHorizontal: 24,
  },
  projectsPage: {
    paddingHorizontal: 24,
  },
  projectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  projectCol: {
    width: "48%",
  },
  portrait: {
    width: 130,
    height: 173,
    marginTop: 24,
    marginBottom: 18,
    borderRadius: 10,
    objectFit: "cover",
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    marginBottom: 4,
    lineHeight: 1.15,
  },
  role: {
    fontSize: 10,
    color: MUTED,
    marginBottom: 20,
  },
  sidebarHeading: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    marginBottom: 8,
    marginTop: 18,
  },
  sidebarHeadingFirst: {
    marginTop: 0,
  },
  contactLabel: {
    fontSize: 7.5,
    color: MUTED,
    marginTop: 6,
  },
  contactValue: {
    fontSize: 9,
    color: INK,
  },
  skillCategory: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: INK,
    marginTop: 8,
    textTransform: "uppercase",
  },
  skillList: {
    fontSize: 8.5,
    color: MUTED,
    lineHeight: 1.4,
  },
  mainHeading: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    marginBottom: 8,
    marginTop: 18,
  },
  mainHeadingFirst: {
    marginTop: 0,
  },
  summary: {
    fontSize: 9.5,
    color: INK,
    lineHeight: 1.5,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  entryTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  entryDate: {
    fontSize: 9,
    color: MUTED,
  },
  entrySubtitle: {
    fontSize: 9,
    fontStyle: "italic",
    color: MUTED,
    marginBottom: 4,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2,
  },
  bulletMark: {
    width: 10,
    fontSize: 9,
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    lineHeight: 1.4,
  },
  projectStack: {
    fontSize: 8.5,
    color: MUTED,
    marginTop: 2,
    fontStyle: "italic",
  },
});

const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  mobile: "Mobile",
  interface: "Interface",
  backend: "Backend",
  data: "State & Data",
  integrations: "Integrations",
  cloud: "Cloud",
  delivery: "Delivery",
};

const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  "mobile",
  "interface",
  "backend",
  "data",
  "integrations",
  "cloud",
  "delivery",
];

function Bullet({ children }: { children: string }) {
  return (
    <View style={styles.bullet}>
      <Text style={styles.bulletMark}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <View style={styles.entry}>
      <Text style={styles.entryTitle}>{project.title}</Text>
      <Bullet>{project.description}</Bullet>
      {project.tags.length > 0 && (
        <Text style={styles.projectStack}>Stack: {project.tags.join(", ")}</Text>
      )}
    </View>
  );
}

/** Chunks a flat list into side-by-side pairs for the two-column projects grid — each pair
 * is one row so react-pdf's normal top-to-bottom pagination can break between rows. */
function pairUp<T>(items: T[]): [T, T | undefined][] {
  const pairs: [T, T | undefined][] = [];
  for (let i = 0; i < items.length; i += 2) {
    pairs.push([items[i], items[i + 1]]);
  }
  return pairs;
}

export function ResumeDocument() {
  const experience = WORK_EXPERIENCE.filter(
    (job) => !RESUME.excludedExperienceSlugs.includes(job.slug)
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const featuredSkills = SKILLS.filter((skill) => skill.featured);
  const skillsByCategory = SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    skills: featuredSkills
      .filter((skill) => skill.category === category)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  })).filter((group) => group.skills.length > 0);

  // Featured projects first (in their own `order`), then the rest (in their own `order`) —
  // not a single order-wide sort, since `featured` and `order` are independent fields.
  const resumeProjects = [...PROJECTS].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return (a.order ?? 0) - (b.order ?? 0);
  });
  const projectRows = pairUp(resumeProjects);

  return (
    <Document
      title={`${SITE.name} Anglo — Resume`}
      author={SITE.name}
      subject={SITE.role}
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.sidebar} fixed>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's <Image>, not an <img> */}
          <Image src={PORTRAIT_SRC} style={styles.portrait} />
          <Text style={styles.name}>Ezra Jeremiah Anglo</Text>
          <Text style={styles.role}>{SITE.role}</Text>

          <Text style={[styles.sidebarHeading, styles.sidebarHeadingFirst]}>
            Contact
          </Text>
          <Text style={styles.contactLabel}>Phone</Text>
          <Text style={styles.contactValue}>{RESUME.phone}</Text>
          <Text style={styles.contactLabel}>Email</Text>
          <Text style={styles.contactValue}>{SITE.email}</Text>
          <Text style={styles.contactLabel}>Portfolio</Text>
          <Link src={RESUME.portfolioUrl} style={styles.contactValue}>
            {RESUME.portfolioUrl.replace(/^https?:\/\//, "")}
          </Link>
          <Text style={styles.contactLabel}>LinkedIn</Text>
          <Link src={SITE.linkedinUrl} style={styles.contactValue}>
            {SITE.linkedinUrl.replace(/^https?:\/\//, "")}
          </Link>
          <Text style={styles.contactLabel}>GitHub</Text>
          <Link src={SITE.githubUrl} style={styles.contactValue}>
            {SITE.githubUrl.replace(/^https?:\/\//, "")}
          </Link>

          <Text style={styles.sidebarHeading}>Skills</Text>
          {skillsByCategory.map((group) => (
            <View key={group.category}>
              <Text style={styles.skillCategory}>
                {SKILL_CATEGORY_LABELS[group.category]}
              </Text>
              <Text style={styles.skillList}>
                {group.skills.map((skill) => skill.name).join(", ")}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.main}>
          <Text style={[styles.mainHeading, styles.mainHeadingFirst]}>
            Summary
          </Text>
          <Text style={styles.summary}>{RESUME.summary}</Text>

          <Text style={styles.mainHeading}>Experience</Text>
          {experience.map((job) => (
            <View key={job.slug} style={styles.entry} wrap={false}>
              <View style={styles.entryHeaderRow}>
                <Text style={styles.entryTitle}>{job.title}</Text>
                <Text style={styles.entryDate}>{job.dateRange}</Text>
              </View>
              <Text style={styles.entrySubtitle}>
                {job.company} — {job.location}
              </Text>
              {(job.responsibilities.length > 0
                ? job.responsibilities
                : [job.description]
              ).map((line, i) => (
                <Bullet key={i}>{line}</Bullet>
              ))}
            </View>
          ))}
        </View>
      </Page>

      <Page size="A4" style={[styles.page, styles.projectsPage]}>
        <Text style={[styles.mainHeading, styles.mainHeadingFirst]}>
          Projects
        </Text>
        {projectRows.map(([left, right]) => (
          <View key={left.slug} style={styles.projectRow} wrap={false}>
            <View style={styles.projectCol}>
              <ProjectCard project={left} />
            </View>
            <View style={styles.projectCol}>
              {right && <ProjectCard project={right} />}
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
}
