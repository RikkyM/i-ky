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

  // const lang = locale === "en" ? "id/" : "";

  const path = location.pathname.replace(/^\/(id)(?=\/|$)/, "");

  // locale tujuan
  const lang =
    locale === "id"
      ? path || "/" // id -> en
      : `/id${path}`;

  const pageLang = locale === "id" ? "id/" : "";

  return (
    <main className="mx-auto h-dvh max-h-full w-full scrollbar-none overflow-auto bg-[#FBFAF9] subpixel-antialiased">
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
      <div className="fixed bottom-5 left-1/2 z-10 mx-auto flex w-full w-max max-w-3xl -translate-x-1/2 items-center justify-end rounded-xl bg-white px-2 py-1.5 shadow ring ring-gray-300">
        <div className="mr-1 flex items-center gap-0.5 border-r border-[#737373] pr-1">
          <NavLink
            to={`/${pageLang}`}
            className={({ isActive }) =>
              cn(
                "group grid aspect-square size-8 w-max cursor-pointer place-content-center rounded-xl text-sm uppercase transition-[colors,translate] duration-250 outline-none hover:-translate-y-0.5",
                isActive
                  ? "bg-gray-200 text-[#0A0A0A]"
                  : "text-black hover:bg-gray-200",
              )
            }
          >
            <Home size={18} />
          </NavLink>
          <NavLink
            to={`/${pageLang}/about`}
            className={({ isActive }) =>
              cn(
                "group grid aspect-square size-8 w-max cursor-pointer place-content-center rounded-xl text-sm uppercase transition-[colors,translate] duration-250 outline-none hover:-translate-y-0.5",
                isActive
                  ? "bg-gray-200 text-[#0A0A0A]"
                  : "text-black hover:bg-gray-200",
              )
            }
          >
            <NotebookText size={18} />
          </NavLink>
        </div>
        <div>
          <Link
            to={lang}
            className="grid aspect-square size-8 w-max cursor-pointer place-content-center rounded-xl text-sm uppercase transition-colors duration-250 outline-none hover:bg-gray-200"
          >
            {locale === "id" ? "id" : "en"}
          </Link>
        </div>
      </div>
      <div className="pointer-events-none sticky inset-x-0 bottom-0 h-30 w-full bg-linear-to-t from-[#FBFAF9] to-white/35" />
    </main>
  );
};

export default MainLayout;
