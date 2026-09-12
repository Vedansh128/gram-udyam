import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  ComposedChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { formatINR } from "@/lib/gramudyam/finance";
import type { Report } from "@/lib/gramudyam/report";
import type { Level } from "@/lib/gramudyam/types";
import { Badge, Card, Disclaimer, Section } from "./ui";

const levelTone: Record<Level, "success" | "warning" | "danger"> = {
  Low: "success",
  Medium: "warning",
  High: "danger",
};

export function ScoreCard({ report }: { report: Report }) {
  const { score, scoreBreakdown } = report;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);

  return (
    <Card className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
      <div className="mx-auto flex flex-col items-center">
        <svg width="180" height="180" viewBox="0 0 180 180" role="img" aria-label={`Score ${score} out of 100`}>
          <circle cx="90" cy="90" r={radius} fill="none" stroke="var(--muted)" strokeWidth="14" />
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 90 90)"
          />
          <text
            x="90"
            y="86"
            textAnchor="middle"
            fontSize="40"
            fontWeight="800"
            fill="var(--foreground)"
          >
            {score}
          </text>
          <text x="90" y="112" textAnchor="middle" fontSize="14" fill="var(--muted-foreground)">
            / 100
          </text>
        </svg>
        <p className="mt-2 text-sm font-semibold text-primary">
          {score >= 75 ? "Strong potential" : score >= 60 ? "Workable with planning" : "Needs rework"}
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={scoreBreakdown} outerRadius="75%">
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            />
            <Radar
              dataKey="value"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.35}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function MarketSection({ report, demo }: { report: Report; demo: boolean }) {
  const { market, assessment } = report;
  const place = [assessment.village, assessment.block, assessment.district]
    .filter(Boolean)
    .join(", ");
  return (
    <Section
      title="Your Local Market"
      subtitle={`Based on ${place || "the selected location"} and ${assessment.category}, the estimated immediate market includes households, nearby shops and institutional buyers.`}
      badge={<Badge tone="primary">{demo ? "Demo Estimates" : "AI-generated / indicative"}</Badge>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <Users className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-bold">{market.consumerBase.toLocaleString("en-IN")}</p>
          <p className="text-sm text-muted-foreground">Estimated consumer base</p>
        </Card>
        <Card>
          <TrendingUp className="h-5 w-5 text-primary" />
          <p className="mt-2 text-2xl font-bold">{market.radius}</p>
          <p className="text-sm text-muted-foreground">Estimated service radius</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Primary customer groups</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {market.customers.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-sm font-semibold">Distribution channels</p>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {market.channels.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </Card>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        These are AI-based estimates / demonstration data, not live demographic records.
      </p>
    </Section>
  );
}

export function OpportunitySection({ report }: { report: Report }) {
  return (
    <Section
      title="Untapped Opportunities"
      subtitle="Product and service lines worth testing first in your area."
      badge={<Badge tone="primary">AI-generated / indicative analysis</Badge>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {report.profile.opportunities.map((o) => (
          <Card key={o.name} className="flex flex-col">
            <h3 className="text-base font-bold">{o.name}</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge tone={o.demand === "High" ? "success" : "muted"}>Demand: {o.demand}</Badge>
              <Badge tone={levelTone[o.competition]}>Competition: {o.competition}</Badge>
              <Badge tone="muted">Investment: {o.investment}</Badge>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{o.why}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function CompetitionSection({ report }: { report: Report }) {
  const { profile } = report;
  const data = [
    { name: "You (planned)", value: 1 },
    { name: "Similar units", value: profile.similarBusinesses },
  ];
  return (
    <Section
      title="Competition Snapshot"
      subtitle="Estimated, not detected from live business records."
      badge={<Badge tone={levelTone[profile.competition]}>{profile.competition} competition</Badge>}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <p className="text-sm font-semibold">Estimated similar businesses within 10 km</p>
          <p className="mt-1 text-3xl font-bold">{profile.similarBusinesses}</p>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={110}
                  tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {data.map((_, i) => (
                    <Cell key={i} fill={i === 0 ? "var(--chart-2)" : "var(--chart-1)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <div className="grid gap-4">
          <Card>
            <p className="text-sm font-semibold">Main competitor categories</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {profile.competitors.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-sm font-semibold">Differentiation opportunities</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {profile.differentiators.map((c) => (
                <li key={c}>• {c}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </Section>
  );
}

export function SwotSection({ report }: { report: Report }) {
  const { swot } = report.profile;
  const blocks = [
    { title: "Strengths", items: swot.strengths, tone: "bg-success/10" },
    { title: "Weaknesses", items: swot.weaknesses, tone: "bg-danger/10" },
    { title: "Opportunities", items: swot.opportunities, tone: "bg-primary/10" },
    { title: "Threats", items: swot.threats, tone: "bg-warning/20" },
  ];
  return (
    <Section title="SWOT Analysis" badge={<Badge tone="primary">AI-generated / indicative</Badge>}>
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((b) => (
          <Card key={b.title} className={b.tone}>
            <h3 className="text-base font-bold">{b.title}</h3>
            <ul className="mt-2 space-y-1 text-sm text-foreground/80">
              {b.items.map((i) => (
                <li key={i}>• {i}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function RiskSection({ report }: { report: Report }) {
  const risks = Object.entries(report.profile.risks);
  return (
    <Section
      title="Local Risk Detector"
      subtitle="Each risk includes one mitigation you can act on."
      badge={<Badge tone="primary">Indicative</Badge>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risks.map(([name, r]) => (
          <Card key={name}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-base font-bold">{name}</h3>
              <Badge tone={levelTone[r.level]}>{r.level}</Badge>
            </div>
            <p className="mt-2 flex gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
              {r.note}
            </p>
            <p className="mt-2 flex gap-2 text-sm text-foreground/80">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              {r.mitigation}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function PricingSection({ report }: { report: Report }) {
  const p = report.profile.pricing;
  const rows = [
    ["Suggested price range", p.range],
    ["Target customer segment", p.segment],
    ["Pricing strategy", p.strategy],
    ["Expected margin range", p.margin],
  ];
  return (
    <Section
      title="Pricing & Market Value"
      badge={<Badge tone="primary">Indicative estimates for planning purposes</Badge>}
    >
      <Card className="divide-y divide-border p-0">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr]">
            <span className="text-sm font-semibold">{k}</span>
            <span className="text-sm text-muted-foreground">{v}</span>
          </div>
        ))}
      </Card>
    </Section>
  );
}

export function FinancialRoadmap({ report }: { report: Report }) {
  const f = report.financials;
  const rows: [string, string][] = [
    ["Own Contribution", formatINR(f.margin)],
    ["Estimated Project Cost", formatINR(f.projectCost)],
    ["Potential Loan", formatINR(f.potentialLoan)],
    ["Recommended Scheme", f.scheme.name],
    ["Interest", `${f.interestRate}% p.a.`],
    ["Tenure", `${f.tenureYears} years`],
    ["Moratorium", `${f.moratoriumMonths} months`],
    ["Estimated EMI", formatINR(f.emi)],
    ["Estimated Quarterly Payment", formatINR(f.quarterlyPayment)],
    ["Total Interest", formatINR(f.totalInterest)],
    ["Total Repayment", formatINR(f.totalRepayment)],
  ];
  return (
    <Section
      title="Your Financial Roadmap"
      subtitle="Estimated repayment — subject to final sanction terms."
    >
      <Card className="bg-primary/5">
        <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map(([k, v]) => (
            <div key={k} className="rounded-xl bg-card p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {k}
              </p>
              <p className="mt-1 text-lg font-bold">{v}</p>
            </div>
          ))}
        </div>
        {f.cappedByScheme ? (
          <p className="mt-4 text-sm font-medium text-accent-foreground">
            Loan capped at the scheme maximum of {formatINR(f.scheme.maxLoan)}.
          </p>
        ) : null}
        <p className="mt-4 text-sm text-muted-foreground">
          Repayment is shown as starting after a {f.moratoriumMonths}-month moratorium. Interest
          treatment during the moratorium is not assumed here and depends on the sanction terms.
        </p>
        <div className="mt-4">
          <Disclaimer text="Financial figures shown are indicative estimates based on the provided scheme parameters. Final eligibility, sanction amount, interest, repayment schedule and terms are subject to verification and approval by the concerned authority." />
        </div>
      </Card>
    </Section>
  );
}

export function CashFlowSection({ report }: { report: Report }) {
  return (
    <Section
      title="Business Cash Flow"
      subtitle="Demonstration assumptions for the first 12 months — not guaranteed income."
      badge={<Badge tone="primary">Demonstration data</Badge>}
    >
      <Card className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={report.cashflow} margin={{ left: -10, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} />
            <YAxis
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
            />
            <Tooltip formatter={(v: number) => formatINR(v)} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="revenue" name="Revenue" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expenses" name="Operating expenses" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="emi" name="Loan repayment" fill="var(--chart-4)" radius={[6, 6, 0, 0]} />
            <Line dataKey="surplus" name="Surplus" stroke="var(--chart-5)" strokeWidth={2.5} dot={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>
    </Section>
  );
}
