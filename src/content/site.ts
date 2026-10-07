const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteConfig = {
  name: "Vallumnar",
  url: configuredUrl || "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_PHONE || "",
  address: process.env.NEXT_PUBLIC_ADDRESS || "",
  socialLinks: [] as { label: string; href: string }[],
};
