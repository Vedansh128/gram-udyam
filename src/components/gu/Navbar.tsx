import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/lib/gramudyam/i18n";
import { DEMO_ASSESSMENT } from "@/lib/gramudyam/report";
import { saveAssessment } from "@/lib/gramudyam/store";
import { Button, LinkButton } from "./ui";

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: "/", label: t("home") },
    { to: "/assessment", label: t("assessment") },
    { to: "/calculator", label: t("calculator") },
    { to: "/how-it-works", label: t("howItWorks") },
  ] as const;

  const runDemo = () => {
    saveAssessment(DEMO_ASSESSMENT);
    setOpen(false);
    navigate({ to: "/report" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="text-lg font-extrabold tracking-tight">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={runDemo}
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {t("tryDemo")}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-lg border border-border p-0.5 sm:flex">
            {(["en", "hi"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {l === "en" ? "English" : "हिंदी"}
              </button>
            ))}
          </div>
          <LinkButton to="/assessment" className="hidden sm:inline-flex">
            {t("startAssessment")}
          </LinkButton>
          <Button
            variant="outline"
            className="h-10 w-10 p-0 lg:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={runDemo}
              className="rounded-lg px-3 py-3 text-left text-base font-medium hover:bg-secondary"
            >
              {t("tryDemo")}
            </button>
            <div className="mt-2 flex items-center gap-2">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 rounded-lg border border-border px-3 py-2 text-sm font-semibold ${
                    lang === l ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  {l === "en" ? "English" : "हिंदी"}
                </button>
              ))}
            </div>
            <LinkButton to="/assessment" className="mt-2" size="lg" onClick={() => setOpen(false)}>
              {t("startAssessment")}
            </LinkButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
