# 🌾 Grains

**Tagline:** Accessible yield, powered by Treasuries. For everyone.

Grains is a Solana-based protocol that democratizes access to yield-bearing U.S. Treasuries. We enable users — anywhere in the world — to swap stablecoins (like USDC) for a tokenized, on-chain representation of Treasury-backed savings called GRAIN.

## 🌍 Problem

Millions of people around the world are stuck saving in inflationary currencies with no access to safe, dollar-based yield. U.S. Treasuries are the gold standard of safety, but:

- Require high minimum investments ($5K–$5M)
- Are locked behind banking systems, KYC, and geographic restrictions
- Aren’t accessible to freelancers, crypto users, or unbanked youth

## 💡 Solution

**Grains** removes these barriers with an on-chain, wallet-based interface:

- ✅ Swap USDC for **GRAIN** (a tokenized T-bill position)
- ✅ Start with $1 or less
- ✅ No bank account, KYC, or paperwork (MVP)
- ✅ Redeem anytime back to USDC

## ⚙️ How It Works

1. **User connects wallet** (Phantom, Solflare, etc.)
2. **Enters amount of USDC** to convert
3. **Selects a tokenized Treasury product**
4. **Executes on-chain swap** → Receives GRAIN
5. **Redeems GRAIN** back to USDC anytime

### 🔗 Tech Stack

- **Solana** — Ultra-fast blockchain for cheap, global access
- **Anchor** — Smart contract framework
- **SPL Tokens** — USDC and GRAIN
- **React + Tailwind** — Clean frontend UI
- **Wallet Adapter** — Phantom integration for smooth UX

## 🖼️ Demo Preview

> “Safe yield for the 99% — not just the 1%.”

**Exchange Page Features:**
- Connect wallet
- Choose a Treasury product
- Enter amount in USDC
- Click to swap into GRAIN

## 📦 Folder Structure

grains/
├── anchor/ # Anchor smart contract
│ └── programs/grains_swap/
│ └── target/
│   └── idl/grains_swap.json
├── app/ # Next.js frontend app
│ ├── components/
│ ├── exchange/page.tsx
│ ├── portfolio/page.tsx
│ ├── providers/
│ ├── treasuries/page.tsx
│ └── utils/swapUSDCForGrain.ts
│ ├── global.css
│ ├── layout.tsx
│ ├── page.tsx
│ ├── images/
├── tests/
├── grains_swap.json # IDL
├── Anchor.toml
├── Cargo.toml
└── README.md


## 🧩 Key Differentiators

| Feature               | Grains ✅ | Other Platforms ❌ |
|-----------------------|----------|--------------------|
| Minimum Investment     | $1       | $5K–$5M            |
| KYC / Bank Required    | No (MVP) | Yes                |
| Global Access          | ✅       | Often Restricted   |
| Wallet-Based UX        | ✅       | Mostly Off-chain   |
| DeFi Composable        | ✅       | Closed Systems     |
