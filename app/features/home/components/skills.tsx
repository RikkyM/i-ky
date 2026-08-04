import AnimateSection from "~/components/animate-section";
import { skills } from "../data/skills";

const Skills = () => {
  return (
    <AnimateSection className="py-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-medium">Skills</h1>
        <p className="text-sm font-light text-pretty">
          Technology evolves constantly, and I enjoy learning the right tools
          for each challenge. I focus on building scalable, maintainable, and
          user-friendly applications while continuously improving my skills.
        </p>
      </div>
      <div className="divide-y divide-[#a0a0a0]/40 subpixel-antialiased">
        {skills.map((skill, index) => (
          <div
            key={skill.title}
            className="grid sm:grid-cols-[12.5rem_1fr] items-start py-6 gap-y-3.5 gap-x-5 select-none"
          >
            <div className="flex items-center gap-1.5 text-sm">
              <span className="font-geist-mono font-light text-[#737373]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className=" text-sm text-[#737373]">{skill.title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3 cursor-default">
              {skill.list.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center gap-1.5"
                >
                  <div className="transition-[translate] duration-250 group-hover:-translate-y-0.5">
                    <item.icon size={item.sizeIcon ?? "20"} />
                  </div>
                  <span className="text-sm text-[#737373] group-hover:text-black transition-colors duration-250 whitespace-nowrap">
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
