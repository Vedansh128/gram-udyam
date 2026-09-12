import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { calculateFinancials } from "@/lib/gramudyam/finance";

const Body = z.object({
  margin: z.number().nonnegative(),
  projectCost: z.number().positive().optional(),
});

export const Route = createFileRoute("/api/public/financial")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }
        const parsed = Body.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "margin (number) is required" }, { status: 400 });
        }
        const plan = calculateFinancials(parsed.data.margin, parsed.data.projectCost);
        return Response.json({
          projectCost: plan.projectCost,
          potentialLoan: plan.potentialLoan,
          scheme: plan.scheme.name,
          interestRate: plan.interestRate,
          tenureYears: plan.tenureYears,
          moratoriumMonths: plan.moratoriumMonths,
          emi: plan.emi,
          quarterlyPayment: plan.quarterlyPayment,
          totalInterest: plan.totalInterest,
          totalRepayment: plan.totalRepayment,
          disclaimer:
            "Indicative estimates. Final eligibility and terms are subject to approval by the concerned authority.",
        });
      },
    },
  },
});
