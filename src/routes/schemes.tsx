import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ExternalLink,
  Factory,
  Handshake,
  Landmark,
  ScrollText,
  Store,
  Users,
  Wheat,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/gu/Footer";
import { Navbar } from "@/components/gu/Navbar";
import { Badge, Card, LinkButton } from "@/components/gu/ui";
import { GOV_SCHEMES, type GovScheme } from "@/lib/gramudyam/govSchemes";

export const Route = createFileRoute("/schemes")({
  head: () => ({
    meta: [
      { title: "Government Loan Schemes — Gram Udyam" },
      {
        name: "description",
        content:
          "Explore government loan schemes for rural businesses — MUDRA, PMEGP, PMFME, Stand-Up India, AIF, DAY-NRLM — with step-by-step application guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Government Loan Schemes for Rural Businesses" },
      {
        property: "og:description",
        content: "Click any scheme to get a step-by-step guide on how to apply.",
      },
    ],
  }),
  component: SchemesPage,
});

const ICONS: Record<GovScheme["icon"], typeof Banknote> = {
  mudra: Banknote,
  pmegp: Factory,
  pmfme: Wheat,
  standup: Store,
  aif: Landmark,
  nrlm: Users,
  jansamarth: ScrollText,
};

function SchemeDetail({ scheme, onClose }: { scheme: GovScheme; onClose: () => void }) {
  const Icon = ICONS[scheme.icon];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={scheme.name}
    >
      <div
        className="glass-panel max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="text-xl font-extrabold sm:text-2xl">{scheme.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-4 leading-relaxed text-muted-foreground">{scheme.short}</p>

        {scheme.highlights.length > 0 ? (
          <div className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-primary">Key details</h3>
            <ul className="mt-3 space-y-2">
              {scheme.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary">
            How to apply — step by step
          </h3>
          <ol className="mt-4 space-y-4">
            {scheme.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {scheme.note ? (
          <p className="mt-6 rounded-xl border border-dashed border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
            {scheme.note}
          </p>
        ) : null}

        <div className="mt-6">
          <h3 className="text-sm font-bold uppercase tracking-wide text-primary">Official links</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {scheme.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                {link.label}
                <ExternalLink className="h-3.5 w-3.5 text-primary" />
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
          Information is indicative, compiled from official government sources. Final eligibility,
          amounts and terms are subject to verification and approval by the concerned authority or
          lender.
        </p>
      </div>
    </div>
  );
}

function SchemesPage() {
  const [active, setActive] = useState<GovScheme | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <p className="text-sm font-bold uppercase text-primary">Government support</p>
        <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
          Government Loan Schemes for Rural Businesses
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Tap any scheme to see who it is for and a step-by-step guide on how to apply.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GOV_SCHEMES.map((scheme) => {
            const Icon = ICONS[scheme.icon];
            return (
              <button
                key={scheme.id}
                onClick={() => setActive(scheme)}
                className="text-left"
                aria-haspopup="dialog"
              >
                <Card className="flex h-full flex-col gap-3 p-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="text-lg font-bold leading-snug">{scheme.name}</h2>
                  <p className="line-clamp-3 text-sm text-muted-foreground">{scheme.short}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                    {scheme.bestFor.slice(0, 3).map((b) => (
                      <Badge key={b} tone="primary">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    How to apply <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </button>
            );
          })}
        </div>

        <Card className="mt-10 flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Handshake className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h2 className="font-bold">Not sure which scheme fits you?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Run the free business assessment — we will recommend a financing route based on your
                capital and project cost.
              </p>
            </div>
          </div>
          <LinkButton to="/assessment">Start Assessment</LinkButton>
        </Card>
      </main>
      <Footer />
      {active ? <SchemeDetail scheme={active} onClose={() => setActive(null)} /> : null}
    </div>
  );
}
