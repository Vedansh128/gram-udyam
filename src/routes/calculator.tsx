import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown } from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { Badge, Card, Disclaimer, Field, Input, LinkButton } from "@/components/gu/ui";
import { calculateFinancials, formatINR } from "@/lib/gramudyam/finance";
import { DISCLAIMER } from "@/lib/gramudyam/schemes";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Loan & EMI Calculator — Gram Udyam" },
      {
        name: "description",
        content:
          "Enter your margin capital to see project cost, potential loan, the matching scheme and your estimated EMI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Loan & EMI Calculator — Gram Udyam" },
      {
        property: "og:description",
        content: "Project cost, scheme routing and EMI estimates in one place.",
      },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const [margin, setMargin] = useState("100000");
  const value = Number(margin) || 0;
  const plan = useMemo(() => calculateFinancials(value), [value]);

  const flow = [
    { label: "Your own margin", value: formatINR(plan.margin) },
    { label: "10% own contribution", value: "" },
    { label: "Estimated project cost", value: formatINR(plan.projectCost) },
    { label: "90% financing", value: "" },
    { label: "Potential loan", value: formatINR(plan.potentialLoan) },
  ];

  const rows: [string, string][] = [
    ["Loan Amount", formatINR(plan.potentialLoan)],
    ["Interest Rate", `${plan.interestRate}% p.a.`],
    ["Tenure", `${plan.tenureYears} years (${plan.tenureYears * 12} months)`],
    ["Moratorium", `${plan.moratoriumMonths} months before repayment starts`],
    ["Estimated Monthly EMI", formatINR(plan.emi)],
    ["Estimated Quarterly Payment", formatINR(plan.quarterlyPayment)],
    ["Total Interest", formatINR(plan.totalInterest)],
    ["Total Repayment", formatINR(plan.totalRepayment)],
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <p className="text-sm font-bold uppercase text-primary">Deterministic financial planning</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
          Loan Eligibility & EMI Calculator
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Estimated repayment — subject to final sanction terms.
        </p>

        <Card className="mt-8 p-6 sm:p-8">
          <Field label="Available Margin Capital (₹)">
            <Input
              type="number"
              inputMode="numeric"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
              placeholder="100000"
            />
          </Field>
        </Card>

        <Card className="mt-6 bg-primary/5 p-6">
          <div className="flex flex-col items-center gap-1">
            {flow.map((f, i) =>
              f.value ? (
                <div key={i} className="w-full rounded-xl bg-card p-4 text-center shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold">{f.value}</p>
                </div>
              ) : (
                <div key={i} className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <ArrowDown className="h-4 w-4" />
                  {f.label}
                </div>
              ),
            )}
          </div>
          {plan.cappedByScheme ? (
            <p className="mt-4 text-center text-sm font-medium text-accent-foreground">
              Loan capped at the {plan.scheme.name} maximum of {formatINR(plan.scheme.maxLoan)}.
            </p>
          ) : null}
        </Card>

        <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card p-5">
          <div>
            <p className="text-sm text-muted-foreground">Recommended Scheme</p>
            <p className="text-xl font-bold">{plan.scheme.name}</p>
          </div>
          <Badge tone="success">Auto-selected</Badge>
        </div>

        <Card className="mt-6 divide-y divide-border p-0">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 p-4">
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-base font-bold">{v}</span>
            </div>
          ))}
        </Card>

        <p className="mt-4 text-xs text-muted-foreground">
          Repayment is shown as starting after the moratorium period. Interest treatment during the
          moratorium is not assumed here.
        </p>
        <div className="mt-4">
          <Disclaimer text={DISCLAIMER} />
        </div>

        <div className="mt-8">
          <LinkButton to="/assessment" size="lg">
            Get the full business report
          </LinkButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
