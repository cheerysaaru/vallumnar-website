export type Product = {
  slug: string;
  name: string;
  summary: string;
  problem: string;
  features: string[];
  audience: string;
};

// Add a product only after its name, capabilities and availability are confirmed.
export const products: Product[] = [];
