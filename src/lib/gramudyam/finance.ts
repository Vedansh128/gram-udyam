import { BENEFICIARY_CONTRIBUTION, SCHEMES, type Scheme } from "./schemes";

export type FinancialPlan = {
  margin: number;
  projectCost: number;
  potentialLoan: number;
  cappedByScheme: boolean;
  scheme: Scheme;
  interestRate: number;
  tenureYears: number;
  moratoriumMonths: number;
  emi: number;
  quarterlyPayment: number;
  totalInterest: number;
  totalRepayment: number;
};

export function calculateEmi(principal: number, annualRate: number, months: number): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRate / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function pickScheme(projectCost: number): Scheme {
  const micro = SCHEMES[0]!;
  const term = SCHEMES[1]!;
  return projectCost <= micro.maxProjectCost ? micro : term;
}

export function calculateFinancials(margin: number, projectCostOverride?: number): FinancialPlan {
  const safeMargin = Math.max(0, Math.round(margin || 0));
  const projectCost = Math.round(
    projectCostOverride && projectCostOverride > 0
      ? projectCostOverride
      : safeMargin / BENEFICIARY_CONTRIBUTION,
  );
  const scheme = pickScheme(projectCost);

  const rawLoan = Math.round(projectCost * (1 - BENEFICIARY_CONTRIBUTION));
  const potentialLoan = Math.min(rawLoan, scheme.maxLoan);
  const months = scheme.tenureYears * 12;
  const emi = calculateEmi(potentialLoan, scheme.interestRate, months);
  const totalRepayment = emi * months;

  return {
    margin: safeMargin,
    projectCost,
    potentialLoan,
    cappedByScheme: potentialLoan < rawLoan,
    scheme,
    interestRate: scheme.interestRate,
    tenureYears: scheme.tenureYears,
    moratoriumMonths: scheme.moratoriumMonths,
    emi: Math.round(emi),
    quarterlyPayment: Math.round(emi * 3),
    totalInterest: Math.round(totalRepayment - potentialLoan),
    totalRepayment: Math.round(totalRepayment),
  };
}

export function formatINR(value: number): string {
  return "₹" + Math.round(value).toLocaleString("en-IN");
}
