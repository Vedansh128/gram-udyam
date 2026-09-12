import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Calculator,
  Languages,
  MapPin,
  PlayCircle,
  ReceiptIndianRupee,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { Badge, Button, Card, LinkButton } from "@/components/gu/ui";
import { useLang } from "@/lib/gramudyam/i18n";
import { DEMO_ASSESSMENT } from "@/lib/gramudyam/report";
import { saveAssessment } from "@/lib/gramudyam/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gram Udyam — AI Business & Loan Planning for Rural Entrepreneurs" },
      {
        name: "description",
        content:
          "Gram Udyam turns your location, capital and business idea into a local market analysis, scheme recommendation and EMI plan.",
      },
      { property: "og:title", content: "Gram Udyam — Smarter Business Plans for Rural India" },
      {
        property: "og:description",
        content:
          "AI-powered local business analysis, scheme routing and repayment planning for rural micro-entrepreneurs.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useLang();
  const navigate = useNavigate();

  const steps = [
    { n: "01", title: t("step1"), body: t("step1d") },
    { n: "02", title: t("step2"), body: t("step2d") },
    { n: "03", title: t("step3"), body: t("step3d") },
  ];

  const features = [
    { icon: MapPin, label: t("f1"), body: "Consumer base, service radius and channels around your village." },
    { icon: Bot, label: t("f2"), body: "Ask questions and get practical, context-aware guidance." },
    { icon: Users, label: t("f3"), body: "Estimated competition and how to differentiate." },
    { icon: Calculator, label: t("f4"), body: "Automatic scheme routing from your margin capital." },
    { icon: ReceiptIndianRupee, label: t("f5"), body: "EMI, quarterly payment, interest and moratorium." },
    { icon: Languages, label: t("f6"), body: "Switch between English and हिंदी anytime." },
  ];

  const runDemo = () => {
    saveAssessment(DEMO_ASSESSMENT);
    navigate({ to: "/report" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="border-b border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
            <div>
              <Badge tone="primary">SIH 2026 Prototype</Badge>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/assessment" size="lg">
                  {t("startBusinessAssessment")}
                </LinkButton>
                <LinkButton to="/calculator" size="lg" variant="outline">
                  {t("calcEligibility")}
                </LinkButton>
              </div>
              <Button variant="ghost" size="lg" className="mt-3 px-0 text-primary" onClick={runDemo}>
                <PlayCircle className="h-5 w-5" />
                {t("tryDemo")} — Sehore, MP · ₹1,00,000 · Dairy
              </Button>
            </div>

            <Card className="bg-card">
              <p className="text-sm font-semibold text-muted-foreground">Sample structuring</p>
              <div className="mt-4 space-y-3">
                {[
                  ["Own contribution", "₹1,00,000"],
                  ["Estimated project cost", "₹10,00,000"],
                  ["Potential loan", "₹9,00,000"],
                  ["Recommended scheme", "Term Loan Scheme"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between rounded-xl bg-surface px-4 py-3"
                  >
                    <span className="text-sm text-muted-foreground">{k}</span>
                    <span className="text-base font-bold">{v}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Indicative estimates. Final eligibility is decided by the concerned authority.
              </p>
            </Card>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n}>
                <span className="text-3xl font-extrabold text-primary/30">{s.n}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="text-2xl font-bold tracking-tight">{t("features")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.label}>
                  <f.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-3 text-base font-bold">{f.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold tracking-tight">{t("howItWorks")}</h2>
          <ol className="mt-6 space-y-4">
            {[
              "Enter your location, available margin capital and business category.",
              "The platform estimates local demand, competition, opportunities and risks for that category.",
              "Project cost and potential loan are calculated from your margin using a 10% beneficiary contribution.",
              "The matching scheme is selected automatically from project cost and loan limits.",
              "EMI, quarterly payment, total interest and cash flow are projected for your tenure.",
              "Download or print the complete business report.",
            ].map((line, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm text-muted-foreground sm:text-base">{line}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton to="/assessment" size="lg">
              {t("startBusinessAssessment")}
            </LinkButton>
            <Button variant="outline" size="lg" onClick={runDemo}>
              <BarChart3 className="h-5 w-5" />
              {t("tryDemo")}
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
