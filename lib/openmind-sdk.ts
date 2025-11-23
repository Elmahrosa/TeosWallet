// OpenMind AI SDK Integration
export interface OpenMindConfig {
  apiKey: string
  baseURL?: string
  model?: string
}

export interface OpenMindMessage {
  role: "system" | "user" | "assistant"
  content: string
}

export interface OpenMindResponse {
  id: string
  choices: Array<{
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export class OpenMindSDK {
  private apiKey: string
  private baseURL: string
  private model: string

  constructor(config: OpenMindConfig) {
    this.apiKey = config.apiKey
    this.baseURL = config.baseURL || "https://api.openmind.ai/v1"
    this.model = config.model || "gpt-4"
  }

  async chat(messages: OpenMindMessage[]): Promise<OpenMindResponse> {
    try {
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          temperature: 0.7,
          max_tokens: 500,
        }),
      })

      if (!response.ok) {
        throw new Error(`OpenMind API error: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("OpenMind SDK error:", error)
      throw error
    }
  }

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    const messages: OpenMindMessage[] = []

    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt })
    }

    messages.push({ role: "user", content: prompt })

    const response = await this.chat(messages)
    return response.choices[0]?.message?.content || ""
  }

  static isAvailable(): boolean {
    return !!(process.env.OPENMIND_API_KEY || process.env.NEXT_PUBLIC_OPENMIND_API_KEY)
  }
}

export const openmindSDK = OpenMindSDK.isAvailable()
  ? new OpenMindSDK({
      apiKey: (process.env.OPENMIND_API_KEY || process.env.NEXT_PUBLIC_OPENMIND_API_KEY) as string,
    })
  : null
