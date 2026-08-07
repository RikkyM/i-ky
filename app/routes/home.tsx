import React, { Suspense } from "react";
import Indicator from "~/components/indicator-pills";
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
    <>
      <Hero />

      <Projects />

      <Skills />

      <Suspense fallback={null}>
        <GithubContribution />
      </Suspense>
    </>
  );
}
