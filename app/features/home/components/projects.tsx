import { ArrowUpRight, Lock } from "lucide-react";
import { useOutletContext } from "react-router";
import AnimateSection from "~/components/animate-section";
import { cn } from "~/lib/utils";
import { projects } from "../data/projects";
import { formatDuration } from "../utils/format-duration";

const Projects = () => {
  const { locale } = useOutletContext<{ locale: string }>();

  const projectIconClass =
    "sm:opacity-0 transition-opacity duration-250 group-hover/icon:opacity-100";

  return (
    <AnimateSection className="py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Projects</h1>
        <p className="text-sm font-light">
          A quick log of what I've built and shipped. The full details live
          further down.
        </p>
      </div>
      <div className="group/projects divide-y divide-[#a0a0a0]/40">
        {projects.map((project) => {
          return (
            <div key={project.title} className="">
              <div
                className={cn(
                  "group/icon sm:gap-x8 grid gap-y-1.5 py-6 transition-opacity duration-250 group-hover/projects:opacity-40 hover:opacity-100 sm:grid-cols-[11rem_1fr]",
                )}
              >
                <p className="text-sm text-[#737373]">
                  {formatDuration(
                    project.duration.start,
                    project.duration.end,
                    locale.toString(),
                  )}
                </p>
                <div className="flex flex-col gap-1.5 text-pretty">
                  {project.private ? (
                    <h2 className="flex gap-1 text-sm font-medium text-balance">
                      <span>{project.title}</span>
                      <div className={cn(projectIconClass)}>
                        <Lock className="size-2.5" />
                      </div>
                    </h2>
                  ) : (
                    <a
                      href={project?.link}
                      target="_blank"
                      className={cn(
                        "flex gap-0.5 text-sm font-medium",
                        "hover:underline",
                      )}
                    >
                      <span>{project.title}</span>
                      <div className={cn(projectIconClass)}>
                        <ArrowUpRight className="size-2.5" />
                      </div>
                    </a>
                  )}
                  <p className="text-sm text-pretty text-[#737373]">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AnimateSection>
  );
};

export default Projects;
