export type Detail = { label: string; text: string }
export type Step = { title: string; text: string; bullets?: string[] }

export type Project = {
  id: string
  type: 'EXPERIENCE' | 'OPEN SOURCE' | 'PROJECT'
  name: string
  blurb: string
  role: string
  summary: string
  link?: string
  submission?: string
  video?: string
  image?: string
  logo?: string
  techStack?: string[]
  overview?: string
  howItWorks?: Step[]
  map: string[]
  details: Detail[]
}

export type Research = { id: string; index: string; title: string; text: string; link: string }

export const projects: Project[] = [
  {
    "id": "0x01",
    "type": "EXPERIENCE",
    "name": "Kaia Labs",
    "blurb": "typed SDKs for chain, explorer and wallet.",
    "role": "Backend Developer / Developer Support",
    "summary": "Built blockchain platform SDKs, onboarded developers and removed friction from integration paths.",
    "map": [
      "SDK",
      "CHAIN",
      "DEV"
    ],
    "link": "https://www.kaia.io",
    "image": "/static/images/kaia-image.png",
    "logo": "/static/images/kaia-logo.png",
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "Developers integrating with the Kaia chain hit raw JSON-RPC, hand-rolled ABI encoders and unsigned wallet flows — friction that slowed onboarding. The brief: typed, documented SDKs that turn chain, explorer and wallet access into a few safe calls while I supported partner integrations."
      },
      {
        "label": "Architecture Discovery",
        "text": "Mapped the Kaia surface into three layers — chain RPC (eth/klay namespaces), block-explorer (Kaiascanner) data, and wallet signing. Chose a thin typed-client layer over raw RPC with convenience helpers, rather than a heavy ORM-like abstraction."
      },
      {
        "label": "Software Architecture",
        "text": "A modular TypeScript workspace: a chain client, a kaiascan explorer client, a wallet adapter, and contract bindings generated from ABIs — each package independently consumable, sharing types and documentation."
      },
      {
        "label": "Development Principles",
        "text": "Single-responsibility per module, dependency injection for transports, pure RPC wrappers with no hidden mutation, builder/curry patterns for chain config, and exhaustive typing so misuse fails at compile time."
      },
      {
        "label": "Impact",
        "text": "Cut integration time for new Kaia builders, removed a class of encoding errors at the type boundary, and gave the ecosystem a maintainable, documented entry point."
      }
    ]
  },
  {
    "id": "0x02",
    "type": "EXPERIENCE",
    "name": "Asset Scooper",
    "blurb": "dust-token sweeper that settles to USDC in one transaction.",
    "role": "Cofounder",
    "summary": "Built a wallet-consolidation platform that returns stablecoin for meme and dust tokens during Base Onchain Summer.",
    "map": [
      "WALLET",
      "SWAP",
      "USDC"
    ],
    "link": "https://assetscooper.xyz/",
    "submission": "https://devfolio.co/projects/assetscooper-3275",
    "video": "/static/images/assetscooper-demo.mp4",
    "image": "/static/images/assetscooper-image.png",
    "logo": "/static/images/assetscooper-logo.jpg",
    "techStack": [
      "Next.js",
      "TypeScript",
      "Solidity",
      "ERC-4337",
      "Chakra UI",
      "Wagmi / Viem",
      "ParaSwap",
      "Framer Motion"
    ],
    "overview": "Asset Scooper batches all of it into a single on-chain transaction. Connect your wallet, select the tokens you want to offload, pick a destination asset, and confirm once. One signature. One gas fee. Done.\n\nThe magic underneath is ERC-4337 smart accounts combined with ParaSwap's DEX aggregator. The interface constructs a UserOperation that bundles multiple swap calldata into a single atomic execution — if any swap fails, the whole batch reverts, protecting the user from partial fills.",
    "howItWorks": [
      {
        "title": "Portfolio Discovery",
        "text": "On load, the app queries the Covalent API to fetch all token balances for the connected address across supported chains. Tokens are filtered, sorted by USD value, and rendered in a selectable list — giving the user a full picture of what they're holding."
      },
      {
        "title": "Swap Route Aggregation",
        "text": "For each selected token, the app calls ParaSwap's @paraswap/core SDK to find the optimal swap route to the target asset. ParaSwap aggregates across Uniswap, Curve, Balancer, and dozens of other liquidity sources to minimize slippage and maximize output."
      },
      {
        "title": "Batch Transaction via Smart Accounts",
        "text": "This is where the core innovation lives. Instead of submitting N separate transactions:",
        "bullets": [
          "The app uses Coinbase OnchainKit (@coinbase/onchainkit) to interact with the user's ERC-4337 smart account (or deploy one if needed).",
          "All swap calldata — including token approvals — are packed into a single executeBatch UserOperation.",
          "The UserOperation is sent to a bundler, which submits it on-chain as one atomic transaction.",
          "A paymaster can optionally sponsor gas, enabling a gasless UX."
        ]
      },
      {
        "title": "Transaction Lifecycle",
        "text": "Real-time status is tracked via wagmi's useWaitForTransactionReceipt hook and TanStack Query for caching and refetching. The UI reflects pending, confirmed, and failed states with smooth transitions powered by Framer Motion."
      }
    ],
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "Wallets accumulate meme and dust tokens individually unprofitable to sell — gas outweighs value. During Base Onchain Summer the goal was one action that sweeps scattered holdings and returns USDC with predictable slippage."
      },
      {
        "label": "Architecture Discovery",
        "text": "Surveyed Base DEX routers, allowance flows (approve / Permit2) and dust thresholds. Settled on an aggregator swap path that pulls each token and routes it through the best available pool, settling in a single transaction."
      },
      {
        "label": "Software Architecture",
        "text": "An entrypoint sweep contract orchestrates per-token approvals, minimum-out swaps across Base pools, and a final USDC settlement, with pluggable adapters behind a router interface for different pool types."
      },
      {
        "label": "Development Principles",
        "text": "Checks-Effects-Interactions ordering on every external call, reentrancy guards across entry points, strict slippage / minimum-out bounds, immutable adapters, and fail-fast reverts so partial state never commits."
      },
      {
        "label": "Impact",
        "text": "Delivered a usable consolidation flow during the hackathon, turning scattered holdings into a single stablecoin balance in one transaction."
      }
    ]
  },
  {
    "id": "0x03",
    "type": "EXPERIENCE",
    "name": "Tiva Creative",
    "blurb": "backend API for a home-chef food ordering app.",
    "role": "Backend Engineer",
    "summary": "Built the client-facing API for The Other Wife — a home-chef food-ordering app — covering auth, location search, real-time ordering and a tamper-proof payment ledger.",
    "map": [
      "CLIENT",
      "API",
      "ORDER"
    ],
    "link": "https://play.google.com/store/apps/details?id=com.tivacreative.tow",
    "image": "/static/images/tiva-image.png",
    "logo": "/static/images/tiva-logo.png",
    "techStack": [
      "TypeScript",
      "Node.js",
      "MongoDB",
      "JWT + Refresh",
      "OTP",
      "WebSockets",
      "Docker",
      "Nginx"
    ],
    "overview": "The Other Wife connects customers to verified home chefs nearby. The backend powers auth, the meal-and-vendor catalog, location-based search, ordering, live order status and a tamper-proof payment ledger — the stable contract every client built on top of.",
    "howItWorks": [
      {
        "title": "Authentication & Sessions",
        "text": "Sign-in combines email + OTP with short-lived JWT access tokens and rotating refresh tokens, so sessions recover without re-entering passwords and exposed tokens expire fast."
      },
      {
        "title": "Catalog & Location Search",
        "text": "Meals and home-chef vendors are indexed by geolocation. Customers set a radius and the API returns nearby vendors within it — a bounding-box prefilter followed by haversine refinement — so discovery tracks the user's immediate area."
      },
      {
        "title": "Ordering & Real-time Updates",
        "text": "The cart → order lifecycle runs through a RESTful flow, with status transitions (placed, confirmed, preparing, en-route) pushed to clients over WebSockets so the order screen updates live without polling."
      },
      {
        "title": "Tamper-proof Payment Ledger",
        "text": "Every payment entry is hash-chained, then anchored to an external checkpoint — structured logs plus a daily cron and an on-demand admin endpoint — so a full database wipe-and-regenerate can't forge a consistent history."
      },
      {
        "title": "Deployment",
        "text": "Containerized with Docker and served behind an Nginx reverse proxy, with environment-driven configuration and deploy scripts for reproducible rollouts."
      }
    ],
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "The Other Wife, a home-chef food-ordering app, needed a dependable client-facing API: auth, the meal-and-vendor catalog, location-aware search, ordering with live status, and a payment history customers and chefs could trust."
      },
      {
        "label": "Architecture Discovery",
        "text": "Modeled the domain as home chefs → meals → cart → order → payment ledger, with role scopes for customer, chef and staff. Chose a REST resource layout, validated the data flow against the app screens, and decided where real-time push (WebSockets) and integrity (hash-chained ledger) had to live."
      },
      {
        "label": "Software Architecture",
        "text": "A layered TypeScript service — routes → controllers → services — over MongoDB, with OTP + JWT access/refresh auth, a WebSocket gateway for live order updates, a hash-chained payment ledger with external checkpointing, and a Docker image behind Nginx for deployment."
      },
      {
        "label": "Development Principles",
        "text": "Idempotent order creation, validation-at-the-boundary, WebSocket reconnection with backoff, the ledger hash-chain plus an external anchor, environment-driven config, and reproducible container rollouts."
      },
      {
        "label": "Impact",
        "text": "Shipped the backend the team built on top of, with a stable contract that survived multiple app iterations and a payments history hardened against tampering."
      }
    ]
  },
  {
    "id": "0x04",
    "type": "OPEN SOURCE",
    "name": "Uniswap V4 Docs",
    "blurb": "delta handling guidance for v4 integrators.",
    "role": "Protocol Documentation",
    "summary": "Improved protocol documentation and authored delta handling guidance for liquidity modifications.",
    "map": [
      "DELTA",
      "POOL",
      "HOOK"
    ],
    "link": "https://developers.uniswap.org/docs/protocols/v4/guides/unlock-callback-and-deltas#handling-deltas-for-liquidity-modifications",
    "image": "/static/images/uniswapv4-image.png",
    "logo": "/static/images/uniswapv4-logo.png",
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "V4's flash-accounting and unlock-callback model confused integrators — especially how to settle currency deltas after liquidity modifications. The task was to make that flow legible and correct in the official docs."
      },
      {
        "label": "Architecture Discovery",
        "text": "Read the V4 PoolManager, the unlock callback, and how currency deltas accumulate then settle within a single transaction. Traced real callback paths so each explanation was grounded in actual control flow."
      },
      {
        "label": "Software Architecture",
        "text": "Documentation structured as guide → concept → reference, with the unlock-callback and delta-handling pages authored as the canonical path integrators follow when modifying liquidity."
      },
      {
        "label": "Development Principles",
        "text": "Accuracy over the lifecycle ordering, minimal working snippets, single-source-of-truth explanations, and explicit callouts for the invariant — deltas must net to zero before settlement."
      },
      {
        "label": "Impact",
        "text": "Reduced integration confusion for V4 hook and router authors, establishing a reference path that later contributors extend."
      }
    ]
  },
  {
    "id": "0x05",
    "type": "OPEN SOURCE",
    "name": "cNGN",
    "blurb": "failover-hardened oracle SDK refactor.",
    "role": "SDK Contributor",
    "summary": "Refactored the oracle SDK, added failover resilience, resolved signer injection and improved security.",
    "map": [
      "ORACLE",
      "FAILOVER",
      "SIGN"
    ],
    "link": "https://cngn.co",
    "image": "/static/images/cngn-image.png",
    "logo": "/static/images/cngn-logo.png",
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "The oracle SDK returned prices through a single provider with no fallback — any outage or stale response propagated downstream. The refactor needed resilience, a clean signer surface, and tightened security."
      },
      {
        "label": "Architecture Discovery",
        "text": "Reviewed the existing fetch path and signer wiring; identified implicit state and a fragile provider singleton. Decided on a multi-provider failover layer with a pluggable signer injected via dependency injection."
      },
      {
        "label": "Software Architecture",
        "text": "A client walks an ordered provider list with healthy-provider selection and retry/backoff; an injected signer abstraction replaces direct key use; providers and signers sit behind interfaces."
      },
      {
        "label": "Development Principles",
        "text": "Failover / circuit-breaker pattern, dependency inversion for the signer, immutability of price responses, a narrow public API, and explicit error propagation rather than silent defaults."
      },
      {
        "label": "Impact",
        "text": "Price feeds now survive provider outages, signer injection is safe and testable, and the SDK has a smaller, audited attack surface."
      }
    ]
  },
  {
    "id": "0x06",
    "type": "OPEN SOURCE",
    "name": "Mantle AI Plugin",
    "blurb": "GOAT SDK plugin for agents acting on Mantle.",
    "role": "SDK Developer",
    "summary": "Enabled AI agents to bridge, inspect tokens and interact with on-chain data across the Mantle ecosystem.",
    "map": [
      "AGENT",
      "PLUGIN",
      "MANTLE"
    ],
    "link": "https://github.com/PaulElisha/mantle-ai-plugin",
    "image": "/static/images/mantle-image.png",
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "AI agents built on GOAT needed a clean tool surface to act on the Mantle chain — bridge, inspect tokens and read on-chain state — without each agent reimplementing RPC calls."
      },
      {
        "label": "Architecture Discovery",
        "text": "Studied the GOAT SDK plugin model (tool definitions bound to chain actions) and the Mantle RPC surface, then mapped agent actions to discrete, schema-validated tools."
      },
      {
        "label": "Software Architecture",
        "text": "A GOAT plugin exposing typed tools — bridge, token lookup, balance read — each delegating to a thin Mantle client, with input schemas so the model invokes them safely."
      },
      {
        "label": "Development Principles",
        "text": "Single-responsibility per tool, pure functional handlers, schema validation on every input, and a clean separation between tool descriptions and chain interaction."
      },
      {
        "label": "Impact",
        "text": "AI agents on Mantle can act and inspect autonomously, packaging cross-chain capability as a reusable plugin rather than bespoke per-agent code."
      }
    ]
  },
  {
    "id": "0x07",
    "type": "PROJECT",
    "name": "LiqOS",
    "blurb": "auction-based JIT liquidity as a Uniswap v4 hook.",
    "role": "Uniswap V4 Hook",
    "summary": "An auction-based JIT liquidity rebalancer implemented as a custom Uniswap V4 hook — eliminates LPs manually chasing price.",
    "map": [
      "AUCTION",
      "HOOK",
      "LIQ"
    ],
    "link": "https://github.com/PaulElisha/Liq0S-Custom-UniV4-Router-For-Auction-based-Liquidity-Market-JIT",
    "image": "/static/images/liqos-image.jpeg",
    "logo": "/static/images/liqos-image.jpeg",
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "Uniswap V3 concentrates liquidity so tightly that LPs must manually rebalance ranges as price drifts — a constant, error-prone chore. The brief: a transparent, automated mechanism that rebalances liquidity mid-trade without custodial loss."
      },
      {
        "label": "Architecture Discovery",
        "text": "Explored the V4 hook lifecycle (beforeSwap / afterSwap / afterModifyLiquidity) and the unlock-callback flash-accounting model. Settled on a per-swap auction held inside the hook, with transient storage (EIP-1153) recording net deltas only within a single swap."
      },
      {
        "label": "Software Architecture",
        "text": "Three collaborating modules: the hook contract (entry + delta accounting), an auction market (Dutch-price, JIT) that matches an incoming swap against live bids, and a router adapter that triggers the rebalance before settlement."
      },
      {
        "label": "Development Principles",
        "text": "Gas-aware deltas via transient storage rather than persistent SSTORE; flash-accounting ensures every borrow is repaid in the same unlock window; reentrancy and repay guards on every entry point; fuzz/invariant tests around the auction."
      },
      {
        "label": "Impact",
        "text": "LPs earn JIT fees without manual repositioning; swaps route against freshly rebalanced liquidity for tighter effective price; the design generalizes to any V4 pool with minimal added gas."
      }
    ]
  },
  {
    "id": "0x08",
    "type": "EXPERIENCE",
    "name": "Hebron Heights",
    "blurb": "two-sided commerce backend with an outbox event bus.",
    "role": "Freelance Full-Stack Backend",
    "summary": "HHG Commerce — a two-sided transactional commerce backend for retail users and merchants: checkout via Paystack or Stripe, real-time order status over SSE, merchant stores and inventory, media uploads and store analytics, with an outbox-driven event bus guaranteeing every order side-effect runs exactly once.",
    "map": [
      "OUTBOX",
      "RXJS",
      "SSE"
    ],
    "link": "https://hebron-heights.vercel.app",
    "image": "/static/images/hebron-image.png",
    "logo": "/static/images/hebron-logo.jpg",
    "techStack": [
      "Express 5",
      "Drizzle / PostgreSQL",
      "RxJS",
      "Better-auth + argon2",
      "Paystack / Stripe",
      "Cloudinary",
      "Zod",
      "Pino",
      "SSE"
    ],
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "A two-sided commerce backend serving retail users and merchants: browse and buy, manage stores and inventory, pay with Paystack or Stripe, get live order status in the browser, upload product media, and see store analytics — all without losing or duplicating a single business event. The platform had to guarantee that every order side-effect (stock deduction, email, notification row, payment follow-up) runs exactly once even if the process crashes mid-flight, while keeping sensitive flows (webhooks, auth, uploads) verifiable and auditable."
      },
      {
        "label": "Architecture Discovery",
        "text": "Split the system into decoupled planes: identity (better-auth + argon2 hashing), catalog (products, categories, merchants), the transactional core (cart → order → payment, all committed inside Drizzle transactions), a media pipeline (Cloudinary signed uploads with webhook feedback), and a real-time notification channel. Every domain write first lands in a durable PostgreSQL outbox table, then an RxJS event bus dispatches typed contracts (event_type, userId, payload) to autonomous consumers (email, inventory, notification, payment). Validated that write-first + guarded-update consume gives at-least-once delivery with replay for recovery."
      },
      {
        "label": "Software Architecture",
        "text": "An Express 5 API federating Paystack and Stripe behind one checkout dispatcher, rewiring signature-verified webhook payloads (Paystack, Stripe, Cloudinary) into domain events, and serving role-protected endpoints (user / merchant / admin) enforced by auth + role-guard middleware. A catalog layer manages products, categories, merchants, carts and merchant analytics with soft-delete and stock thresholds; a media layer issues signed Cloudinary uploads for single and bulk streaming with webhook confirmation. Cross-cutting: Zod validation at the edge, a centralized error contract (typed error codes → global handler), and a real-time channel where a singleton in-memory NotificationBroker feeds userId-filtered SSE streams with heartbeat keepalives — keeping the database out of the hot push path."
      },
      {
        "label": "Development Principles",
        "text": "Outbox-first writes for at-least-once guarantees, consumed exactly once per user-visible stream; userId kept at the top of the event contract so streaming never parses business payloads; a central broker instead of per-request bus subscriptions to bound fan-out and eliminate per-user DB work; replay of unprocessed outbox rows for crash recovery; graceful degradation — events without a resolvable recipient still persist as DB notifications for pull-based recovery; signed webhook verification, request-rate limiting and hardened headers (helmet) on every ingress; and an API-first contract (Swagger docs) with structured Pino logging for observability."
      },
      {
        "label": "Impact",
        "text": "A full-commerce backend where identity, catalog, ordering, payment, media and real-time notification cooperate under one reliability model: order → inventory → email → notification flows execute observably (Pino logs, Swagger docs, rate-limited, helmet-secured), live delivery is memory-only so latency stays low, and the outbox guarantees mean no lost emails, no double stock deductions, and no drifting payment states — even when webhooks and transactions interleave."
      }
    ]
  },
  {
    "id": "0x09",
    "type": "PROJECT",
    "name": "PredictivTrend",
    "blurb": "streaming-first AI stock analysis backend.",
    "role": "Backend Engineer",
    "summary": "A streaming-first AI stock-analysis backend — Express + Cloudflare Workers pull Polygon.io market data and stream Mistral/OpenAI performance reports to the browser over SSE, with abort propagation and backpressure-safe buffering.",
    "map": [
      "POLYGON",
      "MISTRAL",
      "SSE"
    ],
    "link": "https://predictiv-trend.vercel.app/",
    "image": "/static/images/predictiv-image.png",
    "logo": "/static/images/predictiv-logo.png",
    "techStack": [
      "Express 5",
      "TypeScript",
      "MongoDB / Mongoose",
      "Cloudflare Workers",
      "Mistral AI",
      "Polygon.io",
      "better-sse",
      "Axios",
      "Zod",
      "Helmet"
    ],
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "Retail users wanted understandable stock narratives — performance summaries plus directional reads — without raw terminals. The product needed trustworthy, fast-readable reports, and they had to render live rather than after a long server-side wait."
      },
      {
        "label": "Architecture Discovery",
        "text": "Chose a microservices-inspired split: an Express backend plus two Cloudflare Workers — a Polygon Worker for market data and an AI Worker for Mistral/OpenAI generation. Adopted a streaming-first flow where the controller opens an SSE connection, the service pulls OHLC from the Polygon Worker, then proxies the AI token stream straight through to the browser. Validated retry/backoff and abort semantics end-to-end."
      },
      {
        "label": "Software Architecture",
        "text": "A TypeScript Express 5 API where prediction controllers immediately set SSE (better-sse) headers; a predictiv service orchestrates the data pull (Polygon Worker, via axios-retry) and an AI stream passthrough (Mistral/OpenAI Worker emitting standard SSE chunks). Workers run on Cloudflare; MongoDB/Mongoose handles persistence; helmet, express-rate-limit and Zod validation harden every edge; the API is deployed to Render under predictable /api routes."
      },
      {
        "label": "Development Principles",
        "text": "Leak-proof abort propagation — a client disconnect drives an AbortController through Express and Axios all the way to the worker and halts the model mid-stream to save compute; axios-retry with exponential backoff under a strict 5s timeout; Mistral streaming bound in a CAF async generator wrapped with async-retry; and native Web Streams backpressure (enqueue only when controller.desiredSize > 0) to prevent buffer bloat."
      },
      {
        "label": "Impact",
        "text": "Reports render token-by-token in the browser with perceived instant latency, resilient to worker stutter, and cost-controlled — a closed tab instantly halts the underlying model call, so abandoned sessions don't burn AI credits."
      }
    ]
  },
  {
    "id": "0x0a",
    "type": "PROJECT",
    "name": "E-Dokita EMR",
    "blurb": "OpenEMR-backed clinical API gateway with split identity.",
    "role": "Backend Engineer",
    "summary": "A healthcare API gateway and clinical workflow layer over OpenEMR — a small, typed, role-aware Express 5 surface on two persistence systems: PostgreSQL for identity, consent and coordination, and OpenEMR as the clinical source of truth.",
    "map": [
      "CLIENT",
      "GATEWAY",
      "OPENEMR"
    ],
    "image": "/static/images/edokita-image.png",
    "techStack": [
      "TypeScript",
      "Express 5",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenEMR FHIR R4",
      "Argon2id",
      "RS256 JWT",
      "AsyncLocalStorage",
      "Zod",
      "Docker"
    ],
    "details": [
      {
        "label": "Requirement Analysis",
        "text": "A clinical product needed a modern, typed, role-aware HTTP surface over OpenEMR — without inventing a second clinical record. The brief split cleanly: OpenEMR stays the system of record for patients, practitioners, encounters, observations, prescriptions and labs, while the API owns application identity, sessions, EMR consent, appointment overlays, working hours, waitlists, messaging and notifications."
      },
      {
        "label": "Architecture Discovery",
        "text": "Charted both systems before writing a line. Mapped what the API owns against what OpenEMR owns, then chose a modular monolith over separate services because the domain shares one identity and one upstream. Contexts — the OpenEMR client and the current PostgreSQL transaction — propagate through AsyncLocalStorage instead of being threaded through every function signature, and cross-system workflows are designed as sequential, idempotent steps because no distributed transaction spans the two stores."
      },
      {
        "label": "Software Architecture",
        "text": "Express 5 composed in strict layers — route, controller, service, helper — across sixteen domain modules (auth, user, admin, doctor, patient, appointment, schedule, emr, emr-access, lab, prescription, waitlist, messaging, notification, openemr, system). PostgreSQL through Drizzle holds identity, sessions, consent grants, overlays and messaging; an OpenEMRClient wraps FHIR R4 and the Standard REST API with typed helpers, per-user OAuth2 Authorization Code + PKCE for staff and a cached service account for patient flows; a custom PHP extension in a digest-pinned OpenEMR image adds lab and observation endpoints; and the OpenAPI document is generated from the same Zod schemas that validate requests."
      },
      {
        "label": "Development Principles",
        "text": "A thin HTTP boundary ordered authenticate → withOpenEMR → requireRole → validate → resource guards, with services returning [value, error] tuples that controllers unwrap into one response envelope. Authorization is layered: role, then ownership or a patient-approved, time-limited consent grant, then upstream OpenEMR scopes as a second boundary. No network call is ever wrapped in a PostgreSQL transaction, and @Transactional stays on DB-only private methods. Credentials are Argon2id hashes, 15-minute RS256 access tokens, hashed rotating refresh tokens and a session epoch that invalidates every earlier token."
      },
      {
        "label": "Systems Design",
        "text": "Decoupled the domain so availability holds under high-load spikes — identity, clinical reads, scheduling, labs and messaging degrade and recover independently instead of dragging the whole surface down. Authored strict API contracts and normalized schemas for the dual-sided patient and provider workflows, and kept every external clinical provider behind an explicit integration layer that handles partial failure states and transactional boundaries rather than assuming they succeed."
      },
      {
        "label": "Impact",
        "text": "One gateway now serves patients, doctors, admins and lab staff over a single contract: consent-gated chart access that expires on its own, real reconciliation paths for writes that span two stores, and failure contained to one module instead of corrupting state."
      }
    ]
  }
]

export const research: Research[] = [
  {
    "id": "r001",
    "index": "R/001",
    "title": "Uniswap V3 Advanced Mechanics",
    "text": "A rigorous deep dive into concentrated liquidity, virtual reserves, liquidity math and position management.",
    "link": "https://paragraph.com/@break-into-defi/uniswap-v3-advanced-mechanics"
  },
  {
    "id": "r002",
    "index": "R/002",
    "title": "Mechanics of Liquidity Distribution",
    "text": "Token swapping analysis through execution tracing, slippage measurement and a literature review of liquidity distribution.",
    "link": "https://paragraph.com/@break-into-defi/mechanics-of-uniswap-v3-liquidity-distribution"
  },
  {
    "id": "r003",
    "index": "R/003",
    "title": "Uniswap V2 Advanced Mechanics",
    "text": "A foundational deep dive into the constant-product AMM — x·y=k reserves, fee math, mint and burn flows, and the mechanics of impermanent loss.",
    "link": "https://paragraph.com/@break-into-defi/uniswap-v2-advanced-mechanics"
  }
]

export const categories = [
  { id: 'experience', label: 'Experience', type: 'EXPERIENCE' },
  { id: 'open-source', label: 'Open Source', type: 'OPEN SOURCE' },
  { id: 'projects', label: 'Projects', type: 'PROJECT' },
] as const

export const categoryIdForType = (type: string): string =>
  categories.find((c) => c.type === type)?.id ?? categories[0].id

export const projectsInCategory = (categoryId: string): Project[] => {
  const cat = categories.find((c) => c.id === categoryId) ?? categories[0]
  return projects.filter((p) => p.type === cat.type)
}
