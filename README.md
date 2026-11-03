# Stellar Toolkit 🌟

A comprehensive TypeScript/JavaScript utility library that simplifies common Stellar blockchain operations. Built for developers who want clean, tested, and production-ready helpers for Stellar development.

## 🎯 Overview

Stellar Toolkit provides high-level abstractions over the Stellar SDK, making it easier to:
- Create and manage accounts
- Send payments and handle assets
- Interact with the Stellar network
- Parse and format Stellar data
- Handle common error scenarios gracefully

## 🚀 Features

- **Account Management**: Simplified account creation, funding, and balance checking
- **Payment Operations**: Easy-to-use payment and path payment functions
- **Asset Utilities**: Create, manage, and query custom assets
- **Transaction Builders**: Fluent API for building complex transactions
- **Error Handling**: Comprehensive error handling with meaningful messages
- **Network Helpers**: Automatic network detection and configuration
- **Type-Safe**: Full TypeScript support with detailed type definitions

## 📦 Installation

```bash
npm install @hyperdevtools/stellar-toolkit
# or
yarn add @hyperdevtools/stellar-toolkit
# or
pnpm add @hyperdevtools/stellar-toolkit
```

## 🔧 Quick Start

```typescript
import { StellarToolkit } from '@hyperdevtools/stellar-toolkit';

// Initialize the toolkit
const toolkit = new StellarToolkit({
  network: 'testnet', // or 'mainnet'
});

// Create a new account
const account = await toolkit.createAccount();
console.log('New account:', account.publicKey);

// Send a payment
await toolkit.sendPayment({
  from: sourceSecret,
  to: destinationPublicKey,
  amount: '10',
  asset: 'native',
});
```

## 📚 Documentation

### Account Operations

```typescript
// Create a new keypair
const keypair = toolkit.generateKeypair();

// Get account details
const account = await toolkit.getAccount(publicKey);

// Get account balances
const balances = await toolkit.getBalances(publicKey);

// Fund a testnet account
await toolkit.fundTestnetAccount(publicKey);
```

### Payment Operations

```typescript
// Simple payment
await toolkit.sendPayment({
  from: sourceSecret,
  to: destinationPublicKey,
  amount: '100',
  asset: 'native',
  memo: 'Payment for services',
});

// Custom asset payment
await toolkit.sendPayment({
  from: sourceSecret,
  to: destinationPublicKey,
  amount: '50',
  asset: {
    code: 'USDC',
    issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
  },
});

// Path payment
await toolkit.sendPathPayment({
  from: sourceSecret,
  to: destinationPublicKey,
  sendAsset: 'native',
  destAsset: { code: 'USDC', issuer: '...' },
  destAmount: '100',
  maxSend: '110',
});
```

### Asset Operations

```typescript
// Create a custom asset
const asset = toolkit.createAsset('MYTOKEN', issuerPublicKey);

// Establish trustline
await toolkit.addTrustline({
  account: accountSecret,
  asset: {
    code: 'USDC',
    issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
  },
  limit: '10000',
});
```

### Transaction Utilities

```typescript
// Build a transaction with multiple operations
const txBuilder = toolkit.transaction(sourceAccount);

const tx = await txBuilder
  .addPayment(destination1, '10')
  .addPayment(destination2, '20')
  .setTimeout(180)
  .build();

// Submit transaction
const result = await toolkit.submitTransaction(tx, sourceSecret);
```

## 🧪 Testing

```bash
npm test
```

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/HyperDevTools/stellar-toolkit.git
cd stellar-toolkit

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run linter
npm run lint
```

## 📋 Roadmap

- [ ] Multi-signature account support
- [ ] Claimable balance helpers
- [ ] Liquidity pool operations
- [ ] DEX trading utilities
- [ ] Fee bump transaction helpers
- [ ] Batch operation support
- [ ] Enhanced error recovery
- [ ] Performance optimizations

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

Built with:
- [Stellar SDK](https://github.com/stellar/js-stellar-sdk)
- TypeScript
- The amazing Stellar community

## 🔗 Links

- [Documentation](https://hyperdevtools.github.io/stellar-toolkit)
- [Stellar Developers](https://developers.stellar.org/)
- [Stellar Quest](https://quest.stellar.org/)
- [Issue Tracker](https://github.com/HyperDevTools/stellar-toolkit/issues)

## 💬 Support

- Open an issue for bug reports or feature requests
- Join our community discussions
- Contribute to the codebase

---

Made with ❤️ by HyperDevTools
