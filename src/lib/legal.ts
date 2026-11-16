export type LegalSection = {
  heading: string;
  /** Paragraphs, in order. */
  body: string[];
  /** Optional bullet list shown after the paragraphs. */
  list?: string[];
};

export type LegalDoc = {
  title: string;
  /** Optional short opening paragraph, e.g. "This policy explains how we use your details." */
  intro?: string;
  /** Optional, e.g. "1 December 2026". Shown under the title when set. */
  updated?: string;
  sections: LegalSection[];
};

/**
 * Paste the owners' text into `sections` when you receive it.
 * While `sections` is empty the page shows a "being finalized" note and
 * asks search engines not to index it.
 *
 * Example:
 * sections: [
 *   {
 *     heading: "What we collect",
 *     body: ["We collect the details you give us when you contact us or register."],
 *     list: ["Your name and email", "Your phone number (optional)"],
 *   },
 * ],
 */
export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  intro: "",
  updated: "",
  sections: [],
};

export const termsOfUse: LegalDoc = {
  title: "Terms of Use",
  intro: "",
  updated: "",
  sections: [],
};
