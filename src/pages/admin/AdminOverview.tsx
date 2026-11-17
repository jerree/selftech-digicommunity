import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ClipboardList,
  HandHeart,
  Inbox,
  Quote,
  Users,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { AdminPageHeader } from "./ui";

type Counts = {
  messages: number;
  newMessages: number;
  involvements: number;
  newInvolvements: number;
  registrations: number;
  newRegistrations: number;
  subscribers: number;
  events: number;
  resources: number;
  stories: number;
  impact: number;
};

export default function AdminOverview() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    let active = true;

    const count = async (table: string, status?: string) => {
      let query = client.from(table).select("id", { count: "exact", head: true });
      if (status) query = query.eq("status", status);
      const { count: total, error } = await query;
      if (error) console.error(error);
      return total ?? 0;
    };

    (async () => {
      const [
        messages,
        newMessages,
        involvements,
        newInvolvements,
        registrations,
        newRegistrations,
        subscribers,
        events,
        resources,
        stories,
        impact,
      ] = await Promise.all([
        count("contact_messages"),
        count("contact_messages", "new"),
        count("involvement_requests"),
        count("involvement_requests", "new"),
        count("registrations"),
        count("registrations", "new"),
        count("newsletter_subscribers"),
        count("events"),
        count("resources"),
        count("stories"),
        count("impact_stats"),
      ]);
      if (active) {
        setCounts({
          messages,
          newMessages,
          involvements,
          newInvolvements,
          registrations,
          newRegistrations,
          subscribers,
          events,
          resources,
          stories,
          impact,
        });
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const cards = counts
    ? [
        {
          label: "Contact messages",
          value: counts.messages,
          note: `${counts.newMessages} new`,
          to: "/admin/messages",
          icon: Inbox,
        },
        {
          label: "Volunteers & partners",
          value: counts.involvements,
          note: `${counts.newInvolvements} new`,
          to: "/admin/involvements",
          icon: HandHeart,
        },
        {
          label: "Registrations",
          value: counts.registrations,
          note: `${counts.newRegistrations} new`,
          to: "/admin/registrations",
          icon: ClipboardList,
        },
        {
          label: "Subscribers",
          value: counts.subscribers,
          note: "Newsletter list",
          to: "/admin/subscribers",
          icon: Users,
        },
        {
          label: "Events",
          value: counts.events,
          note: "On the calendar",
          to: "/admin/events",
          icon: CalendarDays,
        },
        {
          label: "Resources",
          value: counts.resources,
          note: "In the library",
          to: "/admin/resources",
          icon: BookOpen,
        },
        {
          label: "Impact stats",
          value: counts.impact,
          note: "Public figures",
          to: "/admin/impact",
          icon: BarChart3,
        },
        {
          label: "Stories",
          value: counts.stories,
          note: "Success stories",
          to: "/admin/stories",
          icon: Quote,
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Overview"
        description="Everything the website collects and publishes, in one place."
      />

      {!counts ? (
        <p className="py-12 text-center text-[0.9rem] text-ink/45">Loading…</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.label}
                to={card.to}
                className="group rounded-2xl border border-ink/10 bg-white p-5 transition-colors hover:border-ink/30"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-bone text-ink/60 transition-colors group-hover:bg-ink group-hover:text-cream">
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <span className="font-display text-[2rem] font-semibold leading-none tracking-tighter text-ink">
                    {card.value}
                  </span>
                </div>
                <p className="mt-5 font-display text-[0.95rem] font-semibold tracking-tight text-ink">
                  {card.label}
                </p>
                <p className="mt-1 text-[0.78rem] text-ink/45">{card.note}</p>
              </Link>
            );
          })}
        </div>
      )}

      <div className="rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="font-display text-[1.15rem] font-semibold tracking-tight text-ink">
          Quick actions
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/admin/events"
            className="rounded-full bg-ink px-4 py-2 text-[0.82rem] font-semibold text-cream transition-colors hover:bg-ink-2"
          >
            Add an event
          </Link>
          <Link
            to="/admin/resources"
            className="rounded-full border border-ink/20 bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition-colors hover:border-ink"
          >
            Publish a resource
          </Link>
          <Link
            to="/admin/impact"
            className="rounded-full border border-ink/20 bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition-colors hover:border-ink"
          >
            Update impact figures
          </Link>
          <Link
            to="/admin/stories"
            className="rounded-full border border-ink/20 bg-white px-4 py-2 text-[0.82rem] font-semibold text-ink transition-colors hover:border-ink"
          >
            Add a story
          </Link>
        </div>
      </div>
    </div>
  );
}
