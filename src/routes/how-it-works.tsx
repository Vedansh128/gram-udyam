import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { Card, Disclaimer, LinkButton } from "@/components/gu/ui";
import { SCHEMES, DISCLAIMER } from "@/lib/gramudyam/schemes";
import { formatINR } from "@/lib/gramudyam/finance";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Gram Udyam" },
      {
        name: "description",
        content:
          "See how Gram Udyam calculates project cost, routes you to a scheme and estimates your EMI.",
      },
      { property: "og:title", content: "How Gram Udyam Works" },
      {
        property: "og:description",
        content: "From location and capital to scheme recommendation and repayment plan.",
      },
    ],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  const stages = [
    ["Tell us about your plan", "Location, available margin capital and business category."],
    [
      "Local business analysis",
      "Estimated demand, competition, opportunities, SWOT and risks for that category and place.",
    ],
    [
      "Financial structuring",
      "Project cost = margin ÷ 10%. Potential loan = 90% of project cost, capped by the scheme limit.",
    ],
    ["Scheme routing", "The scheme is chosen from project cost and maximum loan limits."],
    [
      "Repayment planning",
      "EMI, quarterly payment, total interest and total repayment over the scheme tenure.",
    ],
    ["Business report", "One printable report with everything, ready to download."],
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">How It Works</h1>
        <div className="mt-6 space-y-4">
          {stages.map(([title, body], i) => (
            <Card key={title} className="flex gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <h2 className="text-base font-bold">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            </Card>
          ))}
        </div>

        <h2 className="mt-10 text-xl font-bold">Scheme parameters used</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {SCHEMES.map((s) => (
            <Card key={s.id}>
              <h3 className="text-base font-bold">{s.name}</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Project cost up to {formatINR(s.maxProjectCost)}</li>
                <li>Maximum loan {formatINR(s.maxLoan)}</li>
                <li>Interest {s.interestRate}% per annum</li>
                <li>Tenure {s.tenureYears} years</li>
                <li>Moratorium {s.moratoriumMonths} months</li>
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Disclaimer text={DISCLAIMER} />
        </div>

        <div className="mt-8">
          <LinkButton to="/assessment" size="lg">
            Start Business Assessment
          </LinkButton>
        </div>
      </main>
      <Footer />
    </div>
  );
}
