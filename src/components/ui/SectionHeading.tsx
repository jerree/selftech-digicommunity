import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ElementType, ReactNode } from "react";

export function Eyebrow({
  children,
  index,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  index?: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  return (
    <div
      className={`flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.24em] ${
        isLight ? "text-cream/60" : "text-ink/45"
      } ${className}`}
    >
      {index && <span className="tabular-nums">{index}</span>}
      <span className={`h-px w-8 ${isLight ? "bg-cream/25" : "bg-ink/20"}`} />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "dark",
  className = "",
  children,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  copy?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : ""} ${className}`}
    >
      <Eyebrow index={index} tone={tone} className={align === "center" ? "justify-center" : ""}>
        {eyebrow}
      </Eyebrow>
      <div
        className={`mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${
          align === "center" ? "items-center" : ""
        }`}
      >
        <h2
          className={`max-w-2xl text-[clamp(2.1rem,4.2vw,3.6rem)] leading-[0.98] ${
            tone === "light" ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
        {copy && (
          <div
            className={`max-w-sm text-[0.98rem] leading-relaxed ${
              tone === "light" ? "text-cream/65" : "text-ink/60"
            }`}
          >
            {copy}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export function TextLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const internal = href.startsWith("/") && !href.startsWith("//");
  const Wrapper: ElementType = internal ? Link : "a";
  return (
    <Wrapper
      {...(internal ? { to: href } : { href })}
      className={`group inline-flex items-center gap-2 text-sm font-semibold ${
        tone === "light" ? "text-cream" : "text-ink"
      } ${className}`}
    >
      <span className="link-line">{children}</span>
      <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Wrapper>
  );
}
