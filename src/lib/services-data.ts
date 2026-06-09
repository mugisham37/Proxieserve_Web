export type ServiceStatus = "active" | "paused" | "unavailable" | "archived";
export type ServiceCategory = "tax" | "identity" | "business" | "welfare" | "permits";
export type ServiceColour = "marigold" | "pink" | "green" | "blue" | "red" | "cream";

export interface ServiceRequirement {
  label: string;
  docType: "id" | "certificate" | "photo" | "form" | "proof" | "other";
  note?: string;
  status?: "required" | "optional" | "conditional";
}

export interface ServiceStep {
  num: number;
  title: string;
  body: string;
}

export interface ServicePricingTier {
  label: "Standard" | "Express" | "Urgent";
  fee: number;
  eta: string;
  includes: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

/* ─── Application wizard schema (Flow 3) ─── */

export interface AppFieldOption {
  value: string;
  label: string;
  description?: string;
}

export interface AppField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "radio-card" | "date" | "switch" | "checkbox";
  required?: boolean;
  optional?: true;
  conditional?: { field: string; values: string[] };
  options?: AppFieldOption[];
  placeholder?: string;
  help?: string;
  helpDetail?: string;
  mono?: boolean;
  maxLength?: number;
  rows?: number;
  inputMode?: "numeric" | "tel" | "email" | "text";
  charCount?: boolean;
}

export interface AppCard {
  id: string;
  title: string;
  fields: AppField[];
}

export interface ServiceApplicationConfig {
  step2Title: string;
  step2Lede: string;
  cards: AppCard[];
}

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  colour: ServiceColour;
  status: ServiceStatus;
  fee: number;
  urgentFee?: number;
  eta: string;
  lede: string;
  description: string;
  requirements: ServiceRequirement[];
  steps: ServiceStep[];
  pricingTiers: ServicePricingTier[];
  faqs: ServiceFAQ[];
  relatedSlugs: string[];
  flags: {
    geoBlocked?: boolean;
    inPersonRequired?: boolean;
    waitlistActive?: boolean;
    eligibilityCheckRequired?: boolean;
  };
  applicationConfig: ServiceApplicationConfig;
}

export const SERVICES: Service[] = [
  {
    slug: "company-registration",
    name: "Company Registration",
    category: "business",
    colour: "blue",
    status: "active",
    fee: 85000,
    urgentFee: 135000,
    eta: "4–6 days",
    lede: "Register your company with RDB without stepping into a government office.",
    description:
      "ProxiServe handles your entire company registration with the Rwanda Development Board — from name reservation to certificate collection. We manage all documentation, follow up with officials, and deliver your certificate of incorporation digitally.",
    requirements: [
      { label: "National ID or Passport", docType: "id" },
      { label: "Proposed company name (3 options)", docType: "form", note: "We check availability" },
      { label: "Shareholders list with % ownership", docType: "form" },
      { label: "Physical address / plot number", docType: "proof" },
      { label: "Articles of Association (or we draft them)", docType: "certificate", note: "We can draft these for you", status: "optional" },
    ],
    steps: [
      { num: 1, title: "Submit your details", body: "Fill in the online form with your company name, shareholders, and address. We'll confirm everything is complete." },
      { num: 2, title: "Name reservation", body: "We check availability and reserve your preferred company name with RDB within 24 hours." },
      { num: 3, title: "Document preparation", body: "We prepare and review all incorporation documents, including Articles of Association if needed." },
      { num: 4, title: "RDB submission", body: "We submit your application to the Rwanda Development Board on your behalf and track its progress." },
      { num: 5, title: "Certificate delivery", body: "Your certificate of incorporation is delivered digitally to your email and available in your ProxiServe dashboard." },
    ],
    pricingTiers: [
      {
        label: "Standard",
        fee: 85000,
        eta: "4–6 days",
        includes: ["Name reservation", "Document preparation", "RDB submission", "Digital certificate delivery", "One revision"],
      },
      {
        label: "Express",
        fee: 120000,
        eta: "2–3 days",
        includes: ["Everything in Standard", "Priority processing", "Dedicated agent", "Phone updates"],
      },
      {
        label: "Urgent",
        fee: 135000,
        eta: "24 hours",
        includes: ["Everything in Express", "Same-day processing", "Direct RDB liaison", "WhatsApp live updates"],
      },
    ],
    faqs: [
      { question: "How many shareholders can I have?", answer: "A private limited company in Rwanda can have 1 to 100 shareholders. We support all configurations." },
      { question: "Can I register as a foreigner?", answer: "Yes. Foreign nationals can register a company in Rwanda. You'll need a valid passport and an agent letter. We handle the agent letter." },
      { question: "Do I need to visit RDB in person?", answer: "No. The entire process can be completed remotely through ProxiServe. We handle all in-person visits." },
      { question: "What documents do I receive?", answer: "You receive a Certificate of Incorporation, Articles of Association, and your company's TIN number." },
    ],
    relatedSlugs: ["tin-registration", "business-permit", "vat-registration"],
    flags: {},
    applicationConfig: {
      step2Title: "Company details",
      step2Lede: "Tell us about the company you want to register.",
      cards: [
        {
          id: "names",
          title: "Proposed company names",
          fields: [
            { id: "name1", label: "First choice name", type: "text", required: true, placeholder: "e.g. Kigali Ventures Ltd", help: "We check availability with RDB" },
            { id: "name2", label: "Second choice name", type: "text", optional: true, placeholder: "Backup if first is taken" },
            { id: "name3", label: "Third choice name", type: "text", optional: true, placeholder: "Backup if second is taken" },
            { id: "companyType", label: "Company type", type: "select", required: true, options: [
              { value: "private-limited", label: "Private Limited Company (Ltd)" },
              { value: "partnership", label: "Partnership" },
              { value: "sole-proprietorship", label: "Sole Proprietorship" },
            ]},
          ],
        },
        {
          id: "shareholders",
          title: "Shareholders",
          fields: [
            { id: "shareholderCount", label: "Number of shareholders", type: "select", required: true, options: [
              { value: "1", label: "1 (sole owner)" },
              { value: "2-5", label: "2–5" },
              { value: "6-20", label: "6–20" },
              { value: "21-100", label: "21–100" },
            ]},
            { id: "directorIsShareholder", label: "Is the director also a shareholder?", type: "radio-card", required: true, options: [
              { value: "yes", label: "Yes", description: "Most common for small businesses" },
              { value: "no", label: "No", description: "Director and owners are different people" },
            ]},
          ],
        },
        {
          id: "business",
          title: "Business details",
          fields: [
            { id: "businessDescription", label: "Business activity description", type: "textarea", required: true, rows: 3, placeholder: "e.g. Wholesale distribution of agricultural produce", help: "Describe your main business activity in plain terms", charCount: true, maxLength: 300 },
            { id: "address", label: "Principal place of business", type: "text", required: true, placeholder: "e.g. KN 5 Road, Kigali" },
            { id: "district", label: "District", type: "select", required: true, options: [
              { value: "kigali-gasabo", label: "Kigali — Gasabo" },
              { value: "kigali-kicukiro", label: "Kigali — Kicukiro" },
              { value: "kigali-nyarugenge", label: "Kigali — Nyarugenge" },
              { value: "eastern", label: "Eastern Province" },
              { value: "western", label: "Western Province" },
              { value: "northern", label: "Northern Province" },
              { value: "southern", label: "Southern Province" },
            ]},
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, placeholder: "Any special requirements, foreign shareholders, etc.", charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "national-id",
    name: "National ID Renewal",
    category: "identity",
    colour: "pink",
    status: "active",
    fee: 25000,
    urgentFee: 45000,
    eta: "5–7 days",
    lede: "Renew your Rwandan National ID without leaving home — ideal for diaspora.",
    description:
      "Lost or expired national ID? ProxiServe manages your renewal application with the National Identification Agency (NIDA) on your behalf. We collect your documents, submit the application, and arrange delivery of your new ID card.",
    requirements: [
      { label: "Old or expired National ID (or police report if lost)", docType: "id" },
      { label: "Passport-size photo (2 copies)", docType: "photo" },
      { label: "Birth certificate", docType: "certificate" },
      { label: "Proof of residence", docType: "proof" },
    ],
    steps: [
      { num: 1, title: "Upload your documents", body: "Send us photos of your existing ID, birth certificate, and a passport photo via our secure portal." },
      { num: 2, title: "Application preparation", body: "We prepare the renewal application form and verify all documents meet NIDA requirements." },
      { num: 3, title: "NIDA submission", body: "We submit your application to the National Identification Agency on your behalf." },
      { num: 4, title: "Follow-up", body: "We track your application status and follow up with NIDA if there are any delays." },
      { num: 5, title: "ID delivery", body: "Your new National ID is collected and delivered to your address or held for pickup at our office." },
    ],
    pricingTiers: [
      {
        label: "Standard",
        fee: 25000,
        eta: "5–7 days",
        includes: ["Document verification", "Application submission", "Status tracking", "ID collection & delivery"],
      },
      {
        label: "Express",
        fee: 35000,
        eta: "3–4 days",
        includes: ["Everything in Standard", "Priority lane submission", "Daily status updates"],
      },
      {
        label: "Urgent",
        fee: 45000,
        eta: "2 days",
        includes: ["Everything in Express", "Dedicated agent", "WhatsApp live updates"],
      },
    ],
    faqs: [
      { question: "Can I renew from abroad?", answer: "Yes. Diaspora members can send documents via courier or digitally (if the originals are not required by NIDA for your case). Contact us to confirm." },
      { question: "What if my ID was stolen?", answer: "You'll need a police report from the nearest police station. We can advise on how to obtain this remotely." },
      { question: "How long does NIDA processing take?", answer: "NIDA typically processes applications in 3–5 working days. Our service adds 1–2 days for document handling and delivery." },
    ],
    relatedSlugs: ["passport-application", "driving-license", "tin-registration"],
    flags: {},
    applicationConfig: {
      step2Title: "ID details",
      step2Lede: "Tell us about your current National ID and why you're renewing.",
      cards: [
        {
          id: "reason",
          title: "Reason for renewal",
          fields: [
            { id: "reason", label: "Why are you renewing?", type: "radio-card", required: true, options: [
              { value: "expired", label: "It's expired (or expiring soon)", description: "The most common case" },
              { value: "lost", label: "I lost it", description: "A police report will be required" },
              { value: "stolen", label: "It was stolen", description: "A police report will be required" },
              { value: "damaged", label: "It's damaged", description: "We'll need a photo of the damaged ID" },
            ]},
            { id: "policeRef", label: "Police case reference number", type: "text", mono: true, conditional: { field: "reason", values: ["lost", "stolen"] }, placeholder: "RNP-2026-XXXXX", help: "From the police report. Upload the report at step 3." },
          ],
        },
        {
          id: "current",
          title: "Your current ID",
          fields: [
            { id: "oldIdNumber", label: "Old ID number", type: "text", mono: true, optional: true, inputMode: "numeric", placeholder: "1 YYYY 8 NNNNNNN N NN", help: "If available — leave blank if you don't have it" },
            { id: "placeOfIssue", label: "Place of issue", type: "select", optional: true, options: [
              { value: "kigali", label: "Kigali — NIDA" },
              { value: "eastern", label: "Eastern Province" },
              { value: "western", label: "Western Province" },
              { value: "northern", label: "Northern Province" },
              { value: "southern", label: "Southern Province" },
              { value: "dont-know", label: "I don't remember" },
            ]},
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, placeholder: "e.g. I'm in the diaspora and will courier documents", charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "tin-registration",
    name: "TIN Registration",
    category: "tax",
    colour: "marigold",
    status: "active",
    fee: 20000,
    urgentFee: 35000,
    eta: "2–3 days",
    lede: "Get your Tax Identification Number from RRA in 2–3 days, fully remote.",
    description:
      "A TIN (Tax Identification Number) is required for any business activity, employment, or property transaction in Rwanda. ProxiServe handles your TIN registration with the Rwanda Revenue Authority, including document preparation and submission.",
    requirements: [
      { label: "National ID or Passport", docType: "id" },
      { label: "Proof of address", docType: "proof" },
      { label: "Company registration certificate (for business TIN)", docType: "certificate", note: "Only for business TINs" },
    ],
    steps: [
      { num: 1, title: "Provide your details", body: "Share your ID and address details. We confirm whether you need a personal or business TIN." },
      { num: 2, title: "Application preparation", body: "We prepare your RRA application with all required supporting documents." },
      { num: 3, title: "RRA submission", body: "We submit directly to Rwanda Revenue Authority and collect your TIN certificate." },
      { num: 4, title: "TIN delivery", body: "Your TIN certificate is delivered digitally within 24 hours of RRA approval." },
    ],
    pricingTiers: [
      {
        label: "Standard",
        fee: 20000,
        eta: "2–3 days",
        includes: ["Document preparation", "RRA submission", "TIN certificate delivery"],
      },
      {
        label: "Express",
        fee: 28000,
        eta: "24 hours",
        includes: ["Everything in Standard", "Same-day submission", "Digital + printed certificate"],
      },
      {
        label: "Urgent",
        fee: 35000,
        eta: "Same day",
        includes: ["Everything in Express", "Dedicated agent", "WhatsApp confirmation"],
      },
    ],
    faqs: [
      { question: "Do I need a TIN if I'm employed?", answer: "Your employer typically registers you for a TIN when you join. Check your payslip. If you don't have one, we can register you." },
      { question: "Can I have both a personal and business TIN?", answer: "Yes. A personal TIN covers your individual tax obligations, while a business TIN is for your registered company." },
      { question: "Is a TIN the same as a VAT number?", answer: "No. A TIN is issued by RRA for all taxpayers. A VAT number is only for businesses with annual turnover above RWF 20 million." },
    ],
    relatedSlugs: ["company-registration", "vat-registration", "annual-returns"],
    flags: {},
    applicationConfig: {
      step2Title: "TIN details",
      step2Lede: "Tell us what type of TIN you need and your tax situation.",
      cards: [
        {
          id: "tinType",
          title: "TIN type",
          fields: [
            { id: "tinType", label: "What kind of TIN do you need?", type: "radio-card", required: true, options: [
              { value: "personal", label: "Personal TIN", description: "For individuals — employment, property, investments" },
              { value: "business", label: "Business TIN", description: "For a registered company or sole proprietorship" },
            ]},
            { id: "companyName", label: "Registered company name", type: "text", conditional: { field: "tinType", values: ["business"] }, placeholder: "Exactly as on your RDB certificate", help: "Must match your registration certificate" },
            { id: "companyTin", label: "Company registration number", type: "text", mono: true, conditional: { field: "tinType", values: ["business"] }, placeholder: "RDB-XXXXXX", optional: true },
          ],
        },
        {
          id: "employment",
          title: "Employment / business details",
          fields: [
            { id: "employmentStatus", label: "Employment status", type: "select", conditional: { field: "tinType", values: ["personal"] }, required: true, options: [
              { value: "employed", label: "Employed (salary)" },
              { value: "self-employed", label: "Self-employed / freelance" },
              { value: "property-owner", label: "Property owner" },
              { value: "other", label: "Other" },
            ]},
            { id: "address", label: "Your current address", type: "text", required: true, placeholder: "e.g. KG 11 Ave, Gasabo, Kigali" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "business-permit",
    name: "Business Permit",
    category: "permits",
    colour: "green",
    status: "active",
    fee: 45000,
    urgentFee: 70000,
    eta: "3–5 days",
    lede: "Obtain your local government business permit without the queue.",
    description:
      "All businesses operating in Rwanda require a business permit from the local district authority. ProxiServe manages the application process with your district office, including document submission and permit collection.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "National ID of director", docType: "id" },
      { label: "Proof of business premises", docType: "proof" },
      { label: "Fire safety inspection certificate", docType: "certificate", note: "Required for some business types" },
    ],
    steps: [
      { num: 1, title: "Submit documents", body: "Upload your company certificate, TIN, and premises proof to our secure portal." },
      { num: 2, title: "District review", body: "We submit your application to the appropriate district office and track its progress." },
      { num: 3, title: "Inspection coordination", body: "If a site inspection is required, we coordinate the appointment on your behalf." },
      { num: 4, title: "Permit collection", body: "We collect your permit and deliver it to you physically or digitally." },
    ],
    pricingTiers: [
      {
        label: "Standard",
        fee: 45000,
        eta: "3–5 days",
        includes: ["Document review", "District submission", "Inspection coordination", "Permit collection & delivery"],
      },
      {
        label: "Express",
        fee: 60000,
        eta: "2 days",
        includes: ["Everything in Standard", "Priority district liaison", "Phone updates"],
      },
      {
        label: "Urgent",
        fee: 70000,
        eta: "24 hours",
        includes: ["Everything in Express", "Dedicated agent", "Guaranteed next-day delivery"],
      },
    ],
    faqs: [
      { question: "How often do I renew a business permit?", answer: "Business permits in Rwanda are typically renewed annually. We offer renewal reminders and a discounted renewal service for returning clients." },
      { question: "What if my business operates in multiple districts?", answer: "You need a separate permit for each district. Contact us for a multi-district bundle." },
    ],
    relatedSlugs: ["company-registration", "trade-license", "import-permit"],
    flags: { inPersonRequired: false },
    applicationConfig: {
      step2Title: "Business details",
      step2Lede: "Tell us about your business premises and operations.",
      cards: [
        {
          id: "business",
          title: "Your business",
          fields: [
            { id: "tradingName", label: "Trading / business name", type: "text", required: true, placeholder: "As shown on your company registration" },
            { id: "businessType", label: "Business type", type: "select", required: true, options: [
              { value: "retail", label: "Retail shop" },
              { value: "wholesale", label: "Wholesale / distribution" },
              { value: "services", label: "Professional services" },
              { value: "hospitality", label: "Restaurant / hotel / hospitality" },
              { value: "manufacturing", label: "Manufacturing / production" },
              { value: "other", label: "Other" },
            ]},
            { id: "district", label: "District of operation", type: "select", required: true, options: [
              { value: "kigali-gasabo", label: "Kigali — Gasabo" },
              { value: "kigali-kicukiro", label: "Kigali — Kicukiro" },
              { value: "kigali-nyarugenge", label: "Kigali — Nyarugenge" },
              { value: "eastern", label: "Eastern Province" },
              { value: "western", label: "Western Province" },
              { value: "northern", label: "Northern Province" },
              { value: "southern", label: "Southern Province" },
            ]},
            { id: "premisesAddress", label: "Business premises address", type: "text", required: true, placeholder: "e.g. KN 5 Road, Nyarugenge" },
          ],
        },
        {
          id: "operations",
          title: "Operations",
          fields: [
            { id: "employeeCount", label: "Number of employees", type: "select", optional: true, options: [
              { value: "0", label: "None (sole trader)" },
              { value: "1-5", label: "1–5" },
              { value: "6-20", label: "6–20" },
              { value: "21+", label: "21+" },
            ]},
            { id: "operatingHours", label: "Operating hours", type: "text", optional: true, placeholder: "e.g. Mon–Fri 8am–6pm, Sat 9am–2pm" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "rssb-enrollment",
    name: "RSSB Enrollment",
    category: "welfare",
    colour: "red",
    status: "active",
    fee: 30000,
    eta: "3–4 days",
    lede: "Enroll your employees with RSSB and meet your social security obligations.",
    description:
      "All employers in Rwanda are required to register with the Rwanda Social Security Board and enroll their employees. ProxiServe manages your RSSB employer registration, employee enrollment, and first contribution setup.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "List of employees with IDs and salaries", docType: "form" },
      { label: "National ID of HR/payroll contact", docType: "id" },
    ],
    steps: [
      { num: 1, title: "Employer registration", body: "We register your company as an employer with RSSB using your registration certificate and TIN." },
      { num: 2, title: "Employee enrollment", body: "We submit your employee list and enroll each employee in the RSSB system." },
      { num: 3, title: "Contribution setup", body: "We configure your monthly contribution schedule based on your payroll." },
      { num: 4, title: "RSSB confirmation", body: "You receive your RSSB employer number and employee enrollment confirmations." },
    ],
    pricingTiers: [
      {
        label: "Standard",
        fee: 30000,
        eta: "3–4 days",
        includes: ["Employer registration", "Employee enrollment (up to 10)", "Contribution setup", "RSSB confirmation"],
      },
      {
        label: "Express",
        fee: 45000,
        eta: "2 days",
        includes: ["Everything in Standard", "Up to 25 employees", "Priority processing"],
      },
      {
        label: "Urgent",
        fee: 60000,
        eta: "24 hours",
        includes: ["Everything in Express", "Up to 50 employees", "Dedicated payroll consultant"],
      },
    ],
    faqs: [
      { question: "Is RSSB enrollment mandatory?", answer: "Yes. Employers with at least one employee are required by law to register with RSSB and make monthly contributions." },
      { question: "What percentage is the RSSB contribution?", answer: "The total contribution is 8% of gross salary — 5% from the employer and 3% from the employee." },
    ],
    relatedSlugs: ["company-registration", "tin-registration", "social-security"],
    flags: {},
    applicationConfig: {
      step2Title: "Employment details",
      step2Lede: "Tell us about the employer and employees to be enrolled.",
      cards: [
        {
          id: "employer",
          title: "Employer details",
          fields: [
            { id: "employerName", label: "Company / employer name", type: "text", required: true, placeholder: "As registered with RDB" },
            { id: "employerTin", label: "Employer TIN number", type: "text", mono: true, required: true, inputMode: "numeric", placeholder: "RRA-XXXXXXXXX", help: "Found on your company's TIN certificate" },
            { id: "employmentStartDate", label: "Employment start date", type: "date", required: true, help: "Date the employee(s) started work" },
          ],
        },
        {
          id: "enrollment",
          title: "Enrollment type",
          fields: [
            { id: "enrollmentType", label: "Who are we enrolling?", type: "radio-card", required: true, options: [
              { value: "employer-only", label: "Employer only", description: "Register the company as an RSSB employer" },
              { value: "employees", label: "Employees", description: "Enroll one or more existing employees" },
              { value: "both", label: "Both", description: "Register the company and enroll employees" },
            ]},
            { id: "employeeCount", label: "Number of employees to enroll", type: "select", conditional: { field: "enrollmentType", values: ["employees", "both"] }, required: true, options: [
              { value: "1", label: "1" },
              { value: "2-5", label: "2–5" },
              { value: "6-10", label: "6–10" },
              { value: "11+", label: "11+" },
            ]},
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "passport-application",
    name: "Passport Application",
    category: "identity",
    colour: "pink",
    status: "active",
    fee: 40000,
    urgentFee: 65000,
    eta: "7–10 days",
    lede: "Apply for or renew your Rwandan passport without visiting the immigration office.",
    description:
      "ProxiServe manages your passport application with the Directorate General of Immigration and Emigration, from biometric appointment booking to passport collection.",
    requirements: [
      { label: "National ID", docType: "id" },
      { label: "Birth certificate", docType: "certificate" },
      { label: "Passport-size photos (4 copies)", docType: "photo" },
      { label: "Old passport (for renewal)", docType: "id", note: "Only for renewals", status: "conditional" },
      { label: "Proof of citizenship", docType: "proof", note: "If born outside Rwanda", status: "conditional" },
    ],
    steps: [
      { num: 1, title: "Document review", body: "We verify your documents meet Immigration requirements before submission." },
      { num: 2, title: "Biometric appointment", body: "We book your biometric appointment at the nearest immigration office — you only need to attend for fingerprints." },
      { num: 3, title: "Application submission", body: "We submit your full application package to Immigration." },
      { num: 4, title: "Passport collection", body: "We collect your passport and deliver it to you or arrange pickup at our office." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 40000, eta: "7–10 days", includes: ["Document review", "Biometric booking", "Application submission", "Passport collection"] },
      { label: "Express", fee: 52000, eta: "5 days", includes: ["Everything in Standard", "Priority appointment slot", "Expedited processing request"] },
      { label: "Urgent", fee: 65000, eta: "3 days", includes: ["Everything in Express", "Dedicated agent", "Emergency processing liaison"] },
    ],
    faqs: [
      { question: "Do I need to attend in person?", answer: "You must attend once for biometric capture (fingerprints and photo). We handle everything else." },
      { question: "How long is a Rwandan passport valid?", answer: "Adult passports are valid for 10 years. Child passports (under 16) are valid for 5 years." },
    ],
    relatedSlugs: ["national-id", "driving-license", "notary-services"],
    flags: { inPersonRequired: true },
    applicationConfig: {
      step2Title: "Passport details",
      step2Lede: "Tell us about your current passport and why you're renewing.",
      cards: [
        {
          id: "reason",
          title: "Why are you renewing?",
          fields: [
            { id: "reason", label: "Reason for renewal", type: "radio-card", required: true, options: [
              { value: "expired", label: "It's expired (or about to)", description: "The most common case — standard renewal" },
              { value: "full", label: "Pages are full", description: "No empty visa pages left" },
              { value: "lost", label: "It was lost", description: "We'll need a police clearance" },
              { value: "stolen", label: "It was stolen", description: "We'll need a police report" },
            ]},
            { id: "policeRef", label: "Police case reference number", type: "text", mono: true, conditional: { field: "reason", values: ["lost", "stolen"] }, placeholder: "RNP-2026-XXXXX", help: "From the police report. We'll need a photo of the report at step 3." },
          ],
        },
        {
          id: "current",
          title: "Your current passport",
          fields: [
            { id: "passportNum", label: "Passport number", type: "text", mono: true, required: true, maxLength: 9, placeholder: "PC123456", helpDetail: "Your passport number is on the bio-data page — the page with your photo. It typically starts with 'PC' and is 8–9 characters long." },
            { id: "expiry", label: "Expiry date", type: "date", optional: true, help: "If unsure, check the bio page or leave blank" },
            { id: "placeIssue", label: "Place of issue", type: "select", optional: true, options: [
              { value: "kigali", label: "Kigali — Department of Immigration" },
              { value: "embassy", label: "Embassy abroad (specify in notes)" },
              { value: "dont-know", label: "I don't remember" },
            ]},
          ],
        },
        {
          id: "travel",
          title: "Are you travelling soon?",
          fields: [
            { id: "travel", label: "Upcoming travel plans", type: "radio-card", optional: true, options: [
              { value: "urgent", label: "Yes — within 2 weeks", description: "We'll prioritise your application" },
              { value: "soon", label: "Yes — within 1–2 months" },
              { value: "later", label: "Later than that" },
              { value: "none", label: "No travel planned" },
            ]},
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 4, placeholder: "e.g. I need it urgently for a visa appointment on 15 June", charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "trade-license",
    name: "Trade License",
    category: "permits",
    colour: "green",
    status: "active",
    fee: 55000,
    urgentFee: 85000,
    eta: "4–6 days",
    lede: "Get your trade license for commercial and retail operations in Rwanda.",
    description:
      "A trade license is required for commercial and retail businesses operating in Rwanda. ProxiServe handles your application with the Rwanda Standards Board and relevant district authorities.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "Business permit", docType: "certificate" },
      { label: "Premises lease or ownership proof", docType: "proof" },
      { label: "Product/service list", docType: "form" },
    ],
    steps: [
      { num: 1, title: "Business classification", body: "We determine the correct license category for your business type." },
      { num: 2, title: "Document compilation", body: "We compile and review all required documents for your application." },
      { num: 3, title: "RSB submission", body: "We submit your application to the Rwanda Standards Board." },
      { num: 4, title: "License delivery", body: "Your trade license is collected and delivered once approved." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 55000, eta: "4–6 days", includes: ["Business classification", "Document compilation", "RSB submission", "License delivery"] },
      { label: "Express", fee: 70000, eta: "2–3 days", includes: ["Everything in Standard", "Priority submission", "Daily updates"] },
      { label: "Urgent", fee: 85000, eta: "24 hours", includes: ["Everything in Express", "Dedicated agent", "WhatsApp updates"] },
    ],
    faqs: [
      { question: "Is a trade license the same as a business permit?", answer: "No. A business permit is from the district authority. A trade license is from the Rwanda Standards Board and covers specific trading activities." },
      { question: "Do I need both a business permit and a trade license?", answer: "For most commercial operations, yes. We can handle both in a bundled service." },
    ],
    relatedSlugs: ["business-permit", "company-registration", "import-permit"],
    flags: {},
    applicationConfig: {
      step2Title: "License details",
      step2Lede: "Tell us about the trade license you need.",
      cards: [
        {
          id: "business",
          title: "Your business",
          fields: [
            { id: "tradingName", label: "Trading name", type: "text", required: true, placeholder: "As on your company certificate" },
            { id: "sector", label: "Business sector", type: "select", required: true, options: [
              { value: "food-beverage", label: "Food & beverage" },
              { value: "retail", label: "Retail trade" },
              { value: "electronics", label: "Electronics & technology" },
              { value: "construction", label: "Construction & materials" },
              { value: "pharmaceuticals", label: "Pharmaceuticals" },
              { value: "agriculture", label: "Agriculture & produce" },
              { value: "other", label: "Other" },
            ]},
          ],
        },
        {
          id: "renewal",
          title: "License details",
          fields: [
            { id: "licenseStatus", label: "License status", type: "radio-card", required: true, options: [
              { value: "new", label: "New application", description: "First-time trade license" },
              { value: "renewal", label: "Renewal", description: "Renewing an existing license" },
              { value: "lost", label: "Lost / replacement", description: "Lost my existing license" },
            ]},
            { id: "currentLicenseNumber", label: "Current license number", type: "text", mono: true, conditional: { field: "licenseStatus", values: ["renewal"] }, optional: true, placeholder: "RSB-XXXXXX" },
            { id: "currentExpiry", label: "Current license expiry date", type: "date", conditional: { field: "licenseStatus", values: ["renewal"] }, optional: true },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "vat-registration",
    name: "VAT Registration",
    category: "tax",
    colour: "marigold",
    status: "active",
    fee: 30000,
    eta: "2–4 days",
    lede: "Register for VAT with RRA once your business crosses the threshold.",
    description:
      "Businesses in Rwanda with annual turnover exceeding RWF 20 million are required to register for VAT. ProxiServe handles your VAT registration with the Rwanda Revenue Authority, including application preparation and certificate collection.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "Financial statements or turnover proof", docType: "proof" },
      { label: "Bank account details", docType: "proof" },
    ],
    steps: [
      { num: 1, title: "Eligibility confirmation", body: "We verify your business meets the RWF 20M annual turnover threshold for VAT registration." },
      { num: 2, title: "Application preparation", body: "We prepare your VAT registration application with supporting financial documents." },
      { num: 3, title: "RRA submission", body: "We submit your application to the Rwanda Revenue Authority." },
      { num: 4, title: "VAT certificate", body: "Your VAT registration certificate is delivered digitally once approved." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 30000, eta: "2–4 days", includes: ["Eligibility check", "Application preparation", "RRA submission", "VAT certificate delivery"] },
      { label: "Express", fee: 42000, eta: "24 hours", includes: ["Everything in Standard", "Priority processing", "Same-day confirmation"] },
      { label: "Urgent", fee: 55000, eta: "Same day", includes: ["Everything in Express", "Dedicated tax consultant", "WhatsApp updates"] },
    ],
    faqs: [
      { question: "What is the VAT rate in Rwanda?", answer: "The standard VAT rate in Rwanda is 18%. Some goods and services are zero-rated or exempt." },
      { question: "When do I start charging VAT?", answer: "Once your VAT registration is confirmed by RRA, you must start charging VAT on all taxable supplies from that date." },
    ],
    relatedSlugs: ["tin-registration", "company-registration", "annual-returns"],
    flags: { eligibilityCheckRequired: true },
    applicationConfig: {
      step2Title: "VAT registration details",
      step2Lede: "Tell us about your business turnover and registration requirements.",
      cards: [
        {
          id: "turnover",
          title: "Annual turnover",
          fields: [
            { id: "turnoverRange", label: "Annual turnover (RWF)", type: "radio-card", required: true, options: [
              { value: "20m-50m", label: "RWF 20M – 50M", description: "At or just above the VAT threshold" },
              { value: "50m-100m", label: "RWF 50M – 100M" },
              { value: "100m-500m", label: "RWF 100M – 500M" },
              { value: "500m+", label: "RWF 500M+" },
            ]},
            { id: "existingTin", label: "Your TIN number", type: "text", mono: true, required: true, inputMode: "numeric", placeholder: "RRA-XXXXXXXXX", help: "Required for VAT registration" },
          ],
        },
        {
          id: "registration",
          title: "Registration details",
          fields: [
            { id: "businessType", label: "Type of business", type: "select", required: true, options: [
              { value: "sole", label: "Sole proprietorship" },
              { value: "company", label: "Limited company" },
              { value: "partnership", label: "Partnership" },
            ]},
            { id: "effectiveDate", label: "Preferred VAT effective date", type: "date", optional: true, help: "Leave blank and we'll use the earliest available" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "annual-returns",
    name: "Annual Returns Filing",
    category: "business",
    colour: "blue",
    status: "active",
    fee: 65000,
    urgentFee: 95000,
    eta: "3–5 days",
    lede: "File your annual returns with RDB and RRA without the paperwork headache.",
    description:
      "All registered companies in Rwanda must file annual returns with the Rwanda Development Board and annual tax returns with the Rwanda Revenue Authority. Late filing results in penalties. ProxiServe handles both filings on your behalf.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "Audited financial statements", docType: "form" },
      { label: "Director list (any changes)", docType: "form" },
      { label: "Shareholder list (any changes)", docType: "form" },
    ],
    steps: [
      { num: 1, title: "Document collection", body: "We gather your financial statements, director list, and shareholder information for the filing period." },
      { num: 2, title: "Returns preparation", body: "We prepare both your RDB annual return and RRA corporate income tax return." },
      { num: 3, title: "Review and approval", body: "We send you a review copy before final submission." },
      { num: 4, title: "Filing", body: "We file both returns with RDB and RRA on your behalf." },
      { num: 5, title: "Confirmation", body: "You receive filed return confirmations and receipts for your records." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 65000, eta: "3–5 days", includes: ["RDB + RRA filing", "Document preparation", "Review copy", "Filing confirmations"] },
      { label: "Express", fee: 80000, eta: "2 days", includes: ["Everything in Standard", "Priority processing", "Accountant review call"] },
      { label: "Urgent", fee: 95000, eta: "24 hours", includes: ["Everything in Express", "Dedicated accountant", "Penalty risk assessment"] },
    ],
    faqs: [
      { question: "When are annual returns due?", answer: "RDB returns are due within 3 months of your company's financial year end. RRA corporate tax returns are due by March 31 for the previous calendar year." },
      { question: "What happens if I file late?", answer: "Late filing with RDB incurs a daily penalty. Late RRA filing can result in surcharges and interest. We recommend filing at least 2 weeks before the deadline." },
    ],
    relatedSlugs: ["tin-registration", "vat-registration", "company-registration"],
    flags: {},
    applicationConfig: {
      step2Title: "Filing details",
      step2Lede: "Tell us about the company and the filing year.",
      cards: [
        {
          id: "company",
          title: "Company details",
          fields: [
            { id: "companyTin", label: "Company TIN number", type: "text", mono: true, required: true, inputMode: "numeric", placeholder: "RRA-XXXXXXXXX" },
            { id: "filingYear", label: "Filing year", type: "select", required: true, options: [
              { value: "2025", label: "2025" },
              { value: "2024", label: "2024" },
              { value: "2023", label: "2023" },
              { value: "2022", label: "2022 (late)" },
            ]},
          ],
        },
        {
          id: "changes",
          title: "Changes this year",
          fields: [
            { id: "hasAddressChange", label: "Registered address changed", type: "switch" },
            { id: "hasDirectorChange", label: "Directors changed", type: "switch" },
            { id: "hasShareholdingChange", label: "Shareholding changed", type: "switch" },
            { id: "changesDescription", label: "Describe the changes", type: "textarea", conditional: { field: "hasAddressChange", values: ["true"] }, optional: true, rows: 3, placeholder: "Briefly describe what changed", charCount: true, maxLength: 400 },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "notary-services",
    name: "Notary Services",
    category: "business",
    colour: "cream",
    status: "active",
    fee: 35000,
    eta: "1–2 days",
    lede: "Get your documents notarised by a licensed Rwandan notary, fast.",
    description:
      "ProxiServe connects you with licensed Rwandan notaries for document authentication, apostille preparation, power of attorney, and business document notarisation — with mobile notary options available.",
    requirements: [
      { label: "Documents to be notarised", docType: "form" },
      { label: "National ID or Passport of signatories", docType: "id" },
      { label: "Witness IDs (if required)", docType: "id", note: "Required for some document types", status: "conditional" },
    ],
    steps: [
      { num: 1, title: "Document assessment", body: "We review your documents and confirm the notarisation type required." },
      { num: 2, title: "Notary appointment", body: "We schedule an appointment with a licensed notary — in-person or mobile to your location." },
      { num: 3, title: "Notarisation", body: "The notary witnesses and authenticates your documents." },
      { num: 4, title: "Apostille (if needed)", body: "For international use, we arrange apostille certification through the Ministry of Justice." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 35000, eta: "1–2 days", includes: ["Notary appointment", "Document review", "Up to 5 pages"] },
      { label: "Express", fee: 50000, eta: "Same day", includes: ["Everything in Standard", "Mobile notary to your location", "Up to 10 pages"] },
      { label: "Urgent", fee: 75000, eta: "2–3 hours", includes: ["Everything in Express", "Apostille included", "Emergency notary", "Courier delivery"] },
    ],
    faqs: [
      { question: "Do I need to be present for notarisation?", answer: "Yes, in most cases the signatory must be physically present. Mobile notary is available if you cannot travel." },
      { question: "What is an apostille?", answer: "An apostille is an international certification that validates the notarisation for use in countries that are signatories to the Hague Convention." },
    ],
    relatedSlugs: ["company-registration", "land-title", "passport-application"],
    flags: { inPersonRequired: true },
    applicationConfig: {
      step2Title: "Document details",
      step2Lede: "Tell us about the document you need notarised.",
      cards: [
        {
          id: "document",
          title: "Document details",
          fields: [
            { id: "docType", label: "Type of document", type: "select", required: true, options: [
              { value: "contract", label: "Contract / agreement" },
              { value: "deed", label: "Deed of sale" },
              { value: "affidavit", label: "Affidavit" },
              { value: "power-of-attorney", label: "Power of attorney" },
              { value: "declaration", label: "Statutory declaration" },
              { value: "other", label: "Other" },
            ]},
            { id: "docPurpose", label: "Purpose of notarisation", type: "text", required: true, placeholder: "e.g. For use in property transfer at RLMUA" },
            { id: "language", label: "Language of the document", type: "radio-card", required: true, options: [
              { value: "en", label: "English" },
              { value: "fr", label: "French" },
              { value: "rw", label: "Kinyarwanda" },
            ]},
          ],
        },
        {
          id: "parties",
          title: "Parties involved",
          fields: [
            { id: "partiesCount", label: "Number of signatories", type: "select", required: true, options: [
              { value: "1", label: "1" },
              { value: "2", label: "2" },
              { value: "3", label: "3" },
              { value: "4+", label: "4 or more" },
            ]},
            { id: "primaryParty", label: "Name of primary signatory", type: "text", required: true, placeholder: "Full legal name" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "driving-license",
    name: "Driving License Renewal",
    category: "identity",
    colour: "pink",
    status: "active",
    fee: 28000,
    urgentFee: 45000,
    eta: "4–6 days",
    lede: "Renew your Rwandan driving license without the RURA queue.",
    description:
      "ProxiServe manages your driving license renewal with RURA (Rwanda Utilities Regulatory Authority), handling all documentation, submission, and license collection.",
    requirements: [
      { label: "Expiring or expired driving license", docType: "id" },
      { label: "National ID", docType: "id" },
      { label: "Medical certificate (from approved clinic)", docType: "certificate" },
      { label: "Passport-size photos (2 copies)", docType: "photo" },
    ],
    steps: [
      { num: 1, title: "Document upload", body: "Upload your current license, ID, and medical certificate to our portal." },
      { num: 2, title: "Verification", body: "We verify all documents and confirm your license category and expiry details." },
      { num: 3, title: "RURA submission", body: "We submit your renewal application to RURA." },
      { num: 4, title: "License collection", body: "We collect your renewed license and deliver it to you." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 28000, eta: "4–6 days", includes: ["Document verification", "RURA submission", "License collection & delivery"] },
      { label: "Express", fee: 37000, eta: "2–3 days", includes: ["Everything in Standard", "Priority queue", "Phone updates"] },
      { label: "Urgent", fee: 45000, eta: "24 hours", includes: ["Everything in Express", "Dedicated agent", "WhatsApp confirmation"] },
    ],
    faqs: [
      { question: "How often must I renew my driving license?", answer: "Rwandan driving licenses must be renewed every 10 years for category B. Other categories may differ." },
      { question: "Do I need a new medical certificate?", answer: "Yes. A current medical certificate from an approved clinic is required for each renewal." },
    ],
    relatedSlugs: ["national-id", "passport-application", "notary-services"],
    flags: {},
    applicationConfig: {
      step2Title: "License details",
      step2Lede: "Tell us about your driving license and why you're renewing.",
      cards: [
        {
          id: "reason",
          title: "Reason for renewal",
          fields: [
            { id: "reason", label: "Why are you renewing?", type: "radio-card", required: true, options: [
              { value: "expired", label: "Expired (or expiring soon)", description: "Standard renewal" },
              { value: "lost", label: "Lost", description: "A police report will be needed" },
              { value: "stolen", label: "Stolen", description: "A police report will be needed" },
              { value: "upgrade", label: "Upgrading vehicle class", description: "Adding a new category" },
            ]},
            { id: "policeRef", label: "Police case reference number", type: "text", mono: true, conditional: { field: "reason", values: ["lost", "stolen"] }, placeholder: "RNP-2026-XXXXX" },
          ],
        },
        {
          id: "current",
          title: "Your current license",
          fields: [
            { id: "licenseNumber", label: "Current license number", type: "text", mono: true, optional: true, placeholder: "DL-XXXXXXXX" },
            { id: "vehicleClass", label: "Vehicle class(es)", type: "select", required: true, options: [
              { value: "A", label: "A — Motorcycles" },
              { value: "B", label: "B — Passenger cars" },
              { value: "C", label: "C — Heavy vehicles" },
              { value: "B-C", label: "B + C — Multiple" },
              { value: "other", label: "Other combination" },
            ]},
            { id: "expiryDate", label: "Expiry date", type: "date", optional: true },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "land-title",
    name: "Land Title Transfer",
    category: "business",
    colour: "blue",
    status: "active",
    fee: 120000,
    urgentFee: 180000,
    eta: "10–15 days",
    lede: "Transfer land title securely with Rwanda Land Management and Use Authority.",
    description:
      "Land title transfers in Rwanda require coordination between the Rwanda Land Management and Use Authority (RLMUA), notaries, and local sector offices. ProxiServe manages the entire transfer process for both buyer and seller.",
    requirements: [
      { label: "Current land title certificate", docType: "certificate" },
      { label: "National IDs of buyer and seller", docType: "id" },
      { label: "Sale agreement (notarised)", docType: "certificate" },
      { label: "Plot map / cadastral plan", docType: "proof" },
      { label: "Proof of payment / bank transfer receipt", docType: "proof" },
      { label: "Sector approval letter", docType: "certificate", note: "We obtain this on your behalf" },
    ],
    steps: [
      { num: 1, title: "Title verification", body: "We verify the existing title is clean, unencumbered, and matches the plot description." },
      { num: 2, title: "Sale agreement notarisation", body: "We arrange notarisation of the sale agreement through a licensed notary." },
      { num: 3, title: "Sector office approval", body: "We obtain approval from the local sector office where the land is located." },
      { num: 4, title: "RLMUA submission", body: "We submit the transfer application to the Rwanda Land Management and Use Authority." },
      { num: 5, title: "New title issuance", body: "The new title in the buyer's name is collected and delivered upon issuance." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 120000, eta: "10–15 days", includes: ["Title verification", "Notarisation coordination", "Sector approval", "RLMUA submission", "Title delivery"] },
      { label: "Express", fee: 150000, eta: "7–10 days", includes: ["Everything in Standard", "Priority processing", "Weekly status calls"] },
      { label: "Urgent", fee: 180000, eta: "5–7 days", includes: ["Everything in Express", "Dedicated land agent", "Daily updates"] },
    ],
    faqs: [
      { question: "Can the transfer happen without both parties present?", answer: "With a valid power of attorney, one party can be represented by a proxy. We can arrange the power of attorney as an add-on." },
      { question: "Are there government fees on top of your service fee?", answer: "Yes. RLMUA charges a transfer tax based on the land value. We'll calculate and inform you of the total cost before proceeding." },
    ],
    relatedSlugs: ["notary-services", "company-registration", "annual-returns"],
    flags: { inPersonRequired: false },
    applicationConfig: {
      step2Title: "Land transfer details",
      step2Lede: "Tell us about the property and the nature of the transfer.",
      cards: [
        {
          id: "transfer",
          title: "Transfer type",
          fields: [
            { id: "transferType", label: "Type of transfer", type: "radio-card", required: true, options: [
              { value: "sale", label: "Sale", description: "Transfer in exchange for payment" },
              { value: "gift", label: "Gift / donation", description: "Transfer without payment" },
              { value: "inheritance", label: "Inheritance", description: "Transfer from a deceased's estate" },
              { value: "other", label: "Other", description: "Court order, partition, etc." },
            ]},
          ],
        },
        {
          id: "property",
          title: "Property details",
          fields: [
            { id: "upi", label: "Land plot / UPI number", type: "text", mono: true, required: true, placeholder: "XX/XX/XX/XXXXX/XXXX", help: "Found on the current title deed", helpDetail: "The Unique Parcel Identifier (UPI) is a 19-digit code on your title deed. It looks like: 1/05/18/07482/0001. If you don't have the deed, check RLMUA records or contact us." },
            { id: "district", label: "District", type: "select", required: true, options: [
              { value: "kigali-gasabo", label: "Kigali — Gasabo" },
              { value: "kigali-kicukiro", label: "Kigali — Kicukiro" },
              { value: "kigali-nyarugenge", label: "Kigali — Nyarugenge" },
              { value: "eastern", label: "Eastern Province" },
              { value: "western", label: "Western Province" },
              { value: "northern", label: "Northern Province" },
              { value: "southern", label: "Southern Province" },
            ]},
            { id: "landSize", label: "Land size", type: "text", optional: true, placeholder: "e.g. 500 m² or 2 hectares" },
          ],
        },
        {
          id: "parties",
          title: "Transfer parties",
          fields: [
            { id: "currentOwner", label: "Current owner (transferor)", type: "text", required: true, placeholder: "Full legal name" },
            { id: "newOwner", label: "New owner (transferee)", type: "text", required: true, placeholder: "Full legal name" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "import-permit",
    name: "Import/Export Permit",
    category: "permits",
    colour: "green",
    status: "active",
    fee: 75000,
    urgentFee: 110000,
    eta: "5–7 days",
    lede: "Obtain your import or export permit from Rwanda Revenue Authority.",
    description:
      "Importing or exporting goods through Rwanda requires permits from the Rwanda Revenue Authority and, for certain goods, sector-specific regulators. ProxiServe navigates the multi-agency process on your behalf.",
    requirements: [
      { label: "Company registration certificate", docType: "certificate" },
      { label: "TIN certificate", docType: "certificate" },
      { label: "Commercial invoice for goods", docType: "form" },
      { label: "Packing list", docType: "form" },
      { label: "Bill of lading or airway bill", docType: "proof" },
      { label: "Sector permit (food, pharmaceuticals, etc.)", docType: "certificate", note: "If applicable to your goods", status: "conditional" },
    ],
    steps: [
      { num: 1, title: "Goods classification", body: "We classify your goods under the Rwanda tariff system and identify all required permits." },
      { num: 2, title: "Document preparation", body: "We prepare your complete permit application package." },
      { num: 3, title: "Multi-agency submission", body: "We submit to RRA and any sector regulators simultaneously." },
      { num: 4, title: "Permit collection", body: "All permits are collected and delivered to you, ready for customs clearance." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 75000, eta: "5–7 days", includes: ["Goods classification", "Document preparation", "RRA + sector submission", "Permit delivery"] },
      { label: "Express", fee: 92000, eta: "3–4 days", includes: ["Everything in Standard", "Simultaneous submissions", "Priority processing"] },
      { label: "Urgent", fee: 110000, eta: "48 hours", includes: ["Everything in Express", "Dedicated trade agent", "Port liaison"] },
    ],
    faqs: [
      { question: "Do I need a separate permit for each shipment?", answer: "For most goods, yes. Some businesses can obtain an annual import licence covering multiple shipments. We can advise on which applies to you." },
      { question: "Which goods require sector permits in addition to RRA?", answer: "Food and beverages, pharmaceuticals, chemicals, firearms, and agricultural products all require additional sector-specific approvals." },
    ],
    relatedSlugs: ["trade-license", "business-permit", "company-registration"],
    flags: {},
    applicationConfig: {
      step2Title: "Import / export details",
      step2Lede: "Tell us about the goods and your shipment.",
      cards: [
        {
          id: "goods",
          title: "Goods details",
          fields: [
            { id: "goodsCategory", label: "Category of goods", type: "select", required: true, options: [
              { value: "food-beverage", label: "Food & beverages" },
              { value: "electronics", label: "Electronics" },
              { value: "machinery", label: "Machinery & equipment" },
              { value: "textiles", label: "Textiles & clothing" },
              { value: "pharmaceuticals", label: "Pharmaceuticals" },
              { value: "agriculture", label: "Agricultural produce" },
              { value: "chemicals", label: "Chemicals" },
              { value: "other", label: "Other" },
            ]},
            { id: "hsCode", label: "HS / tariff code", type: "text", mono: true, optional: true, placeholder: "e.g. 8471.30", helpDetail: "The Harmonized System (HS) code classifies your goods internationally. You can find it in your pro-forma invoice or on the Rwanda Revenue Authority website. Example: 8471.30 for laptops." },
            { id: "originCountry", label: "Country of origin / destination", type: "select", required: true, options: [
              { value: "kenya", label: "Kenya" },
              { value: "uganda", label: "Uganda" },
              { value: "tanzania", label: "Tanzania" },
              { value: "drc", label: "DR Congo" },
              { value: "china", label: "China" },
              { value: "india", label: "India" },
              { value: "uk", label: "United Kingdom" },
              { value: "usa", label: "USA" },
              { value: "other", label: "Other" },
            ]},
          ],
        },
        {
          id: "shipment",
          title: "Shipment details",
          fields: [
            { id: "shipmentDate", label: "Estimated shipment / arrival date", type: "date", optional: true },
            { id: "portOfEntry", label: "Port of entry / exit", type: "select", required: true, options: [
              { value: "kigali-airport", label: "Kigali International Airport" },
              { value: "rusumo", label: "Rusumo Border (Tanzania)" },
              { value: "gatuna", label: "Gatuna Border (Uganda)" },
              { value: "ruhwa", label: "Ruhwa Border (DRC)" },
              { value: "other", label: "Other" },
            ]},
            { id: "estimatedValue", label: "Estimated customs value (USD)", type: "text", optional: true, inputMode: "numeric", placeholder: "e.g. 5000" },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
  {
    slug: "social-security",
    name: "Social Security Benefits",
    category: "welfare",
    colour: "red",
    status: "active",
    fee: 20000,
    eta: "5–8 days",
    lede: "Claim your RSSB pension, maternity, or injury benefits without the paperwork.",
    description:
      "RSSB administers pension, maternity leave, work injury, and health insurance benefits. ProxiServe guides you through the claims process, compiles your documentation, and submits on your behalf.",
    requirements: [
      { label: "National ID", docType: "id" },
      { label: "RSSB member number", docType: "other" },
      { label: "Employment records (payslips or employer letter)", docType: "proof" },
      { label: "Benefit-specific documentation (medical, birth, etc.)", docType: "certificate", note: "Depends on benefit type", status: "conditional" },
    ],
    steps: [
      { num: 1, title: "Benefit assessment", body: "We review your RSSB record and identify which benefits you are eligible to claim." },
      { num: 2, title: "Document compilation", body: "We compile all required supporting documents for your specific claim." },
      { num: 3, title: "RSSB submission", body: "We submit your claim to RSSB and track its progress." },
      { num: 4, title: "Claim confirmation", body: "We notify you of the RSSB decision and assist with any follow-up requests." },
    ],
    pricingTiers: [
      { label: "Standard", fee: 20000, eta: "5–8 days", includes: ["Benefit assessment", "Document compilation", "RSSB submission", "Claim tracking"] },
      { label: "Express", fee: 32000, eta: "3–4 days", includes: ["Everything in Standard", "Priority submission", "Appeals support if needed"] },
      { label: "Urgent", fee: 45000, eta: "2 days", includes: ["Everything in Express", "Dedicated welfare consultant", "RSSB liaison"] },
    ],
    faqs: [
      { question: "How long does RSSB take to process claims?", answer: "RSSB typically processes straightforward claims in 5–10 working days. Complex claims may take longer." },
      { question: "Can I claim on behalf of a deceased family member?", answer: "Yes. Survivors' pension can be claimed by eligible family members. Additional documentation (death certificate, marriage/birth certificates) is required." },
    ],
    relatedSlugs: ["rssb-enrollment", "tin-registration", "national-id"],
    flags: { eligibilityCheckRequired: true },
    applicationConfig: {
      step2Title: "Benefit details",
      step2Lede: "Tell us which RSSB benefit you're claiming and your situation.",
      cards: [
        {
          id: "benefit",
          title: "Benefit type",
          fields: [
            { id: "benefitType", label: "Which benefit are you claiming?", type: "radio-card", required: true, options: [
              { value: "pension", label: "Pension", description: "Retirement or survivors' pension" },
              { value: "maternity", label: "Maternity leave", description: "Maternity benefit payment" },
              { value: "work-injury", label: "Work injury", description: "Occupational accident or disease" },
              { value: "health", label: "Medical / health", description: "RSSB health insurance claim" },
            ]},
            { id: "rssbNumber", label: "RSSB member number", type: "text", mono: true, required: true, inputMode: "numeric", placeholder: "RSSB-XXXXXXXXXX" },
          ],
        },
        {
          id: "employment",
          title: "Employment context",
          fields: [
            { id: "employerName", label: "Last employer name", type: "text", conditional: { field: "benefitType", values: ["maternity", "work-injury"] }, placeholder: "Company that registered you with RSSB" },
            { id: "lastWorkDate", label: "Last working / incident date", type: "date", conditional: { field: "benefitType", values: ["maternity", "work-injury"] }, optional: true },
          ],
        },
        {
          id: "notes",
          title: "Anything else?",
          fields: [
            { id: "notes", label: "Notes for your agent", type: "textarea", optional: true, rows: 3, placeholder: "Any additional context about your claim", charCount: true, maxLength: 500 },
          ],
        },
      ],
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return SERVICES.filter((s) => s.category === category);
}

export function getActiveServices(): Service[] {
  return SERVICES.filter((s) => s.status === "active");
}

export function getRelatedServices(slug: string): Service[] {
  const service = getServiceBySlug(slug);
  if (!service) return [];
  return service.relatedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => s !== undefined);
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  tax: "Tax & Finance",
  identity: "Identity",
  business: "Business",
  welfare: "Welfare",
  permits: "Permits",
};

export const COLOUR_MAP: Record<ServiceColour, string> = {
  marigold: "var(--b-marigold)",
  pink: "var(--b-pink)",
  green: "var(--b-green)",
  blue: "var(--b-blue)",
  red: "var(--b-red)",
  cream: "var(--ink-muted)",
};
