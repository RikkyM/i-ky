import "dayjs/locale/en.js";
import "dayjs/locale/id.js";
import { NotebookText } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  data,
  Link,
  NavLink,
  useLoaderData,
  useLocation,
  useOutlet,
} from "react-router";
import { cn } from "~/lib/utils";
import type { Route } from "../../+types/root";
import Home from "../icons/Home";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = params.locale ?? "en";

  if (!["en", "id"].includes(locale)) {
    throw data("Not Found", { status: 404 });
  }

  return { locale };
}

export const MainLayout = () => {
  const location = useLocation();
  const { locale } = useLoaderData<typeof loader>();
  const outlet = useOutlet({ locale });

  const localePath = (path = "") =>
    locale === "id" ? `/id${path}` : path || "/";

  const switchLocale = () => {
    if (locale === "id") {
      return location.pathname.replace(/^\/id(?=\/|$)/, "") || "/";
    }

    return `/id${location.pathname}`;
  };

  return (
    <main className="mx-auto h-dvh max-h-full w-full scrollbar-none overflow-y-auto overflow-x-hidden bg-[#FBFAF9] subpixel-antialiased">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, backdropFilter: "blur(5px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
          transition={{
            ease: "easeIn",
          }}
          className="mx-auto max-w-3xl"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
      <nav
        aria-label="primary navigation"
        className="fixed bottom-5 left-1/2 z-10 mx-auto flex w-full w-max max-w-3xl -translate-x-1/2 items-center justify-end rounded-2xl border border-gray-200 bg-[#FBFAF9] px-2 py-1.5 shadow"
      >
        <div className="mr-1.5 flex items-center gap-1.5 border-r border-[#737373] pr-1.5">
          {(
            [
              { url: "/", icon: Home, label: "Home" },
              { url: "/about", icon: NotebookText, label: "About" },
            ] as const
          ).map((data) => (
            <NavLink
              key={localePath(data.url)}
              to={localePath(data.url)}
              aria-label={data.label}
              end={data.url === "/"}
              className={({ isActive }) =>
                cn(
                  "group grid aspect-square size-8 w-max transform cursor-pointer place-content-center rounded-xl text-sm uppercase transition-[translate,transform,background-color,color] duration-150 will-change-transform outline-none hover:-translate-y-0.5",
                  isActive
                    ? "bg-gray-200 text-[#0A0A0A]"
                    : "text-[#737373] hover:bg-gray-200 hover:text-[#0A0A0A]",
                )
              }
            >
              <data.icon size={16} />
            </NavLink>
          ))}
        </div>
        <div>
          <Link
            to={switchLocale()}
            className={cn(
              "grid aspect-square size-8 w-max transform cursor-pointer place-content-center rounded-xl text-sm uppercase transition-[translate,transform,background-color,color] duration-150 will-change-transform outline-none",
              "text-[#737373] hover:-translate-y-0.5 hover:bg-gray-200 hover:text-[#0A0A0A]",
            )}
          >
            {locale === "id" ? "ID" : "EN"}
          </Link>
        </div>
      </nav>
      <div className="pointer-events-none sticky inset-x-0 bottom-0 h-30 w-full bg-linear-to-t from-[#FBFAF9] to-white/35" />
    </main>
  );
};

export default MainLayout;
