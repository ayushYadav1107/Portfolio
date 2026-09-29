// Single source of truth for everything on the site.
// Edit this file to update copy, links, numbers and screenshots — components read from here.

export const profile = {
  name: "Ayush Yadav",
  handle: "ayush",
  role: "Full-Stack Software Engineer",
  location: "Bhopal, India",
  email: "iamayushyadav1107@gmail.com",
  resume: "/Ayush_Yadav_Resume.pdf",
  resumeFile: "Ayush_Yadav_Resume.pdf", // filename the browser saves the download as
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ayush-yadav11.vercel.app",
  status: "Open to full-stack SDE roles · Class of 2027",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-yadav-3a79b2293/" },
    { label: "GitHub", href: "https://github.com/ayushYadav1107" },
    { label: "LeetCode", href: "https://leetcode.com/u/Ayush1107/" },
  ],
} as const;

/** The four layers of the hero's exploded stack, top to bottom. */
export const layers = [
  { key: "agents", label: "Agents", tech: "LangGraph · MCP · LangChain", color: "#A58BFF" },
  { key: "ui", label: "Interface", tech: "React · Next.js · TypeScript", color: "#C8FF3E" },
  { key: "api", label: "API", tech: "Node · FastAPI · Flask", color: "#EEEEEA" },
  { key: "data", label: "Data", tech: "PostgreSQL · MongoDB · Prisma", color: "#EEEEEA" },
] as const;

export const stats = [
  { value: 3, suffix: "", label: "products shipped with live demos" },
  { value: 34, suffix: "", label: "REST endpoints across 7 roles" },
  { value: 145, suffix: "", label: "automated tests written" },
  { value: 8.67, suffix: "", label: "CGPA · B.Tech CSE (AI & ML)", decimals: 2 },
];

export type Shot = { src: string; alt: string; w: number; h: number };

export type Project = {
  slug: "aerocode" | "voyagen" | "resumetrics";
  index: string;
  kicker: string;
  name: string;
  year: string;
  tagline: string;
  summary: string;
  spec: [string, string][];
  stack: string[];
  live: string;
  repo: string;
  hero: Shot;
  inset: Shot;
};

export const projects: Project[] = [
  {
    slug: "aerocode",
    index: "01",
    kicker: "In-browser AI IDE",
    name: "AeroCode",
    year: "2026",
    tagline: "A full dev environment in a browser tab.",
    summary:
      "Spin up React, Next.js, Vue, Angular, Express or Hono — or import a GitHub repo — then install and run it entirely in the tab. A Groq-powered assistant sits in Monaco with inline completions and file-aware chat.",
    spec: [
      ["runtime", "WebContainers — code never runs on a server"],
      ["ai", "Groq · Ctrl+Space inline completion · file-aware chat"],
      ["auth", "Google + GitHub OAuth, deny-by-default middleware"],
      ["start", "GitHub import · 6 framework starters"],
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "MongoDB", "Prisma", "Groq"],
    live: "https://aerocode-ebon.vercel.app/",
    repo: "https://github.com/ayushYadav1107/aerocode",
    hero: { src: "/work/aerocode-editor.webp", alt: "AeroCode editor with file tree, code and in-browser terminal", w: 1600, h: 948 },
    inset: { src: "/work/aerocode-chat.webp", alt: "AeroCode AI assistant chat panel", w: 1292, h: 966 },
  },
  {
    slug: "voyagen",
    index: "02",
    kicker: "Multi-agent system",
    name: "VoyaGen AI",
    year: "2026",
    tagline: "One sentence in, an approved itinerary out.",
    summary:
      "A supervisor-routed, guardrailed, human-in-the-loop travel planner. The supervisor decides at runtime which specialists a request needs, and nothing is finalised until a person approves the draft.",
    spec: [
      ["agents", "flights · hotels · weather · budget · itinerary"],
      ["mcp", "Tavily (HTTP) · AviationStack (stdio) · custom weather"],
      ["hitl", "LangGraph interrupt() + PostgreSQL checkpoints"],
      ["guard", "LLM relevance check before any specialist runs"],
    ],
    stack: ["LangGraph", "MCP", "Python", "FastAPI", "React", "PostgreSQL", "Groq"],
    live: "https://voyagen-ai-1.onrender.com/",
    repo: "https://github.com/ayushYadav1107/VoyaGen-AI-",
    hero: { src: "/work/voyagen-hero.webp", alt: "VoyaGen AI landing screen: plan your perfect trip with a team of AI agents", w: 1400, h: 972 },
    inset: { src: "/work/voyagen-supervisor.webp", alt: "VoyaGen supervisor execution plan routing five agents", w: 1400, h: 602 },
  },
  {
    slug: "resumetrics",
    index: "03",
    kicker: "AI resume & ATS review",
    name: "ResuMetrics",
    year: "2026",
    tagline: "What an ATS sees — and what a recruiter won't.",
    summary:
      "Upload a resume, paste the job description, get a scored breakdown with specific fixes. The PDF renders client-side, and each analysis is a retryable state machine, so an interrupted run is explained instead of lost.",
    spec: [
      ["criteria", "ATS · tone · content · structure · skills (weighted)"],
      ["backend", "none — no API key, uploads never touch a server"],
      ["inference", "dual AI path validated by one shared schema"],
      ["tests", "29 automated (Vitest)"],
    ],
    stack: ["React Router", "React 19", "TypeScript", "Tailwind v4", "Puter", "Vitest"],
    live: "https://resu-metrics-three.vercel.app/",
    repo: "https://github.com/ayushYadav1107/ResuMetrics",
    hero: { src: "/work/resumetrics-report.webp", alt: "ResuMetrics review: resume PDF beside its scored breakdown", w: 1600, h: 821 },
    inset: { src: "/work/resumetrics-dashboard.webp", alt: "ResuMetrics dashboard of tracked resumes and scores", w: 1442, h: 962 },
  },
];

export const experience = {
  role: "Software Engineer Intern",
  company: "MP Online Limited",
  place: "Bhopal, India",
  period: "Jul 2026 — Sep 2026",
  project: "TaskForge",
  tagline: "Role-based task & workforce management, built end to end.",
  repo: "https://github.com/ayushYadav1107/TaskForge",
  stack: ["React 18", "TypeScript", "Flask", "SQLAlchemy", "PostgreSQL", "Docker"],
  shots: {
    main: { src: "/work/taskforge-overview.webp", alt: "TaskForge overview dashboard", w: 1600, h: 1000 },
    second: { src: "/work/taskforge-roles.webp", alt: "TaskForge roles and permissions matrix", w: 1600, h: 1000 },
    mobile: { src: "/work/taskforge-mobile.webp", alt: "TaskForge My Tasks on mobile", w: 800, h: 1731 },
  },
  // Rendered as a git log — newest at the bottom.
  commits: [
    { type: "feat", scope: "api", title: "34 REST endpoints across 7 permission roles", body: "Super admin, admin, HR, manager, team lead, employee and auditor — one app, one Docker image." },
    { type: "fix", scope: "rbac", title: "Central permission registry", body: "Redesigned authorization around a single permission map enforced on every endpoint, eliminating a privilege-escalation flaw." },
    { type: "sec", scope: "auth", title: "Hardened login", body: "Scrypt hashing, a 15-minute lockout after 5 failed logins, CSRF tokens and a Content-Security-Policy." },
    { type: "perf", scope: "tasks", title: "N+1 queries → one aggregate", body: "Collapsed the task list to a single aggregate query and removed a full-table dashboard scan." },
    { type: "ci", scope: "docker", title: "116 tests + two-stage Docker build", body: "Automated testing and delivery on GitHub Actions CI." },
  ],
};

export const stack: Record<string, string[]> = {
  languages: ["TypeScript", "JavaScript", "Python", "C++", "SQL"],
  frontend: ["React", "Next.js", "React Router", "Vite", "Tailwind CSS", "Zustand", "TanStack Query", "Framer Motion"],
  backend: ["Node.js", "Express", "FastAPI", "Flask", "Prisma", "REST API design", "Auth.js", "Session & JWT"],
  agentic_ai: ["LangGraph", "LangChain", "Model Context Protocol", "Multi-agent systems", "Structured outputs"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
  devops: ["Docker", "Git", "GitHub Actions", "Vercel", "Render", "Pytest", "Vitest"],
  core_cs: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems"],
};

export const marquee = ["TypeScript", "React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "LangGraph", "MCP", "Docker", "AWS"];

export const awards: { title: string; detail: string; tag: string; href?: string }[] = [
  { title: "National Finalist, HackWithInfy", detail: "+ Semi-Finalist, Flipkart GRiD 7.0", tag: "hackathon" },
  { title: "Amazon ML Summer School 2026", detail: "Invite-only advanced machine learning program", tag: "selected" },
  { title: "Dynamic Programming Camp, AlgoUniversity", detail: "Chosen from 60,000+ applicants", tag: "selected" },
  { title: "Contributor, GirlScript Summer of Code 2026", detail: "Reviewed changes shipped to live repos over 3 months", tag: "open source" },
  {
    title: "AWS Certified Solutions Architect — Associate",
    detail: "Compute, storage, networking & security architecture",
    tag: "certified",
    href: "https://www.credly.com/badges/07698635-359d-41ce-8360-9b7943ad56f0/public_url",
  },
  {
    title: "GitHub Foundations",
    detail: "Microsoft",
    tag: "certified",
    href: "https://learn.microsoft.com/api/credentials/share/en-us/AyushYadav-1494/8714567956F32B3E?sharingId=9F02653369D714C",
  },
  {
    title: "Oracle AI Foundations Associate",
    detail: "Oracle",
    tag: "certified",
    href: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=79FAABAB4C4A57DB322904CFA0A0094ACE5BC9DE2FC6B24EC54BA9BB1F1AA59E",
  },
];

export const education = [
  { school: "VIT Bhopal University", degree: "B.Tech, Computer Science & Engineering (AI & ML)", period: "2023 — 2027", score: "CGPA 8.67 / 10" },
  { school: "Kendriya Vidyalaya, Hyderabad", degree: "Class XII & Class X", period: "2021 — 2023", score: "XII 85% · X 97.3%" },
];
