import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getProfile } from "./businessData";
import { calculateFinancials, formatINR } from "./finance";

const AssessmentSchema = z.object({
  state: z.string().default(""),
  district: z.string().default(""),
  block: z.string().default(""),
  village: z.string().default(""),
  margin: z.number().default(0),
  category: z.string().default("Other"),
  experience: z.string().default("Beginner"),
  targetMarket: z.string().default("Village"),
  skills: z.string().optional(),
});

const InputSchema = z.object({
  question: z.string().min(1),
  language: z.enum(["en", "hi"]).default("en"),
  assessment: AssessmentSchema,
});

type AdvisorInput = z.infer<typeof InputSchema>;

function fallbackAnswer(input: AdvisorInput): string {
  const a = input.assessment;
  const place = a.village || a.block || a.district || "your area";
  const profile = getProfile(a.category);
  const fin = calculateFinancials(a.margin);
  const q = input.question.toLowerCase();

  let body: string;
  if (q.includes("risk")) {
    const r = profile.risks["Seasonal Risk"];
    body = `Your biggest controllable risks in ${place} are seasonal demand and competition. ${r.note} Mitigation: ${r.mitigation} Also keep roughly ${formatINR(fin.emi * 3)} (about three EMIs) as a working capital reserve.`;
  } else if (q.includes("working capital") || q.includes("capital")) {
    body = `For a project cost of ${formatINR(fin.projectCost)}, keep about ${formatINR(Math.max(fin.emi * 3, fin.projectCost * 0.05))} as working capital. That covers three months of EMI plus routine purchases if sales are slow.`;
  } else if (q.includes("compete") || q.includes("competition")) {
    body = `Existing units in ${place} mostly compete on price. Differentiate on ${profile.differentiators.join(", ")}. Start with a small fixed customer group and expand once repeat orders are steady.`;
  } else if (q.includes("sell") || q.includes("product")) {
    body = `For ${a.category} in ${place}, the strongest starting lines are: ${profile.opportunities
      .slice(0, 3)
      .map((o) => o.name)
      .join(", ")}. Begin with the lowest-investment option and add value-added products once cash flow stabilises.`;
  } else if (q.includes("suitable") || q.includes("location")) {
    body = `${a.category} is a reasonable fit for ${place} given a ${formatINR(a.margin)} margin. Estimated project cost ${formatINR(fin.projectCost)}, potential loan ${formatINR(fin.potentialLoan)} under the ${fin.scheme.name}. Demand within a 5–10 km radius is the deciding factor — validate it with 20–30 households before investing.`;
  } else {
    body = `For ${a.category} in ${place}: your indicative project cost is ${formatINR(fin.projectCost)} with a potential loan of ${formatINR(fin.potentialLoan)} under the ${fin.scheme.name} at ${fin.interestRate}% for ${fin.tenureYears} years (estimated EMI ${formatINR(fin.emi)}). Focus first on ${profile.opportunities[0]?.name ?? "direct local sales"} and build a repeat customer base within your village before expanding.`;
  }

  const prefix =
    input.language === "hi"
      ? "सांकेतिक विश्लेषण (डेमो): "
      : "";
  return prefix + body;
}

export const askAdvisor = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) {
      return { answer: fallbackAnswer(data), source: "demo" as const };
    }

    const a = data.assessment;
    const fin = calculateFinancials(a.margin);
    const profile = getProfile(a.category);
    const system = `You are GramUdyam AI, a practical business advisor for rural Indian micro-entrepreneurs.
Answer in ${data.language === "hi" ? "Hindi" : "simple English"}, under 130 words, plain and concrete. Write plain sentences only — no markdown, no asterisks, no headings.
Never promise loan approval or guaranteed profit. Label numbers as estimates.
Context: location ${a.village}, ${a.block}, ${a.district}, ${a.state}. Category ${a.category}. Experience ${a.experience}. Target market ${a.targetMarket}.
Margin ${fin.margin}, project cost ${fin.projectCost}, potential loan ${fin.potentialLoan}, scheme ${fin.scheme.name}, interest ${fin.interestRate}%, tenure ${fin.tenureYears} years, EMI ${fin.emi}.
Known local opportunities: ${profile.opportunities.map((o) => o.name).join(", ")}.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": apiKey,
          "X-Lovable-AIG-SDK": "fetch",
        },
        body: JSON.stringify({
          model: "google/gemini-3.8-flash",
          messages: [
            { role: "system", content: system },
            { role: "user", content: data.question },
          ],
        }),
      });

      if (!res.ok) {
        return { answer: fallbackAnswer(data), source: "demo" as const };
      }

      const json = (await res.json()) as {
        choices?: { message?: { content?: string } }[];
      };
      const text = json.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) return { answer: fallbackAnswer(data), source: "demo" as const };
      return { answer: text, source: "ai" as const };
    } catch {
      return { answer: fallbackAnswer(data), source: "demo" as const };
    }
  });

