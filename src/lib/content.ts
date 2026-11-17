import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { EventRow, ImpactRow, ResourceRow, StoryRow } from "./db";
import { impact as fallbackImpact, type Resource, type SiteEvent } from "./site";

export type ImpactStat = { label: string; value: string; note?: string };

export type Story = {
  id: string;
  title: string;
  quote: string;
  author: string | null;
  program: string | null;
};

const toEvent = (row: EventRow): SiteEvent => ({
  id: row.id,
  title: row.title,
  date: row.date,
  time: row.time ?? undefined,
  kind: row.kind,
  format: row.format,
  location: row.location,
  summary: row.summary,
});

const toResource = (row: ResourceRow): Resource => ({
  id: row.id,
  title: row.title,
  summary: row.summary,
  topic: row.topic,
  type: row.type,
  readTime: row.read_time ?? undefined,
  href: row.href,
});

const toImpact = (row: ImpactRow): ImpactStat => ({
  label: row.label,
  value: row.value,
  note: row.note ?? undefined,
});

const toStory = (row: StoryRow): Story => ({
  id: row.id,
  title: row.title,
  quote: row.quote,
  author: row.author,
  program: row.program,
});

export function usePublishedEvents(): SiteEvent[] | null {
  const [events, setEvents] = useState<SiteEvent[] | null>(null);

  useEffect(() => {
    if (!supabase) {
      setEvents([]);
      return;
    }
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("published", true)
        .order("date", { ascending: true });
      if (!active) return;
      if (error) {
        console.error(error);
        setEvents([]);
        return;
      }
      setEvents((data as EventRow[]).map(toEvent));
    })();
    return () => {
      active = false;
    };
  }, []);

  return events;
}

export function usePublishedResources(): Resource[] | null {
  const [resources, setResources] = useState<Resource[] | null>(null);

  useEffect(() => {
    if (!supabase) {
      setResources([]);
      return;
    }
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) {
        console.error(error);
        setResources([]);
        return;
      }
      setResources((data as ResourceRow[]).map(toResource));
    })();
    return () => {
      active = false;
    };
  }, []);

  return resources;
}

export function useImpactStats(): ImpactStat[] {
  const [stats, setStats] = useState<ImpactStat[]>(fallbackImpact);

  useEffect(() => {
    if (!supabase) return;
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("impact_stats")
        .select("*")
        .order("sort_order", { ascending: true });
      if (!active) return;
      if (error) {
        console.error(error);
        return;
      }
      const rows = (data as ImpactRow[]) ?? [];
      if (rows.length > 0) setStats(rows.map(toImpact));
    })();
    return () => {
      active = false;
    };
  }, []);

  return stats;
}

export function useStories(): Story[] | null {
  const [stories, setStories] = useState<Story[] | null>(null);

  useEffect(() => {
    if (!supabase) {
      setStories([]);
      return;
    }
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (!active) return;
      if (error) {
        console.error(error);
        setStories([]);
        return;
      }
      setStories((data as StoryRow[]).map(toStory));
    })();
    return () => {
      active = false;
    };
  }, []);

  return stories;
}
