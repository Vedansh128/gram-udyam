import { useServerFn } from "@tanstack/react-start";
import { Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { askAdvisor } from "@/lib/gramudyam/advisor.functions";
import { useLang } from "@/lib/gramudyam/i18n";
import type { Assessment } from "@/lib/gramudyam/types";
import { Button, Card, Input, Section, Badge } from "./ui";

const SUGGESTIONS = [
  "Is this business suitable for my location?",
  "How can I reduce my business risk?",
  "What should I sell first?",
  "How can I compete with existing shops?",
  "How much working capital should I keep?",
];

type Msg = { role: "user" | "ai"; text: string; demo?: boolean };

export function ChatAdvisor({ assessment }: { assessment: Assessment }) {
  const { t, lang } = useLang();
  const ask = useServerFn(askAdvisor);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const send = async (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setInput("");
    setError("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    try {
      const res = await ask({
        data: {
          question: q,
          language: lang,
          assessment: { ...assessment, skills: assessment.skills ?? "" },
        },
      });
      setMessages((m) => [...m, { role: "ai", text: res.answer, demo: res.source === "demo" }]);
    } catch {
      setError("Live AI service unavailable. Showing demonstration analysis.");
      setMessages((m) => [
        ...m,
        {
          role: "ai",
          demo: true,
          text: `For ${assessment.category} in ${assessment.village || assessment.district}, start small, validate demand with 20–30 nearby households, and keep three months of EMI as reserve.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section
      title={t("askAi")}
      subtitle="Ask anything about your business plan. Answers are indicative guidance, not financial advice."
      badge={<Badge tone="primary">AI-generated / indicative</Badge>}
    >
      <Card className="print:hidden">
        <div className="mb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <Button
              key={s}
              variant="outline"
              onClick={() => void send(s)}
              className="h-auto rounded-full px-3 py-2 text-xs font-medium text-muted-foreground"
            >
              {s}
            </Button>
          ))}
        </div>

        <div className="max-h-96 space-y-3 overflow-y-auto rounded-xl bg-surface p-3">
          {messages.length === 0 ? (
            <p className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Pick a question above or type your own.
            </p>
          ) : null}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-card text-foreground shadow-sm"
              }`}
            >
              {m.text}
              {m.role === "ai" && m.demo ? (
                <span className="mt-2 block text-xs text-muted-foreground">
                  Demonstration analysis (live AI not configured).
                </span>
              ) : null}
            </div>
          ))}
          {loading ? <p className="px-2 text-sm text-muted-foreground">Thinking…</p> : null}
        </div>

        {error ? <p className="mt-2 text-xs text-danger">{error}</p> : null}

        <form
          className="mt-3 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Your question"
          />
          <Button type="submit" disabled={loading} className="shrink-0 px-4">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </Section>
  );
}
