import { FloatingDelayGroup } from "@floating-ui/react";
import { type Location } from "react-router";
import Home from "../icons/Home";
import NavItem from "./nav-item";

const Items = [
  { url: "/", icon: Home, label: "Home" },
  // { url: "/about", icon: NotebookText, label: "About" },
] as const;

export default function BottomNavigation({
  locale,
  location,
}: {
  locale: string;
  location: Location;
}) {
  const localePath = (path = "") =>
    locale === "id" ? `/id${path}` : path || "/";

  const switchLocale = () => {
    if (locale === "id") {
      return location.pathname.replace(/^\/id(?=\/|$)/, "") || "/";
    }

    return `/id${location.pathname}`;
  };

  return (
    <FloatingDelayGroup delay={{ open: 250, close: 200 }} timeoutMs={250}>
        <nav
          aria-label="floating navigation"
          className="sticky left-1/2 -translate-x-1/2 bottom-5 z-10 flex w-full w-max max-w-3xl items-center justify-end rounded-2xl border border-gray-200 bg-[#FBFAF9] px-2 py-1.5 shadow"
        >
          <div className="mr-1 flex items-center gap-1 border-r border-[#CCCCCC] pr-1">
            {Items.map((data) => (
              <NavItem
                key={localePath(data.url)}
                url={localePath(data.url)}
                label={data.label}
                end={data.url === "/"}
              >
                <data.icon size={16} />
              </NavItem>
            ))}
          </div>
          <div>
            <NavItem url={switchLocale()} label="Language">
              {locale === "id" ? "ID" : "EN"}
            </NavItem>
          </div>
        </nav>
      <div className="">
      </div>
    </FloatingDelayGroup>
  );
}
