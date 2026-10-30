import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
};

export function Marquee({ children, duration = 38, className = "", reverse = false }: MarqueeProps) {
  const style = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div className={`marquee group overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max" style={style}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
