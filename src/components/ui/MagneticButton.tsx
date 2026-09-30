"use client";

import {
  type ReactNode,
  type RefObject,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useCursor } from "@/components/providers/CursorProvider";

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "solid" | "line" | "ghost";
  ariaLabel?: string;
};

type LinkProps = BaseProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  external?: never;
  onClick?: () => void;
};

type Props = LinkProps | ButtonProps;

const base =
  "focus-ring inline-flex max-w-full items-center justify-center gap-3 px-5 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform sm:px-7 sm:py-4";

const variants = {
  solid:
    "bg-[var(--gold)] !text-black hover:bg-[var(--accent-bright)] hover:!text-black",
  line:
    "border border-[var(--gold)] bg-transparent text-[var(--gold)] hover:bg-[var(--gold)] hover:!text-black",
  ghost: "text-[var(--gold)] underline-offset-4 hover:underline",
};

export function MagneticButton(props: Props) {
  const {
    children,
    className = "",
    variant = "solid",
    ariaLabel,
  } = props;
  const ref = useMagnetic<HTMLElement>(0.28);
  const { setCursor } = useCursor();
  const classes = `${base} ${variants[variant]} ${className}`;

  const interaction = {
    onMouseEnter: () => setCursor("hover"),
    onMouseLeave: () => setCursor("default"),
  };

  if ("href" in props && props.href) {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> = {
      href: props.href,
      className: classes,
      "aria-label": ariaLabel,
      ...interaction,
      ...(props.external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {}),
    };

    return (
      <a ref={ref as RefObject<HTMLAnchorElement>} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type: "button",
    className: classes,
    "aria-label": ariaLabel,
    onClick: props.onClick,
    ...interaction,
  };

  return (
    <button ref={ref as RefObject<HTMLButtonElement>} {...buttonProps}>
      {children}
    </button>
  );
}
