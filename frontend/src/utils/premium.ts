import { type APIPremiumPlan, type PremiumDetails } from '../features/premium/types/type';

const mapPlansToPremiumDetails = (plans: APIPremiumPlan[]): PremiumDetails[] => {
  return plans.map((plan) => {
    let value = '';
    if (plan.name === 'Monthly') value = '🌟 Medium';
    else if (plan.name === 'Quarterly') value = '💡 Most Popular';
    else if (plan.name === 'Annual') value = '🔥 Best Value';

    return {
      id: plan.ID,
      premiumType: plan.name as PremiumDetails['premiumType'],
      value,
      price: plan.price.toLocaleString('id-ID'),
      period:
        plan.duration_days >= 365
          ? 'year'
          : plan.duration_days >= 90
          ? '3 months'
          : 'month',
      description: plan.desc,
    };
  });
};

export { mapPlansToPremiumDetails };