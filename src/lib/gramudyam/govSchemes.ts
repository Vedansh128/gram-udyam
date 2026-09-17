export type GovScheme = {
  id: string;
  name: string;
  short: string;
  bestFor: string[];
  highlights: string[];
  steps: string[];
  note?: string;
  links: { label: string; url: string }[];
  icon: "mudra" | "pmegp" | "pmfme" | "standup" | "aif" | "nrlm" | "jansamarth";
};

export const GOV_SCHEMES: GovScheme[] = [
  {
    id: "pmmy",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    short:
      "Loans for small rural businesses and micro-enterprises, including activities allied to agriculture such as dairy, poultry and beekeeping. Collateral is generally not required.",
    bestFor: [
      "Dairy business",
      "Poultry",
      "Small food business",
      "Handicrafts",
      "Rural transport",
      "Repair / service centre",
      "Small manufacturing",
      "Digital / service business",
    ],
    highlights: [
      "Shishu: up to ₹50,000",
      "Kishor: above ₹50,000 up to ₹5 lakh",
      "Tarun: above ₹5 lakh up to ₹10 lakh",
      "Tarun Plus: above ₹10 lakh up to ₹20 lakh, for borrowers who have successfully repaid a previous Tarun loan",
      "Covers both term loans and working-capital needs",
      "Collateral generally not required",
    ],
    steps: [
      "Prepare your business idea (dairy, poultry, food, handicrafts, services, etc.).",
      "Prepare basic documents: Aadhaar, PAN, bank account details, address proof, business details, quotations for machinery/equipment if applicable, business/project plan and photographs.",
      "Approach a participating bank, Regional Rural Bank, Small Finance Bank, NBFC or MFI.",
      "Submit the MUDRA loan application with your business/project details.",
      "The lender evaluates your business, repayment capacity and documents.",
      "If approved, the lender sanctions and disburses the loan.",
    ],
    note: "You can also use the Government's JanSamarth portal to check eligible credit-linked schemes and begin an application.",
    links: [
      { label: "PMMY — Department of Financial Services", url: "https://dfs.nic.in/" },
      { label: "JanSamarth Portal", url: "https://www.jansamarth.in/home" },
    ],
    icon: "mudra",
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    short:
      "For starting a new micro-enterprise in the non-farm sector, with margin-money subsidy. Anyone above 18 years can apply; there is no income ceiling.",
    bestFor: [
      "New micro-enterprises",
      "Rural food-processing units",
      "Manufacturing and service ventures",
      "Projects that generate local employment",
    ],
    highlights: [
      "Margin-money subsidy through the implementing system",
      "No income ceiling for setting up a project",
      "For projects above ₹10 lakh (manufacturing) or ₹5 lakh (business/service), at least VIII-standard education is required",
      "Online EDP training is free for eligible PMEGP beneficiaries",
    ],
    steps: [
      "Develop your business/project idea — e.g. a rural food-processing unit with machinery, workspace and working capital.",
      "Prepare a Detailed Project Report (DPR): business description, project cost, machinery/equipment, raw materials, expected sales, expenses, employment generation, profit estimate and loan requirement.",
      "Apply through the official PMEGP portal.",
      "Select the appropriate implementing agency/category and fill in your personal and project information.",
      "Upload the required documents.",
      "The application goes through the implementing agency/bank process.",
      "The bank evaluates the project and loan proposal.",
      "If sanctioned, complete the required Entrepreneurship Development Programme (EDP) training where applicable.",
      "After completion of formalities, the loan and applicable margin-money subsidy are processed according to scheme rules.",
    ],
    note: "PMEGP is intended primarily for new eligible projects. Existing units and projects that have already received government subsidy under another scheme are generally not eligible.",
    links: [
      { label: "PMEGP Government Portal", url: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp" },
      { label: "KVIC PMEGP Portal", url: "https://kvic.gov.in/" },
    ],
    icon: "pmegp",
  },
  {
    id: "pmfme",
    name: "PM Formalisation of Micro Food Processing Enterprises (PMFME)",
    short:
      "For rural food businesses — pickle, papad, flour/milling, spices, honey, fruit processing, dairy-based foods, bakery, traditional and local ODOP products.",
    bestFor: [
      "Pickle, papad and spice units",
      "Flour / milling",
      "Honey and fruit processing",
      "Dairy-related food processing",
      "Bakery and traditional food products",
      "Local / ODOP products",
    ],
    highlights: [
      "Credit-linked capital subsidy of 35% of eligible project cost",
      "Maximum subsidy of ₹10 lakh per individual micro unit",
      "Provisions for groups, common infrastructure and SHGs",
      "Uses the One District One Product (ODOP) approach",
    ],
    steps: [
      "Identify the food-processing business you want to establish or upgrade.",
      "Check your district's applicable ODOP product.",
      "Prepare your project report: existing/new business, machinery, building/workspace, raw materials, production capacity, sales projections, project cost and bank loan requirement.",
      "Register/apply through the PMFME system or the relevant state/district implementation mechanism.",
      "Submit personal, business and project documents.",
      "The application is examined by the concerned authorities/bank.",
      "The bank evaluates and sanctions the loan.",
      "After fulfilling the scheme conditions, the eligible capital subsidy is processed through the scheme mechanism.",
      "Establish/upgrade the unit and comply with applicable registrations/licences.",
    ],
    note: "If the PMFME portal shows a maintenance notice, check again later or contact the scheme/state implementation office.",
    links: [
      { label: "PMFME — Ministry of Food Processing Industries", url: "https://pmfme.mofpi.gov.in/" },
    ],
    icon: "pmfme",
  },
  {
    id: "standup",
    name: "Stand-Up India",
    short:
      "Encourages entrepreneurship among SC/ST and women entrepreneurs with composite loans from ₹10 lakh to ₹1 crore for greenfield enterprises.",
    bestFor: [
      "SC/ST entrepreneurs",
      "Women entrepreneurs",
      "Greenfield manufacturing, services or trading",
      "Activities allied to agriculture",
    ],
    highlights: [
      "Composite loans from ₹10 lakh to ₹1 crore",
      "Repayment up to 7 years, including a moratorium of up to 18 months (subject to scheme/bank conditions)",
      "Portal offers guidance on training, handholding and bank application",
    ],
    steps: [
      "Check whether you satisfy the eligibility requirements.",
      "Decide on your greenfield business (food processing, manufacturing, rural services, agri-allied or trading).",
      "Prepare a DPR/business plan.",
      "Go to the Stand-Up India portal.",
      "Register and provide your basic details.",
      "Enter business details, loan requirement, location, promoter contribution and business sector.",
      "Follow the portal's guidance regarding training, handholding and bank application.",
      "Submit the required documents and application to the participating bank.",
      "The bank evaluates the project.",
      "If sanctioned, the composite loan is disbursed according to the bank's terms.",
    ],
    links: [
      { label: "Stand-Up India Portal", url: "https://www.standupmitra.in/" },
      { label: "Stand-Up India — Department of Financial Services", url: "https://dfs.nic.in/" },
    ],
    icon: "standup",
  },
  {
    id: "aif",
    name: "Agriculture Infrastructure Fund (AIF)",
    short:
      "For rural businesses connected with agricultural infrastructure — post-harvest management, warehousing, cold storage, processing and supply-chain assets.",
    bestFor: [
      "Post-harvest management",
      "Warehousing and cold storage",
      "Agri-processing infrastructure",
      "Supply-chain infrastructure",
      "Agricultural community assets",
    ],
    highlights: [
      "Supports eligible agricultural infrastructure projects",
      "Also available through the JanSamarth credit-linked scheme platform",
    ],
    steps: [
      "Determine whether your proposed project qualifies as an eligible AIF activity.",
      "Prepare a detailed project report.",
      "Collect land/lease, business, identity and project-related documents.",
      "Register/login through the AIF application mechanism or access it through JanSamarth where available.",
      "Enter the project and financing details.",
      "Upload the DPR and supporting documents.",
      "Select/submit to the financing institution.",
      "The bank evaluates the project.",
      "If approved, the loan is sanctioned and scheme benefits are processed according to AIF rules.",
    ],
    links: [
      { label: "JanSamarth Portal", url: "https://www.jansamarth.in/home" },
      { label: "AIF — Ministry of Agriculture", url: "https://agriinfra.dac.gov.in/" },
    ],
    icon: "aif",
  },
  {
    id: "nrlm",
    name: "DAY-NRLM — Rural Self-Help Group Financing",
    short:
      "Supports rural Self-Help Groups (SHGs) with financial inclusion and livelihood development — useful for handicrafts, food products, tailoring, dairy, livestock, small manufacturing and village enterprises.",
    bestFor: [
      "Self-Help Groups (SHGs)",
      "Handicrafts and food products",
      "Tailoring and small manufacturing",
      "Dairy and livestock activities",
      "Local services and village enterprises",
    ],
    highlights: [
      "Organizes rural households into SHGs",
      "Supports financial inclusion and livelihood development",
      "Operates across the country except Delhi and Chandigarh",
    ],
    steps: [
      "Find your local SHG/NRLM structure through your State Rural Livelihood Mission.",
      "If you aren't already part of an SHG, enquire about SHG formation/joining through the local NRLM system.",
      "The SHG develops its savings and financial records.",
      "Identify the proposed income-generating activity.",
      "Prepare the business/activity plan.",
      "Approach the linked bank through the SHG mechanism.",
      "Submit the required SHG records and loan proposal.",
      "The bank evaluates the credit proposal.",
      "After sanction, the funds are used according to the approved livelihood/business activity.",
    ],
    links: [
      { label: "DAY-NRLM — Ministry of Rural Development", url: "https://aajeevika.gov.in/" },
    ],
    icon: "nrlm",
  },
  {
    id: "jansamarth",
    name: "JanSamarth — One Portal for Multiple Schemes",
    short:
      "Not a single loan scheme, but a government gateway that brings together multiple credit-linked Central Government schemes and helps you find the ones you may be eligible for.",
    bestFor: [
      "Checking eligibility across schemes",
      "Comparing credit-linked government schemes",
      "Starting an application with a participating lender",
    ],
    highlights: [
      "Integrates information from Aadhaar, PAN, income, Udyam and banking systems",
      "Identifies schemes you may be eligible for",
      "Lets you track the application through the portal/lender",
    ],
    steps: [
      "Open JanSamarth.",
      "Select the relevant category/purpose.",
      "Answer questions about your occupation, business, income, location, loan requirement, social category (where relevant) and agricultural/business activity.",
      "The portal identifies schemes for which you may be eligible.",
      "Select the appropriate scheme.",
      "Check the eligibility requirements.",
      "Complete the application.",
      "Upload/verify the required documents.",
      "Select/approach the participating lender.",
      "Track the application through the portal/lender.",
    ],
    links: [{ label: "JanSamarth Portal", url: "https://www.jansamarth.in/home" }],
    icon: "jansamarth",
  },
];
