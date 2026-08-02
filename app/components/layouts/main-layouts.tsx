import "dayjs/locale/en.js";
import "dayjs/locale/id.js";
import { AnimatePresence, motion } from "motion/react";
import {
  data,
  Link,
  useLoaderData,
  useLocation,
  useOutlet,
} from "react-router";
import type { Route } from "../../+types/root";

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

  //   const pathname = location.pathname.replace(/^\/(en|id)/, "");
  const lang = locale === "en" ? "id/" : "";

  return (
    <main className="mx-auto h-dvh max-h-full w-full scrollbar-none overflow-auto bg-[#FBFAF9] subpixel-antialiased">
      <div className="sticky top-10 z-10 mx-auto flex w-full max-w-3xl justify-end">
        <Link
          to={`/${lang}`}
          className="grid aspect-square size-9 outline-none hover:bg-gray-200 transition-colors duration-150 w-max cursor-pointer place-content-center rounded-lg bg-white uppercase shadow ring ring-gray-300 text-sm"
        >
          {locale === "id" ? "id" : "en"}
        </Link>
      </div>
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
      <div className="pointer-events-none sticky inset-x-0 bottom-0 h-30 w-full bg-linear-to-t from-[#FBFAF9] to-white/35" />
    </main>
  );
};

export default MainLayout;
