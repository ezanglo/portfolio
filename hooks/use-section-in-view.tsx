import { useActiveSectionContext } from "@/context/active-section-context";
import type { SectionName } from "@/lib/types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export function useSectionInView(sectionName: SectionName, threshold: number) {
  const { setActiveSection, isClicked } = useActiveSectionContext();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    inView && isClicked && setActiveSection(sectionName);
  }, [inView, isClicked]);

  return { ref };
}
