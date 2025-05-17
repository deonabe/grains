export default function DocsPage() {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-black dark:text-white">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-6">
          About Grains
        </h1>
  
        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Learn how Grains enables access to tokenized U.S. Treasuries on Solana.
        </p>
  
        <div className="space-y-6 text-base leading-7 text-gray-800 dark:text-gray-200">
          <p>
            <strong>What is GRAIN?</strong><br />
            GRAIN is a tokenized representation of short-term U.S. Treasuries, accessible through DeFi. It offers yield backed by real-world government debt — without banks, borders, or middlemen.
          </p>
  
          <p>
            <strong>How does the swap work?</strong><br />
            Users swap USDC for GRAIN using a Solana smart contract. The GRAIN is minted from a treasury pool and can be swapped back anytime.
          </p>
  
          <p>
            <strong>Why use Grains?</strong><br />
            - No KYC<br />
            - $1 minimum<br />
            - Fast, on-chain swaps<br />
            - Open to anyone globally
          </p>
  
          <p>
            <strong>How is yield generated?</strong><br />
            In the MVP, GRAIN is minted from a treasury-backed reserve. In production, integrations with real-world protocols (like Ondo or OpenEden) will route funds to tokenized T-bills automatically.
          </p>
  
          <p className="pt-6">
            View the code on{' '}
            <a
              href="https://github.com/YOUR_REPO"
              className="text-blue-500 underline hover:text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
  