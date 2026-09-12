import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { Button, Card, Field, Input, Select, Textarea } from "@/components/gu/ui";
import { CATEGORIES } from "@/lib/gramudyam/businessData";
import { useLang } from "@/lib/gramudyam/i18n";
import { saveAssessment } from "@/lib/gramudyam/store";
import type { Assessment } from "@/lib/gramudyam/types";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Business Assessment — Gram Udyam" },
      {
        name: "description",
        content:
          "Share your location, available margin capital and business idea to generate a complete business and financial report.",
      },
      { property: "og:title", content: "Business Assessment — Gram Udyam" },
      {
        property: "og:description",
        content: "Three quick steps: location, capital and business idea.",
      },
    ],
  }),
  component: AssessmentPage,
});

const STATES = [
  "Madhya Pradesh",
  "Uttar Pradesh",
  "Bihar",
  "Rajasthan",
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "West Bengal",
  "Punjab",
  "Odisha",
  "Other",
];

type Form = {
  state: string;
  district: string;
  block: string;
  village: string;
  margin: string;
  category: string;
  experience: Assessment["experience"];
  targetMarket: Assessment["targetMarket"];
  skills: string;
};

const EMPTY: Form = {
  state: "",
  district: "",
  block: "",
  village: "",
  margin: "",
  category: "",
  experience: "Beginner",
  targetMarket: "Village",
  skills: "",
};

function AssessmentPage() {
  const { t } = useLang();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (s: number) => {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.state) e["state"] = "Please select your state.";
      if (!form.district.trim()) e["district"] = "Please enter your district.";
      if (!form.block.trim()) e["block"] = "Please enter your block.";
      if (!form.village.trim()) e["village"] = "Please enter your village.";
    }
    if (s === 1) {
      const m = Number(form.margin);
      if (!form.margin.trim() || Number.isNaN(m) || m <= 0)
        e["margin"] = "Enter your available margin capital in rupees.";
      else if (m < 5000) e["margin"] = "Please enter at least ₹5,000.";
    }
    if (s === 2) {
      if (!form.category) e["category"] = "Please choose a business category.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validate(step)) setStep((s) => Math.min(2, s + 1));
  };

  const submit = () => {
    if (!validate(2)) return;
    const assessment: Assessment = {
      state: form.state,
      district: form.district.trim(),
      block: form.block.trim(),
      village: form.village.trim(),
      margin: Number(form.margin),
      category: form.category,
      experience: form.experience,
      targetMarket: form.targetMarket,
      skills: form.skills.trim(),
      demo: false,
    };
    saveAssessment(assessment);
    navigate({ to: "/report" });
  };

  const steps = [t("location"), t("financialInfo"), t("business")];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{t("assessment")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Three short steps. Your answers stay on this device.
        </p>

        <div className="mt-6 flex gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex-1">
              <div
                className={`h-2 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`}
                aria-hidden
              />
              <p
                className={`mt-2 text-xs font-semibold ${i <= step ? "text-primary" : "text-muted-foreground"}`}
              >
                {i + 1}. {s}
              </p>
            </div>
          ))}
        </div>

        <Card className="mt-6 space-y-4">
          {step === 0 ? (
            <>
              <Field label={t("state")} error={errors["state"]}>
                <Select value={form.state} onChange={(e) => set("state", e.target.value)}>
                  <option value="">Select state</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t("district")} error={errors["district"]}>
                <Input
                  value={form.district}
                  onChange={(e) => set("district", e.target.value)}
                  placeholder="e.g. Sehore"
                />
              </Field>
              <Field label={t("block")} error={errors["block"]}>
                <Input
                  value={form.block}
                  onChange={(e) => set("block", e.target.value)}
                  placeholder="e.g. Ichhawar"
                />
              </Field>
              <Field label={t("village")} error={errors["village"]}>
                <Input
                  value={form.village}
                  onChange={(e) => set("village", e.target.value)}
                  placeholder="e.g. Amlaha"
                />
              </Field>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <Field label={t("margin")} error={errors["margin"]}>
                <Input
                  type="number"
                  inputMode="numeric"
                  value={form.margin}
                  onChange={(e) => set("margin", e.target.value)}
                  placeholder="100000"
                />
              </Field>
              <p className="text-sm text-muted-foreground">
                Example: ₹1,00,000. This is the money you can put in yourself. Project cost is
                calculated assuming a 10% beneficiary contribution.
              </p>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <Field label={t("category")} error={errors["category"]}>
                <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t("experience")}>
                <Select
                  value={form.experience}
                  onChange={(e) => set("experience", e.target.value)}
                >
                  {["Beginner", "Some Experience", "Experienced"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t("targetMarket")}>
                <Select
                  value={form.targetMarket}
                  onChange={(e) => set("targetMarket", e.target.value)}
                >
                  {["Village", "Block", "District", "Nearby Town"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label={t("skills")}>
                <Textarea
                  rows={3}
                  value={form.skills}
                  onChange={(e) => set("skills", e.target.value)}
                  placeholder="e.g. cattle handling, tailoring, local market contacts"
                />
              </Field>
            </>
          ) : null}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            {step > 0 ? (
              <Button variant="outline" size="lg" onClick={() => setStep((s) => s - 1)}>
                {t("back")}
              </Button>
            ) : null}
            {step < 2 ? (
              <Button size="lg" className="sm:flex-1" onClick={next}>
                {t("next")}
              </Button>
            ) : (
              <Button size="lg" className="sm:flex-1" onClick={submit}>
                {t("generateReport")}
              </Button>
            )}
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
