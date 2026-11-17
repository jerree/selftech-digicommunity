import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  ExternalLink,
  HandHeart,
  Inbox,
  LayoutDashboard,
  LogOut,
  Quote,
  Users,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "../../lib/supabase";
import { NotConfigured } from "./NotConfigured";

const links = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/messages", label: "Messages", icon: Inbox },
  { to: "/admin/involvements", label: "Volunteers & partners", icon: HandHeart },
  { to: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/resources", label: "Resources", icon: BookOpen },
  { to: "/admin/impact", label: "Impact", icon: BarChart3 },
  { to: "/admin/stories", label: "Stories", icon: Quote },
];

export default function AdminLayout() {
  const [status, setStatus] = useState<"loading" | "in" | "out" | "denied">("loading");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin | Selftech DigiCommunity";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);

  useEffect(() => {
    if (!supabase) {
      setStatus("out");
      return;
    }
    let active = true;

    const check = async () => {
      const { data } = await supabase!.auth.getSession();
      const session = data.session;
      if (!session) {
        if (active) setStatus("out");
        return;
      }
      const { data: staffRow } = await supabase!
        .from("staff")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();
      if (active) setStatus(staffRow ? "in" : "denied");
    };

    check();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      check();
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    if (supabase) await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  if (!isSupabaseConfigured) return <NotConfigured />;

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-bone">
        <p className="text-[0.9rem] text-ink/50">Loading…</p>
      </div>
    );
  }

  if (status === "out") return <Navigate to="/admin/login" replace />;

  if (status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-bone px-5">
        <div className="w-full max-w-md rounded-[1.75rem] border border-ink/10 bg-white p-8 text-center">
          <h1 className="font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-ink">
            No access yet
          </h1>
          <p className="mt-3 text-[0.9rem] leading-relaxed text-ink/60">
            This account is signed in, but it is not on the staff allowlist. Ask an administrator
            to add your user ID to the <code className="rounded bg-bone px-1.5 py-0.5">staff</code>{" "}
            table.
          </p>
          <button
            type="button"
            onClick={signOut}
            className="mt-6 rounded-full bg-ink px-5 py-2.5 text-[0.85rem] font-semibold text-cream"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone lg:grid lg:grid-cols-[16rem_1fr]">
      <aside className="bg-ink text-cream lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-5">
          <Link to="/admin" className="flex items-baseline gap-2">
            <span className="font-display text-[1.1rem] font-semibold tracking-tight text-cream">
              Selftech
            </span>
            <span className="rounded-full border border-cream/20 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.18em] text-cream/60">
              Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={signOut}
            aria-label="Sign out"
            className="grid size-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:bg-white/10 hover:text-cream lg:hidden"
          >
            <LogOut className="size-4" />
          </button>
        </div>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-6">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-[0.85rem] font-semibold transition-colors ${
                    isActive
                      ? "bg-cream text-ink"
                      : "text-cream/65 hover:bg-white/10 hover:text-cream"
                  }`
                }
              >
                <Icon className="size-4" />
                {link.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden border-t border-cream/10 p-4 lg:block">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <ExternalLink className="size-4" />
            View website
          </a>
          <button
            type="button"
            onClick={signOut}
            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-[0.82rem] font-semibold text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </div>
      </aside>

      <main className="min-w-0 p-5 sm:p-8 lg:p-10">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
