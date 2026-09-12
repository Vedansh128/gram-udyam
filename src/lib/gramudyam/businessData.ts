import type { Level } from "./types";

export const CATEGORIES = [
  "Dairy",
  "Agriculture",
  "Poultry",
  "Goat Farming",
  "Retail",
  "Textiles",
  "Food Processing",
  "Handicrafts",
  "Repair Services",
  "Digital Services",
  "Small Manufacturing",
  "Other",
] as const;

export type Opportunity = {
  name: string;
  demand: Level;
  competition: Level;
  investment: string;
  why: string;
};

export type CategoryProfile = {
  opportunities: Opportunity[];
  customers: string[];
  channels: string[];
  competitors: string[];
  differentiators: string[];
  competition: Level;
  similarBusinesses: number;
  pricing: { range: string; segment: string; strategy: string; margin: string };
  swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
  risks: Record<
    "Supply Risk" | "Demand Risk" | "Seasonal Risk" | "Competition Risk" | "Transport Risk",
    { level: Level; note: string; mitigation: string }
  >;
  scoreBase: { demand: number; competition: number; profit: number; risk: number };
  monthlyRevenuePerLakh: number; // demo assumption: revenue per ₹1L project cost
  opexRatio: number;
};

const generic: CategoryProfile = {
  opportunities: [
    {
      name: "Direct-to-customer supply",
      demand: "High",
      competition: "Medium",
      investment: "Low",
      why: "Local buyers prefer reliable nearby suppliers over distant markets.",
    },
    {
      name: "Institutional supply (schools, hostels)",
      demand: "Medium",
      competition: "Low",
      investment: "Medium",
      why: "Bulk orders give predictable monthly cash flow.",
    },
    {
      name: "Value-added product line",
      demand: "Medium",
      competition: "Low",
      investment: "Medium",
      why: "Processing raw output improves margins significantly.",
    },
    {
      name: "Nearby town weekly market",
      demand: "High",
      competition: "High",
      investment: "Low",
      why: "Weekly haats give volume sales with minimal fixed cost.",
    },
  ],
  customers: ["Village households", "Local shops and traders", "Nearby town buyers"],
  channels: ["Direct sales at unit", "Village retail shops", "Weekly market", "Bulk/institutional"],
  competitors: ["Small unorganised local units", "Traders from nearby town"],
  differentiators: ["Consistent quality", "Reliable delivery timing", "Fair transparent pricing"],
  competition: "Medium",
  similarBusinesses: 8,
  pricing: {
    range: "Market-linked, 5–10% below town rates",
    segment: "Village and block-level households",
    strategy: "Competitive pricing with volume-based discounts",
    margin: "15–25%",
  },
  swot: {
    strengths: ["Low local operating cost", "Direct access to customers"],
    weaknesses: ["Limited initial capital", "Dependence on few buyers"],
    opportunities: ["Growing local demand", "Government scheme support"],
    threats: ["Price fluctuation", "New entrants in the same area"],
  },
  risks: {
    "Supply Risk": {
      level: "Medium",
      note: "Raw material availability may vary through the year.",
      mitigation: "Tie up with two or more suppliers and keep buffer stock.",
    },
    "Demand Risk": {
      level: "Low",
      note: "Local demand is steady but price sensitive.",
      mitigation: "Offer small pack sizes and build repeat customers.",
    },
    "Seasonal Risk": {
      level: "Medium",
      note: "Demand may fluctuate during certain seasons.",
      mitigation: "Maintain diversified products and working capital reserves.",
    },
    "Competition Risk": {
      level: "Medium",
      note: "Several informal units operate in the same radius.",
      mitigation: "Differentiate on quality, packaging and delivery reliability.",
    },
    "Transport Risk": {
      level: "Medium",
      note: "Rural road access can delay delivery in monsoon.",
      mitigation: "Plan local-first sales and keep a backup transport option.",
    },
  },
  scoreBase: { demand: 72, competition: 62, profit: 68, risk: 65 },
  monthlyRevenuePerLakh: 12000,
  opexRatio: 0.62,
};

function make(partial: Partial<CategoryProfile>): CategoryProfile {
  return {
    ...generic,
    ...partial,
    risks: { ...generic.risks, ...(partial.risks ?? {}) },
    swot: { ...generic.swot, ...(partial.swot ?? {}) },
    pricing: { ...generic.pricing, ...(partial.pricing ?? {}) },
    scoreBase: { ...generic.scoreBase, ...(partial.scoreBase ?? {}) },
  };
}

export const BUSINESS_DATA: Record<string, CategoryProfile> = {
  Dairy: make({
    opportunities: [
      {
        name: "Fresh Milk Home Delivery",
        demand: "High",
        competition: "Medium",
        investment: "Low",
        why: "Daily repeat demand with immediate cash collection.",
      },
      {
        name: "Paneer Production",
        demand: "High",
        competition: "Low",
        investment: "Medium",
        why: "Nearby town hotels and caterers buy regularly at better margins.",
      },
      {
        name: "Curd & Buttermilk",
        demand: "High",
        competition: "Medium",
        investment: "Low",
        why: "Low-cost value addition with strong summer demand.",
      },
      {
        name: "Ghee Processing",
        demand: "Medium",
        competition: "Low",
        investment: "Medium",
        why: "Long shelf life allows sales beyond the local radius.",
      },
      {
        name: "Institutional Supply",
        demand: "Medium",
        competition: "Low",
        investment: "Medium",
        why: "Schools, hostels and dairy cooperatives give assured offtake.",
      },
    ],
    customers: ["Village households", "Tea shops and sweet shops", "Cooperative collection centre"],
    channels: ["Morning/evening home delivery", "Village dairy booth", "Cooperative society"],
    competitors: ["Existing milk vendors", "Cooperative collection network", "Town sweet shops"],
    differentiators: ["Guaranteed fat content", "On-time delivery", "Hygienic packaging"],
    competition: "Medium",
    similarBusinesses: 12,
    pricing: {
      range: "₹45–₹60 per litre (milk); ₹300–₹360 per kg (paneer)",
      segment: "Households, tea shops, sweet shops",
      strategy: "Subscription-based daily delivery with monthly billing",
      margin: "18–28%",
    },
    swot: {
      strengths: ["Daily cash flow", "Locally available fodder"],
      weaknesses: ["High initial cattle/equipment cost", "Needs daily labour"],
      opportunities: ["Value-added products", "Cooperative and institutional tie-ups"],
      threats: ["Cattle health issues", "Milk price volatility"],
    },
    risks: {
      "Supply Risk": {
        level: "Medium",
        note: "Fodder cost and cattle health affect milk yield.",
        mitigation: "Grow part of the fodder and keep veterinary support on call.",
      },
      "Demand Risk": {
        level: "Low",
        note: "Milk has steady, everyday demand in rural areas.",
        mitigation: "Build a fixed subscriber base in the village.",
      },
      "Seasonal Risk": {
        level: "Medium",
        note: "Yield drops in peak summer; demand shifts across seasons.",
        mitigation: "Add curd/buttermilk in summer and ghee in winter.",
      },
      "Competition Risk": {
        level: "Medium",
        note: "Existing vendors already serve many households.",
        mitigation: "Compete on purity testing and fixed delivery timing.",
      },
      "Transport Risk": {
        level: "Medium",
        note: "Milk is perishable and needs quick movement.",
        mitigation: "Use chilled cans and serve a 5–10 km radius first.",
      },
    },
    scoreBase: { demand: 82, competition: 58, profit: 74, risk: 68 },
    monthlyRevenuePerLakh: 14000,
    opexRatio: 0.65,
  }),
  Retail: make({
    opportunities: [
      {
        name: "Daily needs kirana store",
        demand: "High",
        competition: "High",
        investment: "Low",
        why: "Everyday footfall with fast stock rotation.",
      },
      {
        name: "Agri-input counter (seeds, tools)",
        demand: "Medium",
        competition: "Low",
        investment: "Medium",
        why: "Farmers currently travel to the block town for inputs.",
      },
      {
        name: "Mobile recharge & digital payments point",
        demand: "High",
        competition: "Medium",
        investment: "Low",
        why: "Adds footfall and commission income at near-zero cost.",
      },
      {
        name: "Home delivery within village",
        demand: "Medium",
        competition: "Low",
        investment: "Low",
        why: "Differentiates from existing shops with minimal spend.",
      },
    ],
    competition: "High",
    similarBusinesses: 18,
    pricing: {
      range: "MRP-based with 8–18% retail margin",
      segment: "All village households",
      strategy: "Everyday low price on staples, higher margin on impulse items",
      margin: "10–18%",
    },
    scoreBase: { demand: 78, competition: 45, profit: 60, risk: 70 },
    monthlyRevenuePerLakh: 22000,
    opexRatio: 0.78,
  }),
  Textiles: make({
    opportunities: [
      {
        name: "Tailoring & stitching unit",
        demand: "High",
        competition: "Medium",
        investment: "Low",
        why: "Steady demand around festivals, weddings and school seasons.",
      },
      {
        name: "School uniform contracts",
        demand: "Medium",
        competition: "Low",
        investment: "Medium",
        why: "Bulk annual orders from nearby schools.",
      },
      {
        name: "Readymade garment reselling",
        demand: "Medium",
        competition: "High",
        investment: "Medium",
        why: "Saves customers a trip to the town market.",
      },
      {
        name: "Job work for town wholesalers",
        demand: "Medium",
        competition: "Low",
        investment: "Low",
        why: "Assured piece-rate income while building own brand.",
      },
    ],
    competition: "Medium",
    similarBusinesses: 9,
    pricing: {
      range: "₹150–₹600 per stitched piece",
      segment: "Households, schools, local wholesalers",
      strategy: "Job work for stability plus own-brand pieces for margin",
      margin: "20–30%",
    },
    scoreBase: { demand: 70, competition: 62, profit: 66, risk: 66 },
    monthlyRevenuePerLakh: 11000,
    opexRatio: 0.6,
  }),
  Poultry: make({
    opportunities: [
      {
        name: "Broiler batch farming",
        demand: "High",
        competition: "Medium",
        investment: "Medium",
        why: "Short 6–7 week cycles give quick capital rotation.",
      },
      {
        name: "Table egg (layer) unit",
        demand: "High",
        competition: "Medium",
        investment: "Medium",
        why: "Daily egg income and stable town demand.",
      },
      {
        name: "Contract farming tie-up",
        demand: "Medium",
        competition: "Low",
        investment: "Low",
        why: "Integrator supplies chicks and feed, reducing price risk.",
      },
      {
        name: "Manure sale to farmers",
        demand: "Medium",
        competition: "Low",
        investment: "Low",
        why: "Turns a waste stream into extra income.",
      },
    ],
    competition: "Medium",
    similarBusinesses: 7,
    pricing: {
      range: "₹110–₹150 per kg live bird; ₹6–₹8 per egg",
      segment: "Meat shops, traders, households",
      strategy: "Contract supply for volume, local sale for margin",
      margin: "12–22%",
    },
    scoreBase: { demand: 76, competition: 60, profit: 70, risk: 58 },
    monthlyRevenuePerLakh: 18000,
    opexRatio: 0.74,
  }),
  "Food Processing": make({
    opportunities: [
      {
        name: "Spice grinding & packing",
        demand: "High",
        competition: "Medium",
        investment: "Medium",
        why: "Local produce plus branding gives strong margin uplift.",
      },
      {
        name: "Flour / dal milling",
        demand: "High",
        competition: "Medium",
        investment: "Medium",
        why: "Farmers need nearby milling instead of travelling to town.",
      },
      {
        name: "Pickles & papad unit",
        demand: "Medium",
        competition: "Low",
        investment: "Low",
        why: "Low capital, women-led SHG production model works well.",
      },
      {
        name: "Snack packaging for retail",
        demand: "Medium",
        competition: "Medium",
        investment: "Medium",
        why: "Village shops need locally supplied low-cost packs.",
      },
    ],
    competition: "Medium",
    similarBusinesses: 6,
    pricing: {
      range: "₹60–₹250 per kg depending on product",
      segment: "Village shops, town retailers, households",
      strategy: "Own-brand packs with local shop distribution",
      margin: "20–35%",
    },
    scoreBase: { demand: 74, competition: 66, profit: 76, risk: 62 },
    monthlyRevenuePerLakh: 15000,
    opexRatio: 0.66,
  }),
  Handicrafts: make({
    opportunities: [
      {
        name: "Festival & wedding decor items",
        demand: "High",
        competition: "Low",
        investment: "Low",
        why: "Seasonal spikes with strong price realisation.",
      },
      {
        name: "Online marketplace selling",
        demand: "Medium",
        competition: "High",
        investment: "Low",
        why: "Access to city buyers beyond the local radius.",
      },
      {
        name: "Bulk orders from emporiums",
        demand: "Medium",
        competition: "Low",
        investment: "Medium",
        why: "State emporiums and exhibitions buy in volume.",
      },
      {
        name: "Tourist & gifting segment",
        demand: "Medium",
        competition: "Medium",
        investment: "Low",
        why: "Corporate gifting orders repeat every year.",
      },
    ],
    competition: "Low",
    similarBusinesses: 4,
    pricing: {
      range: "₹200–₹2,500 per piece",
      segment: "Urban buyers, emporiums, gifting clients",
      strategy: "Craft storytelling and premium positioning",
      margin: "30–45%",
    },
    scoreBase: { demand: 64, competition: 76, profit: 72, risk: 60 },
    monthlyRevenuePerLakh: 9000,
    opexRatio: 0.55,
  }),
};

export function getProfile(category: string): CategoryProfile {
  return BUSINESS_DATA[category] ?? generic;
}
