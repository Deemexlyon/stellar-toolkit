import { Server, TransactionBuilder, Operation, Keypair, Memo, BASE_FEE } from 'stellar-sdk';
import { PaymentOptions, PathPaymentOptions } from '../types';
import { createAsset } from '../utils/asset';

export class PaymentManager {
  constructor(
    private server: Server,
    private networkPassphrase: string,
  ) {}

  /**
   * Send a payment
   */
  async sendPayment(options: PaymentOptions): Promise<string> {
    const { from, to, amount, asset = 'native', memo } = options;

    try {
      const sourceKeypair = Keypair.fromSecret(from);
      const sourceAccount = await this.server.loadAccount(sourceKeypair.publicKey());

      const assetObj = createAsset(asset);

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(
          Operation.payment({
            destination: to,
            asset: assetObj,
            amount: amount,
          }),
        )
        .setTimeout(180);

      if (memo) {
        transaction.addMemo(Memo.text(memo));
      }

      const builtTransaction = transaction.build();
      builtTransaction.sign(sourceKeypair);

      const result = await this.server.submitTransaction(builtTransaction);
      return result.hash;
    } catch (error) {
      throw new Error(`Payment failed: ${error}`);
    }
  }

  /**
   * Send a path payment
   */
  async sendPathPayment(options: PathPaymentOptions): Promise<string> {
    const { from, to, sendAsset, destAsset, destAmount, maxSend } = options;

    try {
      const sourceKeypair = Keypair.fromSecret(from);
      const sourceAccount = await this.server.loadAccount(sourceKeypair.publicKey());

      const sendAssetObj = createAsset(sendAsset);
      const destAssetObj = createAsset(destAsset);

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: this.networkPassphrase,
      })
        .addOperation(
          Operation.pathPaymentStrictReceive({
            sendAsset: sendAssetObj,
            sendMax: maxSend,
            destination: to,
            destAsset: destAssetObj,
            destAmount: destAmount,
            path: [],
          }),
        )
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeypair);

      const result = await this.server.submitTransaction(transaction);
      return result.hash;
    } catch (error) {
      throw new Error(`Path payment failed: ${error}`);
    }
  }
}
