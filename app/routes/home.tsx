import AnimateContainer from "~/components/animate-container";
import Hero from "~/features/home/components/hero";
import Projects from "~/features/home/components/projects";
import Skills from "~/features/home/components/skills";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rikky Mahendra" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <AnimateContainer className="space-y-12.5 pt-25 font-sans">
      <Hero />

      <Projects />

      <Skills />
    </AnimateContainer>
  );
}
