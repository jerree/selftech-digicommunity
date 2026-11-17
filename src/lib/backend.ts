import { notifyStaff } from "./notify";
import { supabase } from "./supabase";

const NOT_CONNECTED =
  "Our online form is not connected yet. Please call (443) 256-3727 and we will help you directly.";

const GENERIC_ERROR =
  "Something went wrong sending your details. Please try again, or call (443) 256-3727.";

export type SubmitResult = { ok: true; reference?: string } | { ok: false; message: string };

export async function submitContact(values: {
  topic: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  consent: boolean;
}): Promise<SubmitResult> {
  if (!supabase) return { ok: false, message: NOT_CONNECTED };
  const { error } = await supabase.from("contact_messages").insert({
    topic: values.topic,
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    consent: values.consent,
  });
  if (error) {
    console.error(error);
    return { ok: false, message: GENERIC_ERROR };
  }
  notifyStaff({
    kind: "contact",
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    subject: values.subject.trim(),
    message: values.message.trim(),
    topic: values.topic,
  });
  return { ok: true };
}

export async function submitInvolvement(values: {
  type: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}): Promise<SubmitResult> {
  if (!supabase) return { ok: false, message: NOT_CONNECTED };
  const { error } = await supabase.from("involvement_requests").insert({
    type: values.type,
    name: values.name.trim(),
    organization: values.organization.trim() || null,
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim() || null,
    message: values.message.trim(),
    consent: values.consent,
  });
  if (error) {
    console.error(error);
    return { ok: false, message: GENERIC_ERROR };
  }
  notifyStaff({
    kind: "involvement",
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    type: values.type,
    organization: values.organization.trim() || undefined,
    phone: values.phone.trim() || undefined,
    message: values.message.trim(),
  });
  return { ok: true };
}

export async function submitRegistration(values: {
  name: string;
  email: string;
  phone: string;
  location: string;
  program: string;
  format: string;
  experience: string;
  motivation: string;
  consent: boolean;
}): Promise<SubmitResult> {
  if (!supabase) return { ok: false, message: NOT_CONNECTED };
  const { data, error } = await supabase.rpc("submit_registration", {
    p_name: values.name,
    p_email: values.email,
    p_phone: values.phone,
    p_location: values.location,
    p_program: values.program,
    p_format: values.format,
    p_experience: values.experience,
    p_motivation: values.motivation,
    p_consent: values.consent,
  });
  if (error || !data) {
    console.error(error);
    return { ok: false, message: GENERIC_ERROR };
  }
  const reference = data as string;
  notifyStaff({
    kind: "registration",
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    reference,
    program: values.program,
    format: values.format,
    experience: values.experience,
    location: values.location.trim(),
    phone: values.phone.trim(),
    motivation: values.motivation.trim() || undefined,
  });
  return { ok: true, reference };
}

export async function subscribeNewsletter(email: string): Promise<SubmitResult> {
  if (!supabase) return { ok: false, message: NOT_CONNECTED };
  const address = email.trim().toLowerCase();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: address });
  const duplicate = error?.code === "23505";
  if (error && !duplicate) {
    console.error(error);
    return { ok: false, message: GENERIC_ERROR };
  }
  if (!duplicate) notifyStaff({ kind: "subscriber", email: address });
  return { ok: true };
}
