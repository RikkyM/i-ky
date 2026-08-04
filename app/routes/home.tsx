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
    <AnimateContainer className="font-sans">
      <Hero />

      <Projects />

      <Skills />

      <Suspense fallback={null}>
        <GithubContribution />
      </Suspense>
    </AnimateContainer>
  );
}
