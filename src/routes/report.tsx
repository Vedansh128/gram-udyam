import { createFileRoute } from "@tanstack/react-router";
import { Download, MapPin } from "lucide-react";
import { useMemo } from "react";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { ChatAdvisor } from "@/components/gu/ChatAdvisor";
import {
  CashFlowSection,
  CompetitionSection,
  FinancialRoadmap,
  MarketSection,
  OpportunitySection,
  PricingSection,
  RiskSection,
  ScoreCard,
  SwotSection,
} from "@/components/gu/report-sections";
import { Badge, Button, Card, LinkButton, Section } from "@/components/gu/ui";
import { useLang } from "@/lib/gramudyam/i18n";
import { buildReport } from "@/lib/gramudyam/report";
import { useStoredAssessment } from "@/lib/gramudyam/store";
import { formatINR } from "@/lib/gramudyam/finance";

export const Route = createFileRoute("/report")({
  head: () => ({
    meta: [
      { title: "Your Business Report — Gram Udyam" },
      {
        name: "description",
        content:
          "Viability score, local market analysis, opportunities, SWOT, risks, scheme recommendation and EMI plan in one report.",
      },
      { property: "og:title", content: "Your Business Report — Gram Udyam" },
      {
        property: "og:description",
        content: "A complete, printable business and financial plan for your idea.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  const { t } = useLang();
  const { assessment, loaded } = useStoredAssessment();
  const report = useMemo(() => (assessment ? buildReport(assessment) : null), [assessment]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <p className="mx-auto max-w-6xl px-4 py-20 text-sm text-muted-foreground">
          Loading your report…
        </p>
      </div>
    );
  }

  if (!assessment || !report) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-20">
          <Card className="text-center">
            <h1 className="text-xl font-bold">No assessment found</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill the short assessment, or load the demo entrepreneur from the menu, to see your
              report.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <LinkButton to="/assessment" size="lg">
                Start Business Assessment
              </LinkButton>
              <LinkButton to="/calculator" size="lg" variant="outline">
                Open Calculator
              </LinkButton>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const demo = Boolean(assessment.demo);
  const place = [assessment.village, assessment.block, assessment.district, assessment.state]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 print:space-y-8 print:py-4">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                Business Report
              </h1>
              {demo ? <Badge tone="warning">{t("demoBadge")}</Badge> : null}
            </div>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {place}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {assessment.category} · Own capital {formatINR(assessment.margin)} ·{" "}
              {assessment.experience} · Target market: {assessment.targetMarket}
              {assessment.skills ? ` · Skills: ${assessment.skills}` : ""}
            </p>
          </div>
          <Button size="lg" onClick={() => window.print()} className="print:hidden">
            <Download className="h-5 w-5" />
            {t("download")}
          </Button>
        </header>

        <Section
          title={t("viabilityScore")}
          subtitle="Calculated from your inputs and category benchmarks."
          badge={<Badge tone="primary">Indicative score</Badge>}
        >
          <ScoreCard report={report} />
        </Section>

        <MarketSection report={report} demo={demo} />
        <OpportunitySection report={report} />
        <CompetitionSection report={report} />
        <SwotSection report={report} />
        <RiskSection report={report} />
        <PricingSection report={report} />
        <FinancialRoadmap report={report} />
        <CashFlowSection report={report} />

        <Section title="Business Recommendations">
          <Card>
            <ul className="space-y-3">
              {report.recommendations.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-foreground/85">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </Card>
        </Section>

        <ChatAdvisor assessment={assessment} />

        <div className="print:hidden">
          <Button size="lg" onClick={() => window.print()}>
            <Download className="h-5 w-5" />
            {t("download")}
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
