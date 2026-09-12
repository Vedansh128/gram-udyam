import { calculateFinancials, type FinancialPlan } from "./finance";
import { getProfile, type CategoryProfile } from "./businessData";
import type { Assessment } from "./types";

export type Report = {
  assessment: Assessment;
  financials: FinancialPlan;
  profile: CategoryProfile;
  score: number;
  scoreBreakdown: { name: string; value: number }[];
  market: {
    consumerBase: number;
    radius: string;
    customers: string[];
    channels: string[];
    nearbyOpportunities: string[];
  };
  cashflow: { month: string; revenue: number; expenses: number; emi: number; surplus: number }[];
  recommendations: string[];
};

const EXPERIENCE_BONUS: Record<Assessment["experience"], number> = {
  Beginner: -4,
  "Some Experience": 2,
  Experienced: 8,
};

const MARKET_MULTIPLIER: Record<Assessment["targetMarket"], number> = {
  Village: 1,
  Block: 3.2,
  District: 9,
  "Nearby Town": 5,
};

function hash(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) % 100000;
  return h;
}

export function buildReport(assessment: Assessment): Report {
  const financials = calculateFinancials(assessment.margin);
  const profile = getProfile(assessment.category);
  const seed = hash(
    `${assessment.village}${assessment.block}${assessment.district}${assessment.category}`,
  );

  const feasibility = Math.max(
    30,
    Math.min(95, 45 + Math.round(Math.log10(Math.max(financials.projectCost, 10000)) * 8)),
  );
  const jitter = (offset: number) => ((seed + offset) % 9) - 4;

  const breakdown = [
    { name: "Local Demand", value: clamp(profile.scoreBase.demand + jitter(1)) },
    { name: "Competition", value: clamp(profile.scoreBase.competition + jitter(2)) },
    { name: "Investment Feasibility", value: clamp(feasibility) },
    {
      name: "Profit Potential",
      value: clamp(profile.scoreBase.profit + EXPERIENCE_BONUS[assessment.experience] + jitter(3)),
    },
    { name: "Risk", value: clamp(profile.scoreBase.risk + jitter(4)) },
  ];

  const score = Math.round(breakdown.reduce((s, b) => s + b.value, 0) / breakdown.length);

  const consumerBase = Math.round(
    (1200 + (seed % 900)) * MARKET_MULTIPLIER[assessment.targetMarket],
  );

  const monthlyRevenue = Math.round(
    (financials.projectCost / 100000) * profile.monthlyRevenuePerLakh,
  );
  const months = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];
  const cashflow = months.map((m, i) => {
    const ramp = Math.min(1, 0.55 + i * 0.05);
    const revenue = Math.round(monthlyRevenue * ramp);
    const expenses = Math.round(revenue * profile.opexRatio);
    const emi = i + 1 > financials.moratoriumMonths ? financials.emi : 0;
    return { month: m, revenue, expenses, emi, surplus: revenue - expenses - emi };
  });

  const recommendations = [
    `Start with a ${assessment.category.toLowerCase()} unit sized to your ${financials.projectCost >= 140000 ? "term loan" : "micro finance"} scheme limit, and scale only after 2 stable quarters.`,
    `Use the ${financials.moratoriumMonths}-month moratorium to build customer base in ${assessment.village || assessment.block || assessment.district} before repayment begins.`,
    `Keep at least ${Math.round(financials.emi * 3).toLocaleString("en-IN")} rupees as working capital reserve (about 3 EMIs).`,
    `Record daily sales and expenses from day one — it is required for scheme verification and future credit.`,
  ];

  return {
    assessment,
    financials,
    profile,
    score,
    scoreBreakdown: breakdown,
    market: {
      consumerBase,
      radius: "5–10 km",
      customers: profile.customers,
      channels: profile.channels,
      nearbyOpportunities: profile.opportunities.slice(0, 3).map((o) => o.name),
    },
    cashflow,
    recommendations,
  };
}

function clamp(n: number) {
  return Math.max(20, Math.min(96, Math.round(n)));
}

export const DEMO_ASSESSMENT: Assessment = {
  state: "Madhya Pradesh",
  district: "Sehore",
  block: "Ichhawar",
  village: "Amlaha",
  margin: 100000,
  category: "Dairy",
  experience: "Some Experience",
  targetMarket: "Block",
  skills: "Cattle handling, local market contacts",
  demo: true,
};
