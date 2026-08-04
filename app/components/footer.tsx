import { cn } from "~/lib/utils";
import AnimateSection from "./animate-section";

const navigations = [
  {
    label: "Email",
    url: "mailto:rikky.mahendra54@gmail.com",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/rikky-mahendra",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/ikymahen_/",
  },
  {
    label: "GitHub",
    url: "https://github.com/RikkyM",
  },
];

export default function Footer() {
  return (
    <AnimateSection
      className={cn(
        "mx-auto mt-10 max-w-3xl gap-y-6 border-t border-[#CCCCCC] px-2 pt-2.5 pb-10",
        "flex flex-col flex-wrap items-center sm:flex-row sm:justify-between",
      )}
    >
      <p className="order-2 text-[#737373] md:order-1">
        <span className="text-sm">2026</span> •{" "}
        <span className="font-caveat text-base">Rikky Mahendra</span>
      </p>
      <div className="order-1 flex items-center justify-center gap-2 sm:order-2">
        {navigations.map((data) => (
          <a
            key={data.label}
            href={data.url}
            {...(!data.url.startsWith("mailto:") && {
              target: "_blank",
              rel: "noopener noreferrer",
            })}
            className="text-[#737373] transition-colors duration-150 hover:text-[#0a0a0a]"
          >
            {data.label}
          </a>
        ))}
      </div>
      <p className="order-3 flex justify-end gap-2 text-end text-sm text-[#737373]">
        <span className="text-base">ID</span>
        <span>Palembang, Indonesia</span>
      </p>
    </AnimateSection>
  );
}
