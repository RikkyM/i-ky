import "dayjs/locale/en.js";
import "dayjs/locale/id.js";
import { AnimatePresence, motion } from "motion/react";
import { data, useLoaderData, useLocation, useOutlet } from "react-router";
import AnimateContainer from "~/components/animate-container";
import Footer from "~/components/footer";
import { cn } from "~/lib/utils";
import type { Route } from "../+types/root";
import BottomNavigation from "../components/navigation/bottom-navigation";

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

  return (
    <main className="mx-auto h-dvh w-full scrollbar-none overflow-x-hidden overflow-y-auto bg-[#FBFAF9] font-sans subpixel-antialiased">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, backdropFilter: "blur(5px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(0px)" }}
          transition={{
            ease: "easeIn",
          }}
          className="mx-auto max-w-3xl max-lg:w-[87%] scrollbar-none"
        >
          <AnimateContainer>
            {outlet}
            <Footer />
          </AnimateContainer>
        </motion.div>
      </AnimatePresence>
      <BottomNavigation locale={locale} location={location} />
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 h-20 w-full",
          "after:fixed after:inset-x-0 after:bottom-0 after:block after:h-30 after:w-full after:bg-linear-to-t after:from-[#FBFAF9] after:content-['']",
        )}
      />
      {/* <div className="fixed inset-x-0 bottom-0 h-20 w-full bg-red-500" /> */}
    </main>
  );
};

export default MainLayout;
