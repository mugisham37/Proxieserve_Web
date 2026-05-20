export type ServiceStatus = "active" | "paused" | "unavailable" | "archived";
export type ServiceCategory = "tax" | "identity" | "business" | "welfare" | "permits";
export type ServiceColour = "marigold" | "pink" | "green" | "blue" | "red" | "cream";

export interface ServiceRequirement {
  label: string;
  docType: "id" | "certificate" | "photo" | "form" | "proof" | "other";
  note?: string;
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
      { label: "Articles of Association (or we draft them)", docType: "certificate", note: "Optional — we can draft" },
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
      { label: "Old passport (for renewal)", docType: "id", note: "Only for renewals" },
      { label: "Proof of citizenship", docType: "proof", note: "If born outside Rwanda" },
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
      { label: "Witness IDs (if required)", docType: "id", note: "Required for some document types" },
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
      { label: "Sector permit (food, pharmaceuticals, etc.)", docType: "certificate", note: "If applicable" },
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
      { label: "Benefit-specific documentation (medical, birth, etc.)", docType: "certificate", note: "Depends on benefit type" },
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
