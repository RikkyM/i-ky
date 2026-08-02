import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

const pages = [index("routes/home.tsx"), route("about", "routes/about.tsx")];

export default [
  ...prefix(":locale?", [
    layout("components/layouts/main-layouts.tsx", [...pages]),
  ]),
] satisfies RouteConfig;
