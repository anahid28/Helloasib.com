// ─────────────────────────────────────────────────────────────
// All editable site content lives here.
// Anything marked PLACEHOLDER should be replaced with real data.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: "Asib Uz Zaman",
  shortName: "ASIB",
  url: "https://helloasib.com",
  roles: ["Senior UI/UX Designer", "Creative Visual Designer", "AI Design Engineer"],
  currentRole: "Deputy Design Manager at Musemind",
  location: "Bangladesh",
  timeZone: "Asia/Dhaka",
  // PLACEHOLDER — set up this mailbox or replace with your real address.
  email: "hello@helloasib.com",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/asibnahid/" },
    { label: "Dribbble", href: "https://dribbble.com/asibuzzaman" },
  ],
  portrait: "/images/asib-portrait.webp",
  description:
    "Asib Uz Zaman — Senior UI/UX Designer, Creative Visual Designer and AI Design Engineer. 8+ years, 100+ client projects, 20+ industries.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Selected Work", href: "/work/" },
  { label: "About", href: "/about/" },
  { label: "Playground", href: "/playground/" },
  { label: "Contact", href: "/contact/" },
];

export type ArtVariant = "orbit" | "grid" | "glyph" | "bars" | "frame" | "rings";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  type: string;
  year: string;
  art: ArtVariant;
  summary: string;
  role: string[];
  scope: string[];
  direction: string;
  decisions: { title: string; body: string }[];
  placeholder: boolean;
  shot: { kind: "web" | "app" | "dash"; tone: number };
};

// PLACEHOLDER PROJECTS — swap in real case studies. Titles describe the
// kind of work only; no client names, results or metrics are invented.
export const projects: Project[] = [
  {
    slug: "healthcare-platform",
    title: "Healthcare Platform",
    industry: "Healthcare",
    type: "Website redesign",
    year: "2026",
    art: "orbit",
    summary: "Replace with a two-line summary of the challenge and what you made.",
    role: ["Design direction", "UX strategy", "Visual design"],
    scope: ["Information architecture", "Mobile-first UI", "Design system", "Developer handoff"],
    direction: "Describe the creative direction in one or two sentences.",
    decisions: [
      { title: "Decision one", body: "What you chose, and why it mattered." },
      { title: "Decision two", body: "What you chose, and why it mattered." },
      { title: "Decision three", body: "What you chose, and why it mattered." },
    ],
    shot: { kind: "web", tone: 0 },
    placeholder: true,
  },
  {
    slug: "real-estate-experience",
    title: "Real Estate Experience",
    industry: "Real estate",
    type: "Platform design",
    year: "2026",
    art: "grid",
    summary: "Replace with a two-line summary of the challenge and what you made.",
    role: ["Lead designer", "Art direction"],
    scope: ["Search & discovery", "Listing pages", "Brand expression"],
    direction: "Describe the creative direction in one or two sentences.",
    decisions: [
      { title: "Decision one", body: "What you chose, and why it mattered." },
      { title: "Decision two", body: "What you chose, and why it mattered." },
    ],
    shot: { kind: "web", tone: 1 },
    placeholder: true,
  },
  {
    slug: "event-discovery",
    title: "Event Discovery",
    industry: "Events & culture",
    type: "Web & mobile app",
    year: "2025",
    art: "glyph",
    summary: "Replace with a two-line summary of the challenge and what you made.",
    role: ["Product design", "Visual identity"],
    scope: ["Ticketing flow", "Event pages", "Motion language"],
    direction: "Describe the creative direction in one or two sentences.",
    decisions: [
      { title: "Decision one", body: "What you chose, and why it mattered." },
      { title: "Decision two", body: "What you chose, and why it mattered." },
    ],
    shot: { kind: "app", tone: 2 },
    placeholder: true,
  },
  {
    slug: "finance-workspace",
    title: "Finance Workspace",
    industry: "Fintech",
    type: "SaaS product",
    year: "2025",
    art: "bars",
    summary: "Replace with a two-line summary of the challenge and what you made.",
    role: ["UX lead", "Design system"],
    scope: ["Dashboards", "Data visualisation", "Component library"],
    direction: "Describe the creative direction in one or two sentences.",
    decisions: [
      { title: "Decision one", body: "What you chose, and why it mattered." },
      { title: "Decision two", body: "What you chose, and why it mattered." },
    ],
    shot: { kind: "dash", tone: 3 },
    placeholder: true,
  },
  {
    slug: "brand-website",
    title: "Brand Website",
    industry: "Manufacturing & trade",
    type: "Creative website",
    year: "2026",
    art: "frame",
    summary: "Replace with a two-line summary of the challenge and what you made.",
    role: ["Creative direction", "Interaction design"],
    scope: ["Animated iconography", "Storytelling layout", "CMS templates"],
    direction: "Describe the creative direction in one or two sentences.",
    decisions: [
      { title: "Decision one", body: "What you chose, and why it mattered." },
      { title: "Decision two", body: "What you chose, and why it mattered." },
    ],
    shot: { kind: "web", tone: 4 },
    placeholder: true,
  },
];

export const expertise = [
  {
    title: "Digital Experience Design",
    body: "Journeys that feel obvious to use and hard to forget.",
    tags: ["Journeys", "Service design", "Prototyping"],
    art: "orbit" as ArtVariant,
  },
  {
    title: "Creative Website Design",
    body: "Sites with a point of view, built to move and to convert.",
    tags: ["Editorial layout", "Motion", "Webflow & Next.js handoff"],
    art: "frame" as ArtVariant,
  },
  {
    title: "UI/UX & Product Design",
    body: "From messy requirements to products people come back to.",
    tags: ["Research", "Flows", "Design systems"],
    art: "grid" as ArtVariant,
  },
  {
    title: "Art Direction & Visual Design",
    body: "Setting the visual bar, then holding every screen to it.",
    tags: ["Brand expression", "Typography", "Imagery"],
    art: "glyph" as ArtVariant,
  },
  {
    title: "AI Design Engineering",
    body: "Using AI and code to design faster, and to design what wasn't possible before.",
    tags: ["AI workflows", "Figma tooling", "Creative code"],
    art: "rings" as ArtVariant,
  },
  {
    title: "Creative Leadership",
    body: "Guiding teams so the best idea wins, not the loudest.",
    tags: ["Mentoring", "Critique", "Delivery"],
    art: "bars" as ArtVariant,
  },
];

export const leadership = [
  { title: "Art direction", body: "Setting the bar for what good looks like, and keeping it there." },
  { title: "Mentorship", body: "Helping designers find their own voice, faster." },
  { title: "Decisions", body: "Choosing the hard right thing over the easy wrong one." },
  { title: "Complex delivery", body: "Many moving parts. One coherent experience." },
];

export const playgroundCategories = [
  "AI Experiments",
  "Creative Coding",
  "Motion Studies",
  "Interactive Concepts",
  "Visual Explorations",
] as const;

export type PlaygroundItem = {
  title: string;
  category: (typeof playgroundCategories)[number];
  art: ArtVariant;
  size: "s" | "m" | "l" | "tall";
};

// PLACEHOLDER EXPERIMENTS — replace with real explorations.
export const playground: PlaygroundItem[] = [
  { title: "Prompt-to-layout study", category: "AI Experiments", art: "rings", size: "l" },
  { title: "Variable type field", category: "Creative Coding", art: "glyph", size: "m" },
  { title: "Easing library", category: "Motion Studies", art: "orbit", size: "tall" },
  { title: "Cursor as brush", category: "Interactive Concepts", art: "grid", size: "s" },
  { title: "Colour mood engine", category: "Visual Explorations", art: "bars", size: "m" },
  { title: "Generative posters", category: "AI Experiments", art: "frame", size: "s" },
  { title: "Scroll choreography", category: "Motion Studies", art: "glyph", size: "m" },
  { title: "Figma to code bridge", category: "Creative Coding", art: "rings", size: "s" },
  { title: "Gesture prototypes", category: "Interactive Concepts", art: "bars", size: "s" },
  { title: "Type specimen machine", category: "Visual Explorations", art: "grid", size: "s" },
];
