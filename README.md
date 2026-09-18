# Gram Udyam Advisor

Build a complete, modern, responsive full-stack web application called GRAM UDYAM 

PROJECT PURPOSE

Gram Udyam is an AI-powered hyper-local business advisory and financial structuring platform for rural and semi-urban micro-entrepreneurs.

The platform helps a first-time entrepreneur answer:

1. What business can work in my local area?

2. What are the local opportunities and competitors?

3. What risks should I consider?

4. How much project cost can I afford?

5. Which government-supported loan scheme fits my project?

6. How much loan can I potentially receive?

7. What will my repayment/EMI look like?

This is an SIH 2026 prototype, not a commercial banking application.

Do NOT build a hotel-booking-style website or a generic loan website.

The core journey must be:

Location + Capital + Business Idea → Local Business Analysis → Financial Structuring → Scheme Recommendation → EMI/Repayment → Business Report

---

1. TECH STACK

Use a simple and reliable stack.

Frontend

- React

- Vite

- Tailwind CSS

- React Router

- Recharts for charts

- Lucide React for icons

Backend

- Node.js

- Express.js

Database

- MongoDB if database configuration is available.

- If MongoDB is not connected, use a clean mock-data/service layer so the application still works.

AI

Create an AI service abstraction in the backend.

Do NOT make the entire application dependent on an external AI API.

If an AI API key is unavailable, automatically use a realistic mock AI response so the website remains fully functional.

Keep AI API configuration in ".env".

---

2. IMPORTANT TOKEN/COMPLEXITY RULE

Build this as a clean MVP.

Do NOT add unnecessary features such as:

- payment gateways

- complicated authentication

- live banking integrations

- real loan applications

- complex admin dashboards

- social media

- chat systems

- unnecessary animations

- unnecessary external APIs

Prioritize a working demo.

Use reusable React components.

Do not duplicate code.

Do not create huge files if components can be separated logically.

---

3. DESIGN

Create a professional but friendly rural-development/fintech UI.

Visual style:

- clean

- modern

- trustworthy

- accessible

- mobile-first

- suitable for rural users

- simple language

- large buttons

- clear cards

- readable typography

Use a natural agriculture-inspired visual direction with green, earthy and neutral tones.

Avoid excessive gradients and excessive animations.

Use subtle hover effects and smooth transitions.

The website should look like a serious government/SIH innovation prototype, not a gaming website.

---

4. LANDING PAGE

Create "/"

Hero:

"Turn Your Business Idea Into a Smarter Business Plan."

Subtitle:

"AI-powered business guidance and financial planning for rural and semi-urban entrepreneurs."

Primary button:

Start Business Assessment

Secondary button:

Calculate Loan Eligibility

Add a simple 3-step section:

01 Tell Us

Location, available capital and business idea.

02 AI Analyzes

Market demand, competition, opportunities and risks.

03 Get Your Roadmap

Business feasibility, scheme recommendation and repayment plan.

Add a feature section:

- Hyper-Local Market Analysis

- AI Business Advisor

- Competitor Insights

- Smart Scheme Calculator

- EMI & Repayment Planner

- Multilingual Assistance

Add a simple "How It Works" section.

Add footer:

GRAM UDYAM— Empowering Rural Entrepreneurship Through Data & AI

---

5. BUSINESS ASSESSMENT PAGE

Create "/assessment".

Create a clean multi-step form.

Step 1 — Location

Fields:

- State

- District

- Block

- Village

Use normal text/select inputs.

Do not require a real map API for the MVP.

Step 2 — Financial Information

Field:

Available Margin Capital (₹)

Example:

₹1,00,000

Step 3 — Business

Business category dropdown:

- Dairy

- Agriculture

- Poultry

- Goat Farming

- Retail

- Textiles

- Food Processing

- Handicrafts

- Repair Services

- Digital Services

- Small Manufacturing

- Other

Additional fields:

- Business experience: Beginner / Some Experience / Experienced

- Target market: Village / Block / District / Nearby Town

- Optional skills/interests

Button:

"Generate My Business Report"

Validate all required fields.

Save assessment data in state and send it to the backend.

---

6. FINANCIAL CALCULATOR

Create "/calculator".

The financial calculation MUST be performed using deterministic JavaScript/backend functions, NOT by the AI.

Given:

Available Margin = M

Assuming beneficiary contribution = 10%:

Project Cost = M / 0.10

Potential Loan = Project Cost × 0.90

Example:

Margin = ₹1,00,000

Project Cost = ₹10,00,000

Potential Loan = ₹9,00,000

Show this visually:

₹1,00,000

↓

10% Own Contribution

↓

₹10,00,000 Project Cost

↓

90% Financing

↓

₹9,00,000 Potential Loan

---

7. SCHEME ROUTER

Implement the provided scheme rules as configurable constants in the backend.

MICRO FINANCE SCHEME

Project cost up to ₹1.40 lakh.

- Maximum loan: ₹1.25 lakh

- Interest: 6.5% per annum

- Tenure: 3 years

- Moratorium: 3 months

TERM LOAN SCHEME

Project cost greater than ₹1.40 lakh and up to ₹50 lakh.

- Maximum loan: ₹45 lakh

- Interest: 8% per annum

- Tenure: 7 years

- Moratorium: 6 months

Important:

The system must respect both:

- project cost limit

- maximum loan limit

Example:

If margin = ₹1 lakh:

Project Cost = ₹10 lakh

Potential Loan = ₹9 lakh

Scheme = Term Loan Scheme.

Display:

Recommended Scheme: Term Loan Scheme

---

8. EMI CALCULATOR

Create a reusable backend financial calculation service.

For a standard EMI:

EMI = P × r × (1+r)^n / ((1+r)^n - 1)

Where:

P = loan amount

r = monthly interest rate

n = number of monthly payments

Show:

- Loan Amount

- Interest Rate

- Tenure

- Estimated Monthly EMI

- Estimated Quarterly Payment

- Total Interest

- Total Repayment

Clearly label calculations as:

Estimated repayment — subject to final sanction terms.

For the prototype, show a clear moratorium period before repayment starts.

Do not claim that moratorium interest treatment is an official rule unless explicitly provided.

---

9. MAIN BUSINESS REPORT PAGE

Create "/report".

This is the most important page.

Display:

BUSINESS VIABILITY SCORE

Large circular score:

78 / 100

Use a deterministic mock score for the prototype or calculate a simple score from the assessment inputs.

Show:

- Local Demand

- Competition

- Investment Feasibility

- Profit Potential

- Risk

Use Recharts.

---

10. HYPER-LOCAL MARKET ANALYSIS

Create a section:

"Your Local Market"

Display:

- Estimated consumer base

- Estimated service radius: 5–10 km

- Primary customer groups

- Distribution channels

- Nearby market opportunities

IMPORTANT:

For the MVP, clearly label these as:

AI-based estimates / demonstration data

Do not falsely claim to have live demographic data.

Use the entered village/block/district to personalize the text.

Example:

"Based on the selected location and business category, the estimated immediate market includes households, nearby shops and institutional buyers."

---

11. OPPORTUNITY ANALYSIS

Create:

"Untapped Opportunities"

Show 3–5 opportunity cards.

Each card should contain:

- Opportunity name

- Demand level

- Competition level

- Investment requirement

- Why it may work

Example for Dairy:

- Fresh Milk Delivery

- Paneer Production

- Curd Production

- Ghee

- Institutional Supply

Generate these through the AI service or fallback mock logic.

---

12. COMPETITOR ANALYSIS

Create:

"Competition Snapshot"

Show:

- Estimated competition: Low / Medium / High

- Estimated number of similar businesses

- Main competitors/categories

- Differentiation opportunities

For MVP, use clearly labelled estimated/mock data.

Do NOT claim that real businesses were actually detected unless a real data source is connected.

Add a simple visual representation instead of requiring a paid map API.

---

13. SWOT ANALYSIS

Create a 2x2 grid:

Strengths

Weaknesses

Opportunities

Threats

Generate content according to:

- location

- business category

- available capital

Use AI when available, otherwise fallback data.

---

14. LOCAL RISK DETECTOR

Create a risk dashboard.

Show:

Supply Risk

Low / Medium / High

Demand Risk

Low / Medium / High

Seasonal Risk

Low / Medium / High

Competition Risk

Low / Medium / High

Transport Risk

Low / Medium / High

For each risk provide one short explanation and one mitigation strategy.

Example:

Seasonal Risk — Medium

"Demand may fluctuate during certain seasons."

Mitigation:

"Maintain diversified products and working capital reserves."

---

15. PRODUCT PRICING INSIGHTS

Create:

"Pricing & Market Value"

Show:

- Suggested price range

- Target customer segment

- Pricing strategy

- Expected margin range

IMPORTANT:

Use estimated/demo values unless a verified live data source exists.

Clearly display:

Indicative estimates for planning purposes.

---

16. FINANCIAL ROADMAP

Create a beautiful financial card:

YOUR FINANCIAL ROADMAP

Own Contribution:

₹1,00,000

Estimated Project Cost:

₹10,00,000

Potential Loan:

₹9,00,000

Recommended Scheme:

Term Loan Scheme

Interest:

8%

Tenure:

7 years

Moratorium:

6 months

Estimated EMI:

₹____

Estimated Quarterly Payment:

₹____

---

17. BUSINESS CASH FLOW

Create a simple chart using Recharts.

Show:

- Estimated monthly revenue

- Operating expenses

- Loan repayment

- Estimated surplus

Use clearly labelled demonstration assumptions.

Do not present fictional numbers as guaranteed income.

---

18. AI BUSINESS ADVISOR

Create a section called:

"Ask GramUdyam AI"

User can ask questions like:

- "Is dairy suitable for my location?"

- "How can I reduce my business risk?"

- "What should I sell?"

- "How can I compete with existing shops?"

- "How much working capital should I keep?"

Create a simple chat interface.

Backend endpoint:

POST "/api/advisor"

Request:

{

"question": "...",

"assessment": {...}

}

Response:

{

"answer": "..."

}

If no AI API key exists, return contextual mock responses.

Do not require authentication for this MVP.

---

19. MULTILINGUAL SUPPORT

Add language selector:

- English

- Hindi

The UI should switch major labels between English and Hindi.

For AI responses, pass selected language to the backend.

Keep translation implementation simple.

Do not build a complicated translation management system.

---

20. DOWNLOADABLE REPORT

Add button:

"Download Business Report"

For MVP, create a printable report page and use browser print functionality / print-to-PDF.

Do not add a complicated PDF server system unless easy to implement.

Report should contain:

- Entrepreneur inputs

- Business viability score

- Market analysis

- Opportunity analysis

- SWOT

- Risks

- Financial structure

- Scheme recommendation

- EMI

- Business recommendations

---

21. BACKEND API STRUCTURE

Create:

"backend/server.js"

Routes:

POST "/api/assessment"

Receives user assessment.

POST "/api/financial/calculate"

Receives:

- margin

- optional project cost

Returns:

- projectCost

- potentialLoan

- scheme

- interestRate

- tenure

- moratorium

- EMI

- quarterlyPayment

- totalInterest

- totalRepayment

POST "/api/advisor"

Receives question + assessment context.

Returns AI/fallback answer.

POST "/api/report"

Generates business report data.

Keep financial calculations in separate service files.

Suggested structure:

backend/

- server.js

- routes/

  - assessment.routes.js

  - financial.routes.js

  - advisor.routes.js

- services/

  - financial.service.js

  - advisor.service.js

  - report.service.js

- data/

  - schemes.js

  - businessData.js

- .env.example

---

22. FRONTEND STRUCTURE

Use reusable components:

src/

- components/

  - Navbar

  - Footer

  - Button

  - Card

  - Input

  - ScoreCard

  - FinancialCard

  - RiskCard

  - SWOTGrid

  - OpportunityCard

  - ChatAdvisor

  - EMIChart

- pages/

  - Home

  - Assessment

  - Calculator

  - Report

- services/

  - api.js

- data/

  - businessData.js

- App.jsx

Keep components simple and reusable.

---

23. ERROR HANDLING

The website must never break if:

- backend is unavailable

- AI API key is missing

- MongoDB is unavailable

- external data is unavailable

Show friendly messages and use fallback/demo data.

Example:

"Live AI service unavailable. Showing demonstration analysis."

Do not expose API keys in frontend code.

Use ".env".

---

24. DEMO MODE

This is extremely important.

Add a small:

"Try Demo"

button on the home page.

When clicked, automatically load a sample entrepreneur:

Location:

Sehore, Madhya Pradesh

Margin:

₹1,00,000

Business:

Dairy

Then generate the complete report.

This allows the SIH judges to see the complete product immediately without filling the form.

Clearly mark demo-generated market numbers as Demo Estimates.

---

25. RESPONSIVENESS

The website must work properly on:

- Mobile

- Tablet

- Laptop

- Desktop

Most rural users may access the platform through smartphones, so prioritize mobile UX.

Use large touch-friendly controls.

---

26. NAVIGATION

Navbar:

GRAM UDYAM 

- Home

- Business Assessment

- Calculator

- How It Works

- Try Demo

Right side:

English | हिंदी

Primary button:

Start Assessment

---

27. IMPORTANT TRUST & DISCLAIMER

Add a small disclaimer in financial sections:

"Financial figures shown are indicative estimates based on the provided scheme parameters. Final eligibility, sanction amount, interest, repayment schedule and terms are subject to verification and approval by the concerned authority."

Also label AI-generated market information as:

AI-generated / indicative analysis

Do not claim guaranteed loan approval or guaranteed business profits.

---

28. FINAL USER FLOW

The complete working flow must be:

HOME

↓

START ASSESSMENT

↓

LOCATION + CAPITAL + BUSINESS

↓

GENERATE REPORT

↓

BUSINESS VIABILITY SCORE

↓

MARKET ANALYSIS

↓

OPPORTUNITY ANALYSIS

↓

COMPETITOR INSIGHTS

↓

SWOT

↓

RISK ANALYSIS

↓

FINANCIAL CALCULATOR

↓

SCHEME AUTO-SELECTION

↓

EMI

↓

BUSINESS CASH FLOW

↓

AI RECOMMENDATION

↓

DOWNLOAD / PRINT REPORT

---

29. DEMO DATA

Include realistic but clearly labelled demonstration data for businesses such as:

Dairy

Retail

Textiles

Poultry

Food Processing

Handicrafts

Do not use random nonsense data.

The data should change according to the selected business category.

---

30. FINAL QUALITY REQUIREMENT

Before finishing:

1. Make sure frontend builds successfully.

2. Make sure backend starts successfully.

3. Make sure all routes work.

4. Make sure calculator calculations work.

5. Make sure scheme selection works.

6. Make sure EMI calculation works.

7. Make sure demo mode works.

8. Make sure report page receives assessment data.

9. Make sure mobile layout works.

10. Fix all obvious console errors.

11. Do not leave broken buttons.

12. Do not leave placeholder "Coming Soon" sections for core functionality.

The result should be a working SIH 2026 prototype, not merely a static UI mockup.

Prioritize functionality and simplicity over unnecessary complexity.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gram-udyam.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6f1f3256-0334-484b-9a67-92a665822215).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
