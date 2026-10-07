export type Product = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  features: string[];
  audience: string;
};

export const products: Product[] = [
  {
    slug: "product-name-placeholder",
    name: "[PRODUCT NAME]",
    summary: "[PRODUCT DESCRIPTION]",
    problem: "[Describe the problem this product solves.]",
    features: ["[FEATURE 1]", "[FEATURE 2]", "[FEATURE 3]"],
    audience: "[Describe who this product is for.]",
  },
];
