import type {
  KpiCard,
  TimelineEvent,
  AttentionCard,
  AgentRow,
  DashNotification,
  CopilotMsg,
  DashNavItem,
} from "@/types";

export const DASH_KPI_CARDS: KpiCard[] = [
  {
    label: "Total Spend",
    value: "US$ 4,231",
    delta: "+12.3%",
    up: true,
    sub: "of US$ 10,000 cap",
    spark: [28, 24, 26, 20, 18, 14, 10, 12, 6],
  },
  {
    label: "Revenue (ROAS)",
    value: "US$ 18,420",
    delta: "3.2×",
    up: true,
    sub: "7-day attributed",
    spark: [20, 18, 16, 14, 10, 8, 6, 8, 4],
  },
  {
    label: "CPA",
    value: "US$ 8.45",
    delta: "-6.2%",
    up: true,
    sub: "Target: US$ 12.00",
    spark: [18, 16, 14, 12, 14, 10, 8, 10, 8],
  },
  {
    label: "Active Conversations",
    value: "47",
    delta: "+8",
    up: true,
    sub: "12 closing now",
    spark: [22, 20, 18, 16, 14, 16, 12, 10, 8],
  },
  {
    label: "Closed Orders",
    value: "214",
    delta: "+31 today",
    up: true,
    sub: "RWF 1.2M total",
    spark: [26, 22, 20, 18, 14, 12, 10, 8, 6],
  },
  {
    label: "CTR",
    value: "2.8%",
    delta: "-0.3%",
    up: false,
    sub: "Below 3% baseline",
    spark: [8, 10, 6, 12, 16, 14, 20, 22, 26],
  },
];

export const DASH_TIMELINE: TimelineEvent[] = [
  {
    time: "2 min ago",
    agent: "Optimizer",
    msg: "Increased Instagram Reels budget by 15% — CPA tracking 18% under target.",
    type: "success",
    whyHeadline: "SolAI optimised budget allocation based on 7-day rolling performance.",
    whyPoints: [
      "Reels CTR 3.2% — 1.8× above Feed average",
      "CPA tracking 18% under target",
      "Budget shifted from underperformers automatically",
    ],
    whyAgent: "Real-time Optimizer",
    whyRunId: "run_7f3a…e91c",
  },
  {
    time: "18 min ago",
    agent: "Sales Agent",
    msg: "Closed sale via WhatsApp · MTN MoMo · RWF 24,500. Buyer: Kalisa Mugisha.",
    type: "success",
    whyHeadline: "Lead qualified after 3 touchpoints — purchase intent score 94%.",
    whyPoints: [
      "Responded within 45s — conversion window optimal",
      "MoMo payment link generated and confirmed",
      "Order logged to fulfilment queue",
    ],
    whyAgent: "Sales Agent",
    whyRunId: "run_2a1b…c83d",
  },
  {
    time: "34 min ago",
    agent: "Optimizer",
    msg: 'Paused Google Search ad set "broad-keywords-2" — CTR fell to 0.4%.',
    type: "warning",
    whyHeadline: "Ad set performance fell below the 1.5% CTR baseline for 3 consecutive ticks.",
    whyPoints: [
      "CTR 0.4% over 45 minutes (3 ticks)",
      "CPA spiked to US$ 22.80 — 1.9× target",
      "Budget protected: US$ 45 reallocated to Reels",
    ],
    whyAgent: "Real-time Optimizer",
    whyRunId: "run_8b2c…d41f",
  },
  {
    time: "1h ago",
    agent: "Creative",
    msg: 'Generated 3 new Reels variants for "Ankara Print Tee — Indigo".',
    type: "info",
    whyHeadline: "Creative refresh triggered after 72-hour fatigue threshold on existing assets.",
    whyPoints: [
      "Previous creative CTR declining 0.1%/day",
      "New variants A/B tested on 10% of audience",
      "Auto-promoted if CTR > 2.5% in first 6 hours",
    ],
    whyAgent: "Creative Generator",
    whyRunId: "run_5e4f…b12a",
  },
  {
    time: "2h ago",
    agent: "Safety",
    msg: "Quarantined inbound DM as suspected prompt-injection. Blocked and logged.",
    type: "danger",
    whyHeadline: "Message matched prompt-injection pattern with 97% confidence.",
    whyPoints: [
      "Pattern: instruction override attempt in payload",
      "Sender flagged — blocked from further DMs",
      "Incident logged to Safety Center for review",
    ],
    whyAgent: "Safety Monitor",
    whyRunId: "run_9c3e…f55b",
  },
  {
    time: "3h ago",
    agent: "Planner",
    msg: 'Campaign "Cape Threads Linen Shirt" moved from Learning to Live.',
    type: "success",
    whyHeadline: "Campaign exited learning phase after reaching 50 optimisation events.",
    whyPoints: [
      "50 conversions recorded in 7-day window",
      "CPA stabilised at US$ 7.90 — 34% under target",
      "Now eligible for automated budget scaling",
    ],
    whyAgent: "Campaign Planner",
    whyRunId: "run_4d2a…e77c",
  },
  {
    time: "4h ago",
    agent: "Sales Agent",
    msg: "Generated payment link for Amara Diallo — Stripe · US$ 89.00.",
    type: "info",
    whyHeadline: "Lead reached checkout intent signal — payment link auto-generated.",
    whyPoints: [
      "3 product page views in 10 minutes",
      "Abandoned cart detected — recovery flow triggered",
      "Stripe link sent via WhatsApp, opened within 2 minutes",
    ],
    whyAgent: "Sales Agent",
    whyRunId: "run_1b3c…d99e",
  },
  {
    time: "5h ago",
    agent: "Optimizer",
    msg: "Reallocated US$ 45 from Google Display to Meta Reels (higher CTR).",
    type: "success",
    whyHeadline: "Meta Reels delivering 2.1× better CTR than Google Display this week.",
    whyPoints: [
      "Google Display CTR: 0.6% vs Reels CTR: 3.1%",
      "Cost-per-click on Reels 38% lower",
      "Reallocation approved within spend cap rules",
    ],
    whyAgent: "Real-time Optimizer",
    whyRunId: "run_6f8a…c20b",
  },
];

export const DASH_ATTENTION: AttentionCard[] = [
  {
    icon: "alertTriangle",
    color: "var(--warning)",
    title: "Budget approaching cap",
    desc: "US$ 8,500 of US$ 10,000 spent. 2 days remaining at current pace.",
    action: "Increase cap",
  },
  {
    icon: "shield",
    color: "var(--danger)",
    title: "Anomaly detected",
    desc: 'Spend velocity 2.3× baseline on "Ankara Tee" Google Search.',
    action: "Review",
  },
  {
    icon: "eye",
    color: "var(--info)",
    title: "Pending approval",
    desc: "Creative Agent wants to test TikTok-style vertical video. Requires opt-in.",
    action: "Approve",
  },
  {
    icon: "messageCircle",
    color: "var(--brand)",
    title: "Handoff requested",
    desc: "Customer Amara Diallo asking about bulk pricing — beyond Sales Agent scope.",
    action: "Take over",
  },
];

export const DASH_AGENTS: AgentRow[] = [
  {
    name: "Campaign Planner",
    emoji: "📊",
    task: 'Researching Meta audiences for "Ankara Print Tee"',
    runtime: "4m 12s",
    health: "running",
    color: "var(--brand)",
  },
  {
    name: "Creative Generator",
    emoji: "🎨",
    task: "Generating 3 Reels variants",
    runtime: "1m 45s",
    health: "running",
    color: "var(--info)",
  },
  {
    name: "Real-time Optimizer",
    emoji: "📈",
    task: "Idle — next tick in 11 min",
    runtime: "—",
    health: "idle",
    color: "var(--success)",
  },
  {
    name: "Sales Agent",
    emoji: "💬",
    task: "Qualifying lead: Kalisa Mugisha (WhatsApp)",
    runtime: "32s",
    health: "running",
    color: "var(--warning)",
  },
  {
    name: "Order Handoff",
    emoji: "📦",
    task: "Paused — no pending orders",
    runtime: "—",
    health: "paused",
    color: "var(--text-subtle)",
  },
];

export const DASH_NOTIFICATIONS: DashNotification[] = [
  {
    type: "success",
    agent: "Optimizer",
    msg: "Increased Instagram Reels budget by 15% — CPA tracking 18% under target.",
    time: "2m ago",
  },
  {
    type: "success",
    agent: "Sales Agent",
    msg: "Closed sale via WhatsApp · MTN MoMo · RWF 24,500.",
    time: "18m ago",
  },
  {
    type: "warning",
    agent: "Optimizer",
    msg: 'Paused Google Search ad set "broad-keywords-2" — CTR fell to 0.4%.',
    time: "34m ago",
  },
  {
    type: "info",
    agent: "Creative",
    msg: 'Generated 3 new creative variants for "Ankara Print Tee — Indigo".',
    time: "1h ago",
  },
  {
    type: "danger",
    agent: "Safety",
    msg: "Quarantined inbound DM as suspected prompt-injection.",
    time: "2h ago",
  },
  {
    type: "info",
    agent: "Planner",
    msg: '"Cape Threads Linen" campaign moved from Learning to Live.',
    time: "3h ago",
  },
];

export const DASH_COPILOT_MESSAGES: CopilotMsg[] = [
  {
    role: "user",
    text: "Why did you pause the Google Search ad set?",
  },
  {
    role: "ai",
    text: 'The "broad-keywords-2" ad set had a CTR of 0.4% over the last 3 ticks (45 minutes) — well below the 1.5% baseline. CPA spiked to US$ 22.80, nearly 2× your target of US$ 12.00. I paused it to protect budget.',
    agent: "Real-time Optimizer",
    runId: "run_8b2c…d41f",
  },
  {
    role: "user",
    text: "What would happen if I resumed it?",
  },
  {
    role: "ai",
    text: "Based on current trends, resuming would likely spend ~US$ 120 over the next 3 hours with a projected CPA of US$ 19–24. I'd recommend instead reallocating that budget to Instagram Reels, which is delivering a 3.2% CTR and US$ 6.20 CPA.",
    agent: "Real-time Optimizer",
    runId: "run_8b2c…d41f",
  },
  {
    role: "user",
    text: "Do it. Move the budget to Reels.",
  },
  {
    role: "ai",
    text: "Done. Reallocated US$ 85 from Google Search to Instagram Reels. The Optimizer will track the change over the next 3 ticks and report back.",
    agent: "Real-time Optimizer",
    runId: "run_9c3d…e52g",
  },
];

export const DASH_NAV_ITEMS: DashNavItem[] = [
  { id: "dashboard", icon: "home", label: "Dashboard", href: "/dashboard" },
  { id: "campaigns", icon: "target", label: "Campaigns", href: "/campaigns" },
  { id: "conversations", icon: "messageCircle", label: "Conversations", href: "/conversations" },
  { id: "orders", icon: "shoppingBag", label: "Orders", href: "/orders" },
  { id: "audit", icon: "clock", label: "Audit Log", href: "/audit" },
  { id: "safety", icon: "shield", label: "Safety Center", href: "/safety" },
  { id: "reports", icon: "pieChart", label: "Reports", href: "/reports" },
  { id: "settings", icon: "settings", label: "Settings", href: "/settings" },
];
