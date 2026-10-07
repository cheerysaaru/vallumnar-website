import type { Metadata } from "next";
import { HomeSections } from "@/app/home-sections";

export const metadata: Metadata = {
  title: "Technology that moves business forward",
  description:
    "Vallumnar provides custom software development, web and mobile apps, cloud, DevOps, IT consulting, UI/UX design, data, AI, QA and support.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeSections />;
}
