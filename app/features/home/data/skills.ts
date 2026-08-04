import {
  _React,
  Bun,
  CloudflareIcon,
  DrizzleOrm,
  GithubIcon,
  GitIcon,
  Javascript,
  Laravel,
  Nestjs,
  NodejsIcon,
  Postgresql,
  ReactQueryIcon,
  ReactRouter,
  TailwindIcon,
  TypescriptIcon,
} from "@dev.icons/react";
import type { ComponentType } from "react";
import { Commits, Motion, Mysql, Php, Vite } from "~/components/icons";

type SkillItem = {
  icon: ComponentType<{ size: string }>;
  sizeIcon?: string;
  name: string;
};

type Skills = {
  title: string;
  list: SkillItem[];
};

export const skills: Skills[] = [
  {
    title: "Language",
    list: [
      {
        icon: Php,
        sizeIcon: "28",
        name: "PHP",
      },
      {
        icon: Javascript,
        name: "JavaScript",
      },
      {
        icon: TypescriptIcon,
        name: "TypeScript",
      },
    ],
  },
  {
    title: "Frontend",
    list: [
      {
        icon: _React,
        name: "React",
      },
      {
        icon: TailwindIcon,
        name: "Tailwind CSS",
      },
      {
        icon: Motion,
        name: "Motion",
      },
      {
        icon: ReactRouter,
        name: "React Router",
      },
      {
        icon: ReactQueryIcon,
        name: "TanStack Query",
      },
    ],
  },
  {
    title: "Backend & Database",
    list: [
      {
        icon: NodejsIcon,
        name: "Node.js",
      },
      {
        icon: Bun,
        name: "Bun",
      },
      {
        icon: Nestjs,
        name: "NestJS",
      },
      {
        icon: Laravel,
        name: "Laravel",
      },
      {
        icon: DrizzleOrm,
        name: "Drizzle",
      },
      {
        icon: Mysql,
        name: "MySQL",
      },
      {
        icon: Postgresql,
        name: "PostgreSQL",
      },
    ],
  },
  {
    title: "Workflow",
    list: [
      {
        icon: GitIcon,
        name: "Git",
      },
      {
        icon: GithubIcon,
        name: "GitHub",
      },
      {
        icon: Commits,
        name: "Conventional Commits",
      },
      {
        icon: Vite,
        name: "Vite",
      },
      {
        icon: CloudflareIcon,
        name: "Cloudflare",
      },
    ],
  },
];
