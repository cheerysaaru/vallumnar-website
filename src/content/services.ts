import {
  Bot,
  Cloud,
  Code2,
  Database,
  LifeBuoy,
  Palette,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: LucideIcon;
  process: string[];
  deliverables: string[];
  technologies: string[];
};

export const services: Service[] = [
  {
    slug: "software-development",
    title: "Software development",
    summary: "Purpose-built software that brings your ideas and operations together.",
    description:
      "From a focused internal tool to a complex business platform, we shape dependable software around the people and processes it serves.",
    icon: Code2,
    process: ["Understand the need", "Shape the solution", "Build in increments", "Learn and improve"],
    deliverables: ["Product requirements", "Working applications and APIs", "Technical documentation"],
    technologies: ["TypeScript", "Node.js", "Python", "PostgreSQL"],
  },
  {
    slug: "web-mobile-apps",
    title: "Web & mobile apps",
    summary: "Useful, accessible digital experiences across screens and devices.",
    description:
      "We design and develop web and mobile experiences that make everyday interactions clearer, faster and easier to use.",
    icon: Workflow,
    process: ["Map user journeys", "Prototype key flows", "Develop and test", "Release and refine"],
    deliverables: ["Responsive websites", "Web applications", "Mobile app experiences"],
    technologies: ["React", "Next.js", "React Native", "TypeScript"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    summary: "Practical cloud foundations and delivery workflows for growing systems.",
    description:
      "We help teams establish maintainable cloud infrastructure, automate delivery and make their systems easier to observe and operate.",
    icon: Cloud,
    process: ["Review the current setup", "Plan the foundation", "Automate delivery", "Measure and tune"],
    deliverables: ["Cloud architecture", "CI/CD pipelines", "Infrastructure as code"],
    technologies: ["AWS", "Azure", "Docker", "Terraform"],
  },
  {
    slug: "data-ai",
    title: "Data & AI",
    summary: "Turn trusted data into clearer decisions and thoughtfully applied automation.",
    description:
      "We help make data more useful, from reliable pipelines and analytics to carefully scoped AI features that solve real needs.",
    icon: Bot,
    process: ["Clarify the question", "Assess available data", "Build a focused solution", "Validate the outcome"],
    deliverables: ["Data pipelines", "Analytics dashboards", "AI-enabled workflows"],
    technologies: ["Python", "SQL", "Cloud data platforms", "Machine learning"],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX design",
    summary: "Clear interfaces and considered journeys grounded in real user needs.",
    description:
      "We bring research, interaction design and visual systems together to make digital products easier to understand and use.",
    icon: Palette,
    process: ["Explore the context", "Map the experience", "Prototype and test", "Prepare for build"],
    deliverables: ["Journey maps", "Wireframes and prototypes", "Design systems"],
    technologies: ["Figma", "Design tokens", "Accessible HTML", "Usability testing"],
  },
  {
    slug: "quality-assurance",
    title: "QA & testing",
    summary: "Confidence in every release through thoughtful quality engineering.",
    description:
      "We work alongside product teams to catch issues earlier, strengthen test coverage and improve release confidence.",
    icon: ShieldCheck,
    process: ["Understand risk", "Plan test coverage", "Automate and explore", "Report and improve"],
    deliverables: ["Test strategy", "Automated test suites", "Release quality reports"],
    technologies: ["Playwright", "Jest", "API testing", "CI workflows"],
  },
  {
    slug: "it-consulting",
    title: "IT consulting",
    summary: "Independent technical guidance to help teams make confident decisions.",
    description:
      "We help teams assess architecture, choose practical technology approaches and turn a broad challenge into a clear next step.",
    icon: Database,
    process: ["Listen and assess", "Identify options", "Recommend a path", "Support execution"],
    deliverables: ["Technical assessments", "Architecture guidance", "Delivery roadmaps"],
    technologies: ["Solution architecture", "Cloud platforms", "Modern web stacks", "Team practices"],
  },
  {
    slug: "support-maintenance",
    title: "Support & maintenance",
    summary: "Steady, thoughtful care for the software your team depends on.",
    description:
      "We help keep existing products healthy with proactive maintenance, clear fixes and a focus on long-term reliability.",
    icon: LifeBuoy,
    process: ["Review the system", "Prioritize improvements", "Resolve and maintain", "Share what changed"],
    deliverables: ["Maintenance plans", "Bug fixes and updates", "Operational documentation"],
    technologies: ["Monitoring", "Security updates", "Cloud services", "Automated testing"],
  },
];
