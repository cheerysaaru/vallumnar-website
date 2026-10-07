export type HomeAudience = {
  number: string;
  label: string;
  statement: string;
  href: string;
  linkLabel: string;
};

export const homeAudiences: HomeAudience[] = [
  {
    number: "01",
    label: "For talent",
    statement: "Build your career with us.",
    href: "/careers",
    linkLabel: "Explore careers",
  },
  {
    number: "02",
    label: "For clients",
    statement: "Ideas deserve engineering that ships.",
    href: "/services",
    linkLabel: "Explore services",
  },
  {
    number: "03",
    label: "For partners",
    statement: "Great products take great partners.",
    href: "/products",
    linkLabel: "Discover products",
  },
  {
    number: "04",
    label: "For the curious",
    statement: "How do we actually work?",
    href: "/about",
    linkLabel: "Get to know us",
  },
];

export type HomeFaq = {
  question: string;
  answer: string;
};

export const homeFaqs: HomeFaq[] = [
  {
    question: "What kind of technology work does Vallumnar take on?",
    answer:
      "The service areas in this draft include software development, web and mobile apps, cloud and DevOps, data and AI, design, quality engineering, consulting, and ongoing support. We will confirm the final service scope before launch.",
  },
  {
    question: "Can you help shape an idea as well as build it?",
    answer:
      "Yes. Vallumnar's draft service offering brings product thinking, design and engineering together, from early exploration through implementation and refinement.",
  },
  {
    question: "Can Vallumnar work with an existing product?",
    answer:
      "The draft service catalog includes support and maintenance for existing software, alongside development of new products and systems.",
  },
  {
    question: "How does a project get started?",
    answer:
      "Start with a conversation about the people, problem and outcome. The team can then explore the context and discuss a practical next step.",
  },
  {
    question: "Are there open roles at Vallumnar?",
    answer:
      "Open roles will appear here when they are confirmed. If none are listed, you can still share your CV and the kind of work you are interested in through the careers page.",
  },
];
