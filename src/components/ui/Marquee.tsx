import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  className?: string;
  reverse?: boolean;
};

export function Marquee({ children, duration = 38, className = "", reverse = false }: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setRunning(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { rootMargin: "120px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const style = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;

  return (
    <div ref={ref} className={`marquee group overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max${running ? "" : " is-paused"}`}
        style={style}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
