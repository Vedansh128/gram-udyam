import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Calculator,
  Languages,
  MapPin,
  PlayCircle,
  ReceiptIndianRupee,
  Users,
} from "lucide-react";
import entrepreneurImage from "@/assets/gram-udyam-entrepreneur.jpg";
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
    { icon: Languages, label: t("f6"), body: "Use the platform in nine Indian languages." },
  ];

  const runDemo = () => {
    saveAssessment(DEMO_ASSESSMENT);
    navigate({ to: "/report" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-primary/5" />
          <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:min-h-[680px] lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:py-16">
            <div className="relative z-10">
              <Badge tone="primary">Local insight · Clear finance · Better decisions</Badge>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-7xl">
                {t("heroTitle")}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {t("heroSubtitle")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <LinkButton to="/assessment" size="lg">
                  {t("startBusinessAssessment")}
                  <ArrowRight className="h-4 w-4" />
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

            <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-border shadow-2xl lg:min-h-[560px]">
              <img src={entrepreneurImage} alt="A rural entrepreneur managing a modern dairy enterprise" width={1280} height={1280} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-x-4 bottom-4 glass-panel rounded-lg p-4 sm:inset-x-6 sm:bottom-6">
                <p className="text-xs font-bold uppercase text-primary">Sample structuring</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["Own contribution", "₹1,00,000"],
                  ["Estimated project cost", "₹10,00,000"],
                  ["Potential loan", "₹9,00,000"],
                  ["Recommended scheme", "Term Loan Scheme"],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-md bg-background/75 p-3">
                    <span className="block text-xs text-muted-foreground">{k}</span>
                    <span className="mt-1 block text-sm font-bold">{v}</span>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <p className="text-sm font-bold uppercase text-primary">Your path forward</p>
          <h2 className="mt-2 max-w-xl text-3xl font-bold sm:text-4xl">From a local idea to an actionable plan</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} className="mt-6 min-h-52 border-t-4 border-t-primary p-6">
                <span className="text-4xl font-extrabold text-primary/25">{s.n}</span>
                <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-primary text-primary-foreground">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <p className="text-sm font-bold uppercase text-primary-foreground/65">Built for local enterprise</p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{t("features")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <Card key={f.label} className="border-primary-foreground/15 bg-primary-foreground/8 text-primary-foreground shadow-none backdrop-blur-sm">
                  <f.icon className="h-6 w-6 text-accent" />
                  <h3 className="mt-3 text-base font-bold">{f.label}</h3>
                  <p className="mt-1 text-sm text-primary-foreground/70">{f.body}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("howItWorks")}</h2>
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
