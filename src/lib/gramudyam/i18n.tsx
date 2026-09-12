import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./types";

const STRINGS: Record<string, { en: string; hi: string }> = {
  brand: { en: "GRAM UDYAM", hi: "ग्राम उद्यम" },
  home: { en: "Home", hi: "होम" },
  assessment: { en: "Business Assessment", hi: "व्यवसाय आकलन" },
  calculator: { en: "Calculator", hi: "कैलकुलेटर" },
  howItWorks: { en: "How It Works", hi: "कैसे काम करता है" },
  tryDemo: { en: "Try Demo", hi: "डेमो देखें" },
  startAssessment: { en: "Start Assessment", hi: "आकलन शुरू करें" },
  heroTitle: {
    en: "Turn Your Business Idea Into a Smarter Business Plan.",
    hi: "अपने व्यवसाय के विचार को एक बेहतर व्यवसाय योजना बनाएं।",
  },
  heroSubtitle: {
    en: "AI-powered business guidance and financial planning for rural and semi-urban entrepreneurs.",
    hi: "ग्रामीण और अर्ध-शहरी उद्यमियों के लिए एआई आधारित व्यवसाय मार्गदर्शन और वित्तीय योजना।",
  },
  startBusinessAssessment: { en: "Start Business Assessment", hi: "व्यवसाय आकलन शुरू करें" },
  calcEligibility: { en: "Calculate Loan Eligibility", hi: "ऋण पात्रता जांचें" },
  step1: { en: "Tell Us", hi: "हमें बताएं" },
  step1d: {
    en: "Location, available capital and business idea.",
    hi: "स्थान, उपलब्ध पूंजी और व्यवसाय का विचार।",
  },
  step2: { en: "AI Analyzes", hi: "एआई विश्लेषण" },
  step2d: {
    en: "Market demand, competition, opportunities and risks.",
    hi: "बाज़ार मांग, प्रतिस्पर्धा, अवसर और जोखिम।",
  },
  step3: { en: "Get Your Roadmap", hi: "अपनी योजना पाएं" },
  step3d: {
    en: "Business feasibility, scheme recommendation and repayment plan.",
    hi: "व्यवहार्यता, योजना सिफारिश और पुनर्भुगतान योजना।",
  },
  features: { en: "What You Get", hi: "आपको क्या मिलेगा" },
  f1: { en: "Hyper-Local Market Analysis", hi: "स्थानीय बाज़ार विश्लेषण" },
  f2: { en: "AI Business Advisor", hi: "एआई व्यवसाय सलाहकार" },
  f3: { en: "Competitor Insights", hi: "प्रतिस्पर्धा जानकारी" },
  f4: { en: "Smart Scheme Calculator", hi: "स्मार्ट योजना कैलकुलेटर" },
  f5: { en: "EMI & Repayment Planner", hi: "ईएमआई और पुनर्भुगतान योजना" },
  f6: { en: "Multilingual Assistance", hi: "बहुभाषी सहायता" },
  location: { en: "Location", hi: "स्थान" },
  financialInfo: { en: "Financial Information", hi: "वित्तीय जानकारी" },
  business: { en: "Business", hi: "व्यवसाय" },
  state: { en: "State", hi: "राज्य" },
  district: { en: "District", hi: "जिला" },
  block: { en: "Block", hi: "ब्लॉक" },
  village: { en: "Village", hi: "गांव" },
  margin: { en: "Available Margin Capital (₹)", hi: "उपलब्ध मार्जिन पूंजी (₹)" },
  category: { en: "Business Category", hi: "व्यवसाय श्रेणी" },
  experience: { en: "Business Experience", hi: "व्यवसाय अनुभव" },
  targetMarket: { en: "Target Market", hi: "लक्षित बाज़ार" },
  skills: { en: "Skills / Interests (optional)", hi: "कौशल / रुचि (वैकल्पिक)" },
  generateReport: { en: "Generate My Business Report", hi: "मेरी व्यवसाय रिपोर्ट बनाएं" },
  next: { en: "Next", hi: "आगे" },
  back: { en: "Back", hi: "पीछे" },
  viabilityScore: { en: "Business Viability Score", hi: "व्यवसाय व्यवहार्यता स्कोर" },
  localMarket: { en: "Your Local Market", hi: "आपका स्थानीय बाज़ार" },
  untapped: { en: "Untapped Opportunities", hi: "अनछुए अवसर" },
  competitionSnapshot: { en: "Competition Snapshot", hi: "प्रतिस्पर्धा सारांश" },
  swot: { en: "SWOT Analysis", hi: "SWOT विश्लेषण" },
  riskDashboard: { en: "Local Risk Detector", hi: "स्थानीय जोखिम विश्लेषण" },
  pricing: { en: "Pricing & Market Value", hi: "मूल्य और बाज़ार मूल्य" },
  roadmap: { en: "Your Financial Roadmap", hi: "आपकी वित्तीय योजना" },
  cashflow: { en: "Business Cash Flow", hi: "व्यवसाय नकदी प्रवाह" },
  askAi: { en: "Ask GramUdyam AI", hi: "ग्राम उद्यम एआई से पूछें" },
  download: { en: "Download Business Report", hi: "रिपोर्ट डाउनलोड करें" },
  demoBadge: { en: "Demo Estimates", hi: "डेमो अनुमान" },
  aiLabel: { en: "AI-generated / indicative analysis", hi: "एआई आधारित / सांकेतिक विश्लेषण" },
  disclaimer: {
    en: "Financial figures shown are indicative estimates based on the provided scheme parameters. Final eligibility, sanction amount, interest, repayment schedule and terms are subject to verification and approval by the concerned authority.",
    hi: "दिखाए गए वित्तीय आंकड़े दी गई योजना मापदंडों पर आधारित सांकेतिक अनुमान हैं। अंतिम पात्रता, स्वीकृत राशि, ब्याज और शर्तें संबंधित प्राधिकरण की जांच और अनुमोदन पर निर्भर हैं।",
  },
  footer: {
    en: "GRAM UDYAM — Empowering Rural Entrepreneurship Through Data & AI",
    hi: "ग्राम उद्यम — डेटा और एआई के माध्यम से ग्रामीण उद्यमिता को सशक्त बनाना",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: keyof typeof STRINGS) => string };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => STRINGS[k]!.en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("gu-lang");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("gu-lang", l);
  };

  const t = (key: keyof typeof STRINGS) => STRINGS[key]?.[lang] ?? String(key);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
