import { Link, useNavigate } from "@tanstack/react-router";
import { Globe2, LayoutDashboard, LogIn, Menu, Sprout, X } from "lucide-react";
import { useState } from "react";
import { displayName, useSession } from "@/lib/gramudyam/auth";
import { LANGUAGES, useLang } from "@/lib/gramudyam/i18n";
import { DEMO_ASSESSMENT } from "@/lib/gramudyam/report";
import { saveAssessment } from "@/lib/gramudyam/store";
import { ThemeToggle } from "./ThemeToggle";
import { Button, LinkButton } from "./ui";

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useSession();

  const links = [
    { to: "/", label: t("home") },
    { to: "/assessment", label: t("assessment") },
    { to: "/calculator", label: t("calculator") },
    { to: "/schemes", label: t("schemes") },
    { to: "/how-it-works", label: t("howItWorks") },
  ] as const;

  const runDemo = () => {
    saveAssessment(DEMO_ASSESSMENT);
    setOpen(false);
    navigate({ to: "/report" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/65 backdrop-blur-2xl print:hidden">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3.5">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
            <Sprout className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-extrabold">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={runDemo}
            className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {t("tryDemo")}
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <label className="hidden items-center gap-2 rounded-full border border-border bg-card px-3 backdrop-blur-xl sm:flex">
            <Globe2 className="h-4 w-4 text-primary" />
            <span className="sr-only">Choose language</span>
            <select value={lang} onChange={(event) => setLang(event.target.value as typeof lang)} className="h-9 max-w-28 bg-transparent text-sm font-semibold outline-none">
              {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
            </select>
          </label>
          <ThemeToggle />
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
            <label className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-card px-3">
              <Globe2 className="h-4 w-4 text-primary" />
              <select value={lang} onChange={(event) => setLang(event.target.value as typeof lang)} className="h-12 w-full bg-transparent font-semibold outline-none">
                {LANGUAGES.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
              </select>
            </label>
            <LinkButton to="/assessment" className="mt-2" size="lg" onClick={() => setOpen(false)}>
              {t("startAssessment")}
            </LinkButton>
          </div>
        </div>
      ) : null}
    </header>
  );
}
