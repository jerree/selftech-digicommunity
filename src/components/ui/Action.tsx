import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ComponentType, ReactNode } from "react";

type Variant = "ink" | "blue" | "green" | "outline" | "light";

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-2 py-2 text-[0.92rem] font-semibold tracking-tight transition-colors duration-500";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-cream hover:bg-ink-2",
  blue: "bg-blue text-white hover:bg-blue-deep",
  green: "bg-green text-white hover:bg-green-deep",
  outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-cream",
  light: "bg-cream text-ink hover:bg-white",
};

const iconWrap: Record<Variant, string> = {
  ink: "bg-white/12 text-cream",
  blue: "bg-white/15 text-white",
  green: "bg-white/15 text-white",
  outline: "bg-ink/8 text-ink group-hover:bg-white/15 group-hover:text-cream",
  light: "bg-ink text-cream",
};

type ActionProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ComponentType<{ className?: string }>;
  href?: string;
  to?: string;
};

export function Action({
  children,
  variant = "ink",
  className = "",
  icon: Icon = ArrowUpRight,
  href,
  to,
}: ActionProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className={`relative z-10 grid size-9 place-items-center rounded-full transition-transform duration-500 ease-expo group-hover:rotate-45 ${iconWrap[variant]}`}
      >
        <Icon className="size-4" />
      </span>
    </>
  );

  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href ?? "#"} className={classes}>
      {content}
    </a>
  );
}
