import {
  autoUpdate,
  offset,
  shift,
  useDelayGroup,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import type { HTMLAttributes } from "react";
import React from "react";
import { NavLink } from "react-router";
import { cn } from "~/lib/utils";

type NavItemProps = Omit<HTMLAttributes<HTMLAnchorElement>, "children"> & {
  url: string;
  label?: string;
  end?: boolean;
  children: React.ReactNode;
};

export default function NavItem({
  url,
  label,
  end,
  children,
  ...props
}: NavItemProps) {
  const [open, setOpen] = React.useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    transform: false,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), shift()],
  });

  const { delay, isInstantPhase } = useDelayGroup(context, { id: url });

  const hover = useHover(context, { delay });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <NavLink
        to={url}
        aria-label={label}
        end={end}
        ref={refs.setReference}
        {...getReferenceProps()}
        {...props}
        className={({ isActive }) =>
          cn(
            "group grid aspect-square size-8 w-max transform cursor-pointer place-content-center rounded-xl text-sm uppercase transition-[translate,transform,background-color,color] duration-150 will-change-transform outline-none hover:-translate-y-0.5",
            isActive
              ? "bg-gray-200 text-[#0A0A0A]"
              : "text-[#737373] hover:bg-gray-200 hover:text-[#0A0A0A]",
          )
        }
      >
        {children}
      </NavLink>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className={cn(
          "pointer-events-none z-10 hidden origin-top rounded-lg bg-[#0A0A0A] px-2.5 py-1 text-xs font-medium text-[#FBFAF9] transition-[opacity,transform,scale] sm:block",
          isInstantPhase ? "duration-0" : "duration-150",
          open ? "scale-100 opacity-100" : "scale-90 opacity-0 delay-0",
        )}
      >
        {label}
      </div>
    </>
  );
}
