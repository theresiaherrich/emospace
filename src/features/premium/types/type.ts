interface PremiumDetails {
    id: number;
    premiumType?: "Monthly" | "Quarterly" | "Annual";
    value?: string;
    price?: string;
    period?: string;
    description?: string;
}

export const premiumDetails: PremiumDetails[] = [
    {
        id: 1,
        premiumType: "Monthly",
        value: "🌟 Medium",
        price: "29.000",
        period: "month",
        description: "30 days of Premium access"
    },
    {
        id: 2,
        premiumType: "Quarterly",
        value: "💡 Most Popular",
        price: "79.000",
        period: "3 months",
        description: "3 months of Premium without hassle"
    },
    {
        id: 3,
        premiumType: "Annual",
        value: "🔥 Best Value",
        price: "199.000",
        period: "year",
        description: "Get 1 full year of Premium, save more"
    }
]