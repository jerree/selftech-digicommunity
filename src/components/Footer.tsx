import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { programs, routes } from "../lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-16 text-cream">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      <div className="container-page relative">
        <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3" aria-label="Selftech DigiCommunity home">
              <span className="grid size-12 place-items-center rounded-xl bg-cream">
                <img src="/assets/logo-256.png" alt="" className="size-9 object-contain mix-blend-multiply" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[1.1rem] font-bold tracking-tight text-cream">
                  Selftech
                </span>
                <span className="mt-1 text-[0.56rem] font-bold uppercase tracking-[0.3em] text-cream/45">
                  DigiCommunity
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-[0.87rem] leading-relaxed text-cream/50">
              A digitally empowered society where every person and community has the skills,
              resources and opportunities to participate meaningfully in the digital economy.
            </p>
            <Link
              to="/#newsletter"
              className="mt-6 inline-flex items-center gap-2 text-[0.8rem] font-semibold text-green"
            >
              <Mail className="size-4" />
              <span className="link-line">Join the newsletter</span>
            </Link>
          </div>

          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-cream/35">
              Programs
            </p>
            <ul className="mt-5 space-y-3">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    to={`/programs#${program.id}`}
                    className="text-[0.85rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-cream/35">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {routes.map((route) => (
                <li key={route.to}>
                  <Link
                    to={route.to}
                    className="text-[0.85rem] text-cream/60 transition-colors hover:text-cream"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/resources" className="text-[0.85rem] text-cream/60 transition-colors hover:text-cream">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.24em] text-cream/35">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-[0.85rem] text-cream/60">
              <li>
                <a href="tel:+14432563727" className="flex items-start gap-2.5 hover:text-cream">
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-green" />
                  <span>
                    Google Voice
                    <br />
                    (443) 256-3727
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+13142711939" className="flex items-start gap-2.5 hover:text-cream">
                  <Phone className="mt-0.5 size-3.5 shrink-0 text-green" />
                  <span>
                    Additional line
                    <br />
                    (314) 271-1939
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-green" />
                <span>Serving communities across the region</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.72rem] text-cream/35">
            © 2026 Selftech DigiCommunity. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.72rem] text-cream/45">
            <Link to="/privacy" className="hover:text-cream">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-cream">
              Terms of Use
            </Link>
            <Link to="/admin" className="hover:text-cream">
              Admin
            </Link>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 rounded-full border border-cream/15 px-3 py-1.5 font-semibold text-cream/70 transition-colors hover:border-cream/35 hover:text-cream"
            >
              Back to top
              <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="container-page select-none overflow-hidden">
        <p className="w-full translate-y-[18%] whitespace-nowrap text-center font-display text-[clamp(3rem,11.5vw,10rem)] font-bold leading-[0.8] tracking-[-0.06em] text-cream/[0.05]">
          DigiCommunity
        </p>
      </div>
    </footer>
  );
}
