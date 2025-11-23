import { Connection, PublicKey } from "@solana/web3.js"

export interface RPCHealth {
  chain: string
  status: "healthy" | "degraded" | "down"
  latency: number
  lastCheck: number
}

export class MultiChainService {
  private rpcs = {
    solana: process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.mainnet-beta.solana.com",
    ethereum: process.env.NEXT_PUBLIC_ETHEREUM_RPC || "",
    bitcoin: process.env.NEXT_PUBLIC_BITCOIN_RPC || "",
  }

  async checkRPCHealth(chain: keyof typeof this.rpcs): Promise<RPCHealth> {
    const start = Date.now()
    try {
      if (chain === "solana") {
        const connection = new Connection(this.rpcs.solana)
        await connection.getVersion()
      }
      // Add checks for other chains

      const latency = Date.now() - start
      return {
        chain,
        status: latency < 1000 ? "healthy" : "degraded",
        latency,
        lastCheck: Date.now(),
      }
    } catch (error) {
      return {
        chain,
        status: "down",
        latency: -1,
        lastCheck: Date.now(),
      }
    }
  }

  async getBalance(chain: string, address: string): Promise<number> {
    if (chain === "solana") {
      const connection = new Connection(this.rpcs.solana)
      const balance = await connection.getBalance(new PublicKey(address))
      return balance / 1e9
    }
    return 0
  }
}

export const multiChainService = new MultiChainService()
