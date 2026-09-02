import {
  SiReact,
  SiExpo,
  SiTypescript,
  SiPostgresql,
  SiFirebase,
  SiGooglecloud,
  SiClaude,
  SiGooglegemini,
  SiVercel,
  SiGit,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiDotnet,
  SiSwift,
  SiKotlin,
  SiFigma,
  SiGraphql,
  SiPrisma,
  SiSupabase,
} from "react-icons/si";
import { CodeIcon } from "lucide-react";
import type { IconType } from "react-icons";

const TECH_ICON_MAP: Record<string, IconType> = {
  react: SiReact,
  expo: SiExpo,
  "react-native": SiReact,
  typescript: SiTypescript,
  postgresql: SiPostgresql,
  firebase: SiFirebase,
  "google-cloud": SiGooglecloud,
  claude: SiClaude,
  anthropic: SiClaude,
  gemini: SiGooglegemini,
  vertex: SiGooglecloud,
  vercel: SiVercel,
  git: SiGit,
  nextjs: SiNextdotjs,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  php: SiPhp,
  dotnet: SiDotnet,
  swift: SiSwift,
  kotlin: SiKotlin,
  figma: SiFigma,
  graphql: SiGraphql,
  prisma: SiPrisma,
  supabase: SiSupabase,
};

interface TechIconProps {
  slug: string;
  className?: string;
}

export default function TechIcon({ slug, className }: TechIconProps) {
  const Icon = TECH_ICON_MAP[slug] ?? CodeIcon;
  return <Icon className={className} />;
}
