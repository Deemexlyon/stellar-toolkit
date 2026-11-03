import { Keypair, Server, Account } from 'stellar-sdk';
import { AccountInfo, Balance } from '../types';

export class AccountManager {
  constructor(private server: Server) {}

  /**
   * Generate a new Stellar keypair
   */
  generateKeypair(): AccountInfo {
    const pair = Keypair.random();
    return {
      publicKey: pair.publicKey(),
      secret: pair.secret(),
    };
  }

  /**
   * Load account from the network
   */
  async loadAccount(publicKey: string): Promise<Account> {
    try {
      return await this.server.loadAccount(publicKey);
    } catch (error) {
      throw new Error(`Failed to load account ${publicKey}: ${error}`);
    }
  }

  /**
   * Get account balances
   */
  async getBalances(publicKey: string): Promise<Balance[]> {
    const account = await this.loadAccount(publicKey);
    return account.balances as Balance[];
  }

  /**
   * Check if account exists on the network
   */
  async accountExists(publicKey: string): Promise<boolean> {
    try {
      await this.server.loadAccount(publicKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get account native balance
   */
  async getNativeBalance(publicKey: string): Promise<string> {
    const balances = await this.getBalances(publicKey);
    const nativeBalance = balances.find((b) => b.asset_type === 'native');
    return nativeBalance?.balance || '0';
  }

  /**
   * Fund account on testnet using Friendbot
   */
  async fundTestnetAccount(publicKey: string): Promise<void> {
    try {
      const response = await fetch(
        `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`,
      );
      if (!response.ok) {
        throw new Error(`Friendbot request failed: ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`Failed to fund testnet account: ${error}`);
    }
  }
}
