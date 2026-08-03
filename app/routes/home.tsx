import React, { Suspense } from "react";
import AnimateContainer from "~/components/animate-container";
import Hero from "~/features/home/components/hero";
import Projects from "~/features/home/components/projects";
import Skills from "~/features/home/components/skills";
import type { Route } from "./+types/home";
const GithubContribution = React.lazy(
  () => import("~/components/github-contribution"),
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Rikky Mahendra" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <AnimateContainer className="space-y-12.5 pt-25 font-sans">
{/* <div className="sticky inset-x-0 h-20 bg-red-500 top-0"></div> */}
      <Hero />

      <Suspense fallback={null}>
        <GithubContribution />
      </Suspense>

      <Projects />

      <Skills />
    </AnimateContainer>
  );
}
