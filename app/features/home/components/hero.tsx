import { ArrowUpRight, MessageSquare, Paperclip } from "lucide-react";
import AnimateSection from "~/components/animate-section";
import { cn } from "~/lib/utils";

const Hero = () => {
  const buttonClass =
    "rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-sm shadow-2xs cursor-pointer transition-colors duration-250";

  return (
    <AnimateSection className="py-20" id="welcome">
      <div>
        <p className="font-caveat text-2xl text-[#0A0A0A]">
          Hi, I'm Rikky Mahendra
        </p>
        <h1 className="text-3xl leading-none font-medium text-pretty text-[#0A0A0A] md:text-4xl lg:text-5xl">
          Full Stack Engineer Crafting Modern Web Experiences.
        </h1>
      </div>
      <div className="font-light text-balance text-[#0A0A0A] xl:text-lg">
        <p className="pt-4">
          I design and develop modern web applications that balance performance,
          scalability, and simplicity. My goal is to create digital experiences
          that are intuitive for users and maintainable for developers.
        </p>
        <p className="pt-2">
          Driven by curiosity and continuous learning. I enjoy transforming
          ideas into reliable software through clean architecture and thoughtful
          engineering.
        </p>
      </div>
      <div className="inline-flex flex-wrap items-center gap-2 pt-4 whitespace-nowrap">
        <button
          type="button"
          className={cn(
            "bg-[#1C1917] text-[#FAFAFA] hover:bg-[#484644]",
            buttonClass,
          )}
        >
          <MessageSquare className="size-4 min-w-4" />
          <span>Let's Talk</span>
        </button>
        <a
          href="/attachments/rikky_mahendra_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "bg-[#E8E4E3] text-[#0A0A0A] hover:bg-[#DBD7D6]",
            buttonClass,
          )}
        >
          <Paperclip className="size-4.5 min-w-4.5" />
          <span>Résumé</span>
          <ArrowUpRight className="mt-0.5 size-3 min-w-3 self-start" />
        </a>
      </div>
    </AnimateSection>
  );
};

export default Hero;
