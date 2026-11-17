import type { EventFormat, EventKind, ResourceTopicId } from "./site";

export type SubmissionStatus = "new" | "read" | "archived";

export type ContactMessage = {
  id: string;
  created_at: string;
  topic: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
  status: SubmissionStatus;
};

export type InvolvementRequest = {
  id: string;
  created_at: string;
  type: string;
  name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  message: string;
  consent: boolean;
  status: SubmissionStatus;
};

export type Registration = {
  id: string;
  created_at: string;
  reference: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  program: string;
  format: string;
  experience: string;
  motivation: string | null;
  consent: boolean;
  status: SubmissionStatus;
};

export type Subscriber = {
  id: string;
  created_at: string;
  email: string;
};

export type EventRow = {
  id: string;
  created_at: string;
  title: string;
  date: string;
  time: string | null;
  kind: EventKind;
  format: EventFormat;
  location: string;
  summary: string;
  published: boolean;
};

export type ResourceRow = {
  id: string;
  created_at: string;
  title: string;
  summary: string;
  topic: ResourceTopicId;
  type: "Guide" | "Article" | "Checklist";
  read_time: string | null;
  href: string;
  published: boolean;
};

export type ImpactRow = {
  id: string;
  label: string;
  value: string;
  note: string | null;
  sort_order: number;
};

export type StoryRow = {
  id: string;
  created_at: string;
  title: string;
  quote: string;
  author: string | null;
  program: string | null;
  published: boolean;
};
