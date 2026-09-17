import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Lang } from "./types";

export const LANGUAGES: { code: Lang; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "hi", label: "हिंदी", short: "हि" },
  { code: "mr", label: "मराठी", short: "म" },
  { code: "gu", label: "ગુજરાતી", short: "ગુ" },
  { code: "ta", label: "தமிழ்", short: "த" },
  { code: "te", label: "తెలుగు", short: "తె" },
  { code: "ml", label: "മലയാളം", short: "മ" },
  { code: "bn", label: "বাংলা", short: "বা" },
  { code: "pa", label: "ਪੰਜਾਬੀ", short: "ਪੰ" },
];

type Translation = { en: string } & Partial<Record<Exclude<Lang, "en">, string>>;

const STRINGS: Record<string, Translation> = {
  brand: { en: "GRAM UDYAM", hi: "ग्राम उद्यम", mr: "ग्राम उद्यम", gu: "ગ્રામ ઉદ્યમ", ta: "கிராம உதயம்", te: "గ్రామ ఉద్యమం", ml: "ഗ്രാമ ഉദ്യം", bn: "গ্রাম উদ্যম", pa: "ਗ੍ਰਾਮ ਉਦਯਮ" },
  home: { en: "Home", hi: "होम", mr: "मुख्यपृष्ठ", gu: "મુખ્ય", ta: "முகப்பு", te: "హోమ్", ml: "ഹോം", bn: "হোম", pa: "ਮੁੱਖ" },
  assessment: { en: "Business Assessment", hi: "व्यवसाय आकलन", mr: "व्यवसाय मूल्यांकन", gu: "વ્યવસાય મૂલ્યાંકન", ta: "தொழில் மதிப்பீடு", te: "వ్యాపార అంచనా", ml: "ബിസിനസ് വിലയിരുത്തൽ", bn: "ব্যবসা মূল্যায়ন", pa: "ਕਾਰੋਬਾਰ ਮੁਲਾਂਕਣ" },
  calculator: { en: "Calculator", hi: "कैलकुलेटर", mr: "कॅल्क्युलेटर", gu: "કેલ્ક્યુલેટર", ta: "கணிப்பான்", te: "కాలిక్యులేటర్", ml: "കാൽക്കുലേറ്റർ", bn: "ক্যালকুলেটর", pa: "ਕੈਲਕੁਲੇਟਰ" },
  howItWorks: { en: "How It Works", hi: "कैसे काम करता है", mr: "हे कसे चालते", gu: "તે કેવી રીતે કાર્ય કરે છે", ta: "இது எப்படி செயல்படுகிறது", te: "ఇది ఎలా పనిచేస్తుంది", ml: "ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു", bn: "এটি যেভাবে কাজ করে", pa: "ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ" },
  schemes: { en: "Govt Schemes", hi: "सरकारी योजनाएं", mr: "शासकीय योजना", gu: "સરકારી યોજનાઓ", ta: "அரசு திட்டங்கள்", te: "ప్రభుత్వ పథకాలు", ml: "സർക്കാർ പദ്ധതികൾ", bn: "সরকারি প্রকল্প", pa: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ" },
  tryDemo: { en: "Try Demo", hi: "डेमो देखें", mr: "डेमो पहा", gu: "ડેમો જુઓ", ta: "டெமோ பார்க்க", te: "డెమో చూడండి", ml: "ഡെമോ കാണുക", bn: "ডেমো দেখুন", pa: "ਡੈਮੋ ਦੇਖੋ" },
  startAssessment: { en: "Start Assessment", hi: "आकलन शुरू करें", mr: "मूल्यांकन सुरू करा", gu: "મૂલ્યાંકન શરૂ કરો", ta: "மதிப்பீட்டைத் தொடங்கு", te: "అంచనా ప్రారంభించండి", ml: "വിലയിരുത്തൽ തുടങ്ങുക", bn: "মূল্যায়ন শুরু করুন", pa: "ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ" },
  heroTitle: {
    en: "Turn Your Business Idea Into a Smarter Business Plan.",
    hi: "अपने व्यवसाय के विचार को एक बेहतर व्यवसाय योजना बनाएं।",
    mr: "तुमच्या व्यवसाय कल्पनेचे अधिक हुशार व्यवसाय योजनेत रूपांतर करा.", gu: "તમારા વ્યવસાય વિચારને વધુ સ્માર્ટ વ્યવસાય યોજનામાં ફેરવો.", ta: "உங்கள் தொழில் யோசனையை சிறந்த தொழில் திட்டமாக மாற்றுங்கள்.", te: "మీ వ్యాపార ఆలోచనను మెరుగైన వ్యాపార ప్రణాళికగా మార్చండి.", ml: "നിങ്ങളുടെ ബിസിനസ് ആശയം മികച്ച ബിസിനസ് പദ്ധതിയാക്കൂ.", bn: "আপনার ব্যবসার ধারণাকে আরও ভালো ব্যবসায়িক পরিকল্পনায় রূপ দিন।", pa: "ਆਪਣੇ ਕਾਰੋਬਾਰੀ ਵਿਚਾਰ ਨੂੰ ਬਿਹਤਰ ਕਾਰੋਬਾਰੀ ਯੋਜਨਾ ਬਣਾਓ।",
  },
  heroSubtitle: {
    en: "AI-powered business guidance and financial planning for rural and semi-urban entrepreneurs.",
    hi: "ग्रामीण और अर्ध-शहरी उद्यमियों के लिए एआई आधारित व्यवसाय मार्गदर्शन और वित्तीय योजना।",
    mr: "ग्रामीण आणि निमशहरी उद्योजकांसाठी एआय-आधारित व्यवसाय मार्गदर्शन आणि आर्थिक नियोजन.", gu: "ગ્રામીણ અને અર્ધ-શહેરી ઉદ્યોગસાહસિકો માટે AI આધારિત વ્યવસાય માર્ગદર્શન અને નાણાકીય આયોજન.", ta: "கிராமப்புற மற்றும் புறநகர் தொழில்முனைவோருக்கான AI தொழில் வழிகாட்டல் மற்றும் நிதித் திட்டமிடல்.", te: "గ్రామీణ మరియు సెమీ-అర్బన్ వ్యాపారవేత్తల కోసం AI వ్యాపార మార్గదర్శకత్వం మరియు ఆర్థిక ప్రణాళిక.", ml: "ഗ്രാമീണ, അർധനഗര സംരംഭകർക്കായി AI അധിഷ്ഠിത ബിസിനസ് മാർഗനിർദേശവും സാമ്പത്തിക ആസൂത്രണവും.", bn: "গ্রামীণ ও আধা-শহুরে উদ্যোক্তাদের জন্য AI-ভিত্তিক ব্যবসায়িক পরামর্শ ও আর্থিক পরিকল্পনা।", pa: "ਪੇਂਡੂ ਅਤੇ ਅਰਧ-ਸ਼ਹਿਰੀ ਉੱਦਮੀਆਂ ਲਈ AI-ਅਧਾਰਿਤ ਕਾਰੋਬਾਰੀ ਮਾਰਗਦਰਸ਼ਨ ਅਤੇ ਵਿੱਤੀ ਯੋਜਨਾ।",
  },
  startBusinessAssessment: { en: "Start Business Assessment", hi: "व्यवसाय आकलन शुरू करें", mr: "व्यवसाय मूल्यांकन सुरू करा", gu: "વ્યવસાય મૂલ્યાંકન શરૂ કરો", ta: "தொழில் மதிப்பீட்டைத் தொடங்கு", te: "వ్యాపార అంచనా ప్రారంభించండి", ml: "ബിസിനസ് വിലയിരുത്തൽ തുടങ്ങുക", bn: "ব্যবসা মূল্যায়ন শুরু করুন", pa: "ਕਾਰੋਬਾਰ ਮੁਲਾਂਕਣ ਸ਼ੁਰੂ ਕਰੋ" },
  calcEligibility: { en: "Calculate Loan Eligibility", hi: "ऋण पात्रता जांचें", mr: "कर्ज पात्रता तपासा", gu: "લોન પાત્રતા તપાસો", ta: "கடன் தகுதியைக் கணக்கிடு", te: "రుణ అర్హతను లెక్కించండి", ml: "വായ്പാ യോഗ്യത കണക്കാക്കുക", bn: "ঋণের যোগ্যতা যাচাই করুন", pa: "ਕਰਜ਼ ਯੋਗਤਾ ਜਾਂਚੋ" },
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

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => STRINGS[k]?.en ?? String(k) });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("gu-lang");
    if (LANGUAGES.some((item) => item.code === saved)) setLangState(saved as Lang);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("gu-lang", l);
  };

  const t = (key: keyof typeof STRINGS) => STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? String(key);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
