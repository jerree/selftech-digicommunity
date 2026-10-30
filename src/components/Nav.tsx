import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { mobileMenu, navRoutes, programs } from "../lib/site";
import type { MobileMenuItem } from "../lib/site";
import { Action } from "./ui/Action";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const reduce = useReducedMotion();
  const { pathname } = useLocation();

  const closeMenu = () => {
    setOpen(false);
    setProgramsOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close with Escape, and when the viewport grows into the desktop layout.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => mq.matches && closeMenu();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  const renderItem = (item: MobileMenuItem, order: number) => {
    const active = isActive(item.to);
    const motionProps = {
      initial: reduce ? undefined : { opacity: 0, y: 14 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.08 + order * 0.04, duration: 0.5, ease: EASE },
    };

    if (item.children === "programs") {
      return (
        <motion.li key={item.to} {...motionProps} className="border-b border-ink/10">
          <button
            type="button"
            onClick={() => setProgramsOpen((v) => !v)}
            aria-expanded={programsOpen}
            aria-controls="mobile-programs"
            className="group flex w-full items-center justify-between gap-4 py-3.5 text-left"
          >
            <span className="min-w-0">
              <span className="flex items-center gap-2.5">
                <span
                  className={`size-1.5 rounded-full transition-colors ${
                    active ? "bg-green" : "bg-transparent"
                  }`}
                />
                <span className="font-display text-[1.5rem] font-semibold tracking-tight text-ink">
                  {item.label}
                </span>
              </span>
              <span className="mt-0.5 block pl-4 text-[0.78rem] text-ink/50">{item.hint}</span>
            </span>
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                programsOpen
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/15 text-ink group-hover:border-ink/40"
              }`}
            >
              <ChevronDown
                className={`size-4 transition-transform duration-500 ${
                  programsOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>

          <AnimatePresence initial={false}>
            {programsOpen && (
              <motion.div
                id="mobile-programs"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <ul className="mb-4 ml-4 space-y-1 border-l border-ink/10 pl-4">
                  {programs.map((program) => (
                    <li key={program.id}>
                      <Link
                        to={`/programs#${program.id}`}
                        onClick={closeMenu}
                        className="group/sub flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-ink/5"
                      >
                        <span className="font-display text-[0.7rem] font-bold tabular-nums text-ink/35">
                          {program.index}
                        </span>
                        <span className="flex-1 text-[0.95rem] font-semibold leading-snug text-ink">
                          {program.title}
                        </span>
                        <ArrowRight className="size-4 text-ink/30 transition-transform duration-300 group-hover/sub:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/programs"
                      onClick={closeMenu}
                      className="flex items-center gap-2 px-3 py-2.5 text-[0.85rem] font-bold text-blue-deep"
                    >
                      View all programs
                      <ArrowRight className="size-4" />
                    </Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      );
    }

    return (
      <motion.li key={item.to} {...motionProps} className="border-b border-ink/10">
        <Link
          to={item.to}
          onClick={closeMenu}
          aria-current={active ? "page" : undefined}
          className="group flex items-center justify-between gap-4 py-3.5"
        >
          <span className="min-w-0">
            <span className="flex items-center gap-2.5">
              <span
                className={`size-1.5 rounded-full transition-colors ${
                  active ? "bg-green" : "bg-transparent"
                }`}
              />
              <span className="font-display text-[1.5rem] font-semibold tracking-tight text-ink">
                {item.label}
              </span>
            </span>
            <span className="mt-0.5 block pl-4 text-[0.78rem] text-ink/50">{item.hint}</span>
          </span>
          <ArrowRight className="size-5 shrink-0 text-ink/30 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      </motion.li>
    );
  };

  // Running index so the stagger continues across groups.
  let order = 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          scrolled || open
            ? "border-b border-ink/10 bg-cream/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="container-page flex h-[74px] items-center justify-between gap-6">
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label="Selftech DigiCommunity home"
            onClick={() => {
              closeMenu();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-white ring-1 ring-ink/10 transition-transform duration-500 ease-expo group-hover:-rotate-3">
              <img
                src="/assets/logo-256.png"
                alt=""
                className="size-8.5 object-contain mix-blend-multiply"
                width={34}
                height={34}
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.02rem] font-bold tracking-tight text-ink">
                Selftech
              </span>
              <span className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.3em] text-ink/50">
                DigiCommunity
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {navRoutes.map((route) => {
              const active = route.to === pathname;
              return (
                <Link
                  key={route.to}
                  to={route.to}
                  aria-current={active ? "page" : undefined}
                  className={`link-line text-[0.82rem] transition-colors hover:text-ink ${
                    active ? "font-bold text-ink" : "font-semibold text-ink/70"
                  }`}
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <Action to="/register" variant="ink">
                Join a Program
              </Action>
            </span>
            <button
              type="button"
              onClick={() => (open ? closeMenu() : setOpen(true))}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink hover:text-cream xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-0 top-[74px] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-ink/10 bg-bone xl:hidden"
          >
            <div className="container-page mx-auto flex min-h-full max-w-xl flex-col py-6 sm:max-w-2xl">
              <nav aria-label="Mobile" className="flex-1 space-y-7">
                {mobileMenu.map((group) => (
                  <section key={group.heading}>
                    <p className="mb-1 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-ink/40">
                      {group.heading}
                    </p>
                    <ul className="border-t border-ink/10">
                      {group.items.map((item) => renderItem(item, order++))}
                    </ul>
                  </section>
                ))}
              </nav>

              <motion.div
                initial={reduce ? undefined : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: EASE }}
                className="mt-8 space-y-5 pb-6"
              >
                <Action to="/register" variant="ink" className="w-full justify-between">
                  Join a Program
                </Action>

                <div className="rounded-2xl border border-ink/10 bg-cream p-4">
                  <p className="mb-2.5 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-ink/40">
                    <Phone className="size-3.5" />
                    Talk to us
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                    <a href="tel:+14432563727" className="text-[0.95rem] font-semibold text-ink">
                      (443) 256-3727
                    </a>
                    <a href="tel:+13142711939" className="text-[0.95rem] font-semibold text-ink">
                      (314) 271-1939
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
