import {
  BookOpenCheck,
  Church,
  GraduationCap,
  HeartPulse,
  Laptop,
  LifeBuoy,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Users,
  HandHeart,
  Wrench,
  LineChart,
  Compass,
} from "lucide-react";

export type Program = {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  points: string[];
  topics: string[];
  who: string[];
  formats: string[];
  faqs: { question: string; answer: string }[];
  icon: typeof Church;
  theme: "blue" | "green" | "teal" | "ink";
};

export const programs: Program[] = [
  {
    id: "digital-church-empowerment",
    index: "01",
    title: "Digital Church Empowerment",
    tagline: "Ministry, meet technology.",
    description:
      "We help churches embrace digital technology to improve communication, strengthen outreach and simplify administration.",
    points: [
      "Church website creation and improvement",
      "Social media and online communication",
      "Responsible AI adoption for ministry",
      "Digital outreach and online engagement",
    ],
    topics: [
      "Church website creation and improvement",
      "Social media and online communication",
      "Responsible AI adoption for ministry",
      "Digital outreach and online engagement",
      "Digital administration and record-keeping",
      "Technology training for church leaders",
    ],
    who: [
      "Pastors and church leaders",
      "Media and communications teams",
      "Church administrators and workers",
    ],
    formats: ["In-person workshops", "Online sessions", "Hybrid cohorts"],
    faqs: [
      {
        question: "Do we need technical staff to take part?",
        answer:
          "No. Sessions start from the basics and are designed for church workers of any experience level.",
      },
      {
        question: "Can you work with our denomination's guidelines?",
        answer:
          "Yes. We tailor guidance to each church's context, values and policies.",
      },
    ],
    icon: Church,
    theme: "blue",
  },
  {
    id: "youth-digital-skills-academy",
    index: "02",
    title: "Youth Digital Skills Academy",
    tagline: "Skills for the world they are inheriting.",
    description:
      "We equip young people with practical digital skills, creativity and career readiness for the modern economy.",
    points: [
      "Digital literacy and computer fundamentals",
      "Coding and programming fundamentals",
      "AI fundamentals and responsible AI",
      "Graphic design and digital creativity",
    ],
    topics: [
      "Digital literacy and computer fundamentals",
      "Coding and programming fundamentals",
      "AI fundamentals and responsible AI",
      "Graphic design and digital creativity",
      "Web development and practical projects",
      "Career readiness, portfolios and mentoring",
      "Digital entrepreneurship and freelancing",
    ],
    who: [
      "Secondary school students",
      "Young graduates and job seekers",
      "Young creatives and aspiring entrepreneurs",
    ],
    formats: ["In-person workshops", "Online sessions", "Hybrid cohorts"],
    faqs: [
      {
        question: "Do I need my own laptop?",
        answer:
          "It helps, but it is not always required. Let us know your situation when you register.",
      },
      {
        question: "Does the academy guarantee a job?",
        answer:
          "No. We focus on practical skills, mentoring and career readiness to strengthen your opportunities.",
      },
    ],
    icon: GraduationCap,
    theme: "green",
  },
  {
    id: "community-digital-inclusion",
    index: "03",
    title: "Community Digital Inclusion",
    tagline: "No one left on the wrong side of the screen.",
    description:
      "We help families, seniors and underserved residents build confidence to use technology and access online services safely.",
    points: [
      "Smartphone and computer literacy",
      "Internet literacy and digital communication",
      "Online safety, fraud awareness and privacy",
      "Accessing government and essential online services",
    ],
    topics: [
      "Smartphone and computer literacy",
      "Internet literacy and digital communication",
      "Online safety, fraud awareness and privacy",
      "Accessing government and essential services",
      "Digital financial literacy",
      "Community technology workshops",
    ],
    who: ["Families and parents", "Seniors", "First-time internet users"],
    formats: ["In-person workshops", "Online sessions", "Hybrid cohorts"],
    faqs: [
      {
        question: "I have never used a smartphone. Can I join?",
        answer:
          "Absolutely. These sessions are designed for complete beginners and go at a comfortable pace.",
      },
      {
        question: "Can you run a workshop in our community?",
        answer:
          "Yes. Contact us to discuss hosting a community technology workshop.",
      },
    ],
    icon: Users,
    theme: "teal",
  },
  {
    id: "digital-health-and-education",
    index: "04",
    title: "Digital Health & Education",
    tagline: "Better information, better outcomes.",
    description:
      "We promote digital health literacy, safe navigation of online health resources and technology-enabled learning.",
    points: [
      "Health literacy and reliable online information",
      "Navigation of digital health resources",
      "Digital learning and educational technology",
      "Digital literacy workshops for educators and learners",
    ],
    topics: [
      "Health literacy and reliable online information",
      "Navigation of digital health resources",
      "Digital learning and educational technology",
      "Digital literacy workshops for educators",
      "Privacy-aware use of digital health resources",
      "Partnerships with health and education organizations",
    ],
    who: [
      "Educators and school leaders",
      "Learners and parents",
      "Community health workers",
    ],
    formats: ["In-person workshops", "Online sessions", "Hybrid cohorts"],
    faqs: [
      {
        question: "Do you provide medical advice?",
        answer:
          "No. Selftech DigiCommunity does not provide medical diagnosis, treatment or professional medical advice. Always consult a qualified health professional.",
      },
      {
        question: "Can schools partner with you?",
        answer:
          "Yes. We welcome partnerships with schools, educators and education organizations.",
      },
    ],
    icon: HeartPulse,
    theme: "ink",
  },
];

export const steps = [
  {
    number: "01",
    title: "Identify community needs",
    body: "We listen first, hearing from churches, schools, families and local leaders, so every program starts from a real need, not an assumption.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Deliver practical training",
    body: "Hands-on, patient and jargon-free. Learners leave every session able to do something they could not do before.",
    icon: Laptop,
  },
  {
    number: "03",
    title: "Build partnerships",
    body: "We connect churches, schools, NGOs, businesses and agencies so access to opportunity spreads further than any one of us.",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Measure and improve",
    body: "We track progress, gather honest feedback and refine our programs so the impact is real, visible and lasting.",
    icon: LineChart,
  },
];

export const impact = [
  { label: "People trained", value: "—", note: "Verification in progress" },
  { label: "Youth empowered", value: "—", note: "Verification in progress" },
  { label: "Churches supported", value: "—", note: "Verification in progress" },
  { label: "Communities reached", value: "—", note: "Verification in progress" },
  { label: "Volunteers engaged", value: "—", note: "Verification in progress" },
  { label: "Partnerships", value: "—", note: "Verification in progress" },
];

export const routes = [
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Training & Events", to: "/training-events" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact", to: "/contact" },
];

// Links shown in the top navbar (desktop and mobile menu).
export const navRoutes = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Training & Events", to: "/training-events" },
  { label: "Resources", to: "/resources" },
  { label: "Get Involved", to: "/get-involved" },
  { label: "Contact Us", to: "/contact" },
];

// Structured groups for the mobile (hamburger) menu.
// `children: "programs"` makes that row an expandable accordion listing every program.
export type MobileMenuItem = {
  label: string;
  to: string;
  hint: string;
  children?: "programs";
};

export const mobileMenu: { heading: string; items: MobileMenuItem[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "Home", to: "/", hint: "Start here" },
      { label: "About", to: "/about", hint: "Our story and mission" },
    ],
  },
  {
    heading: "What we do",
    items: [
      { label: "Programs", to: "/programs", hint: "Four tracks of digital learning", children: "programs" },
      { label: "Training & Events", to: "/training-events", hint: "Workshops and upcoming dates" },
      { label: "Resources", to: "/resources", hint: "Free guides and tools" },
    ],
  },
  {
    heading: "Take part",
    items: [
      { label: "Get Involved", to: "/get-involved", hint: "Volunteer, partner or give" },
      { label: "Contact Us", to: "/contact", hint: "We would love to hear from you" },
    ],
  },
];

export const capabilities = [
  { icon: Megaphone, label: "Digital outreach" },
  { icon: ShieldCheck, label: "Online safety" },
  { icon: Sparkles, label: "Responsible AI" },
  { icon: BookOpenCheck, label: "Learning support" },
  { icon: Wrench, label: "Website support" },
  { icon: LifeBuoy, label: "Help desk" },
];

export const involvements = [
  {
    title: "Become a Volunteer",
    copy: "Share your skills as a trainer, mentor or community helper. A few hours can change a whole household's confidence online.",
    action: "Volunteer with us",
    href: "/get-involved",
    icon: HandHeart,
    tone: "light",
  },
  {
    title: "Partner With Us",
    copy: "Churches, schools, NGOs, businesses and agencies: let's design programs that reach the people you serve.",
    action: "Start a partnership",
    href: "/get-involved",
    icon: Users,
    tone: "dark",
  },
  {
    title: "Support Our Mission",
    copy: "Help expand access to devices, training and opportunity for learners who would otherwise be left behind.",
    action: "Support the work",
    href: "/get-involved",
    icon: HeartPulse,
    tone: "light",
  },
];

export const startSteps = [
  {
    number: "01",
    title: "Pick a program",
    copy: "Browse the four tracks, or tell us what your community needs and we will point you to the right one.",
  },
  {
    number: "02",
    title: "Tell us about your group",
    copy: "Individuals, churches, schools and organizations are all welcome. We will help you choose a format that fits.",
  },
  {
    number: "03",
    title: "Start learning",
    copy: "We schedule a session or cohort and bring patient, hands-on training to your space, online or in person.",
  },
];

export type EventKind = "Workshop" | "Webinar" | "Community event";
export type EventFormat = "In person" | "Online" | "Hybrid";

export type SiteEvent = {
  id: string;
  title: string;
  /** Local date as YYYY-MM-DD */
  date: string;
  /** Optional, e.g. "10:00 am - 1:00 pm" */
  time?: string;
  kind: EventKind;
  format: EventFormat;
  location: string;
  summary: string;
  /** Where "Register" should go. Defaults to /register */
  registerTo?: string;
};

/**
 * Only confirmed events belong here. While this list is empty the page shows its
 * "no upcoming events" state. Past events are hidden automatically.
 *
 * Example:
 * {
 *   id: "church-websites-nov",
 *   title: "Church websites that work",
 *   date: "2026-11-21",
 *   time: "10:00 am - 1:00 pm",
 *   kind: "Workshop",
 *   format: "In person",
 *   location: "To be confirmed with host church",
 *   summary: "A hands-on session for church media teams.",
 * },
 */
export const events: SiteEvent[] = [];

export const eventKinds: EventKind[] = ["Workshop", "Webinar", "Community event"];

export const resourceTopics = [
  {
    id: "digital-outreach",
    title: "Digital outreach",
    copy: "Reaching your community online, from social media to everyday announcements.",
    icon: Megaphone,
  },
  {
    id: "online-safety",
    title: "Online safety",
    copy: "Spotting scams, protecting passwords and using the internet with confidence.",
    icon: ShieldCheck,
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    copy: "Plain-language guides to using AI tools wisely, for ministry, school and work.",
    icon: Sparkles,
  },
  {
    id: "learning-support",
    title: "Learning support",
    copy: "Study guides and practice material to use between sessions.",
    icon: BookOpenCheck,
  },
  {
    id: "website-support",
    title: "Website support",
    copy: "Simple how-tos for churches and groups running their own sites.",
    icon: Wrench,
  },
  {
    id: "help-desk",
    title: "Help desk",
    copy: "Answers to common questions, and who to call when you are stuck.",
    icon: LifeBuoy,
  },
] as const;

export type ResourceTopicId = (typeof resourceTopics)[number]["id"];

export type Resource = {
  id: string;
  title: string;
  summary: string;
  topic: ResourceTopicId;
  type: "Guide" | "Article" | "Checklist";
  /** Optional, e.g. "5 min read" */
  readTime?: string;
  /** Internal path (/...) or full https:// link */
  href: string;
};

/**
 * Add published guides here. While this list is empty the page shows its
 * "coming soon" state.
 *
 * Example:
 * {
 *   id: "spot-a-scam",
 *   title: "How to spot a scam message",
 *   summary: "Five quick checks before you tap a link.",
 *   topic: "online-safety",
 *   type: "Guide",
 *   readTime: "5 min read",
 *   href: "https://example.com/spot-a-scam",
 * },
 */
export const resources: Resource[] = [];

/**
 * Social profiles. Fill in `href` and the icon appears on the Contact page.
 * Entries with an empty href are hidden.
 */
export const socials = [
  { label: "Instagram", href: "" },
  { label: "Facebook", href: "" },
  { label: "LinkedIn", href: "" },
];
