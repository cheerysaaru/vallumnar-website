import type { Metadata } from "next";
import { HomeSections } from "@/app/home-sections";

export const metadata: Metadata = {
  title: "Technology that moves business forward",
  description:
    "Vallumnar brings people, design and engineering together to create digital products and technology that move your business forward.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeSections />;
}
