import AnimateSection from "~/components/animate-section";
import { skills } from "../data/skills";

const Skills = () => {
  return (
    <AnimateSection className="py-10" id="skills">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium text-[#0A0A0A]">Skills</h1>
        <p className="text-sm font-light text-pretty text-[#0A0A0A]">
          Technology evolves constantly, and I enjoy learning the right tools
          for each challenge. I focus on building scalable, maintainable, and
          user-friendly applications while continuously improving my skills.
        </p>
      </div>
      <div className="divide-y divide-[#a0a0a0]/40 subpixel-antialiased">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            className="grid items-start gap-x-5 gap-y-3.5 py-6 select-none sm:grid-cols-[11rem_1fr]"
          >
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-geist-mono font-light text-[#737373]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-[#737373]">{skill.title}</span>
            </div>
            <div className="flex cursor-default flex-wrap items-center gap-x-4 gap-y-3">
              {skill.list.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-1.5"
                >
                  <div className="transition-[translate] duration-250 group-hover:-translate-y-0.5">
                    <item.icon size={item.sizeIcon ?? "20"} />
                  </div>
                  <span className="text-sm whitespace-nowrap text-[#737373] transition-colors duration-250 group-hover:text-black">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AnimateSection>
  );
};

export default Skills;
