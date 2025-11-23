import { Connection, PublicKey } from "@solana/web3.js"
import { TEOS_CONFIG } from "./teos-config"

export interface TokenBalance {
  teos: number
  tut: number
  ert: number
  sol: number
}

export class SolanaBalanceManager {
  private static connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed")

  static async getBalances(walletAddress: string): Promise<TokenBalance> {
    try {
      const publicKey = new PublicKey(walletAddress)

      const solBalance = await this.connection.getBalance(publicKey)

      const tokenAccounts = await this.connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"),
      })

      let teosBalance = 0
      let tutBalance = 0
      let ertBalance = 0

      for (const account of tokenAccounts.value) {
        const mintAddress = account.account.data.parsed.info.mint
        const balance = account.account.data.parsed.info.tokenAmount.uiAmount || 0

        if (mintAddress === TEOS_CONFIG.tokens.teos.mintAddress) {
          teosBalance = balance
        } else if (mintAddress === TEOS_CONFIG.tokens.tut.mintAddress) {
          tutBalance = balance
        } else if (mintAddress === TEOS_CONFIG.tokens.ert.mintAddress) {
          ertBalance = balance
        }
      }

      return {
        teos: teosBalance,
        tut: tutBalance,
        ert: ertBalance,
        sol: solBalance / 1e9,
      }
    } catch (error) {
      return {
        teos: 0,
        tut: 0,
        ert: 0,
        sol: 0,
      }
    }
  }

  static watchBalances(
    walletAddress: string,
    callback: (balances: TokenBalance) => void,
    intervalMs = 10000,
  ): () => void {
    this.getBalances(walletAddress)
      .then(callback)
      .catch(() => {
        // Silent fail with zero balances
        callback({ teos: 0, tut: 0, ert: 0, sol: 0 })
      })

    const interval = setInterval(async () => {
      const balances = await this.getBalances(walletAddress)
      callback(balances)
    }, intervalMs)

    return () => clearInterval(interval)
  }
}
