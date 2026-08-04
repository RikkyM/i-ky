import {
  FloatingPortal,
  offset,
  shift,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import axios from "axios";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import React from "react";
import { useOutletContext } from "react-router";
import useSwr from "swr";
import { COLORS } from "~/constants/colors";
import { cn } from "~/lib/utils";
import AnimateSection from "./animate-section";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

type GitHubResponse = {
  total: number;
  contributions: Contribution[];
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function GithuvContribution() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<Contribution | null>(null);

  const { locale } = useOutletContext<{ locale: string }>();

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    transform: false,
    placement: "top",
    middleware: [offset(4), shift()],
  });

  const hover = useHover(context, { delay: 0 });
  const dismiss = useDismiss(context, { ancestorScroll: true });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);

  const { data, isLoading } = useSwr<GitHubResponse>(
    import.meta.env.VITE_GITHUB_CONTRIBUTIONS_API_URL,
    fetcher,
  );

  const sorted = React.useMemo(() => {
    if (!data) return [];

    return [...data.contributions].sort(
      (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
    );
  }, [data]);

  const monthLabels = React.useMemo(() => {
    return (
      sorted?.reduce<
        {
          month: string;
          date: string;
          column: number;
        }[]
      >((acc, item, index) => {
        const currentMonth = dayjs(item.date).format("MMM");
        const prevMonth =
          index > 0 ? dayjs(sorted[index - 1].date).format("MMM") : null;

        if (index === 0 || currentMonth !== prevMonth) {
          acc.push({
            month: currentMonth,
            date: item.date,
            column: Math.floor(index / 7),
          });
        }

        return acc;
      }, []) ?? []
    );
  }, [sorted]);

  const total = React.useMemo(() => {
    return sorted?.reduce((acc, data) => acc + data.count, 0);
  }, [sorted]);

  if (isLoading)
    return (
      <div className="grid h-39 w-full place-content-center">
        <Loader className="mx-auto animate-spin" />
      </div>
    );
  return (
    <AnimateSection
      className={cn(
        "relative space-y-0.5 py-10",
        "before:pointer-events-none before:absolute before:top-0 before:bottom-5 before:left-0 before:z-10 before:w-4 before:bg-linear-to-r before:from-[#FBFAF9]",
        "after:pointer-events-none after:absolute after:top-0 after:right-0 after:bottom-5 after:z-10 after:w-4 after:bg-linear-to-l after:from-[#FBFAF9]",
      )}
    >
      <div className="relative scrollbar-none overflow-x-auto px-3 py-3">
        <div className="relative mx-auto w-max">
          <div
            className="relative h-4.5"
            style={{ width: `${Math.ceil(365 / 7) * 14}px` }}
          >
            {monthLabels.map((item) => (
              <span
                key={item.month + item.column}
                className="absolute text-xs text-[#737373]"
                style={{
                  left: `${item.column * 14}px`,
                }}
              >
                {dayjs(item.date).locale(locale).format("MMM")}
              </span>
            ))}
          </div>

          <div className="grid grid-flow-col grid-rows-7 gap-0.5">
            {sorted?.map((item) => (
              <div
                key={item.date}
                ref={active?.date === item.date ? refs.setReference : undefined}
                {...(active?.date === item.date ? getReferenceProps() : {})}
                onMouseEnter={(e) => {
                  setActive(item);
                  refs.setReference(e.currentTarget);
                  setOpen(true);
                }}
                onMouseLeave={() => {
                  setOpen(false);
                }}
                className="size-3 rounded-sm"
                style={{
                  backgroundColor: COLORS[item.level],
                }}
              />
            ))}
            <FloatingPortal root={document.querySelector("main")}>
              <div
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                className={cn(
                  "pointer-events-none origin-bottom rounded-md bg-neutral-900 px-3 py-2 text-xs text-white shadow-lg transition-[opacity,scale]",
                  open ? "scale-100" : "scale-90 opacity-0",
                )}
              >
                {active?.count} contributions on{" "}
                {dayjs(active?.date).format("DD.MM.YY")}
              </div>
            </FloatingPortal>
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-wrap items-center justify-between gap-2.5 px-3 text-xs text-[#737373]">
        <span>{total} contributions in the past 365 days.</span>
        <div className="flex flex-1 items-center justify-end">
          <span>Less</span>
          <div className="flex items-center gap-0.5 px-0.5">
            {COLORS.map((color) => (
              <div
                key={color}
                className="size-3 rounded-sm"
                style={{
                  backgroundColor: color,
                }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </AnimateSection>
  );
}
