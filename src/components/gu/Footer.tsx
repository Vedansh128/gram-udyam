import { useLang } from "@/lib/gramudyam/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-20 border-t border-border bg-surface text-foreground print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="font-display text-lg font-semibold">{t("footer")}</p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          SIH 2026 prototype. Market figures are AI-generated / indicative estimates and financial
          figures are illustrative. This platform does not process loan applications.
        </p>
      </div>
    </footer>
  );
}
