# 🌾 Grains

**Accessible yield. Powered by Treasuries. For everyone.**

Grains is a Solana-based protocol that allows anyone, anywhere, to convert stablecoins like USDC into a simulated, yield-bearing token (GRAIN) representing U.S. Treasuries — with no bank account, KYC, or minimum investment required.

---

## 🎥 Demo Videos

- **Pitch Deck**  
  [📽️ Watch on Loom](https://www.loom.com/share/0f11751d8b584656bf6ce67ead563200) — full UX walkthrough  
- **Technical Overview**  
  [💻 Watch on Loom](https://www.loom.com/share/5a8aab298c704b6b8134cfbf2bdba104?sid=3a1df96b-cc2d-4b91-93eb-46c798e436eb) — smart contract and frontend architecture  
- **Source Code**  
  [🧠 GitHub Repository](https://github.com/deonabe/grains)

---

## 🌍 Why Grains?

U.S. Treasuries are the safest source of yield in the world, yet they’re inaccessible to:

- People in high-inflation economies  
- Freelancers and crypto-native earners  
- Anyone without a bank or KYC access

**Grains solves this by offering wallet-based, DeFi-native access to yield-backed assets — starting with simulated GRAIN tokens.**

---

## 🔑 Key Features

- 🔄 **Swap USDC → GRAIN** instantly  
- 💸 **No KYC, no bank required** (in demo mode)  
- 📊 **Track balances and allocations** visually  
- 📁 **Explore Treasury options** by APY/duration  
- 🧠 **Built with Anchor** smart contracts (Rust)  
- 🧪 **Demo Mode**: Safe, simulated flow without real USDC  

---

## 🛠 Setup Instructions

You can run this project locally using [Solana Devnet] and [Next.js].

### Prerequisites

- [Node.js](https://nodejs.org/) 18+  
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli)  
- [Anchor](https://www.anchor-lang.com/docs/installation)  
- Phantom or Solflare Wallet (Devnet)

---

### 1. Clone the repo

```bash
git clone https://github.com/deonabe/grains.git
cd grains

### 2. Build and deploy the smart contract 

```bash
cd anchor
anchor build
anchor deploy

Make sure Anchor.toml is configured with cluster = "devnet"

### 3.

```bash
cd app
npm install
npm run dev

Then visit:
➡️ http://localhost:3000

##🔬 Architecture Overview

User → Wallet Connect → Swap UI → Anchor Program → Transfer Tokens
             ↘ (Demo Mode) Simulated Balance Updates
- 🔁 Frontend swap logic: swapUSDCForGrain.ts
- 🧠 Anchor smart contract: lib.rs
- 🔐 PDA authority and token transfers handled via Anchor

##📂 Project Structure

grains/
├── anchor/                 # Anchor smart contract
│   └── programs/grains_swap/
│   └── target/idl/grains_swap.json
├── app/                    # Next.js frontend
│   ├── components/
│   ├── exchange/page.tsx
│   ├── treasuries/page.tsx
│   ├── portfolio/page.tsx
│   ├── docs/page.tsx
│   └── utils/
│       └── swapUSDCForGrain.ts
│       └── idl/grains_swap.json
│   └── layout.tsx, page.tsx, global.css
├── README.md

## 🧩 Key Differentiators
| Feature             | **Grains** ✅   | Other Platforms ❌  |
| ------------------- | -------------- | ------------------ |
| Minimum Investment  | \$1            | \$5K–\$5M          |
| KYC / Bank Required | No (MVP)       | Yes                |
| Global Access       | ✅              | Often Geo-Blocked  |
| On-Chain UX         | ✅ Wallet-based | ❌ Mostly Off-chain |
| DeFi Composability  | ✅ Anchor + SPL | ❌ Closed systems   |

## 🧱 Roadmap

- 🔌 Integrate with real APY protocols: Ondo, Superstate, OpenEden
- 🌾 Add farming mechanics: yield streaming, rebasing, or locks
- 📊 Expand portfolio dashboards with live yield and historical stats
- 🔒 Launch audited contracts on Solana mainnet