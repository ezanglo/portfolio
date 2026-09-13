import type { CaseStudy } from './types'

/**
 * §9 case studies — one per codebase the developer actually has access to and could research
 * directly (reseebo-v2, opic-next, finn-ai, stratos-command), rather than the thinner Payload
 * export. Every field — problem, architecture, challenges, solution — is drawn from real
 * schema/code/docs in those repos; nothing here is invented to make the story read better.
 * Outcomes are omitted (`null`) wherever no verifiable metric exists rather than a vague claim.
 * `architectureLayers` is each project's own real stack, in the order data actually flows
 * through it — not the generic `CORE_STACK_LAYERS` diagram used elsewhere on the site.
 */
export const CASE_STUDIES: CaseStudy[] = [
  {
    projectSlug: "reseebo",
    overview:
      "Resiboo is an offline-first receipt scanner for iOS and Android: scan a receipt and it reads the merchant, date, category, and total, then files it. No account, no cloud required.",
    problem:
      "People don't lack budgeting apps; they lack the patience to type merchant, date, and total into one, every day, forever. Resiboo deliberately isn't a personal-finance app: no budgeting, no bank connections, no financial advice. It targets the data-entry problem itself, not financial literacy.",
    role:
      "Solo developer, end to end: product spec and design system, the on-device OCR/extraction pipeline, the local database schema, native iOS integrations, and the full app UI.",
    whatIBuilt: [
      "Camera capture → OCR → review/confirm flow, plus manual entry and batch capture",
      "A deterministic, rule-based extraction pipeline (merchant, date, category, total) that runs entirely on-device with zero setup",
      "An optional second extraction pass for line items via on-device Apple Intelligence or a user-supplied API key, additive only, never overrides or blocks the deterministic result",
      "Merchant memory (alias resolution, learned category defaults), full-text receipt search, a stats view, and a freeform CSV export builder",
      "Local backup/restore to iCloud or Google Drive, on-device reminders with recurring-merchant detection, and a natural-language 'Ask' chat over the user's own receipt data",
      "Native iOS Shortcuts/App Intents (Swift) that turn a forwarded email or message into a saved receipt automatically",
    ],
    architecture:
      "Expo (SDK 57) with a custom tab implementation to fit a raised center action button, Uniwind (Tailwind v4), and React Native Reusables for the UI. The app is offline-first by construction, not by fallback: expo-sqlite plus Drizzle ORM is the only datastore: there's no backend and no server the app ever needs to reach. OCR runs through platform vision APIs (Apple Vision / ML Kit), with money stored as integer cents and dates as epoch millis to keep arithmetic and sorting exact.",
    architectureLayers: [
      { label: "Expo / React Native", detail: "The iOS & Android app" },
      { label: "Apple Vision / ML Kit OCR", detail: "Reads the raw receipt text" },
      { label: "Deterministic scoring pipeline", detail: "Rule-based merchant, date, total extraction" },
      { label: "Apple Intelligence / BYOK AI", detail: "Optional, additive line-item pass" },
      { label: "expo-sqlite + Drizzle ORM", detail: "The only datastore, no backend" },
    ],
    challenges:
      "Receipts are inconsistent enough that a single OCR text block reliably produces false positives: card-authorization amounts that look like totals, discounted subtotals with no TOTAL label, split-tender receipts, and two receipts photographed side by side that merge into one block. Android and iOS also return OCR text in different shapes, so a scorer tuned on one platform silently degraded on the other. A separate native Visual Intelligence search integration hit an OS-level bug and had to be shelved.",
    solution:
      "Instead of an ML model, I built a deterministic, explainable scoring pipeline: named-signal confidence scoring, separator-agnostic amount parsing, and footer-boundary detection to separate a receipt's real total from a trailing card-auth line. Low-confidence or ambiguous results surface as a soft 'needs attention' flag rather than a hard failure or a silent wrong answer, and the optional AI pass is layered strictly on top of that: it can add line items but can never override or block what the deterministic pass already extracted.",
    technology: ["Expo", "React Native", "TypeScript", "Expo Router", "expo-sqlite", "Drizzle ORM", "Apple Vision / ML Kit OCR", "Zustand", "Swift App Intents"],
    outcome: null,
    updatedAt: "2026-09-12",
  },
  {
    projectSlug: "opic-nightlife-app",
    overview:
      "OPIC is a nightlife platform: a consumer mobile app for discovering events, offers, and booking tables, paired with a Next.js venue dashboard where venues run their own events, ticket tiers, perks, table layouts, and staff. This build is a rebuild of an already-live predecessor system, migrating its real production data as it goes.",
    problem:
      "Venues had no self-serve way to run events, price ticket tiers, manage table layouts, or track staff and offers; v1 had to work as a content and operations tool with a dormant commerce engine underneath, so venues could build out real inventory before any consumer-facing app or traffic existed. On the consumer side, that inventory already existed with no way for guests to discover, book, or buy against it. The mobile app exists to give guests a front door to it.",
    role:
      "Lead full-stack developer on a two-person team. I own the data layer, the shared API contract, and the web server implementation end to end (schema → contract → procedures → real data), plus the venue dashboard; a second developer builds the mobile app's screens and design system against that same typed contract.",
    whatIBuilt: [
      "The Drizzle schema and Postgres domain model for venues, events, ticket tiers, table bookings, orders/tickets/scans, offers/vouchers/coupons, followers, and settlement",
      "A typed oRPC contract layer shared by both the web dashboard and the mobile app, so both consume one typed API with no REST/OpenAPI hop for the app itself",
      "The venue-facing Next.js dashboard: event CRUD with publish states, multi-tier ticketing, table-layout management, staff roles, and a public venue page",
      "Stripe-based ticket checkout, moving from the predecessor's merchant-of-record model toward Stripe Connect destination charges with mandatory venue verification before any priced sale",
      "A legacy-data migration importer that moved the predecessor system's real production data into the new schema",
    ],
    architecture:
      "A Turborepo monorepo: apps/mobile (Expo Router, React Native, NativeWind) and apps/web (Next.js 16 with Drizzle + Postgres directly, no CMS), sharing packages/contracts (a Zod-typed oRPC contract with no DB access) and packages/db. apps/web/server is the only place holding a database handle and implements the shared contract; both apps call the same procedures through typed clients. Auth is Better Auth's organization plugin, mapping venues to orgs and staff to org members.",
    architectureLayers: [
      { label: "Expo Router + Next.js", detail: "Mobile app and venue dashboard" },
      { label: "oRPC contract", detail: "One typed API, shared by both apps" },
      { label: "Better Auth", detail: "Venues as orgs, staff as members" },
      { label: "Drizzle ORM + PostgreSQL", detail: "Venues, events, bookings, tickets" },
      { label: "Stripe Connect", detail: "Ticket payments, venue payouts" },
    ],
    challenges:
      "A partial-unique-index approach to prevent double-booking a table broke in two ways once the schema grew: two events on the same table on the same night could still collide, and a booking with no event attached never registers as a collision under a standard unique index, silently offering zero protection. Nightlife also runs across midnight: an event opening Friday 11pm and closing Saturday 5am has to group as 'Friday' everywhere, but its clock timestamps straddle two calendar days. A background job for expiring stale ticket holds also turned out to cost roughly 87,600 invocations a month against a 50k free-tier cap, on a schedule with no per-run reason to fire that often.",
    solution:
      "The booking-conflict constraint is now keyed on (table, business date) instead of (table, event), with business date stored explicitly on every relevant row rather than derived from timestamps, so the midnight-crossing problem and the double-booking bug get fixed by the same change. Money movement was deliberately kept out of a hand-rolled ledger: rather than maintain a second set of numbers that could drift from Stripe's own records, settlement is tracked in a table keyed directly to Stripe objects, with Connect verification now mandatory before a venue can take a priced sale. The hold-expiry job was moved from a recurring cron to event-driven expiry.",
    technology: ["Next.js", "Expo Router", "React Native", "TypeScript", "Drizzle ORM", "PostgreSQL", "oRPC", "Better Auth", "Stripe", "Inngest", "TanStack Query"],
    outcome: {
      result:
        "Migrated real production data from the predecessor system into the new schema (114 venues, 908 orders, 1,054 tickets, and 514 door scans) while the web dashboard shipped and moved into internal use.",
    },
    updatedAt: "2026-09-12",
  },
  {
    projectSlug: "finn-ai-ops",
    overview:
      "Finn AI is an organization-level AI chat platform: conversations organized into folders, a router that picks between cheap and expensive LLMs per message, per-folder RAG over a team's own documents, and an admin dashboard that turns model usage into a cost and governance story for the org owner who's paying for seats.",
    problem:
      "Org owners buying AI seats for a team need three things a generic chat UI doesn't give them: a way to organize a team's conversations by client or project, cost control across a menu of LLMs at very different price points, and enough visibility into usage to justify the spend to their own leadership.",
    role: "Solo developer, full stack: every collection, route, and library module in the app.",
    whatIBuilt: [
      "Folder-based conversation organization with per-folder access levels (private/shared/custom) and a default folder per member",
      "A model-tier selector (Auto/Fast/Expert) and an AI router behind Auto: a near-zero-cost heuristic classifier resolves most messages instantly, falling through to an LLM-as-judge call only for ambiguous ones, to pick between an economy and a capability model on OpenRouter",
      "Per-folder RAG: file/link ingestion, chunking, OpenRouter embeddings, and pgvector similarity search scoped to a folder",
      "An admin analytics dashboard aggregating token/cost by model, tier, member, and day, including a counterfactual savings comparison against always using the expensive tier",
      "Stripe billing across free/basic/pro/max plans, with org members inheriting the owner's plan",
      "Org and member management, invitations, and a banned-user hard-block enforcement path",
    ],
    architecture:
      "Next.js App Router with Payload CMS on Postgres for everything except identity: better-auth, with its organization plugin, owns users, sessions, orgs, and members, sitting in the same database as Payload's own collections for folders, chats, messages, usage logs, and RAG sources. Chat runs through the Vercel AI SDK's streaming text generation against OpenRouter, with usage and cost logging happening asynchronously once the stream finishes so bookkeeping never adds latency to the response.",
    architectureLayers: [
      { label: "Next.js", detail: "Chat UI and admin dashboard" },
      { label: "better-auth", detail: "Users, sessions, organizations" },
      { label: "Payload CMS + PostgreSQL", detail: "Folders, chats, usage logs, RAG sources" },
      { label: "Vercel AI SDK + OpenRouter", detail: "Streaming chat across model tiers" },
      { label: "pgvector", detail: "Per-folder RAG retrieval" },
    ],
    challenges:
      "Routing every message through an LLM call just to decide which model should answer it would double the cost and latency of the cheap path. The original plan also called for a much richer governance layer (a rule-based PII/topic-blocklist classifier) which isn't built yet; what exists today is the model-routing/cost engine and a hard ban-enforcement path, with the richer content-policy classifier still a designed-but-unshipped feature.",
    solution:
      "A two-stage classifier: a heuristic pre-filter (message length, greeting patterns, code fences, list markers) resolves the obvious cases for free, and only ambiguous messages fall through to a structured-output LLM call that scores complexity and picks the model. Streaming responses and analytics writes are also decoupled: the chat stream finishes and persists messages on its own timeline, while cost/usage logging happens in a separate completion hook, so the two never compete for the same latency budget.",
    technology: ["Next.js", "Payload CMS", "PostgreSQL", "better-auth", "Vercel AI SDK", "OpenRouter", "pgvector", "Stripe", "TypeScript"],
    outcome: null,
    updatedAt: "2026-09-12",
  },
  {
    projectSlug: "stratos-command",
    overview:
      "Stratos Command is a multi-tenant B2B SaaS foundation: organizations and invitations, SSO/SAML, Stripe billing, an append-only audit log, and an AI support product modeled as a Microsoft 365 IT helpdesk agent, built to fork and rebrand as the starting point for new products rather than rebuilt from scratch each time.",
    problem:
      "Every new SaaS idea needs the same unglamorous plumbing: orgs, invites, SSO, billing, an audit trail, and some form of support tooling, before it can do anything specific to the product. Rebuilding that each time is wasted effort, so the project documents an explicit fork-and-rebrand workflow (rename, strip unused features, re-key secrets) as the intended way to start a new product from this base.",
    role: "Solo, self-directed: built end to end as a personal foundation, not client work.",
    whatIBuilt: [
      "An organization/member/invitation model on Better Auth, with invite-only signup enforced at a single choke point so no auth flow (password, OAuth, magic link, or SSO) can bypass it",
      "SSO/SAML via Better Auth's SSO plugin plus an optional BoxyHQ Jackson sidecar, with org-scoped SAML metadata and post-login provisioning",
      "A Payload CMS backend of 20+ collections spanning auth, support, onboarding, M365 integration, and permissions",
      "Stripe billing with webhook-driven subscription sync, seat-based entitlements, and idempotent event processing",
      "An append-only audit log where create and update are hard-denied at the collection level: the only write path is a server-side helper, so audit rows can't be forged or edited through the API or admin UI",
      "Stratos Support: an OpenRouter-routed conversational agent for Microsoft 365 IT issues, with a scripted phase machine (gathering → findings → checklist → escalation) split across a tenant-facing plane and a cross-tenant operator queue",
    ],
    architecture:
      "Next.js App Router, split into a frontend route group and a Payload-generated admin/API route group that's treated as generated code and never hand-edited, so upgrades stay clean. A custom middleware layer resolves org membership from the URL slug and redirects non-members. Better Auth is wired directly onto Payload's own Postgres/Drizzle schema rather than run as a separate service.",
    architectureLayers: [
      { label: "Next.js", detail: "App Router + Payload admin" },
      { label: "Better Auth + SSO/SAML", detail: "Orgs, invitations, BoxyHQ Jackson" },
      { label: "Payload CMS", detail: "20+ collections: support, billing, audit" },
      { label: "PostgreSQL + Drizzle", detail: "Shared schema with Payload" },
      { label: "Stripe + OpenRouter", detail: "Billing and the Stratos Support agent" },
    ],
    challenges:
      "The support product needed real tenant isolation for customer-facing conversations, but also a cross-tenant queue for the team actually operating support, without standing up a second auth system or hand-writing per-customer proxy exceptions. Invite-only signup also had to hold across every auth method, not just the primary one, or it isn't actually invite-only.",
    solution:
      "The support product is split into two explicit planes (a tenant plane gated by ordinary org membership, and an operator plane gated by membership in one designated internal org) rather than a role flag or a per-route exception list. Invite-only enforcement lives in a single Better Auth lifecycle hook that every signup path runs through, instead of being duplicated per auth method.",
    technology: ["Next.js", "Payload CMS", "Better Auth", "PostgreSQL", "Drizzle ORM", "Stripe", "OpenRouter", "Vercel AI SDK", "TypeScript"],
    outcome: null,
    updatedAt: "2026-09-12",
  },
]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.projectSlug === slug)
}
