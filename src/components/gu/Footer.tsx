import { useLang } from "@/lib/gramudyam/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="mt-16 border-t border-border bg-surface print:hidden">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <p className="text-sm font-semibold text-foreground">{t("footer")}</p>
        <p className="mx-auto mt-3 max-w-3xl text-xs leading-relaxed text-muted-foreground">
          SIH 2026 prototype. Market figures are AI-generated / indicative estimates and financial
          figures are illustrative. This platform does not process loan applications.
        </p>
      </div>
    </footer>
  );
}
