// Scheme parameters — configurable constants (prototype values).
export type Scheme = {
  id: "micro" | "term";
  name: string;
  maxProjectCost: number;
  maxLoan: number;
  interestRate: number; // % per annum
  tenureYears: number;
  moratoriumMonths: number;
};

export const SCHEMES: Scheme[] = [
  {
    id: "micro",
    name: "Micro Finance Scheme",
    maxProjectCost: 140000,
    maxLoan: 125000,
    interestRate: 6.5,
    tenureYears: 3,
    moratoriumMonths: 3,
  },
  {
    id: "term",
    name: "Term Loan Scheme",
    maxProjectCost: 5000000,
    maxLoan: 4500000,
    interestRate: 8,
    tenureYears: 7,
    moratoriumMonths: 6,
  },
];

export const BENEFICIARY_CONTRIBUTION = 0.1;

export const DISCLAIMER =
  "Financial figures shown are indicative estimates based on the provided scheme parameters. Final eligibility, sanction amount, interest, repayment schedule and terms are subject to verification and approval by the concerned authority.";
