export interface PremiumDetails {
    id: number;
    premiumType?: "Monthly" | "Quarterly" | "Annual";
    value?: string;
    price?: string;
    period?: string;
    description?: string;
}

export interface APIPremiumPlan {
  ID: number;
  name: string;
  code: string;
  price: number;
  duration_days: number;
  featured: boolean;
  desc: string;
}
