import { useActiveSectionContext } from "@/context/active-section-context";
import { NavigationLink } from "@/payload-types";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type SectionName = NavigationLink['name'];

export function useSectionInView(sectionName: SectionName, threshold: number) {
  const { setActiveSection, isClicked } = useActiveSectionContext();
  const { ref, inView } = useInView({ threshold });

  useEffect(() => {
    inView && isClicked && setActiveSection(sectionName);
  }, [inView, isClicked, setActiveSection, sectionName]);

  return { ref };
}
