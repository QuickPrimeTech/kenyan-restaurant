// hooks/use-section-tracker.ts (Simplified)
import { useEffect, useRef, useState, useCallback } from "react";

export function useSectionTracker(defaultSection = "", headerOffset = 120) {
  const [activeSection, setActiveSection] = useState(defaultSection);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const activeSectionRef = useRef(defaultSection);

  // Update ref when state changes
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const registerSection = useCallback(
    (id: string, element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current.set(id, element);
        element.setAttribute("data-section-id", id);
        if (observerRef.current) {
          observerRef.current.observe(element);
        }
      } else {
        sectionRefs.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find section that's most in view (largest intersection ratio)
        let maxRatio = 0;
        let selectedSection = activeSectionRef.current;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const sectionId = entry.target.getAttribute("data-section-id");
            if (sectionId) {
              selectedSection = sectionId;
            }
          }
        });

        // Only update if section has at least 30% visibility AND is different
        if (maxRatio > 0.3 && selectedSection !== activeSectionRef.current) {
          setActiveSection(selectedSection);
        }
      },
      {
        root: null,
        rootMargin: `-${headerOffset}px 0px -${headerOffset + 100}px 0px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    observerRef.current = observer;
    sectionRefs.current.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [headerOffset]); // Stable dependency

  const scrollToSection = useCallback(
    (sectionId: string, customOffset?: number) => {
      const element = sectionRefs.current.get(sectionId);
      if (element) {
        const offset = customOffset || headerOffset;
        const top =
          element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
        setActiveSection(sectionId); // Update immediately
      }
    },
    [headerOffset]
  );

  return {
    activeSection,
    registerSection,
    scrollToSection,
  };
}
