import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText, LogOut, MapPin, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/gu/Navbar";
import { Footer } from "@/components/gu/Footer";
import { Badge, Button, Card, Field, Input, LinkButton, Section } from "@/components/gu/ui";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/gramudyam/finance";
import { saveAssessment } from "@/lib/gramudyam/store";
import type { Assessment } from "@/lib/gramudyam/types";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard — Gram Udyam" },
      {
        name: "description",
        content: "Your saved business reports, profile details and quick links to new assessments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "My Dashboard — Gram Udyam" },
      { property: "og:description", content: "All your saved business plans in one place." },
    ],
  }),
  component: Dashboard,
});

type SavedReport = {
  id: string;
  title: string;
  category: string;
  location: string;
  margin: number;
  score: number | null;
  assessment: Assessment;
  created_at: string;
};

function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  const profile = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .maybeSingle();
      if (error) throw error;
      return { email: user.email ?? "", full_name: data?.full_name ?? "", phone: data?.phone ?? "" };
    },
  });

  useEffect(() => {
    if (profile.data) {
      setEmail(profile.data.email);
      setFullName(profile.data.full_name);
      setPhone(profile.data.phone);
    }
  }, [profile.data]);

  const reports = useQuery({
    queryKey: ["saved-reports"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("saved_reports")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as SavedReport[];
    },
  });

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName, phone });
    setSavingProfile(false);
    setProfileMsg(error ? error.message : "Profile saved.");
    if (!error) void queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const openReport = (r: SavedReport) => {
    saveAssessment(r.assessment);
    navigate({ to: "/report" });
  };

  const removeReport = async (id: string) => {
    const { error } = await supabase.from("saved_reports").delete().eq("id", id);
    if (!error) void queryClient.invalidateQueries({ queryKey: ["saved-reports"] });
  };

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:py-16">
        <header className="glass-panel flex flex-wrap items-start justify-between gap-4 rounded-lg border-l-4 border-l-primary p-6 sm:p-8">
          <div>
            <h1 className="text-3xl font-extrabold sm:text-4xl">
              Welcome{fullName ? `, ${fullName}` : ""}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <LinkButton to="/assessment">New assessment</LinkButton>
            <Button variant="outline" onClick={() => void signOut()}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        <Section title="Saved reports" subtitle="Open a saved plan to view its full report again.">
          {reports.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading your reports…</p>
          ) : reports.data && reports.data.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.data.map((r) => (
                <Card key={r.id} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold">{r.title}</h3>
                    {r.score != null ? <Badge tone="primary">{r.score}/100</Badge> : null}
                  </div>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {r.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {r.category} · Own capital {formatINR(Number(r.margin))}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Saved {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <div className="mt-auto flex gap-2 pt-2">
                    <Button onClick={() => openReport(r)} className="flex-1">
                      <FileText className="h-4 w-4" />
                      Open
                    </Button>
                    <Button
                      variant="outline"
                      aria-label="Delete report"
                      onClick={() => void removeReport(r.id)}
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center">
              <p className="text-sm text-muted-foreground">
                You have not saved any report yet. Complete an assessment and use “Save to my
                dashboard” on the report page.
              </p>
              <div className="mt-4">
                <LinkButton to="/assessment" size="lg">
                  Start Business Assessment
                </LinkButton>
              </div>
            </Card>
          )}
        </Section>

        <Section title="My profile" subtitle="Used to personalise your reports.">
          <Card>
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={saveProfile}>
              <Field label="Full name">
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </Field>
              <Field label="Phone number">
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </Field>
              <div className="sm:col-span-2 flex items-center gap-3">
                <Button type="submit" disabled={savingProfile}>
                  {savingProfile ? "Saving…" : "Save profile"}
                </Button>
                {profileMsg ? (
                  <span className="text-sm text-muted-foreground">{profileMsg}</span>
                ) : null}
              </div>
            </form>
          </Card>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
