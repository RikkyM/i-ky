import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useLocation, useParams } from "react-router";

export default function Indicator({
  indicators,
}: {
  indicators: Record<string, Record<string, string>[]>;
}) {
  const location = useLocation();
  const [active, setActive] = React.useState("hero");
  const [hovered, setHovered] = React.useState<string | null>(null);

  const locale = useParams().locale ?? "en";

  const loc = location.pathname.replace(/^\/id(?=\/|$)/, "");

  const getIndicators = indicators[loc as keyof typeof indicators];

  React.useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let cancelled = false;

    const setup = () => {
      const sections = getIndicators
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => Boolean(el));

      if (sections.length < getIndicators.length) {
        if (!cancelled) requestAnimationFrame(setup);
        return;
      }

      const ratios = new Map<string, number>();

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            ratios.set(entry.target.id, entry.intersectionRatio);
          });

          const activeSection = sections
            .map((section) => ({
              id: section.id,
              ratio: ratios.get(section.id) ?? 0,
            }))
            .sort((a, b) => b.ratio - a.ratio)[0];

          if (activeSection && activeSection.ratio > 0) {
            setActive(activeSection.id);
          }
        },
        {
          root: document.querySelector("main"),
          rootMargin: "-30% 0px -30% 0px",
          threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        },
      );

      sections.forEach((section) => observer?.observe(section));
    };

    setup();

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const root = document.querySelector("main");
    if (root) {
      const rootRect = root.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offset = elRect.top - rootRect.top + root.scrollTop;
      root.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed top-1/2 right-5 z-10 hidden -translate-y-1/2 flex-col items-end md:flex">
      {getIndicators.map((indicator) => {
        const isActive = active === indicator.id;
        const isHovered = hovered === indicator.id;

        return (
          <div
            key={indicator.id}
            className="relative flex items-center"
            onMouseEnter={() => setHovered(indicator.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 rounded-md bg-black px-2.5 py-1 text-xs whitespace-nowrap text-white shadow-sm"
                >
                  {indicator.label}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={() => scrollToSection(indicator.id)}
              className="relative flex h-4 w-6 items-center justify-end"
            >
              <motion.span
                initial={false}
                animate={{
                  width: isActive || isHovered ? 24 : 12,
                  opacity: isActive || isHovered ? 1 : 0.3,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
                className="h-1 rounded-full bg-black"
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
