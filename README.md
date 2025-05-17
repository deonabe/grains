# 🌾 Grains

**Accessible yield. Powered by Treasuries. For everyone.**

Grains is a Solana-based protocol that allows anyone, anywhere, to convert stablecoins like USDC into a yield-bearing token (GRAIN) that represents U.S. Treasuries — without banks, credit scores, or minimum investment requirements.

---

## 🚀 Demo Links

- 🎥 [Demo Video](https://youtu.be/YOUR_DEMO_LINK) — <small>walkthrough of UX flow</small>
- 🎥 [Technical Overview](https://youtu.be/YOUR_TECH_LINK) — <small>architecture + smart contract</small>
- 🧠 [GitHub Repo](https://github.com/deonabe/grains)

---

## 🧩 What Grains Solves

Billions of people are locked out of U.S. Treasury yield due to:

- High minimums ($5K–$5M)
- Bank & KYC requirements
- Geographic restrictions
- Lack of DeFi-native interfaces

**Grains democratizes access to the safest yield on Earth.**

---

## 🔍 Key Features

- 🪙 **Swap USDC → GRAIN** with one click
- 🔒 **No KYC, no banks** required (demo mode)
- 📈 **View balances and track holdings**
- 📂 **Browse treasuries** by APY, duration, and status
- 🛠 **Powered by Anchor** smart contracts (simulated for hackathon)
- 🧪 **Demo Mode** with simulated swaps and balances

---

## 🛠️ Tech Stack

- ⚙️ **Solana** + Anchor smart contracts (Rust)
- 🎯 **SPL Tokens** for USDC and GRAIN
- 🧪 **Next.js App Router** (frontend)
- 🎨 **TailwindCSS** (theme + styling)
- 🔄 **Simulated devnet logic** via `DEMO_MODE`
- 🔐 Wallet adapter with Phantom/Solflare

---

## 🔬 Architecture Overview

User → Wallet Connect → Swap USDC → Anchor Program → Mint GRAIN
↘ Simulated balances in demo mode


- Swap logic lives in [`swapUSDCForGrain.ts`](src/app/utils/swapUSDCForGrain.ts)
- Smart contract logic in [`lib.rs`](anchor/programs/grains_swap/src/lib.rs)

---

## 📦 Project Structure

grains/
├── anchor/ # Anchor smart contract
│ └── programs/grains_swap/
│ └── target/
│   └── idl/grains_swap.json
├── app/ # Next.js frontend app
│ ├── components/
│   └── ClientProvider.tsx
│   └── ConnectWalletButton.tsx
│   └── NavBar.tsx
│   └── SwapForm.tsx
│   └── TokenBalance.tsx
│   └── WalletContextProvider.tsx
│ ├── docs/page.tsx
│ ├── exchange/page.tsx
│ ├── hooks/
│ ├── portfolio/page.tsx
│ ├── treasuries/page.tsx
│ └── utils/
│   └── idl/grains_swap.json
│   └── constants.ts
│   └── swapUSDCForGrain.ts
│ ├── global.css
│ ├── layout.tsx
│ ├── page.tsx
├── README.md


## 🧩 Key Differentiators

| Feature               | Grains ✅ | Other Platforms ❌ |
|-----------------------|----------|--------------------|
| Minimum Investment     | $1       | $5K–$5M            |
| KYC / Bank Required    | No (MVP) | Yes                |
| Global Access          | ✅       | Often Restricted   |
| Wallet-Based UX        | ✅       | Mostly Off-chain   |
| DeFi Composable        | ✅       | Closed Systems     |

## 🧱 Future Plans

- Plug into **real APY sources** like Ondo, Superstate, OpenEden
- Add **treasury yield farming**, streaming yield, and dashboards
- Launch on mainnet with **audited smart contracts**
