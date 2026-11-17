export type NotifyPayload =
  | {
      kind: "contact";
      name: string;
      email: string;
      subject: string;
      message: string;
      topic: string;
    }
  | {
      kind: "involvement";
      name: string;
      email: string;
      type: string;
      organization?: string;
      phone?: string;
      message: string;
    }
  | {
      kind: "registration";
      name: string;
      email: string;
      reference: string;
      program: string;
      format: string;
      experience: string;
      location: string;
      phone: string;
      motivation?: string;
    }
  | {
      kind: "subscriber";
      email: string;
    };

export function notifyStaff(payload: NotifyPayload) {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    return;
  }
}
