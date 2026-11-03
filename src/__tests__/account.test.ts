import { StellarToolkit } from '../index';

describe('StellarToolkit - Account Operations', () => {
  let toolkit: StellarToolkit;

  beforeAll(() => {
    toolkit = new StellarToolkit({ network: 'testnet' });
  });

  describe('generateKeypair', () => {
    it('should generate a valid keypair', () => {
      const keypair = toolkit.generateKeypair();

      expect(keypair).toHaveProperty('publicKey');
      expect(keypair).toHaveProperty('secret');
      expect(keypair.publicKey).toMatch(/^G[A-Z2-7]{55}$/);
      expect(keypair.secret).toMatch(/^S[A-Z2-7]{55}$/);
    });

    it('should generate unique keypairs', () => {
      const keypair1 = toolkit.generateKeypair();
      const keypair2 = toolkit.generateKeypair();

      expect(keypair1.publicKey).not.toBe(keypair2.publicKey);
      expect(keypair1.secret).not.toBe(keypair2.secret);
    });
  });

  describe('accountExists', () => {
    it('should return false for non-existent account', async () => {
      const keypair = toolkit.generateKeypair();
      const exists = await toolkit.accountExists(keypair.publicKey);

      expect(exists).toBe(false);
    });
  });

  describe('formatAsset', () => {
    it('should format native asset', () => {
      const formatted = toolkit.formatAsset('native');
      expect(formatted).toBe('XLM');
    });

    it('should format custom asset', () => {
      const formatted = toolkit.formatAsset({
        code: 'USDC',
        issuer: 'GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5',
      });
      expect(formatted).toContain('USDC');
    });
  });
});
